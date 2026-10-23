import { slugify } from './format'
import type { Lang } from './db/schema'
import HISTORY from './slug-history.json'

/**
 * A port page's address is made from its title, so curating a title moves
 * the page. Every rename since the catalog began left its old address
 * answering 404 — "both-golden-sun-games-for-gameboy-advance-pc" among them —
 * while search results and shared links still pointed there.
 *
 * Old addresses are kept in slug-history.json, old slug to entry id, and
 * answered with a permanent redirect to wherever the entry lives now. The
 * scripts that rename entries record the move as they write the catalog.
 */

export type SlugRow = { id: string; title: string; author: string; game?: string | null; stars: number }
export type SlugHistory = Record<Lang, Record<string, string>>

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
