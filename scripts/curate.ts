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

  // Second batch, from the 200–400 star range. Of the twenty candidates there,
  // only these four were console games reaching the PC; the rest were source
  // ports of PC games, tooling, or ports targeting phones and other consoles,
  // and the quality filter now rejects those at ingestion.
  'projectPiki/pikmin': { game: 'pikmin', title: 'Pikmin', console: 'GameCube' },
  'projectPiki/pikmin2': { game: 'pikmin-2', title: 'Pikmin 2', console: 'GameCube' },
  'adonis-singh/re4': { game: 'resident-evil-4', title: 'Resident Evil 4', console: 'GameCube' },
  'SNO2207/WindowSmash': {
    game: 'smash-ultimate',
    title: 'Super Smash Bros. Ultimate',
    console: 'Nintendo Switch',
  },

  // Third batch, found by sweeping for bad titles rather than by star count.
  // Each of these was a well-known game hiding behind a repository name —
  // "gr2_pc" is Gravity Rush 2, "sa2" is Sonic Advance.
  'CaiusCodes/GoldenEye-007-XBLA-PC-Recomp': {
    game: 'goldeneye-007',
    title: 'GoldenEye 007',
    console: 'Xbox 360',
  },
  'mr-finster/vf1-recomp': { game: 'virtua-fighter', title: 'Virtua Fighter', console: 'Arcade' },
  'mr-finster/vf2-recomp': {
    game: 'virtua-fighter-2',
    title: 'Virtua Fighter 2',
    console: 'Arcade',
  },
  'PaulCombal/mw2-recompiled': {
    game: 'cod-mw2',
    title: 'Call of Duty: Modern Warfare 2',
    console: 'Xbox 360',
  },
  'OpenPortroid/ArmyOfTwoRecompilation': {
    game: 'army-of-two',
    title: 'Army of Two',
    console: 'Xbox 360',
  },
  'YuutaTsubasa/ChaotixRecompiled': {
    game: 'knuckles-chaotix',
    title: "Knuckles' Chaotix",
    console: 'Sega 32X',
  },
  'HayatoG/gr2_pc': {
    game: 'gravity-rush-2',
    title: 'Gravity Rush 2',
    console: 'PlayStation 4',
  },
  'wivi514/Dead_Rising_2_Case_West_Xenon_Recomp': {
    game: 'dead-rising-2-case-west',
    title: 'Dead Rising 2: Case West',
    console: 'Xbox 360',
  },
  'andrebrumdev/gow2-recomp': {
    game: 'god-of-war-2',
    title: 'God of War II',
    console: 'PlayStation 2',
  },
  'SAT-R/sa2': { game: 'sonic-advance', title: 'Sonic Advance', console: 'Game Boy Advance' },
  'halo-re/halo': { game: 'halo-ce', title: 'Halo: Combat Evolved', console: 'Xbox' },

  // Fourth batch, from the entries the hourly ingestion discovered on its own.
  'Unchiga/YuGiOhForbiddenMemoriesRecomp': {
    game: 'yugioh-forbidden-memories',
    title: 'Yu-Gi-Oh! Forbidden Memories',
    console: 'PlayStation',
  },
  'raulzrrs/letsgo-recomp': {
    game: 'pokemon-lets-go-eevee',
    title: "Pokémon: Let's Go, Eevee!",
    console: 'Nintendo Switch',
  },
  'cdlewis/snowboardkids2-recomp': {
    game: 'snowboard-kids-2',
    title: 'Snowboard Kids 2',
    console: 'Nintendo 64',
  },
  'DahSidiAbdallah/ConkerBFDReloaded': {
    game: 'conkers-bad-fur-day',
    title: "Conker's Bad Fur Day",
    console: 'Nintendo 64',
  },
  'sonicfreak1337/SARecomp': {
    game: 'sonic-adventure',
    title: 'Sonic Adventure',
    console: 'Dreamcast',
  },
  'Alexbeav/fm4-recomp': {
    game: 'forza-motorsport-4',
    title: 'Forza Motorsport 4',
    console: 'Xbox 360',
  },
  'distilledorion-sketch/Initial-D-Arcade-Stage-3-Native-SH-4-Recompilation-WIP-': {
    game: 'initial-d-arcade-stage-3',
    title: 'Initial D Arcade Stage 3',
    console: 'Arcade',
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
