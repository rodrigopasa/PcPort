/**
 * Cover art from Fandom's open MediaWiki API. No credentials.
 *
 *   npx tsx scripts/fandom.ts
 *
 * This is the LOWEST-priority art source and a stopgap, not the destination.
 * The images are publisher box art uploaded by fans under Fandom's own fair-use
 * claims, and hotlinking static.wikia.nocookie.net is against Fandom's terms —
 * they can block it whenever they like. IGDB serves the same art licensed for
 * exactly this, so lib/covers.json wins over lib/fandom.json everywhere, and
 * this file stops being read the moment IGDB is configured.
 *
 * Writes lib/fandom.json.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { imageSize } from '../lib/imagesize'
import { GAMES } from '../lib/games'

/** Which Fandom wiki holds each game. Guessing the slug does not work. */
const WIKI: Record<string, [wiki: string, title: string]> = {
  'halo-2': ['halo', 'Halo 2'],
  'ninja-gaiden-black': ['ninjagaiden', 'Ninja Gaiden Black'],
  'sonic-unleashed': ['sonic', 'Sonic Unleashed'],
  'majoras-mask': ['zelda', "The Legend of Zelda: Majora's Mask"],
  'ocarina-of-time': ['zelda', 'The Legend of Zelda: Ocarina of Time'],
  'banjo-tooie': ['banjokazooie', 'Banjo-Tooie'],
  'kh-days': ['kingdomhearts', 'Kingdom Hearts 358/2 Days'],
  'splinter-cell-double-agent': ['splintercell', 'Splinter Cell: Double Agent'],
  bloodborne: ['bloodborne', 'Bloodborne'],
  doaxbv: ['deadoralive', 'Dead or Alive Xtreme Beach Volleyball'],
  ffta: ['finalfantasy', 'Final Fantasy Tactics Advance'],
  'dragons-crown': ['dragonscrown', "Dragon's Crown"],
  'dead-rising-2-case-zero': ['deadrising', 'Dead Rising 2: Case Zero'],
  'lotr-return-of-the-king': ['lotr', 'The Lord of the Rings: The Return of the King'],
  'god-of-war': ['godofwar', 'God of War (2005 video game)'],
  'def-jam-ffny': ['defjam', 'Def Jam: Fight for NY'],
  'super-mario-64': ['mario', 'Super Mario 64'],
  'jak-and-daxter': ['jakanddaxter', 'Jak and Daxter: The Precursor Legacy'],
  'goldeneye-007': ['jamesbond', 'GoldenEye 007 (1997 video game)'],
  'pokemon-snap': ['pokemon', 'Pokémon Snap'],
  'ssx-tricky': ['ssx', 'SSX Tricky'],
  'the-darkness': ['thedarkness', 'The Darkness (video game)'],
  'spider-man-edge-of-time': ['spiderman', 'Spider-Man: Edge of Time'],
  'wwe-svr-2011': ['prowrestling', 'WWE SmackDown vs. Raw 2011'],
  'deadly-premonition': ['deadlypremonition', 'Deadly Premonition'],
  'condemned-2': ['condemned', 'Condemned 2: Bloodshot'],
  'red-alert': ['cnc', 'Command & Conquer: Red Alert'],
  'colin-mcrae-rally-2': ['codemasters', 'Colin McRae Rally 2.0'],
  'driver-2': ['driver', 'Driver 2'],
  'castlevania-sotn': ['castlevania', 'Castlevania: Symphony of the Night'],
  wipeout: ['wipeout', 'Wipeout (game)'],
  'forza-horizon': ['forzamotorsport', 'Forza Horizon'],
  'silent-hill': ['silenthill', 'Silent Hill (video game)'],
  'silent-hill-downpour': ['silenthill', 'Silent Hill: Downpour'],
  'infamous-second-son': ['infamous', 'InFAMOUS Second Son'],
  black: ['black', 'Black (video game)'],
  'metroid-prime': ['metroid', 'Metroid Prime'],
  'oddworld-abes-exoddus': ['oddworld', "Oddworld: Abe's Exoddus"],
  ico: ['teamico', 'Ico'],
  'the-last-guardian': ['teamico', 'The Last Guardian'],
  'mystical-ninja-goemon': ['goemon', 'Mystical Ninja Starring Goemon'],
  'fifa-street': ['fifa', 'FIFA Street (2012)'],
  'nfs-most-wanted': ['nfs', 'Need for Speed: Most Wanted (2005)'],
  driveclub: ['driveclub', 'Driveclub'],
  pikmin: ['pikmin', 'Pikmin (game)'],
  'pikmin-2': ['pikmin', 'Pikmin 2'],
  'resident-evil-4': ['residentevil', 'Resident Evil 4'],
  'smash-ultimate': ['supersmashbros', 'Super Smash Bros. Ultimate'],
  'virtua-fighter': ['virtuafighter', 'Virtua Fighter (game)'],
  'virtua-fighter-2': ['virtuafighter', 'Virtua Fighter 2'],
  'cod-mw2': ['callofduty', 'Call of Duty: Modern Warfare 2'],
  'army-of-two': ['armyoftwo', 'Army of Two'],
  'knuckles-chaotix': ['sonic', "Knuckles' Chaotix"],
  'gravity-rush-2': ['gravityrush', 'Gravity Rush 2'],
  'dead-rising-2-case-west': ['deadrising', 'Dead Rising 2: Case West'],
  'god-of-war-2': ['godofwar', 'God of War II'],
  'sonic-advance': ['sonic', 'Sonic Advance'],
  'halo-ce': ['halo', 'Halo: Combat Evolved'],
}

type Shot = { url: string; w: number; h: number; source: string }

/** A page image is only art if it is actually an image file of real size. */
const IMAGE_FILE = /\.(png|jpe?g|webp)(\/|$|\?)/i
const PREFER = /box|cover|art|packshot|front/i

async function api<T>(wiki: string, params: Record<string, string>): Promise<T | null> {
  const qs = new URLSearchParams({ action: 'query', format: 'json', ...params })
  try {
    const res = await fetch(`https://${wiki}.fandom.com/api.php?${qs}`, {
      headers: { 'user-agent': 'pcport/1.0 (catalog of open-source PC ports)' },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}


async function measure(url: string, source: string): Promise<Shot | null> {
  try {
    // The CDN answers 403 to a request with no Referer. That it answers at all
    // to pcport.org is a setting on their side, not a guarantee — see the note
    // at the top of this file.
    const res = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0', referer: 'https://pcport.org/' },
    })
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dim = imageSize(buf)
    // Box art is portrait-ish and not tiny; a 90px icon or a video still is not.
    if (!dim || dim.w < 200 || buf.length < 20_000) return null
    return { url, w: dim.w, h: dim.h, source }
  } catch {
    return null
  }
}

type PageImages = { query?: { pages?: Record<string, { original?: { source: string } }> } }
type PageFiles = { query?: { pages?: Record<string, { images?: { title: string }[] }> } }
type FileInfo = { query?: { pages?: Record<string, { imageinfo?: { url: string }[] }> } }

async function coverFor(wiki: string, title: string): Promise<Shot | null> {
  // 1. The page's lead image is usually the box art.
  const lead = await api<PageImages>(wiki, {
    prop: 'pageimages',
    piprop: 'original',
    titles: title,
    redirects: '1',
  })
  const leadUrl = Object.values(lead?.query?.pages ?? {})[0]?.original?.source
  if (leadUrl && IMAGE_FILE.test(leadUrl)) {
    const shot = await measure(leadUrl, `${wiki}.fandom.com`)
    if (shot) return shot
  }

  // 2. Otherwise look through the page's files for one named like cover art.
  const files = await api<PageFiles>(wiki, { prop: 'images', titles: title, redirects: '1' })
  const names = (Object.values(files?.query?.pages ?? {})[0]?.images ?? [])
    .map((i) => i.title)
    .filter((n) => IMAGE_FILE.test(n))
    .sort((a, b) => Number(PREFER.test(b)) - Number(PREFER.test(a)))
    .slice(0, 4)

  for (const name of names) {
    const info = await api<FileInfo>(wiki, { prop: 'imageinfo', iiprop: 'url', titles: name })
    const url = Object.values(info?.query?.pages ?? {})[0]?.imageinfo?.[0]?.url
    if (!url) continue
    const shot = await measure(url, `${wiki}.fandom.com`)
    if (shot) return shot
  }
  return null
}

async function main() {
  const existing: Record<string, Shot> = await readFile('lib/fandom.json', 'utf8')
    .then((r) => JSON.parse(r))
    .catch(() => ({}))

  let added = 0
  for (const key of Object.keys(GAMES)) {
    if (existing[key]) continue
    const entry = WIKI[key]
    if (!entry) { console.log(`·  ${key} — no wiki mapped`); continue }

    const shot = await coverFor(entry[0], entry[1])
    if (shot) {
      existing[key] = shot
      added++
      console.log(`✓  ${key} — ${shot.w}×${shot.h}  ${shot.source}`)
    } else {
      console.log(`·  ${key} — nothing usable`)
    }
    await new Promise((r) => setTimeout(r, 350))
  }

  await writeFile('lib/fandom.json', `${JSON.stringify(existing, null, 2)}\n`)
  console.log(`\n+${added} · ${Object.keys(existing).length}/${Object.keys(GAMES).length} games have a Fandom cover`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
