import {
  catalog,
  covers as coversFile,
  shots as shotsFile,
  fandom as fandomFile,
  libretro as libretroFile,
} from './store'
import { consoleSlug, formatDate, formatSize, gameYear, slugify, type Game, type Shot } from './format'

// Re-exported so server code keeps one import, while client components pull
// these from './format' and never drag the filesystem into the bundle.
export { consoleSlug, formatDate, formatSize, gameYear, slugify }
export type { Game, Shot }
import { GAMES, type GameMeta } from './games'
import { installSteps, portSummary } from './content'
import { buildSlugs, movedFrom, goneFrom, goneConsoleOf, goneConsoles } from './slugs'
import { entryPath, hubPath } from './i18n'
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
  /** Set by scripts/curate.ts once a person has judged and named the entry. */
  curated?: boolean
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
const libretro = () => libretroFile<Record<string, Shot & { source: string }>>()



/**
 * Rebuilt whenever the catalog changes. Computing this once at module load
 * meant a reloaded catalog kept the old slugs, so new entries resolved to
 * nothing. Keyed on the rows themselves, not their count: a curated title
 * changes a slug without changing how many entries there are.
 */
let slugCache: { rows: CatalogRow[]; maps: Record<Lang, Map<string, string>> } | null = null

function SLUGS_FOR(lang: Lang): Map<string, string> {
  const all = rows()
  if (!slugCache || slugCache.rows !== all) {
    slugCache = { rows: all, maps: { pt: buildSlugs(all, 'pt'), en: buildSlugs(all, 'en') } }
  }
  return slugCache.maps[lang]
}

function gameOf(key: string | null, lang: Lang): Game | null {
  const meta: GameMeta | undefined = key ? GAMES[key] : undefined
  if (!meta || !key) return null
  // IGDB fills only what games.ts leaves empty: a fuzzy match can never
  // overwrite a verified date or summary.
  const fetched = covers()[key]
  const lib = libretro()[key]
  const fan = fandom()[key]

  // Priority: a hand-verified URL, then IGDB (licensed for this), then the
  // libretro archive, then Fandom.
  //
  // libretro outranks Fandom because the two were compared by looking at all
  // 94 covers: a third of the Fandom ones were wrong, ten of them a different
  // game. A wiki page holds everything about a game and its lead image is as
  // often a screenshot as the box; the archive holds one thing per game, and
  // that thing is a scan of the box.
  const cover: Shot | null = meta.cover
    ? { url: meta.cover.url, w: meta.cover.w, h: meta.cover.h }
    : fetched?.coverUrl
      ? { url: fetched.coverUrl, w: 0, h: 0 }
      : (lib ?? fan ?? null)

  return {
    releasedAt: meta.releasedAt,
    developer: meta.developer,
    publisher: meta.publisher ?? null,
    genres: meta.genres,
    summary: meta.summary[lang],
    cover,
    // A hand-verified cover keeps its own attribution; IGDB is licensed for
    // this and needs none; Fandom carries the wiki it came from.
    coverSource: meta.cover
      ? (meta.cover.source ?? null)
      : fetched?.coverUrl
        ? null
        : (lib?.source ?? fan?.source ?? null),
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

/**
 * The entry at an address, live or former. A former address returns the entry
 * with its current slug, which differs from the one asked for: the page
 * redirects on that difference.
 */
export async function getEntry(lang: Lang, slug: string): Promise<Entry | null> {
  const id = [...SLUGS_FOR(lang).entries()].find(([, s]) => s === slug)?.[0] ?? movedFrom(lang, slug)
  const row = id ? rows().find((r) => r.id === id) : undefined
  return row ? toEntry(row, lang) : null
}

/**
 * Every port of one game, best known first.
 *
 * Several projects often port the same game — four for Bloodborne, three for
 * GoldenEye — and the search people type is the game, not the project. The
 * comparison page built on this is where that search should land.
 */
export async function getGamePorts(lang: Lang, game: string): Promise<Entry[]> {
  return rows()
    .filter((r) => r.game === game)
    .map((r) => toEntry(r, lang))
    .sort((a, b) => b.stars - a.stars)
}

/** Games with two or more ports: the ones a side-by-side page is worth having for. */
export function getHubGames(): { game: string; count: number }[] {
  const n = new Map<string, number>()
  for (const r of rows()) if (r.game) n.set(r.game, (n.get(r.game) ?? 0) + 1)
  return [...n]
    .filter(([, c]) => c > 1)
    .map(([game, count]) => ({ game, count }))
    .sort((a, b) => b.count - a.count || a.game.localeCompare(b.game))
}

/** For the contribution form, which names an entry by its repository. */
export async function getEntryByRepo(lang: Lang, repo: string): Promise<Entry | null> {
  const want = repo.trim().toLowerCase()
  const row = rows().find((r) => r.repo.toLowerCase() === want)
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





/**
 * The closest page still standing for something that left the catalog: the
 * game's comparison, else its one remaining port, else its console, else
 * the catalog itself. Resolved on each request, so it follows the catalog —
 * a game that gains a second port starts sending its old visitors there.
 */
export function closestPage(lang: Lang, game: string | null, consoleName: string | null): string {
  const all = rows()
  if (game) {
    const ports = all.filter((r) => r.game === game)
    if (ports.length > 1) return hubPath(lang, game)
    if (ports.length === 1) return entryPath(lang, SLUGS_FOR(lang).get(ports[0].id)!)
  }
  if (consoleName) {
    const slug = consoleSlug(consoleName)
    if (all.some((r) => consoleSlug(r.console) === slug)) return `/${lang}/console/${slug}`
  }
  return `/${lang}`
}

/** Where a removed entry's address now leads, or null if it never was one. */
export function formerEntryPage(lang: Lang, slug: string): string | null {
  const gone = goneFrom(lang, slug)
  return gone ? closestPage(lang, gone.game, gone.console) : null
}

/**
 * A comparison that lost its second port. Only a game the site has known —
 * in games.ts or among removed entries — redirects; any other word is a 404.
 */
export function formerHubPage(lang: Lang, game: string): string | null {
  const known = Boolean(GAMES[game]) || rows().some((r) => r.game === game) || goneConsoleOf(game) !== null
  if (!known) return null
  return closestPage(lang, game, goneConsoleOf(game))
}

/** A console page whose last entry left: the console list, if the console was ever ours. */
export function formerConsolePage(lang: Lang, slug: string): string | null {
  return goneConsoles().some((c) => consoleSlug(c) === slug) ? `/${lang}/consoles` : null
}

/**
 * The address in `lang` for a slug from either language, live, renamed or
 * removed. Null when no entry ever had it.
 */
export function entryAcrossLanguages(lang: Lang, slug: string): string | null {
  for (const from of [lang, lang === 'pt' ? 'en' : 'pt'] as Lang[]) {
    const id = [...SLUGS_FOR(from).entries()].find(([, s]) => s === slug)?.[0] ?? movedFrom(from, slug)
    const here = id ? SLUGS_FOR(lang).get(id) : undefined
    if (here) return entryPath(lang, here)
    const gone = goneFrom(from, slug)
    if (gone) return closestPage(lang, gone.game, gone.console)
  }
  return null
}
