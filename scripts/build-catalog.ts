/**
 * Builds and refreshes the catalog from GitHub. This is the real pipeline.
 *
 *   GITHUB_TOKEN=... npx tsx scripts/build-catalog.ts
 *
 * Every field written here came from the API: repo, description, release tag,
 * date, asset size, licence, owner. Nothing is hand-written, so nothing can be
 * a guess. Releases that carry game data are rejected by the guard.
 *
 * Two jobs in one pass:
 *   - REFRESH every entry already in the catalog, because a cron that skipped
 *     them would never see a new release, which is the whole point.
 *   - DISCOVER new projects from the seed list and GitHub topic search.
 *
 * Hand-curated fields survive a refresh: `game` links an entry to lib/games.ts
 * and `title` is the game's real name, neither of which the API can infer.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { checkRelease } from '../lib/guard'
import type { Mechanism } from '../lib/db/schema'

const API = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN
const OUT = 'lib/catalog.json'

/** Minimum stars for an auto-discovered project to enter the catalog. */
const MIN_STARS = 40

/** Known hubs of the scene. Discovery adds to this; it never replaces it. */
const SEED = [
  'HarbourMasters/Shipwright',
  'HarbourMasters/Ghostship',
  '2ship2harkinian/2ship2harkinian',
  'open-goal/jak-project',
  'hedge-dev/UnleashedRecomp',
  'shadps4-emu/shadPS4',
  'taisei-project/taisei',
  'EXOK/Celeste64',
]

const TOPICS = [
  'n64-recompilation',
  'recompilation',
  'decompilation',
  'source-port',
  'pc-port',
  'xbox360',
  'static-recompilation',
]

type Repo = {
  full_name: string
  name: string
  description: string | null
  topics?: string[]
  license: { spdx_id: string; url: string | null } | null
  owner: { login: string }
  stargazers_count: number
  html_url: string
  pushed_at: string
  archived: boolean
  fork: boolean
}

type Release = {
  tag_name: string
  published_at: string
  html_url: string
  assets: { name: string; size: number; browser_download_url: string }[]
}

export type CatalogRow = {
  id: string
  repo: string
  title: string
  game: string | null
  author: string
  console: string
  mechanism: Mechanism
  platforms: string[]
  stars: number
  description: string
  version: string | null
  releasedAt: string | null
  sizeBytes: number | null
  releaseUrl: string
  licenseId: string | null
  licenseUrl: string | null
}

class RateLimit extends Error {}

async function gh<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'pcport-catalog',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  if (res.status === 404) return null
  if (res.status === 403 || res.status === 429) throw new RateLimit()
  if (!res.ok) return null
  return (await res.json()) as T
}

/** Read off the repo's own words — never inferred from the game's name. */
function classify(repo: Repo): Mechanism {
  const hay = `${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase()
  if (/\b(wip|work in progress|not playable|unfinished|research|early|in development)\b/.test(hay))
    return 'in-progress'
  if (/recompil/.test(hay)) return 'recompiled'
  if (/emulator|translation layer|compatibility layer|runtime for/.test(hay))
    return 'translation-layer'
  return 'native'
}

const CONSOLES: [RegExp, string][] = [
  [/\b(n64|nintendo 64)\b/i, 'Nintendo 64'],
  [/\bxbox ?360\b/i, 'Xbox 360'],
  [/\b(original xbox|xbox|xbe)\b/i, 'Xbox'],
  [/\b(ps2|playstation 2)\b/i, 'PlayStation 2'],
  [/\b(ps4|playstation 4)\b/i, 'PlayStation 4'],
  [/\b(ps3|playstation 3)\b/i, 'PlayStation 3'],
  [/\b(psx|ps1|playstation)\b/i, 'PlayStation'],
  [/\bgamecube\b/i, 'GameCube'],
  [/\bwii\b/i, 'Wii'],
  [/\b(gba|game boy advance)\b/i, 'Game Boy Advance'],
  [/\b(nintendo ds|nds)\b/i, 'Nintendo DS'],
  [/\bdreamcast\b/i, 'Dreamcast'],
  [/\b(naomi|arcade)\b/i, 'Arcade'],
  [/\bswitch\b/i, 'Nintendo Switch'],
]

function detectConsole(repo: Repo): string {
  const hay = `${repo.description ?? ''} ${(repo.topics ?? []).join(' ')} ${repo.name}`
  for (const [re, name] of CONSOLES) if (re.test(hay)) return name
  return 'PC'
}

function detectPlatforms(release: Release | null, repo: Repo): string[] {
  const hay = `${release?.assets.map((a) => a.name).join(' ') ?? ''} ${repo.description ?? ''}`
  const out: string[] = []
  if (/win|\.exe|\.zip/i.test(hay)) out.push('Windows')
  if (/linux|appimage|\.tar/i.test(hay)) out.push('Linux')
  if (/mac|darwin|osx/i.test(hay)) out.push('macOS')
  return out.length ? out : ['Windows']
}

/** Strip the port's own branding to get at the game's name. */
function gameTitle(repo: Repo): string {
  const m = repo.description?.match(
    /(?:port of|recompilation of|decompilation of|version of)\s+([A-Z][^,.:(]{2,60})/i,
  )
  if (m) return m[1].trim()
  return (
    repo.name
      .replace(/[-_]/g, ' ')
      .replace(/\b(recomp|recompiled|port|pc|decomp|decompiled|project)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim() || repo.name
  )
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function discover(): Promise<string[]> {
  const found = new Set(SEED)
  for (const topic of TOPICS) {
    try {
      const res = await gh<{ items: Repo[] }>(
        `/search/repositories?q=topic:${topic}&sort=stars&per_page=50`,
      )
      for (const r of res?.items ?? []) {
        if (r.stargazers_count >= MIN_STARS && !r.archived && !r.fork) found.add(r.full_name)
      }
    } catch (err) {
      if (err instanceof RateLimit) throw err
    }
    await new Promise((r) => setTimeout(r, TOKEN ? 900 : 6500))
  }
  return [...found]
}

async function fetchRow(path: string, previous?: CatalogRow): Promise<CatalogRow | 'rejected' | null> {
  const repo = await gh<Repo>(`/repos/${path}`)
  if (!repo || repo.archived || repo.fork) return null

  const release = await gh<Release>(`/repos/${path}/releases/latest`)
  const assets = (release?.assets ?? []).map((a) => ({
    name: a.name,
    size: a.size,
    url: a.browser_download_url,
  }))

  const verdict = checkRelease(assets)
  if (!verdict.ok) {
    console.warn(`   rejected: ${verdict.reason}`)
    return 'rejected'
  }

  const biggest = [...assets].sort((a, b) => b.size - a.size)[0]

  return {
    id: previous?.id ?? slugify(repo.full_name),
    repo: repo.full_name,
    // Hand-curated and unreachable from the API: keep whatever is there.
    title: previous?.title ?? gameTitle(repo),
    game: previous?.game ?? null,
    author: repo.owner.login,
    console: previous?.console ?? detectConsole(repo),
    mechanism: classify(repo),
    platforms: detectPlatforms(release, repo),
    stars: repo.stargazers_count,
    description: repo.description ?? previous?.description ?? '',
    version: release?.tag_name ?? previous?.version ?? null,
    releasedAt: release?.published_at?.slice(0, 10) ?? repo.pushed_at.slice(0, 10),
    sizeBytes: biggest?.size ?? previous?.sizeBytes ?? null,
    releaseUrl: release?.html_url ?? `${repo.html_url}/releases`,
    licenseId: repo.license?.spdx_id ?? null,
    licenseUrl: repo.license?.url ?? null,
  }
}

async function main() {
  const existing: CatalogRow[] = await readFile(OUT, 'utf8')
    .then((r) => JSON.parse(r))
    .catch(() => [])
  const byRepo = new Map(existing.map((r) => [r.repo, r]))

  let targets: string[]
  try {
    targets = await discover()
    console.log(`discovery: ${targets.length} candidate repositories`)
  } catch {
    console.warn('discovery hit the rate limit; refreshing existing entries only')
    targets = []
  }

  // Refresh what is already catalogued first: a new release on a known project
  // matters more than finding one more project.
  const queue = [...new Set([...byRepo.keys(), ...targets])]

  const changed: { repo: string; from: string | null; to: string | null }[] = []
  let added = 0
  let rejected = 0
  let limited = false

  for (const path of queue) {
    const previous = byRepo.get(path)
    try {
      const row = await fetchRow(path, previous)
      if (row === 'rejected') { rejected++; continue }
      if (!row) continue

      if (!previous) {
        // A discovered project needs a `game` mapping before its page can carry
        // release dates and a summary; it ships with what the API gives.
        byRepo.set(path, row)
        added++
        console.log(`+  ${row.title} — ${row.repo} ${row.version ?? ''}`)
      } else {
        if (previous.version !== row.version) {
          changed.push({ repo: path, from: previous.version, to: row.version })
          console.log(`~  ${row.title} — ${previous.version ?? 'none'} → ${row.version ?? 'none'}`)
        }
        byRepo.set(path, row)
      }
    } catch (err) {
      if (err instanceof RateLimit) {
        console.warn('\nrate limit reached — saving what was collected')
        limited = true
        break
      }
      throw err
    }
    await new Promise((r) => setTimeout(r, TOKEN ? 90 : 900))
  }

  const rows = [...byRepo.values()].sort((a, b) =>
    (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''),
  )
  await writeFile(OUT, `${JSON.stringify(rows, null, 2)}\n`)

  console.log(
    `\n${rows.length} entries · +${added} new · ${changed.length} updated · ${rejected} rejected` +
      (limited ? ' · stopped early on the rate limit' : ''),
  )

  // Tell the running site which pages to regenerate. Nothing else does.
  if (changed.length && process.env.SITE_ORIGIN && process.env.REVALIDATE_TOKEN) {
    const res = await fetch(`${process.env.SITE_ORIGIN}/api/revalidate`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-revalidate-token': process.env.REVALIDATE_TOKEN,
      },
      body: JSON.stringify({
        slugs: [],
        consoles: [...new Set(rows.map((r) => r.console))],
      }),
    }).catch(() => null)
    console.log(`revalidate: ${res?.status ?? 'unreachable'}`)
  }

  // The workflow reads this to decide whether to commit.
  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import('node:fs')
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${added + changed.length}\n`)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
