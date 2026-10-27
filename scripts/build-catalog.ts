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
import { readFileSync, writeFileSync } from 'node:fs'
import { recordGone, recordMoves, type GoneBook, type SlugHistory, type SlugRow } from '../lib/slugs'
import { checkRelease } from '../lib/guard'
import { isCatalogable, isEmulator } from '../lib/quality'
import { deriveTitle } from '../lib/title'
import { detectPlatforms } from '../lib/platforms'
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
  // Found by comparing against the largest catalog in this niche and then
  // located on GitHub by our own search, each accepted only when its star
  // count agreed with the one listed for it. That check is what kept out a
  // same-named Arduino stepper-motor library. Seeded, so the heuristics in
  // quality.ts do not get a vote; the game-data guard still does.
  'deadinside28/bloodborne_pc',
  'Supermedo/bloodborne_pc',
  'droogie/bbhost',
  'TwilitRealm/dusklight',
  'snesrev/zelda3',
  'HarbourMasters/SpaghettiKart',
  'HarbourMasters/Starship',
  'BanjoRecomp/BanjoRecomp',
  'perfect-dark-pc-port/perfect_dark',
  'Rainchus/Donkey-Kong-64-Recompiled',
  'chrissotraidis/bluewake',
  'ZeldaWWHDRecomp/ZeldaWWHDRecomp',
  'flyngmt/ACGC-PC-Port',
  'new-coke/strikers',
  'peiikai/LASRecomp',
  'K0NL/B2recomp',
  'LoreanXavier/pt-pc',
  'Supermedo/uncharted_pc',
  'AjncSystem/ShadowOfTheColossus-PC',
  'z3xox/Tenkaichi3Decomp',
  'BodbDearg/PsyDoom',
  'mchughalex/skate3recomp',
  'freefrank/LostOdysseyRecomp',
  'sonicnext-dev/MarathonRecomp',
  'florinp93/hells-gate-recomp',
  'sal063/AC6_recomp',
  'YesterMester/TheSimpsonsGameRecomp',
  'Ekspym/Tekken6-native-online',
  'djyt/cannonball',
]

const TOPICS = [
  'n64-recompilation',
  'recompilation',
  'decompilation',
  'source-port',
  'pc-port',
  'xbox360',
  'static-recompilation',
  // Added after comparing against the largest catalog in this niche: it listed
  // some 340 console games this one did not, Twilight Princess and Mario Kart
  // 64 among them, and most were simply not under the seven topics above.
  'n64recomp',
  'xenonrecomp',
  'rexglue',
  'ps2recomp',
  'recomp',
  'decomp',
  'native-port',
]

/**
 * The recompilers the scene builds with. A project that names one of these in
 * its README is, nearly always, a console game being brought to the PC —
 * a stronger signal than any topic, because a topic is whatever the owner
 * typed and the toolchain is what the project actually depends on.
 */
const TOOLCHAINS = ['N64Recomp', 'ReXGlue', 'XenonRecomp', 'PS2Recomp', 'psxrecomp']

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
  /**
   * Set by scripts/curate.ts: a person judged this entry. Nothing automated
   * may overrule it — not the quality filter, not the classifier.
   */
  curated?: boolean
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
  // Emulators are their own category: long-tail content next to the native
  // ports the catalog is actually about.
  if (isEmulator(hay)) return 'emulator'
  if (/translation layer|compatibility layer|runtime for/.test(hay)) return 'translation-layer'
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

/** The name shown before curation. Lives in lib/title.ts, where it is tested. */
function gameTitle(repo: Repo): string {
  return deriveTitle(repo.name, repo.description)
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
  // 100 rather than 50: the second page of a topic held ports with several
  // hundred stars. Every candidate still has to pass the guard and the
  // quality filter, and an uncurated one stays out of the index.
  const queries = [
    ...TOPICS.map((t) => `topic:${t}`),
    ...TOOLCHAINS.map((t) => `"${t}" in:readme stars:>=${MIN_STARS}`),
  ]
  for (const q of queries) {
    try {
      const res = await gh<{ items: Repo[] }>(
        `/search/repositories?q=${encodeURIComponent(q)}&sort=stars&per_page=100`,
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

/**
 * True only when GitHub answers that the repository does not exist. Any other
 * failure — a timeout, a 500 — says nothing about it, and an entry is never
 * dropped on a guess.
 */
async function vanished(path: string): Promise<boolean> {
  const res = await fetch(`${API}/repos/${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'pcport-catalog',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  return res.status === 404
}

async function fetchRow(
  path: string,
  previous?: CatalogRow,
): Promise<CatalogRow | 'rejected' | 'gone' | null> {
  const repo = await gh<Repo>(`/repos/${path}`)
  // Deleted or made private. PrimeDecomp/prime went this way and its entry
  // stayed for days, its links answering 404, because a missing repository
  // was treated like any other failed request: keep what was there.
  if (!repo && previous && (await vanished(path))) return 'gone'
  // A fork is refused because discovery would otherwise list every copy of a
  // popular port. A seeded one was checked by a person, and a fork can be the
  // distinct port: Bloodborne's Windows build exists only in one.
  const seeded = SEED.includes(path)
  if (!repo || repo.archived || (repo.fork && !seeded)) return null

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

  // Topic search returns awesome-lists and emulator tooling alongside real
  // ports. Those become thin pages, and thin pages drag the whole domain.
  const quality = isCatalogable({
    repo: repo.full_name,
    title: previous?.title,
    description: repo.description,
    topics: repo.topics,
    version: release?.tag_name ?? null,
    sizeBytes: biggest?.size ?? null,
    stars: repo.stargazers_count,
  }, { seeded })
  if (!quality.ok) {
    console.warn(`   skipped: ${quality.reason}`)
    return 'rejected'
  }

  return {
    id: previous?.id ?? slugify(repo.full_name),
    repo: repo.full_name,
    // A curated title is a person's and is kept. An uncurated one is derived
    // again on every run: keeping it froze the old heuristic's output, so
    // "the N64 Classic" stayed in the table however the derivation improved.
    title: previous?.curated ? previous.title : gameTitle(repo),
    game: previous?.game ?? null,
    author: repo.owner.login,
    console: previous?.console ?? detectConsole(repo),
    // Curation can say `emulator` where the classifier reads `native`, and the
    // hourly refresh used to throw that away: Xenia was re-tagged every hour.
    // An uncurated row is still reclassified, so classifier fixes reach it.
    mechanism: previous?.curated ? previous.mechanism : classify(repo),
    // Only what a release file names. No release, or none that names a
    // platform, writes an empty list rather than guessing Windows.
    platforms: detectPlatforms(release ? release.assets : null),
    stars: repo.stargazers_count,
    description: repo.description ?? previous?.description ?? '',
    version: release?.tag_name ?? previous?.version ?? null,
    releasedAt: release?.published_at?.slice(0, 10) ?? repo.pushed_at.slice(0, 10),
    sizeBytes: biggest?.size ?? previous?.sizeBytes ?? null,
    releaseUrl: release?.html_url ?? `${repo.html_url}/releases`,
    licenseId: repo.license?.spdx_id ?? null,
    licenseUrl: repo.license?.url ?? null,
    ...(previous?.curated ? { curated: true } : {}),
  }
}

/**
 * A renamed or removed entry keeps answering at its old address: see
 * lib/slugs.ts.
 */
function recordSlugMoves(before: SlugRow[], after: SlugRow[]) {
  const file = 'lib/slug-history.json'
  const history: SlugHistory = JSON.parse(readFileSync(file, 'utf8'))
  const n = recordMoves(history, before, after)
  writeFileSync(file, `${JSON.stringify(history, null, 2)}\n`)
  if (n) console.log(`enderecos antigos  : ${n} redirecionados`)
  const goneFile = 'lib/slug-gone.json'
  const gone: GoneBook = JSON.parse(readFileSync(goneFile, 'utf8'))
  const g = recordGone(gone, before, after, history)
  writeFileSync(goneFile, `${JSON.stringify(gone, null, 2)}\n`)
  if (g) console.log(`entradas removidas : ${g} enderecos redirecionados`)
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
      if (row === 'rejected') {
        rejected++
        // An uncurated entry that no longer passes — a new DENIED line, a
        // release that now fails the guard — leaves; keeping the old row
        // kept it listed for good. A curated one is a person's call.
        if (previous && !previous.curated) {
          byRepo.delete(path)
          console.log(`-  ${previous.title} — ${path} no longer passes`)
        }
        continue
      }
      if (row === 'gone') {
        // Its address is recorded on write and redirects to the closest page.
        byRepo.delete(path)
        console.log(`-  ${previous!.title} — ${path} no longer exists on GitHub`)
        continue
      }
      if (!row) continue

      // A repository that moved — Dyotson/ForzaHorizon1-ReImagined became
      // FH1-ReImagined/… — answers at its old path with its new name. Keyed by
      // the old path, the entry was found again under the new one as a new
      // project; the next run's map by repository kept only one of the two,
      // and the curated one, with its id and addresses, was the one lost.
      if (row.repo !== path) {
        byRepo.delete(path)
        const there = byRepo.get(row.repo)
        byRepo.set(row.repo, there && !previous ? there : row)
        console.log(`>  ${row.title} — ${path} moved to ${row.repo}`)
        continue
      }

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
  // An uncurated title is derived again each run, so its address can move.
  recordSlugMoves(existing as unknown as SlugRow[], rows as unknown as SlugRow[])

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
