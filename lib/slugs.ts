import { slugify } from './format'
import type { Lang } from './db/schema'
import HISTORY from './slug-history.json'
import GONE from './slug-gone.json'

/**
 * A port page's address is made from its title, so curating a title moves
 * the page. Every rename since the catalog began left its old address
 * answering 404 — "both-golden-sun-games-for-gameboy-advance-pc" among them —
 * while search results and shared links still pointed there.
 *
 * Old addresses are kept in slug-history.json, old slug to entry id, and
 * answered with a permanent redirect to wherever the entry lives now. The
 * scripts that rename entries record the move as they write the catalog.
 *
 * An entry can also leave the catalog — SwitchRecomp did, being research and
 * not a game. Its address keeps the game and console it had, in
 * slug-gone.json, and sends the visitor to the closest page still standing:
 * the game's other ports, then its console, then the catalog.
 */

export type SlugRow = {
  id: string
  title: string
  author: string
  game?: string | null
  console?: string
  stars: number
}
export type SlugHistory = Record<Lang, Record<string, string>>
export type Gone = { game: string | null; console: string | null }
export type GoneBook = Record<Lang, Record<string, Gone>>

/**
 * "<game> pc" is the query, so it leads the slug. Two ports of the same game
 * exist (GoldenEye has two), so a collision falls back to the port's author.
 */
export function buildSlugs(rows: SlugRow[], lang: Lang): Map<string, string> {
  const suffix = lang === 'pt' ? 'pc' : 'pc-port'
  const seen = new Map<string, number>()
  const out = new Map<string, string>()

  // Curated entries claim the clean slug first. Two projects can port the same
  // game — there are two Wipeouts and two GoldenEyes — and without this the
  // uncurated one won the canonical URL by catalogue order, taking the title,
  // the cover and the release date of the entry that actually has them.
  const ordered = [...rows].sort(
    (a, b) => Number(Boolean(b.game)) - Number(Boolean(a.game)) || (b.stars ?? 0) - (a.stars ?? 0),
  )

  for (const row of ordered) {
    const base = `${slugify(row.title)}-${suffix}`
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    out.set(row.id, n === 0 ? base : `${slugify(row.title)}-${slugify(row.author)}-${suffix}`)
  }
  return out
}

/** What a removed entry's address was about, if it was ever an entry's. */
export function goneFrom(lang: Lang, slug: string): Gone | null {
  return (GONE as GoneBook)[lang]?.[slug] ?? null
}

/** Every console a removed entry belonged to, by name. */
export function goneConsoles(): string[] {
  const out = new Set<string>()
  for (const book of Object.values(GONE as GoneBook))
    for (const g of Object.values(book)) if (g.console) out.add(g.console)
  return [...out]
}

/** The console a game's removed ports were on, for a comparison page left empty. */
export function goneConsoleOf(game: string): string | null {
  for (const book of Object.values(GONE as GoneBook))
    for (const g of Object.values(book)) if (g.game === game && g.console) return g.console
  return null
}

/** The entry an old address belonged to, if it ever belonged to one. */
export function movedFrom(lang: Lang, slug: string): string | null {
  return (HISTORY as SlugHistory)[lang]?.[slug] ?? null
}

/**
 * Adds every address `before` gave an entry that `after` no longer gives it.
 * An address that is live again in `after` is dropped from the history: the
 * live page always wins, and a stale record would only hide that.
 */
export function recordMoves(history: SlugHistory, before: SlugRow[], after: SlugRow[]): number {
  let added = 0
  for (const lang of ['pt', 'en'] as Lang[]) {
    const was = buildSlugs(before, lang)
    const now = buildSlugs(after, lang)
    const live = new Set(now.values())
    const book = (history[lang] ??= {})
    for (const [id, slug] of now) {
      const old = was.get(id)
      if (old && old !== slug && !live.has(old) && book[old] !== id) {
        book[old] = id
        added++
      }
    }
    for (const slug of Object.keys(book)) if (live.has(slug)) delete book[slug]
  }
  return added
}

/**
 * Records the addresses of entries `before` had and `after` does not. An
 * address live again in `after` — the entry came back, or another took the
 * name — leaves this book, since the live page always wins.
 */
export function recordGone(
  book: GoneBook,
  before: SlugRow[],
  after: SlugRow[],
  history?: SlugHistory,
): number {
  let added = 0
  const kept = new Set(after.map((r) => r.id))
  const facts = new Map(before.map((r) => [r.id, { game: r.game ?? null, console: r.console ?? null }]))
  for (const lang of ['pt', 'en'] as Lang[]) {
    const was = buildSlugs(before, lang)
    const live = new Set(buildSlugs(after, lang).values())
    const page = (book[lang] ??= {})
    for (const row of before) {
      if (kept.has(row.id)) continue
      const slug = was.get(row.id)!
      if (live.has(slug) || page[slug]) continue
      page[slug] = { game: row.game ?? null, console: row.console ?? null }
      added++
    }
    // A renamed entry's older addresses point at its id. When the entry
    // leaves, they would point at nothing: they become removed addresses too.
    const renamed = history?.[lang] ?? {}
    for (const [slug, id] of Object.entries(renamed)) {
      if (kept.has(id)) continue
      delete renamed[slug]
      const was = facts.get(id)
      if (was && !live.has(slug) && !page[slug]) {
        page[slug] = was
        added++
      }
    }
    for (const slug of Object.keys(page)) if (live.has(slug)) delete page[slug]
  }
  return added
}
