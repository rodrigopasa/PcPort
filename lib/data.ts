import { catalog, covers as coversFile, shots as shotsFile, fandom as fandomFile } from './store'
import { consoleSlug, formatDate, formatSize, gameYear, slugify, type Game, type Shot } from './format'

// Re-exported so server code keeps one import, while client components pull
// these from './format' and never drag the filesystem into the bundle.
export { consoleSlug, formatDate, formatSize, gameYear, slugify }
export type { Game, Shot }
import { GAMES, type GameMeta } from './games'
import { installSteps, portSummary } from './content'
import type { Lang, Mechanism } from './db/schema'

/**
 * Every fact here came from the GitHub API — repo, description, release tag,
 * date, size, licence, owner. The bilingual prose is composed from those facts
 * rather than written per entry, which is exactly what the scraper does for a
 * port it meets for the first time.
 */
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

/** A README image with its intrinsic size, so the page never crops it. */


export type Entry = CatalogRow & {
  slug: string
  slugAlt: string
  /** The repo's own English description, kept verbatim as the technical line. */
  repoDescription: string
  /** Composed to ~155 characters for the SERP snippet. */
  seoDescription: string
  installSteps: string[]
  gameMeta: Game | null
  /** The project's own screenshots of the port running, from its README. */
  screenshots: Shot[]
}

const rows = () => catalog<CatalogRow[]>()
const covers = () => coversFile<Record<string, { igdbId: number; coverUrl: string | null }>>()
const shots = () => shotsFile<Record<string, { images: Shot[]; repo: string }>>()
const fandom = () => fandomFile<Record<string, Shot & { source: string }>>()



/**
 * "<game> pc" is the query, so it leads the slug. Two ports of the same game
 * exist (GoldenEye has two), so a collision falls back to the port's author.
 */
function buildSlugs(lang: Lang): Map<string, string> {
  const suffix = lang === 'pt' ? 'pc' : 'pc-port'
  const seen = new Map<string, number>()
  const out = new Map<string, string>()

  // Curated entries claim the clean slug first. Two projects can port the same
  // game — there are two Wipeouts and two GoldenEyes — and without this the
  // uncurated one won the canonical URL by catalogue order, taking the title,
  // the cover and the release date of the entry that actually has them.
  const ordered = [...rows()].sort(
    (a, b) => Number(Boolean(b.game)) - Number(Boolean(a.game)) || b.stars - a.stars,
  )

  for (const row of ordered) {
    const base = `${slugify(row.title)}-${suffix}`
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    out.set(row.id, n === 0 ? base : `${slugify(row.title)}-${slugify(row.author)}-${suffix}`)
  }
  return out
}

/**
 * Rebuilt whenever the catalog changes. Computing this once at module load
 * meant a reloaded catalog kept the old slugs, so new entries resolved to
 * nothing.
 */
let slugCache: { size: number; maps: Record<Lang, Map<string, string>> } | null = null

function SLUGS_FOR(lang: Lang): Map<string, string> {
  const size = rows().length
  if (!slugCache || slugCache.size !== size) {
    slugCache = { size, maps: { pt: buildSlugs('pt'), en: buildSlugs('en') } }
  }
  return slugCache.maps[lang]
}

function gameOf(key: string | null, lang: Lang): Game | null {
  const meta: GameMeta | undefined = key ? GAMES[key] : undefined
  if (!meta || !key) return null
  // IGDB fills only what games.ts leaves empty: a fuzzy match can never
  // overwrite a verified date or summary.
  const fetched = covers()[key]
  const fan = fandom()[key]

  // Priority: a hand-verified URL, then IGDB (licensed for this), then Fandom
  // (a stopgap that disappears the moment IGDB is configured).
  const cover: Shot | null = meta.coverUrl
    ? { url: meta.coverUrl, w: 0, h: 0 }
    : fetched?.coverUrl
      ? { url: fetched.coverUrl, w: 0, h: 0 }
      : (fan ?? null)

  return {
    releasedAt: meta.releasedAt,
    developer: meta.developer,
    publisher: meta.publisher ?? null,
    genres: meta.genres,
    summary: meta.summary[lang],
    cover,
    coverSource: meta.coverUrl || fetched?.coverUrl ? null : (fan?.source ?? null),
    igdbId: meta.igdbId ?? fetched?.igdbId ?? null,
  }
}

function toEntry(row: CatalogRow, lang: Lang): Entry {
  return {
    ...row,
    slug: SLUGS_FOR(lang).get(row.id)!,
    slugAlt: SLUGS_FOR(lang === 'pt' ? 'en' : 'pt').get(row.id)!,
    repoDescription: row.description,
    seoDescription: portSummary(row, lang),
    installSteps: installSteps(row, lang),
    gameMeta: gameOf(row.game, lang),
    screenshots: shots()[row.id]?.images ?? [],
  }
}

export async function getEntries(lang: Lang): Promise<Entry[]> {
  return rows()
    .map((r) => toEntry(r, lang))
    .sort((a, b) => (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''))
}

export async function getEntry(lang: Lang, slug: string): Promise<Entry | null> {
  const id = [...SLUGS_FOR(lang).entries()].find(([, s]) => s === slug)?.[0]
  const row = id ? rows().find((r) => r.id === id) : undefined
  return row ? toEntry(row, lang) : null
}

export async function getLatest(lang: Lang): Promise<Entry | null> {
  return (await getEntries(lang))[0] ?? null
}

export async function getRelated(lang: Lang, entry: Entry, limit = 6): Promise<Entry[]> {
  const all = await getEntries(lang)
  return all.filter((e) => e.id !== entry.id && e.console === entry.console).slice(0, limit)
}

export async function getConsoles(lang: Lang) {
  const all = await getEntries(lang)
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const e of all) {
    const slug = consoleSlug(e.console)
    const hit = map.get(slug)
    if (hit) hit.count++
    else map.set(slug, { name: e.console, slug, count: 1 })
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export async function getByConsole(lang: Lang, slug: string) {
  const all = await getEntries(lang)
  const list = all.filter((e) => consoleSlug(e.console) === slug)
  return { rows: list, name: list[0]?.console ?? null }
}

export async function getCounts() {
  const week = rows().filter((r) => {
    if (!r.releasedAt) return false
    return Date.now() - new Date(`${r.releasedAt}T12:00:00Z`).getTime() < 7 * 864e5
  }).length
  return { total: rows().length, week }
}




