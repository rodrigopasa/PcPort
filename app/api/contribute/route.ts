import { appendFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { issueFor, parseSubmission, type ErrorCode, type Submission } from '@/lib/contribute'
import { contributePath, isLang } from '@/lib/i18n'
import type { Lang } from '@/lib/db/schema'

/**
 * Receives the contribution form.
 *
 * Works with and without JavaScript: the form posts here either way. A script
 * asks for JSON and shows the result inline, keeping what was typed; a plain
 * post gets a 303 back to the page, which is what makes the form usable with
 * scripts off.
 *
 * Every accepted submission is written to disk first, so nothing is lost if
 * GitHub is unreachable or no token is configured. The issue is a convenience
 * on top: notifications and triage where the maintainer already works.
 */

export const dynamic = 'force-dynamic'

const DIR = process.env.SUBMISSIONS_DIR ?? join(process.cwd(), '.data', 'submissions')
const REPO = process.env.GITHUB_ISSUES_REPO ?? 'rodrigopasa/PcPort'

/**
 * Five an hour per address. A person correcting a listing sends one or two;
 * the limit exists so a script cannot fill the disk or the issue tracker.
 * In memory on purpose: one container, and a restart forgetting it is fine.
 */
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const seen: Map<string, number[]> = ((globalThis as Record<string, unknown>).__pcportRate ??=
  new Map()) as Map<string, number[]>

function limited(ip: string, now: number): boolean {
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  seen.set(ip, recent)
  // Bounded: an attacker rotating addresses must not grow this forever.
  if (seen.size > 5_000) seen.delete(seen.keys().next().value as string)
  return recent.length > MAX_PER_WINDOW
}

async function store(sub: Submission, issue: number | null): Promise<boolean> {
  try {
    await mkdir(DIR, { recursive: true })
    await appendFile(join(DIR, 'submissions.jsonl'), `${JSON.stringify({ ...sub, issue })}\n`)
    return true
  } catch (err) {
    console.error('contribute: could not store', err)
    return false
  }
}

/** Opens the issue. Returns its number, or null — never throws. */
async function fileIssue(sub: Submission): Promise<number | null> {
  const token = process.env.GITHUB_ISSUES_TOKEN
  if (!token) return null
  const { title, body, labels } = issueFor(sub)

  const post = (withLabels: boolean) =>
    fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': 'pcport-contribute',
        'x-github-api-version': '2022-11-28',
      },
      body: JSON.stringify(withLabels ? { title, body, labels } : { title, body }),
      signal: AbortSignal.timeout(10_000),
    })

  try {
    let res = await post(true)
    // A token without permission to create labels gets a 422 for the labels
    // alone; the issue is still worth filing without them.
    if (res.status === 422) res = await post(false)
    if (!res.ok) {
      console.error(`contribute: GitHub answered ${res.status}`)
      return null
    }
    return ((await res.json()) as { number?: number }).number ?? null
  } catch (err) {
    console.error('contribute: GitHub unreachable', err)
    return null
  }
}

function formToRecord(fd: FormData): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {}
  for (const [k, v] of fd.entries()) {
    if (typeof v !== 'string') continue // no file uploads, ever
    const prev = out[k]
    out[k] = prev === undefined ? v : Array.isArray(prev) ? [...prev, v] : [prev, v]
  }
  return out
}

export async function POST(req: Request) {
  const wantsJson = (req.headers.get('accept') ?? '').includes('application/json')

  const reply = (lang: Lang, outcome: { ok: true; kind: string } | { ok: false; error: ErrorCode }, keep = '') => {
    if (wantsJson) return Response.json(outcome, { status: outcome.ok ? 200 : 400 })
    const q = outcome.ok ? `enviado=${outcome.kind}` : `erro=${outcome.error}${keep}`
    // Relative on purpose: behind the proxy this server does not know its
    // public origin, and a relative Location is valid HTTP.
    return new Response(null, { status: 303, headers: { location: `${contributePath(lang)}?${q}` } })
  }

  let fd: FormData
  try {
    fd = await req.formData()
  } catch {
    return reply('pt', { ok: false, error: 'missing' })
  }
  const form = formToRecord(fd)
  const rawLang = typeof form.lang === 'string' ? form.lang : 'pt'
  const lang: Lang = isLang(rawLang) ? rawLang : 'pt'

  const now = Date.now()
  const ip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  if (limited(ip, now)) return reply(lang, { ok: false, error: 'rate' })

  const parsed = parseSubmission(form, { now, id: randomUUID().slice(0, 8), lang })

  if (!parsed.ok) {
    // A bot is told it succeeded, so it learns nothing about the trap.
    if (parsed.error === 'bot') return reply(lang, { ok: true, kind: 'novo' })
    const kind = typeof form.kind === 'string' ? form.kind : ''
    const port = typeof form.port === 'string' ? form.port : ''
    const keep = `${kind ? `&tipo=${encodeURIComponent(kind)}` : ''}${port ? `&porte=${encodeURIComponent(port)}` : ''}`
    return reply(lang, parsed, keep)
  }

  const issue = await fileIssue(parsed.sub)
  const stored = await store(parsed.sub, issue)
  // Lost only when both failed: the issue alone is still a record of it.
  if (!stored && issue === null) return reply(lang, { ok: false, error: 'store' })

  return reply(lang, { ok: true, kind: parsed.sub.kind })
}
