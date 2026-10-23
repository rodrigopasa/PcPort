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
import { PC_PLATFORMS } from './platforms'

export type Candidate = {
  repo: string
  title?: string
  description: string | null
  /**
   * Accepted and deliberately IGNORED. See `isCatalogable`: using it made the
   * ingestion filter and the pruner disagree, and invited keyword stuffing.
   */
  topics?: string[]
  /**
   * What a release file actually named (lib/platforms.ts), as stored in the
   * catalog. Unlike `topics` this is evidence the repository owner cannot
   * simply edit, and unlike the description it is the same field the pruner
   * reads, so ingestion and pruning judge the same thing.
   */
  platforms?: string[]
  version?: string | null
  sizeBytes?: number | null
  stars?: number
}

/**
 * Repositories a person judged and rejected, with the reason.
 *
 * The counterpart of curation: curation says "this is a port of that game",
 * and this says "this is not a port at all". Both are human judgements that
 * no pattern should have to reconstruct.
 *
 * It exists because of the first entry. The description rules below read the
 * repository's own blurb, and that is all the catalog stores — the words that
 * gave this one away ("desktop companion", "Pokedex", "battle assistant")
 * live in its README, which is never fetched. Writing a pattern against text
 * the catalog does not hold would have been a rule that passes its test and
 * catches nothing.
 */
const DENIED: Record<string, string> = {
  'Ashnar2602/X360-Mobile---OFFICIAL':
    'an Xbox 360 emulator for Android, not for the PC: every release asset is ' +
    'an .apk and its README says so in the title. Nothing of that is in the ' +
    'repository description, which is all this catalog stores',
  'aleksandarsimjanoski/pokopia-desktop-edition':
    'not a port: a companion app for an unreleased 2026 game, with thirteen ' +
    'topics stuffed with this catalog\'s keywords, no releases, and its ' +
    'download pointing at a GitHub Pages site instead of a release asset',
}

/** A curated link list. Unambiguous from the repository name alone. */
const AWESOME_REPO = /(^|\/)awesome[-_]/i

const LIST_SIGNAL =
  /\b(awesome[- ]list|curated (list|collection)|collection of (links|resources|games)|list of (games|ports|projects))\b/i

/**
 * Tooling that orbits emulators without being a port: configuration bundles,
 * patch packs, trainers, mod menus. Useful software, wrong catalog.
 *
 * `companion` and the Pokedex words were added for a repository that called
 * itself a desktop companion while carrying thirteen topics stuffed with this
 * catalog's own keywords — pokopia-pc, pokopia-windows, pokopia-update — no
 * releases, and a download badge pointing at a GitHub Pages site rather than
 * a release asset. It is caught on its own description, which is the only
 * signal here that a spam repository cannot simply edit away.
 */
const NOT_A_PORT =
  /\b(cheat table|trainer|mod (suite|menu|manager|loader)|game settings|settings (for|repo)|patches for|save ?editor|texture pack|launcher for|frontend for|wrapper for|companion|pok[eé]dex|battle assistant|trainer management)\b/i

/**
 * General-purpose reverse-engineering tooling, which the `decomp` prefix in
 * PORT_SIGNAL otherwise sweeps in — an Android DEX decompiler is not a console
 * port. The distinction is the noun: "a decompiler" is the tool, while
 * "decompilation of <game>" is the project this catalog is about.
 */
const GENERIC_TOOL =
  /\b(decompiler|disassembler|deobfuscator|decompilation (engine|framework|tool|pipeline)|loader plugin|splitting tool|command.?line tool|automated tool|modding (toolkit|sdk)|a tool for|is a tool|diffing tool|reverse engineering website|controller manager|filesystems?|image extractor|emulator (manager|frontend|launcher|wrapper))\b/i

/**
 * Source ports of games that were already PC games. Doom, Quake, Heretic,
 * Hexen and the Build engine have a large and healthy source-port scene, but
 * this catalog is about console games reaching the PC — a Doom port is not
 * that, however good it is.
 */
const PC_NATIVE_GAME =
  /\b(doom|quake|heretic|hexen|blake stone|duke nukem 3d|build engine|boom\/mbf|wolfenstein 3d|eduke32|build games|ultima underworld)\b/i

/**
 * The catalog is about the PC. A port whose only target is a phone, a watch or
 * another console is real work and the wrong catalog — so it is rejected only
 * when no PC target is mentioned at all, because most ports list Windows
 * alongside macOS and Android.
 *
 * The platform name alone is not enough: it is just as likely to be the
 * platform the project is porting FROM. A bare list of these words rejected
 * `Ultimate-Mortal-Kombat-3-iOS-Decompiled`, a Windows port of the iOS build
 * that even asks the reader to bring their own copy. So a target has to be
 * declared: a preposition before it, or `port`/`build`/`version` after it.
 */
const NON_PC_TARGET =
  /\b(?:(?:for|on|onto|to) (?:ios|ipados|iphone|ipad|an? apple watch|apple watch|android|playstation 5|ps5|nintendo switch|the switch)|(?:ios|ipados|iphone|ipad|android|switch|ps5) (?:port|build|version|release|edition))\b/i
const PC_TARGET = /\b(windows|linux|pc|steam ?deck|win64|x86|desktop|macos)\b/i

/**
 * Native ports are the focus; emulators are long-tail content that earns its
 * own status rather than rejection, so the visitor can tell them apart at a
 * glance and filter them out.
 *
 * Checked as a function rather than a pattern because "no emulator" and
 * "without an emulator" are how the actual ports describe themselves — the
 * exact opposite claim, in nearly the same words.
 */
export function isEmulator(hay: string): boolean {
  const mentions = /\b([a-z0-9]+ emulator|emulator (for|manager|research|project))\b/i.test(hay)
  if (!mentions) return false
  // The article is optional: "no emulator" and "without an emulator" are both
  // how a port denies being one.
  const denies = /\b(no|without|not)\s+(an?\s+)?emulator\b/i.test(hay)
  return !denies
}

/** Hardware and data utilities that orbit the scene without porting anything. */
const UTILITY =
  /\b(controller (emulation|manager)|data recovery|battery status|usb driver|save ?manager|iso (tool|converter))\b/i

/**
 * Evidence the project is a port of a console game to PC.
 *
 * No trailing `\b`: these are prefixes on purpose. A closing boundary made
 * `decompil` unable to match "decompilation", which silently killed every
 * in-progress decomp the filter was meant to keep.
 */
const PORT_SIGNAL =
  /\b(port|recomp|decomp|native|reimplement|runtime|homebrew|for (windows|linux|pc|macos))/i

/**
 * Evidence the game came from a console, which is the whole premise: this
 * catalog is console games reaching the PC.
 *
 * Not a requirement on its own. Measured against the catalog, demanding it
 * would have cut forty entries, among them all six Pokémon decompilations,
 * Tekken 3 and Ultimate Mortal Kombat 3 — real console games whose blurb
 * simply never names the console. It earns its keep as a tiebreaker below.
 */
const CONSOLE_ORIGIN =
  /\b(xbox|x360|xbla|xenon|playstation|ps[1-4]|psx|psp|vita|nintendo 64|n64|gamecube|gcn|wii ?u|wii|switch|nds|3ds|game ?boy|gba|dreamcast|saturn|mega ?drive|genesis|32x|arcade|cps-?[123]|naomi|neo ?geo|console edition)\b/i

/**
 * How a project ports a game that was already a PC game. Doom, Descent, PREY,
 * Ultima Underworld, Catacomb 3D and Dune II all have healthy scenes, and all
 * of them are the wrong catalog — but there is no list of game names long
 * enough to catch them, and the next one ships next week.
 *
 * There is a textual signal instead, and it is theirs alone: a project that
 * calls itself a source port, a remaster or a remake is working from code or
 * assets that already ran on a PC. A console project says recompilation,
 * decompilation or port. So this phrasing with no console named anywhere is a
 * rejection — and naming a console clears it, which is why the rule above is a
 * tiebreaker and not a requirement.
 */
const PC_ERA_PROJECT =
  /\b(source[- ]port|remaster|remake|enhanced port|modernized)\b/i

/**
 * The browser is not the PC. A recompilation to WebAssembly or Three.js is a
 * genuine achievement and produces no executable anyone installs, which is
 * what every page here promises.
 */
const BROWSER_TARGET = /\b(three\.js|in the browser|webassembly|wasm|webgl)\b/i

export type Verdict = { ok: true } | { ok: false; reason: string }

/**
 * `seeded` means a person put this repository on the seed list after looking
 * at it, so the heuristics below do not get a vote: they exist to judge what
 * discovery finds on its own. DENIED still applies, because a removal request
 * outranks everything.
 *
 * The case that made this necessary: Bloodborne's Linux port ships no
 * description at all, so nothing in its text says "port" and the filter
 * refused it; and its Windows build lives in a fork, which ingestion refuses
 * on sight. Both are real, distinct ports with releases — one AppImage, one
 * Windows zip — and the most searched game in this catalog had neither.
 *
 * The game-data guard is not here and is never skipped, seeded or not.
 */
export function isCatalogable(c: Candidate, opts: { seeded?: boolean } = {}): Verdict {

  // The repository name counts as evidence: `gow2-recomp` says what it is even
  // when the description is just the game's name.
  //
  // Topics are NOT in here, and that is the point. Two reasons, both paid for:
  //
  // Ingestion passes the repository's topics; the pruner reads lib/catalog.json,
  // which does not store them. So the two judged different text and disagreed:
  // nine entries removed by hand came straight back on the next hourly run,
  // every one of them carrying the topic `decompilation`, which PORT_SIGNAL
  // matches on its `decomp` prefix. A decompiler tool is not a game port, and
  // no pruning decision could ever stick while this held.
  //
  // And topics are a free-text field the repository owner edits. The spam
  // entry in DENIED above carried thirteen of them stuffed with this catalog's
  // own keywords. Evidence that the subject writes for us is not evidence.
  const hay = `${c.repo} ${c.title ?? ''} ${c.description ?? ''}`

  const denied = DENIED[c.repo]
  if (denied) {
    return { ok: false, reason: denied }
  }
  if (opts.seeded) return { ok: true }
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
  if (PC_ERA_PROJECT.test(hay) && !CONSOLE_ORIGIN.test(hay)) {
    return { ok: false, reason: 'source port or remaster of a game that was already on PC' }
  }
  if (BROWSER_TARGET.test(hay) && !PC_TARGET.test(hay)) {
    return { ok: false, reason: 'targets the browser rather than the PC' }
  }
  if (NON_PC_TARGET.test(hay) && !PC_TARGET.test(hay)) {
    return { ok: false, reason: 'targets a phone, watch or console rather than the PC' }
  }

  // The same judgement made on binaries instead of prose. A release that ships
  // only .apk or .ipa files has no PC build at all, whatever the blurb says —
  // which is exactly how X360-Mobile in DENIED above got in, back when
  // detectPlatforms answered Windows for it.
  //
  // Measured over all 123 entries with the honest platforms, judging every one
  // of them and ignoring the curated guard that normally protects them: this
  // rule alone rejects NOTHING. Fourteen entries do publish an .apk or an
  // .ipa, and every one of them publishes a desktop build next to it. It costs
  // nothing today and stands where the only evidence is binaries, which is
  // the case prose could not reach.
  //
  // `PC` counts as a PC platform: four releases name their desktop build no
  // more precisely than that, and reading it as non-PC would reject them.
  if (c.platforms?.length && !c.platforms.some((p) => PC_PLATFORMS.includes(p))) {
    return {
      ok: false,
      reason: `every build in the release is for ${c.platforms.join(', ')}, not the PC`,
    }
  }
  if (UTILITY.test(hay)) {
    return { ok: false, reason: 'hardware or data utility, not a port' }
  }

  // The description has to identify this as a port. An earlier version let a
  // published release stand in for that evidence, and a Spring Boot JAR
  // encryption tool with 1800 stars walked straight in — a release proves
  // something ships, never that it is a console game on the PC.
  if (!PORT_SIGNAL.test(hay) && !isEmulator(hay)) {
    return { ok: false, reason: 'nothing identifies it as a port or an emulator' }
  }

  return { ok: true }
}
