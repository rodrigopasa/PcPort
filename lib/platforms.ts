/**
 * What a release's own files say the project runs on.
 *
 * This lived in scripts/build-catalog.ts and ended in `: ['Windows']`: it read
 * the asset names, found nothing, and wrote Windows anyway. That is a claim
 * with no evidence behind it, and it had already misled — the repository
 * Ashnar2602/X360-Mobile---OFFICIAL publishes nothing but `.apk` files and is
 * an Xbox 360 emulator for Android, and the catalog recorded "Windows". It
 * ended up stopped by hand in the DENIED list in lib/quality.ts; with an
 * honest platform the filter has evidence of its own to decide on.
 *
 * So a platform is reported only when a file in the release carries it in its
 * name. Two cases used to collapse into the same answer and are now distinct:
 *
 *   - no release at all: nothing was there to read, so nothing is claimed
 *   - a release whose file names name no platform: read and inconclusive
 *   - a release whose files name only phones: reported as such, not as Windows
 *
 * The repository description is deliberately not read here. A blurb saying
 * "for Windows" is the project's intention, not a build anyone can download,
 * and this field is what the install steps and the schema.org
 * `operatingSystem` are composed from. A `.zip` with no platform in its name
 * is not evidence either, which is what made the old fallback look harmless.
 */

export type ReleaseAsset = { name: string }

/** The platforms this catalog exists for. */
export const PC_PLATFORMS: readonly string[] = ['PC', 'Windows', 'Linux', 'macOS']

/** Printed in this order whatever order the assets arrive in. */
const ORDER = ['Windows', 'Linux', 'macOS', 'PC', 'Android', 'iOS']

/**
 * Read off one file name at a time. Extensions first, because they are the
 * part a publisher cannot be loose about: `.apk` is Android and nothing else.
 * The word rules are bounded on both sides — an unbounded `win` matched
 * "Darwin", and `mac` matches "Mac" in `Pac-Man` without the boundary.
 *
 * A `.tar.gz` is not in here. It reads as Linux and is just as often how a
 * macOS build is packed (`port-darwin-arm64.tar.gz`); a Linux release that
 * means it says so in the name, which the word rule below catches.
 */
const RULES: [RegExp, string][] = [
  [/\.apk$/i, 'Android'],
  [/\.(ipa|tipa)$/i, 'iOS'],
  [/\.(exe|msi|appx)$/i, 'Windows'],
  [/(^|[^a-z])(win|win32|win64|windows|mingw|msvc)([^a-z]|$)/i, 'Windows'],
  [/\.(appimage|deb|rpm|flatpak)$/i, 'Linux'],
  [/(^|[^a-z])(linux|ubuntu|debian|fedora|steamdeck|steamos)([^a-z]|$)/i, 'Linux'],
  [/\.dmg$/i, 'macOS'],
  [/(^|[^a-z])(mac|macos|osx|darwin)([^a-z]|$)/i, 'macOS'],
  // A file called `SvR2011-PC-v2.1.4.1.zip` says it is for the PC and stops
  // there, which is less than Windows and much more than nothing: without it
  // that release reads as Android-only, and the rule in lib/quality.ts would
  // throw out a port that does ship a desktop build. Dropped below when a
  // concrete desktop OS is named in the same release.
  [/(^|[^a-z])(pc|desktop)([^a-z]|$)/i, 'PC'],
]

export type PlatformReading = {
  /** Platforms a release file actually names, in a stable order. */
  platforms: string[]
  /** Whether there was a release to read at all. */
  judged: boolean
  /**
   * The release names platforms and none of them is a PC one — a port whose
   * only shipped build is for a phone. Distinct from an empty `platforms`,
   * which says only that nothing could be read.
   */
  nonPcOnly: boolean
}

export function readPlatforms(assets: ReleaseAsset[] | null | undefined): PlatformReading {
  if (!assets) return { platforms: [], judged: false, nonPcOnly: false }

  const found = new Set<string>()
  for (const asset of assets) {
    for (const [re, platform] of RULES) {
      if (re.test(asset.name)) found.add(platform)
    }
  }

  // `PC` is the vaguest desktop answer there is, so it only speaks when no
  // file named a desktop OS outright.
  if (found.has('Windows') || found.has('Linux') || found.has('macOS')) found.delete('PC')

  const platforms = ORDER.filter((p) => found.has(p))
  return {
    platforms,
    judged: true,
    nonPcOnly: platforms.length > 0 && !platforms.some((p) => PC_PLATFORMS.includes(p)),
  }
}

/** The catalog field: what the release's files name, or nothing. */
export function detectPlatforms(assets: ReleaseAsset[] | null | undefined): string[] {
  return readPlatforms(assets).platforms
}
