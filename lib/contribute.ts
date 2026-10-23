/**
 * Contributions from visitors: a missing port, a correction, a removal, a
 * broken link.
 *
 * Kept pure — no filesystem, no network — so every rule here is tested, and the
 * route in app/api/contribute only stores and forwards what this accepts.
 *
 * Two lines this file holds whatever the form says:
 *
 * - A link to game data is refused at the door. `checkLink` is the same guard
 *   ingestion applies to release assets: the catalog never points at a ROM, a
 *   disc image or a file locker, and a visitor's form is not a way around it.
 *
 * - Nothing that identifies the sender is published. Name and email are stored
 *   privately so a reply is possible; the GitHub issue a submission may become
 *   carries only the technical fields, and every piece of free text is fenced
 *   so a typed `@someone` cannot ping a stranger from this repository.
 */
import { checkLink } from './guard'
import type { Lang } from './db/schema'

export const KINDS = ['novo', 'correcao', 'remocao', 'link'] as const
export type Kind = (typeof KINDS)[number]

export const METHODS = ['decomp', 'recomp', 'rebuild', 'emulator', 'other'] as const
export const STATUSES = ['playable', 'beta', 'in-progress', 'unknown'] as const
export const PLATFORMS = ['Windows', 'macOS', 'Linux', 'Steam Deck'] as const

export const REMOVAL_REASONS = ['maintainer', 'abandoned', 'other'] as const
export const LINK_REASONS = ['broken', 'wrong', 'unsafe'] as const

/** Below this, a form was filled by something that does not read. */
export const MIN_FILL_MS = 3_000

export type Submission = {
  id: string
  at: string
  lang: Lang
  kind: Kind
  /** The catalog entry this is about, by repository path, when there is one. */
  port: string | null
  reason: string | null
  game: string
  console: string
  project: string
  url: string
  platforms: string[]
  method: string | null
  status: string | null
  ai: boolean
  notes: string
  /** Private. Never leaves the server's own storage. */
  name: string
  /** Private. Never leaves the server's own storage. */
  email: string
}

export type ErrorCode =
  | 'bot'
  | 'fast'
  | 'kind'
  | 'missing'
  | 'url'
  | 'gamefile'
  | 'email'
  | 'rate'
  | 'store'

export type Parsed = { ok: true; sub: Submission } | { ok: false; error: ErrorCode }

type Form = Record<string, string | string[] | undefined>

const one = (f: Form, k: string): string => {
  const v = f[k]
  return (Array.isArray(v) ? v[0] : (v ?? '')).toString()
}
const many = (f: Form, k: string): string[] => {
  const v = f[k]
  return Array.isArray(v) ? v : v ? [v] : []
}

/** Strips control characters and caps the length; never throws. */
export function clean(s: string, max: number): string {
  return s
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim()
    .slice(0, max)
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** An http(s) URL, or null. Anything else — `javascript:`, a bare word — is not a link. */
export function normaliseUrl(raw: string): string | null {
  const s = raw.trim()
  if (!s) return null
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null
    if (!u.hostname.includes('.')) return null
    return u.toString().slice(0, 300)
  } catch {
    return null
  }
}

export function parseSubmission(
  form: Form,
  opts: { now: number; id: string; lang: Lang },
): Parsed {
  // The honeypot: positioned off-screen and skipped by keyboard and screen
  // readers, so only a bot fills it.
  if (one(form, 'website').trim()) return { ok: false, error: 'bot' }

  const rendered = Number(one(form, 't'))
  if (!Number.isFinite(rendered) || opts.now - rendered < MIN_FILL_MS) {
    return { ok: false, error: 'fast' }
  }

  const kind = one(form, 'kind') as Kind
  if (!KINDS.includes(kind)) return { ok: false, error: 'kind' }

  const port = clean(one(form, 'port'), 140) || null
  const rawUrl = one(form, 'url')
  const url = normaliseUrl(rawUrl)
  if (rawUrl.trim() && !url) return { ok: false, error: 'url' }
  if (url && !checkLink(url).ok) return { ok: false, error: 'gamefile' }

  const game = clean(one(form, 'game'), 120)
  const project = clean(one(form, 'project'), 120)
  const notes = clean(one(form, 'notes'), 2000)

  // What each kind cannot be reviewed without.
  if (kind === 'novo' && (!game || !project || !url)) return { ok: false, error: 'missing' }
  if (kind === 'correcao' && !notes) return { ok: false, error: 'missing' }
  if ((kind === 'remocao' || kind === 'link') && !port && !url) {
    return { ok: false, error: 'missing' }
  }

  const email = clean(one(form, 'email'), 200)
  if (email && !EMAIL.test(email)) return { ok: false, error: 'email' }

  const pick = <T extends readonly string[]>(v: string, allowed: T) =>
    (allowed as readonly string[]).includes(v) ? v : null

  return {
    ok: true,
    sub: {
      id: opts.id,
      at: new Date(opts.now).toISOString(),
      lang: opts.lang,
      kind,
      port,
      reason:
        // Two groups with their own names: sharing one, the two default
        // checks fought and a removal could arrive tagged "does not open".
        kind === 'remocao'
          ? pick(one(form, 'removal_reason'), REMOVAL_REASONS)
          : kind === 'link'
            ? pick(one(form, 'link_reason'), LINK_REASONS)
            : null,
      game,
      console: clean(one(form, 'console'), 60),
      project,
      url: url ?? '',
      platforms: many(form, 'platforms').filter((p) =>
        (PLATFORMS as readonly string[]).includes(p),
      ),
      method: pick(one(form, 'method'), METHODS),
      status: pick(one(form, 'status'), STATUSES),
      ai: one(form, 'ai') === 'on' || one(form, 'ai') === 'true',
      notes,
      name: clean(one(form, 'name'), 80),
      email,
    },
  }
}

/**
 * Wraps visitor text so GitHub renders it inert.
 *
 * A code fence turns `@user` and `#123` into plain characters, which matters
 * because an issue on a public repository notifies whoever it mentions. The
 * fence is one backtick longer than any run inside the text, so a submission
 * cannot close it early and inject markdown after it.
 */
export function fence(text: string): string {
  const longest = Math.max(0, ...(text.match(/`+/g) ?? []).map((r) => r.length))
  const f = '`'.repeat(Math.max(3, longest + 1))
  return `${f}text\n${text}\n${f}`
}

const KIND_TITLE: Record<Kind, string> = {
  novo: 'Novo porte',
  correcao: 'Correção',
  remocao: 'Remoção',
  link: 'Link quebrado',
}

/** Titles do not render code, so mentions are broken with a zero-width space. */
const inert = (s: string) => s.replace(/@/g, '@​').replace(/\s+/g, ' ').slice(0, 110)

export function issueFor(sub: Submission): { title: string; body: string; labels: string[] } {
  const subject =
    sub.kind === 'novo' ? `${sub.game} — ${sub.project}` : sub.port || sub.url || sub.game

  const rows: [string, string][] = [
    ['Tipo', KIND_TITLE[sub.kind]],
    ['Entrada do catálogo', sub.port ? `\`${sub.port}\`` : '—'],
    ['Motivo', sub.reason ?? '—'],
    ['Jogo', sub.game ? `\`${sub.game.replace(/`/g, "'")}\`` : '—'],
    ['Console', sub.console ? `\`${sub.console.replace(/`/g, "'")}\`` : '—'],
    ['Projeto', sub.project ? `\`${sub.project.replace(/`/g, "'")}\`` : '—'],
    ['Link', sub.url ? `\`${sub.url}\`` : '—'],
    ['Roda em', sub.platforms.length ? sub.platforms.join(', ') : '—'],
    ['Método', sub.method ?? '—'],
    ['Status', sub.status ?? '—'],
    ['Usa IA (declarado)', sub.ai ? 'sim' : 'não'],
    ['Idioma do formulário', sub.lang],
  ]

  const parts = [
    '| Campo | Valor |',
    '| --- | --- |',
    ...rows.map(([k, v]) => `| ${k} | ${v} |`),
  ]
  if (sub.notes) parts.push('', '**Observações de quem enviou**', '', fence(sub.notes))

  if (sub.kind === 'novo') {
    parts.push(
      '',
      '**Para aceitar**',
      '- [ ] O link é o projeto, não arquivo de jogo',
      '- [ ] Passa em `isCatalogable` (lib/quality.ts)',
      '- [ ] Curadoria em scripts/curate.ts, registro em lib/games.ts',
    )
  }
  if (sub.kind === 'remocao') {
    parts.push(
      '',
      '**Para remover**',
      '- [ ] Confirmar que quem pede mantém o projeto (resposta pelo próprio repositório)',
      '- [ ] Adicionar o repositório a `DENIED` em lib/quality.ts, com o motivo',
      '- [ ] `npx tsx scripts/prune-catalog.ts` e deploy',
    )
  }

  parts.push(
    '',
    `<sub>Enviado pelo formulário de pcport.org em ${sub.at}. Id \`${sub.id}\`. ` +
      'Nome e e-mail, quando informados, ficam só no servidor.</sub>',
  )

  return {
    title: `[${KIND_TITLE[sub.kind]}] ${inert(subject)}`,
    body: parts.join('\n'),
    labels: ['contribuicao', sub.kind],
  }
}
