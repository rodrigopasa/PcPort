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
}

/** Every game also gets the general gaming wiki as a last resort. */
const FALLBACK = 'gaming'

type Shot = { url: string; w: number; h: number; source: string }

const IMAGE_FILE = /\.(png|jpe?g|webp)(\/|$|\?)/i
const PREFER = /box|cover|art|packshot|front/i

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

async function coverFromPage(wiki: string, title: string): Promise<Shot | null> {
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

  const files = await api<PageFiles>(wiki, { prop: 'images', titles: title, redirects: '1' })
  const names = (Object.values(files?.query?.pages ?? {})[0]?.images ?? [])
    .map((i) => i.title)
    .filter((n) => IMAGE_FILE.test(n))
    .sort((a, b) => Number(PREFER.test(b)) - Number(PREFER.test(a)))
    .slice(0, 3)

  for (const name of names) {
    const info = await api<FileInfo>(wiki, { prop: 'imageinfo', iiprop: 'url', titles: name })
    const url = Object.values(info?.query?.pages ?? {})[0]?.imageinfo?.[0]?.url
    if (!url) continue
    const shot = await measure(url, `${wiki}.fandom.com`)
    if (shot) return shot
  }
  return null
}

async function coverFor(key: string, name: string): Promise<Shot | null> {
  for (const wiki of [...(WIKI[key] ?? []), FALLBACK]) {
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
