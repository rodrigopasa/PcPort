/**
 * The name an entry carries before a person has curated it.
 *
 * It is shown in the catalog table, so it has to read as a name. The earlier
 * version produced "the N64 Classic", "both ☀️ Golden Sun games for Gameboy
 * Advance" and "fifa09": its pattern was case-insensitive, so the `[A-Z]` meant
 * to demand a capital accepted anything, and the fallback never capitalised.
 *
 * Two sources, in order:
 *
 * 1. A name the description states — "port of Crackdown", "recompilation of
 *    Rush 2" — trusted only when it reads like a title: it starts with a
 *    capital or a digit after any article is dropped, and it is not a generic
 *    phrase ("the Xbox 360 release", "the N64 Classic", "both games").
 * 2. The repository name, cleaned of the port's own vocabulary and cased word
 *    by word, keeping all-caps and mixed-case words as their owners wrote them.
 *
 * Curation still replaces this with the real name. This only decides what the
 * table shows until then.
 */

const LEAD = /^(?:the|both|a|an|its)\s+/i

/**
 * A clause that follows the name and is about the port, not the game:
 * "... for Nintendo 64", "... on the Nintendo 64", "... made using N64:
 * Recompiled". `for` and `on` only cut before a platform, or "Need for
 * Speed" would become "Need"; `using` and `via` always cut.
 */
const PLATFORM =
  '(?:the\\s+)?(?:Nintendo|N64|Xbox|PlayStation|PS[1-5]|PSP|PC|Windows|Linux|Mac|Game ?Boy|GBA|GameCube|Wii|Switch|Sega|Dreamcast|Saturn|Steam)'
const TAIL = new RegExp(
  `\\s+(?:(?:for|on|to)\\s+${PLATFORM}\\b|made (?:using|with)\\b|using\\b|via\\b|into\\b|with\\s+[a-z]|built with\\b|powered by\\b).*$`,
  'i',
)

/** Words that make a phrase a description of the game rather than its name. */
const GENERIC = /\b(game|games|classic|release|version|title|edition of|series)\b/i

/** The port's vocabulary, which is never part of the game's name. */
const PORT_WORDS =
  /^(recomp|recompiled|recompilation|port|pc|decomp|decompiled|decompilation|project|native|unofficial|wip|re)$/i

/** "vs." and "Jr." end no sentence: "Mortal Kombat vs. DC Universe" was cut at the dot. */
const ABBREVIATION = /\b(vs|jr|sr|st|dr|mr|vol)\./gi
const DOT = '․'

function fromDescription(description: string | null | undefined): string | null {
  if (!description) return null
  description = description.replace(ABBREVIATION, `$1${DOT}`)
  const m = description.match(
    /(?:port of|recompilation of|decompilation of|version of|reimplementation of)\s+([^,.;(—\n]{2,70})/i,
  )
  if (!m) return null
  let name = m[1].trim()
  // "the N64 Classic: Rush 2" — when a colon follows a generic phrase, the
  // name is what comes after it.
  const colon = name.split(':')
  if (colon.length > 1 && GENERIC.test(colon[0])) name = colon.slice(1).join(':').trim()
  name = name.replace(LEAD, '').replace(TAIL, '').replaceAll(DOT, '.').trim()
  if (!/^[A-Z0-9]/.test(name)) return null
  if (GENERIC.test(name)) return null
  // Emoji and pictographs are decoration, never part of a title.
  if (/\p{Extended_Pictographic}/u.test(name)) return null
  return name.length >= 2 ? name : null
}

function casing(word: string): string {
  // The first letter is always a capital — "reNut" kept its lower-case start
  // when this deferred to the owner's casing wholesale. Past it, the owner's
  // casing is deliberate and survives: FIFA, N64, GoldenEye, ReXGlue.
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/** "MegaManX4Recomp": the port word glued to the end, the name glued in camel case. */
const GLUED_SUFFIX = /(Recompiled|Recompilation|Recomp|Decompilation|Decomp|Port|PC)$/

export function fromRepoName(name: string): string {
  const words = name
    .replace(GLUED_SUFFIX, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // "Racer6" -> "Racer 6", but "X4" and "DBZ1" stay whole: only a lower-case
    // letter before a number marks a word boundary.
    .replace(/([a-z])([0-9])/g, '$1 $2')
    .replace(/[-_.]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !PORT_WORDS.test(w))
  return words.length ? words.map(casing).join(' ') : casing(name)
}

export function deriveTitle(repoName: string, description?: string | null): string {
  return fromDescription(description) ?? fromRepoName(repoName)
}
