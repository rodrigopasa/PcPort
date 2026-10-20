import CATALOG from './catalog.json'
import COVERS from './covers.json'
import SHOTS from './shots.json'
import FANDOM from './fandom.json'
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
export type Shot = { url: string; w: number; h: number }

export type Game = {
  releasedAt: string
  developer: string
  publisher: string | null
  genres: string[]
  summary: string
  cover: Shot | null
  /** Where the cover came from, so the page can credit it. */
  coverSource: string | null
  igdbId: number | null
}

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

const rows = CATALOG as CatalogRow[]
const covers = COVERS as Record<string, { igdbId: number; coverUrl: string | null }>
const shots = SHOTS as Record<string, { images: Shot[]; repo: string }>
const fandom = FANDOM as Record<string, Shot & { source: string }>

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const consoleSlug = slugify

/**
 * "<game> pc" is the query, so it leads the slug. Two ports of the same game
 * exist (GoldenEye has two), so a collision falls back to the port's author.
 */
function buildSlugs(lang: Lang): Map<string, string> {
  const suffix = lang === 'pt' ? 'pc' : 'pc-port'
  const seen = new Map<string, number>()
  const out = new Map<string, string>()

  for (const row of rows) {
    const base = `${slugify(row.title)}-${suffix}`
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    out.set(row.id, n === 0 ? base : `${slugify(row.title)}-${slugify(row.author)}-${suffix}`)
  }
  return out
}

const SLUGS: Record<Lang, Map<string, string>> = {
  pt: buildSlugs('pt'),
  en: buildSlugs('en'),
}

function gameOf(key: string | null, lang: Lang): Game | null {
  const meta: GameMeta | undefined = key ? GAMES[key] : undefined
  if (!meta || !key) return null
  // IGDB fills only what games.ts leaves empty: a fuzzy match can never
  // overwrite a verified date or summary.
  const fetched = covers[key]
  const fan = fandom[key]

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
    slug: SLUGS[lang].get(row.id)!,
    slugAlt: SLUGS[lang === 'pt' ? 'en' : 'pt'].get(row.id)!,
    repoDescription: row.description,
    seoDescription: portSummary(row, lang),
    installSteps: installSteps(row, lang),
    gameMeta: gameOf(row.game, lang),
    screenshots: shots[row.id]?.images ?? [],
  }
}

export async function getEntries(lang: Lang): Promise<Entry[]> {
  return rows
    .map((r) => toEntry(r, lang))
    .sort((a, b) => (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''))
}

export async function getEntry(lang: Lang, slug: string): Promise<Entry | null> {
  const id = [...SLUGS[lang].entries()].find(([, s]) => s === slug)?.[0]
  const row = id ? rows.find((r) => r.id === id) : undefined
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
  const week = rows.filter((r) => {
    if (!r.releasedAt) return false
    return Date.now() - new Date(`${r.releasedAt}T12:00:00Z`).getTime() < 7 * 864e5
  }).length
  return { total: rows.length, week }
}

export function formatSize(bytes: number | null): string | null {
  if (!bytes) return null
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1).replace('.', ',')} GB`
  return `${Math.round(bytes / 1e6)} MB`
}

const MONTHS: Record<Lang, string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

/**
 * Read in UTC and formatted by hand. `new Date('2026-10-12')` is UTC midnight,
 * so any timezone west of Greenwich renders the day before — and Intl's pt-BR
 * short form ("12 de out. de 2026") is long enough to wrap the column.
 */
export function formatDate(iso: string | null, lang: Lang): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return null
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${day} ${MONTHS[lang][d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function gameYear(game: Game | null): string | null {
  return game ? game.releasedAt.slice(0, 4) : null
}
