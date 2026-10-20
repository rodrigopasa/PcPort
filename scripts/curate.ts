/**
 * Applies hand curation to the catalog.
 *
 *   npx tsx scripts/curate.ts
 *
 * Discovery gives a repository and its own blurb. It cannot know that
 * `REDRIVER2` is Driver 2, that the game shipped in 2000, or who made it — so
 * a person maps it once here, and ingestion preserves `game`, `title` and
 * `console` from then on.
 *
 * Every repository path below was read out of the catalog, never guessed. An
 * earlier draft of this file guessed them and got thirteen of sixteen wrong.
 *
 * Two projects may map to the same game: a decompilation and the playable port
 * built on it are different entries about one title, and both are worth a page.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { GAMES } from '../lib/games'

type Curation = { game: string; title: string; console?: string }

const CURATED: Record<string, Curation> = {
  'OpenDriver2/REDRIVER2': { game: 'driver-2', title: 'Driver 2', console: 'PlayStation' },
  'Xeeynamo/sotn-decomp': {
    game: 'castlevania-sotn',
    title: 'Castlevania: Symphony of the Night',
    console: 'PlayStation',
  },
  'wipeout-phantom-edition/wipeout-phantom-edition': {
    game: 'wipeout',
    title: 'WipeOut',
    console: 'PlayStation',
  },
  'arcanite24/pinyon-shift': {
    game: 'forza-horizon',
    title: 'Forza Horizon',
    console: 'Xbox 360',
  },
  'Dyotson/ForzaHorizon1-ReImagined': {
    game: 'forza-horizon',
    title: 'Forza Horizon',
    console: 'Xbox 360',
  },
  'shdecompilations/silent-hill-decomp': {
    game: 'silent-hill',
    title: 'Silent Hill',
    console: 'PlayStation',
  },
  'SlickAmogus/silent-hill-decomp': {
    game: 'silent-hill',
    title: 'Silent Hill',
    console: 'PlayStation',
  },
  'HayatoG/iss_pc': {
    game: 'infamous-second-son',
    title: 'inFAMOUS Second Son',
    console: 'PlayStation 4',
  },
  'TGP482/BLACK-XBERecomp': { game: 'black', title: 'BLACK', console: 'Xbox' },
  'Odrannnn/MetroidPrimePort': {
    game: 'metroid-prime',
    title: 'Metroid Prime',
    console: 'GameCube',
  },
  'PrimeDecomp/prime': { game: 'metroid-prime', title: 'Metroid Prime', console: 'GameCube' },
  'AliveTeam/alive_reversing': {
    game: 'oddworld-abes-exoddus',
    title: "Oddworld: Abe's Exoddus",
    console: 'PlayStation',
  },
  'nathanialf/ico-pc': { game: 'ico', title: 'ICO', console: 'PlayStation 2' },
  'HayatoG/tlg_pc': {
    game: 'the-last-guardian',
    title: 'The Last Guardian',
    console: 'PlayStation 4',
  },
  'klorfmorf/Goemon64Recomp': {
    game: 'mystical-ninja-goemon',
    title: 'Mystical Ninja Starring Goemon',
    console: 'Nintendo 64',
  },
  'LittleBitUA/DownpourRecomp': {
    game: 'silent-hill-downpour',
    title: 'Silent Hill: Downpour',
    console: 'Xbox 360',
  },
  'samuelit0davila/fifa-street-pc-port': {
    game: 'fifa-street',
    title: 'FIFA Street',
    console: 'Xbox 360',
  },
  'SpeedBreakerProject/speedbreaker': {
    game: 'nfs-most-wanted',
    title: 'Need for Speed: Most Wanted',
    console: 'Xbox 360',
  },
  'dbalatoni13/nfsmw': {
    game: 'nfs-most-wanted',
    title: 'Need for Speed: Most Wanted',
    console: 'Xbox 360',
  },
  'BlackLineInteractive/Driveclub-Port': {
    game: 'driveclub',
    title: 'Driveclub',
    console: 'PlayStation 4',
  },
}

type Row = { repo: string; title: string; game: string | null; console: string }

const FILE = 'lib/catalog.json'
const rows: Row[] = JSON.parse(readFileSync(FILE, 'utf8'))
const byRepo = new Map(rows.map((r) => [r.repo, r]))

let applied = 0
const unmatched: string[] = []
const missingMeta = new Set<string>()

for (const [repo, c] of Object.entries(CURATED)) {
  const row = byRepo.get(repo)
  if (!row) {
    unmatched.push(repo)
    continue
  }
  row.game = c.game
  row.title = c.title
  if (c.console) row.console = c.console
  applied++
  if (!GAMES[c.game]) missingMeta.add(c.game)
}

writeFileSync(FILE, `${JSON.stringify(rows, null, 2)}\n`)

console.log(`curadas aplicadas : ${applied}/${Object.keys(CURATED).length}`)
console.log(`total com game    : ${rows.filter((r) => r.game).length}/${rows.length}`)
if (unmatched.length) {
  console.log(`\nrepos nao encontrados (${unmatched.length}):`)
  unmatched.forEach((r) => console.log(`  ${r}`))
}
if (missingMeta.size) {
  console.log(`\nFALTAM metadados em lib/games.ts (${missingMeta.size}):`)
  ;[...missingMeta].forEach((g) => console.log(`  ${g}`))
}
