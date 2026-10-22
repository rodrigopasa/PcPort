/**
 * Box art from the libretro thumbnails archive. No credentials.
 *
 *   npx tsx scripts/libretro.ts [--force]
 *
 * Why this exists: every one of the 94 covers the Fandom script had collected
 * was looked at, one by one, and about a third were wrong. Ten were the wrong
 * game outright — Modern Warfare II (2022) standing in for Modern Warfare 2
 * (2009), Gran Turismo for Driveclub, Ghost of Sparta for God of War, Let's Go
 * Pikachu for Let's Go Eevee. Twenty-one were not covers at all: two film
 * posters, a strategy guide, an Australian classification certificate, a page
 * of a manga, an arcade loyalty card, logos, and plain screenshots.
 *
 * None of that was visible to the checks in scripts/fandom.ts, which ranked
 * candidates by file name and aspect ratio. A wiki page holds everything about
 * a game and the lead image is as often a screenshot as the box; this archive
 * holds one thing per game, and that thing is a scan of the box.
 *
 * Aspect ratio is deliberately NOT used here. Judging covers by shape is what
 * produced the earlier wrong conclusions in both directions: a Nintendo 64 or
 * DS box IS wider than it is tall, so the correct scans were being thrown away
 * as "landscape", while a square character photo sailed through.
 *
 * Matching is exact and nothing else. A missing cover costs a page one image;
 * a wrong one tells the reader we do not know what game this is. `FIFA Street`
 * must not match `FIFA Street 2`, and `God of War` must not match
 * `God of War - Ghost of Sparta`, so no fuzzy fallback is offered at all.
 *
 * Writes lib/libretro.json.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { imageSize } from '../lib/imagesize'
import { GAMES } from '../lib/games'

const CDN = 'https://thumbnails.libretro.com'

/**
 * The catalog's console names mapped to the archive's system directories.
 *
 * Absent on purpose: Xbox 360, PlayStation 3, PlayStation 4 and Switch. The
 * archive preserves what emulators play, so it stops before that generation —
 * which is 36 of our games, and they keep whatever cover they already have.
 * Arcade is absent too: MAME file names are short ROM ids like `sfa3`, and
 * matching a game title against those invites exactly the wrong-game error
 * this script exists to end.
 */
const SYSTEM: Record<string, string> = {
  PlayStation: 'Sony - PlayStation',
  'PlayStation 2': 'Sony - PlayStation 2',
  PSP: 'Sony - PlayStation Portable',
  'Nintendo 64': 'Nintendo - Nintendo 64',
  GameCube: 'Nintendo - GameCube',
  'Game Boy Advance': 'Nintendo - Game Boy Advance',
  'Nintendo DS': 'Nintendo - Nintendo DS',
  'Sega 32X': 'Sega - 32X',
  Dreamcast: 'Sega - Dreamcast',
  Xbox: 'Microsoft - Xbox',
  'Wii U': 'Nintendo - Wii U',
  PC: 'DOS',
}

/**
 * The console to search, where the catalog's is the console the PORT targets
 * rather than the one the game first shipped on.
 *
 * GoldenEye 007 is the clearest case: the catalog says Xbox 360 because the
 * port is built from the XBLA remaster, so the archive was searched for a
 * 360 game and found nothing — while Fandom filled the gap with a photograph
 * of a Tiger Electronics LCD handheld. The game is a Nintendo 64 game and its
 * box is right there.
 *
 * Breath of the Wild is a deliberate compromise: the catalog says Switch, the
 * archive stops at the Wii U, and the Wii U box of the same game carries the
 * same artwork. The alternative was the cover of a strategy guide, which is
 * what was being shown.
 */
const COVER_CONSOLE: Record<string, string> = {
  'goldeneye-007': 'Nintendo 64',
  'fifa-street': 'PlayStation 2',
  'virtua-fighter': 'Sega 32X',
  'breath-of-the-wild': 'Wii U',
}


/**
 * The archive's own name for a game, where it differs from the catalog's.
 *
 * Every one of these was read out of the archive's directory listing, never
 * guessed — the same discipline the repository paths in scripts/curate.ts get,
 * and for the same reason: a plausible-looking name that does not exist costs
 * a cover, and a plausible-looking name that exists for a DIFFERENT game costs
 * the reader's trust.
 *
 * They are all one of three shapes: a subtitle the catalog drops (Jak and
 * Daxter), a publisher prefix it drops (Tom Clancy's), or the word `Version`,
 * which every Pokemon release carries in its box name and nobody says aloud.
 */
const ALIAS: Record<string, string> = {
  'jak-and-daxter': 'Jak and Daxter - The Precursor Legacy',
  'crash-team-racing': 'CTR - Crash Team Racing',
  'splinter-cell-double-agent': "Tom Clancy's - Splinter Cell - Double Agent",
  'pokemon-ruby': 'Pokemon - Ruby Version',
  'pokemon-firered': 'Pokemon - FireRed Version',
  'pokemon-emerald': 'Pokemon - Emerald Version',
  'pokemon-diamond': 'Pokemon - Diamond Version',
  'pokemon-platinum': 'Pokemon - Platinum Version',
  'pokemon-heartgold': 'Pokemon - HeartGold Version',
}

/** Builds and demos are not the retail box. */
const NOT_RETAIL = /\((beta|demo|proto|sample|program|kiosk|debug)\b/i

type Entry = { file: string; name: string; rank: number }

/**
 * The key both sides are compared on.
 *
 * Region and revision tags go first, then accents and punctuation. The last
 * step is the one that matters: the archive follows the No-Intro convention
 * of trailing articles — `Legend of Zelda, The - Ocarina of Time` — so the
 * articles are dropped from both sides rather than moved, which makes the
 * ordering irrelevant.
 */
function key(s: string): string {
  return s
    .replace(/\([^)]*\)|\[[^\]]*\]/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .split(/[^a-z0-9]+/)
    .filter((w) => w && w !== 'the' && w !== 'a' && w !== 'an')
    .join('')
}

/** USA first, then the widest releases, so a cover is the one most people saw. */
function regionRank(file: string): number {
  if (/\(USA/i.test(file)) return 0
  if (/\(World/i.test(file)) return 1
  if (/\(Europe/i.test(file)) return 2
  if (/\(Japan/i.test(file)) return 3
  return 4
}

const listings = new Map<string, Map<string, Entry>>()

/** The CDN serves an autoindex, which is the only file listing available. */
async function listing(system: string): Promise<Map<string, Entry>> {
  const hit = listings.get(system)
  if (hit) return hit

  const url = `${CDN}/${encodeURIComponent(system)}/Named_Boxarts/`
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) })
  const html = await res.text()

  const out = new Map<string, Entry>()
  for (const m of html.matchAll(/href="([^"]+\.png)"/g)) {
    const file = decodeURIComponent(m[1])
    if (NOT_RETAIL.test(file)) continue
    const name = file.replace(/\.png$/i, '')
    const k = key(name)
    const entry = { file, name, rank: regionRank(file) }
    const prev = out.get(k)
    if (!prev || entry.rank < prev.rank) out.set(k, entry)
  }
  listings.set(system, out)
  console.log(`   ${system}: ${out.size} titulos`)
  return out
}

type Shot = { url: string; w: number; h: number; source: string; matched: string }

async function measure(url: string, matched: string): Promise<Shot | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(40_000) })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dim = imageSize(buf)
    if (!dim || buf.length < 8_000) return null
    return { url, w: dim.w, h: dim.h, source: 'libretro-thumbnails', matched }
  } catch {
    return null
  }
}

/** Which console each game came from, read off the catalog. */
async function consoles(): Promise<Map<string, string>> {
  const rows = JSON.parse(await readFile('lib/catalog.json', 'utf8')) as {
    game: string | null
    console: string
  }[]
  const out = new Map<string, string>()
  for (const r of rows) if (r.game && !out.has(r.game)) out.set(r.game, r.console)
  return out
}

/** The game's real name, which is what the archive files are named after. */
async function titles(): Promise<Map<string, string>> {
  const rows = JSON.parse(await readFile('lib/catalog.json', 'utf8')) as {
    game: string | null
    title: string
  }[]
  const out = new Map<string, string>()
  for (const r of rows) if (r.game && !out.has(r.game)) out.set(r.game, r.title)
  return out
}

async function main() {
  const force = process.argv.includes('--force')
  const existing: Record<string, Shot> = await readFile('lib/libretro.json', 'utf8')
    .then((r) => JSON.parse(r))
    .catch(() => ({}))

  const byConsole = await consoles()
  const byTitle = await titles()

  let found = 0
  let missed = 0
  const misses: string[] = []

  for (const gameKey of Object.keys(GAMES)) {
    if (existing[gameKey] && !force) continue
    const console_ = COVER_CONSOLE[gameKey] ?? byConsole.get(gameKey)
    const system = console_ ? SYSTEM[console_] : undefined
    if (!system) continue

    const title = ALIAS[gameKey] ?? byTitle.get(gameKey) ?? gameKey.replace(/-/g, ' ')
    const index = await listing(system)
    const hit = index.get(key(title))

    if (!hit) {
      missed++
      misses.push(`${gameKey} (${console_}) "${title}"`)
      continue
    }

    const url = `${CDN}/${encodeURIComponent(system)}/Named_Boxarts/${encodeURIComponent(hit.file)}`
    const shot = await measure(url, hit.name)
    if (!shot) {
      missed++
      misses.push(`${gameKey} — achou "${hit.name}" mas a imagem falhou`)
      continue
    }
    existing[gameKey] = shot
    found++
    console.log(`✓  ${gameKey.padEnd(28)} ${shot.w}x${shot.h}  ${hit.name}`)
  }

  await writeFile('lib/libretro.json', `${JSON.stringify(existing, null, 2)}\n`)
  console.log(`\n+${found} encontradas · ${missed} sem correspondencia exata`)
  if (misses.length) {
    console.log('\n--- sem correspondencia (ficam com a capa atual) ---')
    misses.forEach((m) => console.log(`  ${m}`))
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
