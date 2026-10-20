/**
 * Decides whether a discovered repository belongs in the catalog.
 *
 * Topic search returns far more than ports: awesome-lists, emulator settings
 * repos, mod suites, cheat tables. Those become pages titled "awesome games no
 * PC" with nothing on them, and thin pages do not merely fail to rank — enough
 * of them drag the whole domain. A smaller true catalog beats a large padded one.
 *
 * Deliberately not a keyword match on the description. Real ports describe
 * themselves in many ways ("Snowboard Kids 2 for PC", "Play The Return of the
 * King on a modern PC") and a naive filter rejected those while accepting
 * awesome-lists whose blurb happened to mention porting.
 */

export type Candidate = {
  repo: string
  title?: string
  description: string | null
  topics?: string[]
  version?: string | null
  sizeBytes?: number | null
  stars?: number
}

/** A curated link list. Unambiguous from the repository name alone. */
const AWESOME_REPO = /(^|\/)awesome[-_]/i

const LIST_SIGNAL =
  /\b(awesome[- ]list|curated (list|collection)|collection of (links|resources|games)|list of (games|ports|projects))\b/i

/**
 * Tooling that orbits emulators without being a port: configuration bundles,
 * patch packs, trainers, mod menus. Useful software, wrong catalog.
 */
const NOT_A_PORT =
  /\b(cheat table|trainer|mod (suite|menu|manager|loader)|game settings|settings (for|repo)|patches for|save ?editor|texture pack|launcher for|frontend for|wrapper for)\b/i

/**
 * General-purpose reverse-engineering tooling, which the `decomp` prefix in
 * PORT_SIGNAL otherwise sweeps in — an Android DEX decompiler is not a console
 * port. The distinction is the noun: "a decompiler" is the tool, while
 * "decompilation of <game>" is the project this catalog is about.
 */
const GENERIC_TOOL =
  /\b(decompiler|disassembler|deobfuscator|decompilation (engine|framework|tool)|loader plugin|splitting tool|command.?line tool|automated tool|modding (toolkit|sdk)|a tool for|reverse engineering website|controller manager|filesystem|image extractor)\b/i

/**
 * Source ports of games that were already PC games. Doom, Quake, Heretic,
 * Hexen and the Build engine have a large and healthy source-port scene, but
 * this catalog is about console games reaching the PC — a Doom port is not
 * that, however good it is.
 */
const PC_NATIVE_GAME =
  /\b(doom|quake|heretic|hexen|blake stone|duke nukem 3d|build engine|boom\/mbf|wolfenstein 3d)\b/i

/**
 * The catalog is about the PC. A port whose only target is a phone, a watch or
 * another console is real work and the wrong catalog — so it is rejected only
 * when no PC target is mentioned at all, because most ports list Windows
 * alongside macOS and Android.
 */
const NON_PC_TARGET = /\b(ios|ipados|android|apple watch|playstation 5|ps5|nintendo switch port)\b/i
const PC_TARGET = /\b(windows|linux|pc|steam ?deck|win64|x86|desktop)\b/i

/**
 * Evidence the project is a port of a console game to PC.
 *
 * No trailing `\b`: these are prefixes on purpose. A closing boundary made
 * `decompil` unable to match "decompilation", which silently killed every
 * in-progress decomp the filter was meant to keep.
 */
const PORT_SIGNAL =
  /\b(port|recomp|decomp|native|reimplement|runtime|homebrew|for (windows|linux|pc|macos))/i

export type Verdict = { ok: true } | { ok: false; reason: string }

export function isCatalogable(c: Candidate): Verdict {
  const hay = `${c.title ?? ''} ${c.description ?? ''} ${(c.topics ?? []).join(' ')}`

  if (AWESOME_REPO.test(c.repo)) {
    return { ok: false, reason: `awesome-list repository: ${c.repo}` }
  }
  if (LIST_SIGNAL.test(hay)) {
    return { ok: false, reason: 'describes itself as a curated list' }
  }
  if (NOT_A_PORT.test(hay)) {
    return { ok: false, reason: 'emulator tooling rather than a port' }
  }
  if (GENERIC_TOOL.test(hay)) {
    return { ok: false, reason: 'general reverse-engineering tool, not a game port' }
  }
  if (PC_NATIVE_GAME.test(hay)) {
    return { ok: false, reason: 'source port of a game that was already a PC game' }
  }
  if (NON_PC_TARGET.test(hay) && !PC_TARGET.test(hay)) {
    return { ok: false, reason: 'targets a phone, watch or console rather than the PC' }
  }

  // A published release with a real asset is the strongest evidence that
  // something runs, and it outweighs whatever the description happens to say.
  const hasBuild = Boolean(c.version && c.sizeBytes)
  if (hasBuild) return { ok: true }

  // Without a build, the description has to carry it. These are the
  // in-progress decompilations worth listing; everything else waits until it
  // ships something.
  if (PORT_SIGNAL.test(hay)) return { ok: true }

  return { ok: false, reason: 'no release asset and nothing identifying it as a port' }
}
