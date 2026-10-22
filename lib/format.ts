import type { Lang } from './db/schema'

/**
 * Pure formatting, with no filesystem or data access.
 *
 * Client components need these, and importing them from the data layer dragged
 * `node:fs` into the browser bundle, which fails the build outright. Keeping
 * them here means the client gets the helpers and nothing else.
 */

export type Game = {
  releasedAt: string
  developer: string
  publisher: string | null
  genres: string[]
  summary: string
  cover: Shot | null
  coverSource: string | null
  igdbId: number | null
}

/** A remote image with its intrinsic size, so the page never crops it. */
export type Shot = { url: string; w: number; h: number }

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    // Apostrophes vanish rather than becoming a separator. Left to the rule
    // below they produced `tony-hawk-s-project-8` and
    // `eternal-darkness-sanity-s-requiem`, which split the very token people
    // type — nobody searches for "tony hawk s project 8".
    .replace(/['’ʼ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const consoleSlug = slugify

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
