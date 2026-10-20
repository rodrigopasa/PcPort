/**
 * The product's hard constraint, enforced in code rather than in review.
 *
 * PCPort catalogs the port project and never the game data. A release whose
 * assets are game content is rejected at ingestion, so no later feature, prompt
 * or hurried edit can quietly let one through.
 */

/**
 * `.bin` is deliberately absent: it is the generic extension for any compiled
 * artifact, and banning it rejected OpenGOAL's language server. A disc image
 * that ships as `.bin` is caught by the `.cue` beside it, by its size, or by
 * its name.
 */
const BANNED_EXT =
  /\.(pkg|iso|cue|nsp|xci|wbfs|gcm|rvz|cso|chd|wud|wux|rpx|z64|n64|v64|sfc|smc|gba|nds|3ds|cia|rom|gcz|nkit)$/i

/** Lockers used to pass game dumps around. A release asset never needs these. */
const BANNED_HOST =
  /(drive\.google|mega\.nz|mediafire|1fichier|pixeldrain|gofile|anonfiles|krakenfiles|buzzheavier)/i

/** Phrases that mark an archive as the game rather than the port. */
const BANNED_NAME =
  /(complete[._ -]?edition|CUSA\d{5}|BLUS\d{5}|BLES\d{5}|SLUS[._ -]?\d|full[._ -]?game|game[._ -]?dump|\bROM[._ -]?set\b|disc\d)/i

/** Above this, a "port" asset is almost certainly carrying game content. */
const MAX_ASSET_BYTES = 2_000_000_000

export type Asset = { name: string; size?: number | null; url?: string | null }

export type GuardVerdict = { ok: true } | { ok: false; reason: string }

export function checkAsset(asset: Asset): GuardVerdict {
  if (BANNED_EXT.test(asset.name)) {
    return { ok: false, reason: `asset extension looks like game data: ${asset.name}` }
  }
  if (BANNED_NAME.test(asset.name)) {
    return { ok: false, reason: `asset name looks like a game dump: ${asset.name}` }
  }
  if (asset.url && BANNED_HOST.test(asset.url)) {
    return { ok: false, reason: `asset hosted on a file locker: ${asset.url}` }
  }
  if (asset.size != null && asset.size > MAX_ASSET_BYTES) {
    return { ok: false, reason: `asset is ${Math.round(asset.size / 1e9)} GB — too large for a port` }
  }
  return { ok: true }
}

/**
 * A release is admissible when at least one asset is a real port build and none
 * of them is game data. One bad asset rejects the whole release: a project that
 * bundles a dump is not a project this catalog carries.
 */
export function checkRelease(assets: Asset[]): GuardVerdict {
  for (const a of assets) {
    const verdict = checkAsset(a)
    if (!verdict.ok) return verdict
  }
  return { ok: true }
}

export function checkLink(url: string): GuardVerdict {
  if (BANNED_HOST.test(url)) return { ok: false, reason: `file locker link: ${url}` }
  if (BANNED_EXT.test(url)) return { ok: false, reason: `link points at game data: ${url}` }
  return { ok: true }
}
