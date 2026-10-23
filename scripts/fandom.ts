/**
 * Cover art from Fandom's open MediaWiki API. No credentials.
 *
 *   npx tsx scripts/fandom.ts [--force]
 *
 * This is the LOWEST-priority art source and a stopgap, not the destination.
 * The images are publisher box art uploaded by fans under Fandom's own fair-use
 * claims, and hotlinking static.wikia.nocookie.net is against Fandom's terms —
 * they can block it whenever they like. IGDB serves the same art licensed for
 * exactly this, so lib/covers.json wins over lib/fandom.json everywhere.
 *
 * Page titles are SEARCHED, never guessed. An earlier version guessed them and
 * missed fourteen games: the Wipeout wiki calls its page "Wipeout (video game)"
 * and the guess was "Wipeout (game)". Each game lists candidate wikis and falls
 * back to the general gaming wiki, so a wrong slug costs a fallback rather than
 * the cover.
 *
 * Writes lib/fandom.json.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { imageSize } from '../lib/imagesize'
import { GAMES } from '../lib/games'

/** Candidate wikis per game. `gaming` is the general one and catches the rest. */
const WIKI: Record<string, string[]> = {
  'halo-2': ['halo'],
  'halo-ce': ['halo'],
  'ninja-gaiden-black': ['ninjagaiden'],
  'sonic-unleashed': ['sonic'],
  'sonic-adventure': ['sonic'],
  'sonic-advance': ['sonic'],
  'knuckles-chaotix': ['sonic'],
  'majoras-mask': ['zelda'],
  'ocarina-of-time': ['zelda'],
  'banjo-tooie': ['banjokazooie'],
  'kh-days': ['kingdomhearts'],
  'splinter-cell-double-agent': ['splintercell'],
  bloodborne: ['bloodborne', 'soulsborne'],
  doaxbv: ['deadoralive'],
  ffta: ['finalfantasy'],
  'dragons-crown': ['dragonscrown', 'vanillaware'],
  'dead-rising-2-case-zero': ['deadrising'],
  'dead-rising-2-case-west': ['deadrising'],
  'lotr-return-of-the-king': ['lotr'],
  'god-of-war': ['godofwar'],
  'god-of-war-2': ['godofwar'],
  'def-jam-ffny': ['defjam'],
  'super-mario-64': ['mario'],
  'jak-and-daxter': ['jakanddaxter'],
  'goldeneye-007': ['jamesbond', 'goldeneye'],
  'pokemon-snap': ['pokemon'],
  'pokemon-lets-go-eevee': ['pokemon'],
  'ssx-tricky': ['ssx'],
  'the-darkness': ['thedarkness'],
  'spider-man-edge-of-time': ['spiderman'],
  'wwe-svr-2011': ['prowrestling'],
  'deadly-premonition': ['deadlypremonition'],
  'condemned-2': ['condemned'],
  'red-alert': ['cnc'],
  'colin-mcrae-rally-2': ['codemasters', 'dirt'],
  'driver-2': ['driver'],
  'castlevania-sotn': ['castlevania'],
  wipeout: ['wipeout'],
  'forza-horizon': ['forzamotorsport', 'forza'],
  'forza-motorsport-4': ['forzamotorsport', 'forza'],
  'silent-hill': ['silenthill'],
  'silent-hill-downpour': ['silenthill'],
  'infamous-second-son': ['infamous', 'infamousseries'],
  black: ['blackgame', 'criterion'],
  'metroid-prime': ['metroid'],
  'oddworld-abes-exoddus': ['oddworld'],
  ico: ['teamico'],
  'the-last-guardian': ['teamico'],
  'mystical-ninja-goemon': ['goemon'],
  'fifa-street': ['fifa'],
  'nfs-most-wanted': ['nfs'],
  driveclub: ['driveclub', 'gran-turismo'],
  pikmin: ['pikmin'],
  'pikmin-2': ['pikmin'],
  'resident-evil-4': ['residentevil'],
  'smash-ultimate': ['supersmashbros'],
  'virtua-fighter': ['virtuafighter'],
  'virtua-fighter-2': ['virtuafighter'],
  'cod-mw2': ['callofduty'],
  'army-of-two': ['armyoftwo'],
  'gravity-rush-2': ['gravityrush'],
  'yugioh-forbidden-memories': ['yugioh'],
  'snowboard-kids-2': ['snowboardkids'],
  'conkers-bad-fur-day': ['conker'],
  'initial-d-arcade-stage-3': ['initiald'],
  'celeste-64': ['celeste'],
  taisei: ['touhou'],
  'breath-of-the-wild': ['zelda'],
  'wipeout-omega-collection': ['wipeout'],
  'cnc-tiberian-dawn': ['cnc'],
  'cnc-red-alert-2': ['cnc'],
  'paper-mario': ['mario', 'papermario'],
  'crash-team-racing': ['crashbandicoot'],
  'minecraft-lce': ['minecraft'],
  'pokemon-ruby': ['pokemon'],
  'pokemon-firered': ['pokemon'],
  'pokemon-emerald': ['pokemon'],
  'pokemon-diamond': ['pokemon'],
  'pokemon-platinum': ['pokemon'],
  'pokemon-heartgold': ['pokemon'],
  'eternal-darkness': ['eternaldarkness'],
  killzone: ['killzone'],
  'sonic-free-riders': ['sonic'],
  'skate-2': ['skate'],
  doa3: ['deadoralive'],
  'tekken-3': ['tekken'],
  'asuras-wrath': ['asuraswrath'],
  'geometry-wars-2': ['geometrywars'],
  'armored-core-fa': ['armoredcore'],
  'gears-of-war-2': ['gearsofwar'],
  'star-wars-rots': ['starwars'],
  'dbz-burst-limit': ['dragonball'],
  'bloody-roar-2': ['bloodyroar'],
  'tony-hawk-project-8': ['tonyhawkgames', 'tonyhawk'],
  'wwe-all-stars': ['prowrestling'],
  'hard-corps-uprising': ['contra'],
  'uncharted-collection': ['uncharted'],
  pt: ['silenthill'],
  'sotc-ps4': ['teamico'],
  'skate-3': ['skate'],
  'lost-odyssey': ['lostodyssey'],
  'sonic-06': ['sonic'],
  'dantes-inferno': ['dantesinferno'],
  'ace-combat-6': ['acecombat'],
  'simpsons-game': ['simpsons'],
  'tekken-6': ['tekken'],
  'links-awakening': ['zelda'],
  'bayonetta-2': ['bayonetta'],
}

/**
 * There is no general-wiki fallback any more, and the reason is in the
 * numbers. Seven covers came from gaming.fandom.com and they were looked at:
 * two were a different game (Ultimate Ninja Storm 2 for Storm Generations,
 * Monster Hunter Wilds for Portable 3rd), one was an Australian classification
 * certificate, two were screenshots, and the two that were right are covered
 * by the libretro archive anyway.
 *
 * A search across a wiki about games in general returns whatever is loosely
 * related, and nothing downstream can tell that apart from the real thing.
 * A game whose own wiki has no cover now gets none.
 */

/**
 * Games this script must not fill, because it was caught filling them wrong.
 *
 * Every cover in the catalog was looked at, one by one. These four were a
 * DIFFERENT GAME, which no automated check here can detect: the file name and
 * the shape were both plausible. They are console generations the libretro
 * archive does not reach, so there is no keyless replacement — and a page with
 * no cover is honest, while a page showing another game is not.
 *
 * IGDB covers all four. The day a key exists, lib/covers.json outranks this
 * file anyway and the list stops mattering.
 */
const REJECTED: Record<string, string> = {
  'naruto-storm-generations':
    'Fandom served the box of Ultimate Ninja Storm 2, a different game in the series',
  'monster-hunter-portable-3rd':
    'Fandom served Monster Hunter Wilds (PS5); the libretro archive has the real PSP box',
  'geometry-wars-2': 'a gameplay screenshot of the first Retro Evolved, not this game',
  'snowboard-kids-2': 'an Australian classification certificate, not a cover',
  'cod-mw2':
    'Fandom served the box of Modern Warfare II (2022); this entry is Modern Warfare 2 (2009)',
  'dragons-crown':
    'Fandom served Dungeons & Dragons Tactics (PSP), a different game entirely',
  'driveclub':
    'Fandom served Gran Turismo (PSP), a different game entirely',
  'pokemon-lets-go-eevee':
    "Fandom served the box of Let's Go, Pikachu!, the other version",
}

type Shot = { url: string; w: number; h: number; source: string }

const IMAGE_FILE = /\.(png|jpe?g|webp)(\/|$|\?)/i
/**
 * Ranks a wiki's image file names by how likely each one is the box art.
 *
 * A boolean "prefers" test was not enough. It treated `Bloodborne_concept_art`
 * and `Bloodborne_cover` as equally good, and the concept art sorted first, so
 * the measured candidates ran out before the real cover was reached.
 */
const STRONG = /box ?art|cover|packshot|front|packaging|caratula/i
const WEAK = /art(work)?\b/i
const WRONG = /screen ?shot|gameplay|concept|logo|banner|wallpaper|promo|icon|render|character ?photo/i

function preference(name: string): number {
  let n = 0
  if (STRONG.test(name)) n += 3
  if (WEAK.test(name)) n += 1
  if (WRONG.test(name)) n -= 2
  return n
}

async function api<T>(wiki: string, params: Record<string, string>): Promise<T | null> {
  const qs = new URLSearchParams({ action: 'query', format: 'json', ...params })
  try {
    const res = await fetch(`https://${wiki}.fandom.com/api.php?${qs}`, {
      headers: { 'user-agent': 'pcport/1.0 (catalog of open-source PC ports)' },
      signal: AbortSignal.timeout(20_000),
    })
    if (!res.ok) return null
    const text = await res.text()
    if (!text.startsWith('{')) return null // a Cloudflare challenge page
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

async function measure(url: string, source: string): Promise<Shot | null> {
  try {
    // The CDN answers 403 to a request with no Referer.
    const res = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0', referer: 'https://pcport.org/' },
      signal: AbortSignal.timeout(25_000),
    })
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dim = imageSize(buf)
    // Box art is not tiny, and a sub-20KB file is an icon or a video still.
    if (!dim || dim.w < 200 || buf.length < 20_000) return null
    return { url, w: dim.w, h: dim.h, source }
  } catch {
    return null
  }
}

type Search = { query?: { search?: { title: string }[] } }
type PageImages = { query?: { pages?: Record<string, { original?: { source: string } }> } }
type PageFiles = { query?: { pages?: Record<string, { images?: { title: string }[] }> } }
type FileInfo = { query?: { pages?: Record<string, { imageinfo?: { url: string }[] }> } }

/** Ask the wiki which page this is instead of guessing its exact title. */
async function findPages(wiki: string, name: string): Promise<string[]> {
  const res = await api<Search>(wiki, { list: 'search', srsearch: name, srlimit: '4' })
  return (res?.query?.search ?? []).map((s) => s.title)
}

/**
 * Box art is square or taller. A wiki's lead image is just as often a
 * screenshot, and a 16:9 screenshot dropped into a cover slot is what made the
 * Minecraft and Armored Core pages look broken — so a landscape lead is held
 * as a fallback while the file list is searched for something cover-shaped.
 *
 * 0.95 rather than 1: plenty of real box art is a hair wider than it is tall.
 */
const isCoverShaped = (s: Shot) => s.h >= s.w * 0.95

/**
 * Picks a page's best cover candidate.
 *
 * Two signals: the shape of the image and what the file is called. Shape
 * dominates and the name breaks ties — `name + (cover-shaped ? 10 : 0)`.
 *
 * That order was measured, not assumed. Ranking the name first instead took
 * the catalog from eight landscape covers to seventeen: a file called `cover`
 * is often a wide scan of the front and back together, or a store banner,
 * while an unnamed portrait image on a game's wiki page is almost always the
 * box. The name still earns its keep at equal shape, and still rules out a
 * screenshot or a character photo whichever shape it is.
 *
 * The lead image scores 0: a wiki's lead is as often a screenshot as box art.
 */
async function coverFromPage(wiki: string, title: string): Promise<Shot | null> {
  const found: { shot: Shot; rank: number }[] = []
  const add = (shot: Shot, score: number) =>
    found.push({ shot, rank: score + (isCoverShaped(shot) ? 10 : 0) })

  const lead = await api<PageImages>(wiki, {
    prop: 'pageimages',
    piprop: 'original',
    titles: title,
    redirects: '1',
  })
  const leadUrl = Object.values(lead?.query?.pages ?? {})[0]?.original?.source
  if (leadUrl && IMAGE_FILE.test(leadUrl)) {
    const shot = await measure(leadUrl, `${wiki}.fandom.com`)
    if (shot) add(shot, 0)
  }

  const files = await api<PageFiles>(wiki, { prop: 'images', titles: title, redirects: '1' })
  const names = (Object.values(files?.query?.pages ?? {})[0]?.images ?? [])
    .map((i) => i.title)
    .filter((n) => IMAGE_FILE.test(n))
    .sort((a, b) => preference(b) - preference(a))
    .slice(0, 6)

  for (const name of names) {
    // Only a name the ranking rules out outright is skipped. Anything else
    // can still win on shape, which is the stronger signal.
    if (preference(name) < 0 && found.some((f) => f.rank >= 10)) continue
    const info = await api<FileInfo>(wiki, { prop: 'imageinfo', iiprop: 'url', titles: name })
    const url = Object.values(info?.query?.pages ?? {})[0]?.imageinfo?.[0]?.url
    if (!url) continue
    const shot = await measure(url, `${wiki}.fandom.com`)
    if (shot) add(shot, preference(name))
  }

  // Something beats nothing: a wide image still tells the reader which game
  // this is, and the page crops it rather than leaving a hole.
  found.sort((a, b) => b.rank - a.rank)
  return found[0]?.shot ?? null
}

async function coverFor(key: string, name: string): Promise<Shot | null> {
  for (const wiki of WIKI[key] ?? []) {
    for (const title of await findPages(wiki, name)) {
      const shot = await coverFromPage(wiki, title)
      if (shot) return shot
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  return null
}

/** The catalog's titles, keyed by the game record they point at. */
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
  const existing: Record<string, Shot> = await readFile('lib/fandom.json', 'utf8')
    .then((r) => JSON.parse(r))
    .catch(() => ({}))
  const names = await titles()

  let added = 0
  for (const key of Object.keys(GAMES)) {
    if (REJECTED[key]) {
      delete existing[key]
      console.log(`x  ${key.padEnd(30)} ${REJECTED[key]}`)
      continue
    }
    if (existing[key] && !force) continue
    const name = names.get(key) ?? key.replace(/-/g, ' ')

    const shot = await coverFor(key, name)
    if (shot) {
      existing[key] = shot
      added++
      console.log(`✓  ${key.padEnd(30)} ${shot.w}×${shot.h}  ${shot.source}`)
    } else {
      console.log(`·  ${key.padEnd(30)} nada encontrado`)
    }
    await new Promise((r) => setTimeout(r, 300))
  }

  await writeFile('lib/fandom.json', `${JSON.stringify(existing, null, 2)}\n`)
  console.log(
    `\n+${added} · ${Object.keys(existing).length}/${Object.keys(GAMES).length} jogos com capa`,
  )
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
