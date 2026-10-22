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

type Curation = { game?: string; title: string; console?: string; mechanism?: string }

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
  // Transferred: the project moved from SNO2207 to the OpenSmash-Ultimate
  // organisation, so the old path vanished from the catalog and the curation
  // pointed at nothing. Curation keys on the repository path, so a transfer
  // silently un-curates an entry — the mismatch count at the end of this
  // script is what surfaces it.
  'OpenSmash-Ultimate/WindowSmash': {
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

  // Fifth batch: entries whose titles collided because ingestion derived them
  // from the repository. Two different Zeldas both read "The Legend of Zelda",
  // and the loose "wipeout" is the PS4 Omega Collection, a different game from
  // the PlayStation original already in the catalog.
  'zeldaret/mm': {
    game: 'majoras-mask',
    title: "The Legend of Zelda: Majora's Mask",
    console: 'Nintendo 64',
  },
  'zeldaret/botw': {
    game: 'breath-of-the-wild',
    title: 'The Legend of Zelda: Breath of the Wild',
    console: 'Nintendo Switch',
  },
  'AbdelmoumenDeghbouche/wipeout_pc': {
    game: 'wipeout-omega-collection',
    title: 'WipEout Omega Collection',
    console: 'PlayStation 4',
  },
  'dk8827/cnc-port': {
    game: 'cnc-tiberian-dawn',
    title: 'Command & Conquer: Tiberian Dawn',
    console: 'PC',
  },
  'sp00nznet/redalert2-recomp': {
    game: 'cnc-red-alert-2',
    title: 'Command & Conquer: Red Alert 2',
    console: 'PC',
  },

  // Not a game: an emulator gets a readable title and nothing else.
  'xenia-project/xenia': { title: 'Xenia', console: 'Xbox 360', mechanism: 'emulator' },

  // Sixth batch. The pruner had just removed twenty-six entries that were
  // tooling or source ports of games that were already on the PC; what was
  // left included a long row of real console games hiding behind a repository
  // name. Every path below was read out of the catalog.
  'pmret/papermario': { game: 'paper-mario', title: 'Paper Mario', console: 'Nintendo 64' },
  'CTR-tools/ctr-native': {
    game: 'crash-team-racing',
    title: 'Crash Team Racing',
    console: 'PlayStation',
  },
  'GRAnimated/MinecraftLCE': {
    game: 'minecraft-lce',
    title: 'Minecraft: Legacy Console Edition',
    console: 'Xbox 360',
  },
  'pret/pokeruby': {
    game: 'pokemon-ruby',
    title: 'Pokémon Ruby',
    console: 'Game Boy Advance',
  },
  'pret/pokefirered': {
    game: 'pokemon-firered',
    title: 'Pokémon FireRed',
    console: 'Game Boy Advance',
  },
  'pret/pokeemerald': {
    game: 'pokemon-emerald',
    title: 'Pokémon Emerald',
    console: 'Game Boy Advance',
  },
  'pret/pokediamond': {
    game: 'pokemon-diamond',
    title: 'Pokémon Diamond',
    console: 'Nintendo DS',
  },
  'pret/pokeplatinum': {
    game: 'pokemon-platinum',
    title: 'Pokémon Platinum',
    console: 'Nintendo DS',
  },
  'pret/pokeheartgold': {
    game: 'pokemon-heartgold',
    title: 'Pokémon HeartGold',
    console: 'Nintendo DS',
  },
  'griches/EternalDarknessRecomp': {
    game: 'eternal-darkness',
    title: "Eternal Darkness: Sanity's Requiem",
    console: 'GameCube',
  },
  'drakolordx7/KillzoneRecomp': { game: 'killzone', title: 'Killzone', console: 'PlayStation 2' },
  'YuutaTsubasa/Free-Riders-Recompiled': {
    game: 'sonic-free-riders',
    title: 'Sonic Free Riders',
    console: 'Xbox 360',
  },
  'christianortel/skate2-recompile-pc': { game: 'skate-2', title: 'Skate 2', console: 'Xbox 360' },
  'parkerallan/doa3-recomp': { game: 'doa3', title: 'Dead or Alive 3', console: 'Xbox' },
  'FishB0nes98/Tekken3Recompiled': { game: 'tekken-3', title: 'Tekken 3', console: 'PlayStation' },
  'PauloUbirajara/asuras-wrath-recomp': {
    game: 'asuras-wrath',
    title: "Asura's Wrath",
    console: 'PlayStation 3',
  },
  'saulob/geometry-wars-retro-evolved-2-recompiled': {
    game: 'geometry-wars-2',
    title: 'Geometry Wars: Retro Evolved 2',
    console: 'Xbox 360',
  },
  'SulphurS16/ACFA-Port': {
    game: 'armored-core-fa',
    title: 'Armored Core: For Answer',
    console: 'PlayStation 3',
  },
  'santiquiroz/gears-of-war-2-pc-port': {
    game: 'gears-of-war-2',
    title: 'Gears of War 2',
    console: 'Xbox 360',
  },
  'jedijosh920/SWROTS-PC': {
    game: 'star-wars-rots',
    title: 'Star Wars Episode III: Revenge of the Sith',
    console: 'Xbox',
  },
  'iExplosiveRage/DBZ-Burst-Limit-Recompiled': {
    game: 'dbz-burst-limit',
    title: 'Dragon Ball Z: Burst Limit',
    console: 'PlayStation 3',
  },
  'novapowers0/BloodyRoar2Recomp': {
    game: 'bloody-roar-2',
    title: 'Bloody Roar II',
    console: 'PlayStation',
  },
  'theokyr/Project8Recomp': {
    game: 'tony-hawk-project-8',
    title: "Tony Hawk's Project 8",
    console: 'Xbox 360',
  },
  'shaneomac1337/WWE-AllStars-Recomp': {
    game: 'wwe-all-stars',
    title: 'WWE All Stars',
    console: 'Xbox 360',
  },

  // Titles with no game record, on purpose. For these four the sources
  // disagree on the original release date — Ultimate Mortal Kombat 3 is given
  // as both 20 October and 6 November 1995, and the 32X Virtua Racing as both
  // 21 November and 12 December 1994 — and a date invented to fill the gap is
  // worse than a page without one. Mikage and Xenia are emulators, which map
  // to no single game at all.
  'MaryNCRT/Ultimate-Mortal-Kombat-3-iOS-Decompiled': {
    title: 'Ultimate Mortal Kombat 3',
    console: 'Arcade',
  },
  'matiaszanolli/sega-vr-disasm': { title: 'Virtua Racing Deluxe', console: 'Sega 32X' },
  'mikage-emu/mikage-dev': { title: 'Mikage', console: 'Nintendo 3DS', mechanism: 'emulator' },

  // Its own repository description calls it "Xenia", so ingestion derived that
  // title and it collided with the real Xenia -- the catalog showed two
  // entries named the same thing, one of them winning the suffixed URL. It is
  // the macOS and iOS port of Xenia, and macOS is a desktop, so the filter is
  // right to keep it; it just needed its own name.
  'xenios-jp/XeniOS': { title: 'XeniOS', console: 'Xbox 360', mechanism: 'emulator' },

  // Eighth batch, from what the hourly ingestion found on its own.
  'wheremyfoodat/Panda3DS': {
    title: 'Panda3DS',
    console: 'Nintendo 3DS',
    mechanism: 'emulator',
  },
  'saulob/hard-corps-uprising-recompiled': {
    game: 'hard-corps-uprising',
    title: 'Hard Corps: Uprising',
    console: 'Xbox 360',
  },
  // Backfill. These were mapped by hand into lib/catalog.json before this file
  // existed, and only the refresh preserving `previous?.game` kept them alive:
  // regenerating the catalog from scratch would have dropped Ship of Harkinian,
  // Unleashed Recompiled and Jak together. Curation belongs here.
  'HarbourMasters/Shipwright': {
    game: 'ocarina-of-time',
    title: 'The Legend of Zelda: Ocarina of Time',
    console: 'Nintendo 64',
  },
  'hedge-dev/UnleashedRecomp': {
    game: 'sonic-unleashed',
    title: 'Sonic Unleashed',
    console: 'Xbox 360',
  },
  'open-goal/jak-project': {
    game: 'jak-and-daxter',
    title: 'Jak and Daxter',
    console: 'PlayStation 2',
  },
  '2ship2harkinian/2ship2harkinian': {
    game: 'majoras-mask',
    title: "The Legend of Zelda: Majora's Mask",
    console: 'Nintendo 64',
  },
  'EXOK/Celeste64': {
    game: 'celeste-64',
    title: 'Celeste 64: Fragments of the Mountain',
    console: 'PC',
  },
  'taisei-project/taisei': { game: 'taisei', title: 'Taisei Project', console: 'PC' },
  'HarbourMasters/Ghostship': {
    game: 'super-mario-64',
    title: 'Super Mario 64',
    console: 'Nintendo 64',
  },
  'TGP482/SCDA-XBERecomp': {
    game: 'splinter-cell-double-agent',
    title: 'Splinter Cell: Double Agent',
    console: 'Xbox',
  },
  'murkantor/Project-Midas': {
    game: 'goldeneye-007',
    title: 'GoldenEye 007',
    console: 'Nintendo 64',
  },
  'jkdansereau/goldeneye-pc-port': {
    game: 'goldeneye-007',
    title: 'GoldenEye 007',
    console: 'Nintendo 64',
  },
  'psxrestore/Condemned2Recomp': {
    game: 'condemned-2',
    title: 'Condemned 2: Bloodshot',
    console: 'Xbox 360',
  },
  'dk8827/ra-port': { game: 'red-alert', title: 'Command & Conquer: Red Alert', console: 'PC' },
  'NoRain211/doaxvb-re': {
    game: 'doaxbv',
    title: 'Dead or Alive Xtreme Beach Volleyball',
    console: 'Xbox',
  },
  'Yokimitsuro/khdays-port': {
    game: 'kh-days',
    title: 'Kingdom Hearts 358/2 Days',
    console: 'Nintendo DS',
  },
  'saulob/dragons-crown-pro-pc': {
    game: 'dragons-crown',
    title: "Dragon's Crown Pro",
    console: 'PlayStation 4',
  },
  'LittleBitUA/DPRecomp': {
    game: 'deadly-premonition',
    title: 'Deadly Premonition',
    console: 'Xbox 360',
  },
  'Jorge262007/FFTARecomp': {
    game: 'ffta',
    title: 'Final Fantasy Tactics Advance',
    console: 'Game Boy Advance',
  },
  'KIexster/god-of-war-recomp': {
    game: 'god-of-war',
    title: 'God of War',
    console: 'PlayStation 2',
  },
  'Yharnam-Hunters/Paleblood': {
    game: 'bloodborne',
    title: 'Bloodborne',
    console: 'PlayStation 4',
  },
  'gamboozino/ngbrecomp': {
    game: 'ninja-gaiden-black',
    title: 'Ninja Gaiden Black',
    console: 'Xbox',
  },
  'vyanhursky/DefJamFFNY-recomp': {
    game: 'def-jam-ffny',
    title: 'Def Jam: Fight for NY',
    console: 'Xbox',
  },
  'JackandBeans/Snap64Recomp': {
    game: 'pokemon-snap',
    title: 'Pokémon Snap',
    console: 'Nintendo 64',
  },
  'KaikoClanworth1/wwe-svr2011-pc': {
    game: 'wwe-svr-2011',
    title: 'WWE SmackDown vs. Raw 2011',
    console: 'Xbox 360',
  },
  'GiZcesi/OpenTricky': { game: 'ssx-tricky', title: 'SSX Tricky', console: 'PlayStation 2' },
  'kirklandsig/halo2-decompiled': { game: 'halo-2', title: 'Halo 2', console: 'Xbox' },
  'wivi514/Dead_Rising_2_Case_Zero_Xenon_Recomp': {
    game: 'dead-rising-2-case-zero',
    title: 'Dead Rising 2: Case Zero',
    console: 'Xbox 360',
  },
  'Shagg88/Athelas': {
    game: 'lotr-return-of-the-king',
    title: 'The Lord of the Rings: The Return of the King',
    console: 'Xbox',
  },
  'invinceble55-wq/Estacado-The-Darkness-Recomp': {
    game: 'the-darkness',
    title: 'The Darkness',
    console: 'Xbox 360',
  },
  'some-scurvy-dog/banjo-tooie-scurvy-dog-port': {
    game: 'banjo-tooie',
    title: 'Banjo-Tooie',
    console: 'Nintendo 64',
  },
  'pablocpas/OpenCMR2': {
    game: 'colin-mcrae-rally-2',
    title: 'Colin McRae Rally 2.0',
    console: 'PlayStation',
  },
  'GenryTheFox0/Project-2099': {
    game: 'spider-man-edge-of-time',
    title: 'Spider-Man: Edge of Time',
    console: 'Xbox 360',
  },
  // Seventh batch: everything the catalog still had without a judgement.
  //
  // Four are games. Yakumo named no game anywhere in its description, and the
  // catalog would have kept it as "Yakumo" forever — its build profile is
  // `mhp3rd` and its community translation repo says so outright: Monster
  // Hunter Portable 3rd, which never released outside Japan.
  'TeamGDB/Yakumo': {
    game: 'monster-hunter-portable-3rd',
    title: 'Monster Hunter Portable 3rd',
    console: 'PSP',
  },
  'Masterllgod/naruto-storm-generations-port-nativo': {
    game: 'naruto-storm-generations',
    title: 'Naruto Shippuden: Ultimate Ninja Storm Generations',
    console: 'Xbox 360',
  },
  'nikolaygorb/ArmyOfTwoRecomp': {
    game: 'army-of-two',
    title: 'Army of Two',
    console: 'Xbox 360',
  },
  'umarzubair392/ambient-ocarina-toolkit': {
    game: 'ocarina-of-time',
    title: 'The Legend of Zelda: Ocarina of Time',
    console: 'Nintendo 64',
  },

  // The rest get a readable title and no game, because they map to no single
  // one: an emulator, the recompiler toolkits that the ports in this catalog
  // are built on, and three decompilations of games that were already on PC —
  // kept for the code, titled honestly, and not dressed up as console ports.
  'shadps4-emu/shadPS4': { title: 'shadPS4', console: 'PlayStation 4', mechanism: 'emulator' },
  'ran-j/PS2Recomp': { title: 'PS2Recomp', console: 'PlayStation 2' },
  'BlackLabelHQ/RecompOne': { title: 'RecompOne', console: 'PlayStation' },
  'tmcleroy/cps2recomp': { title: 'CPS-2 Recomp', console: 'Arcade' },
  'alexbeavs-ps1-ports/psxrecomp-ports': { title: 'PSX Recomp Ports', console: 'PlayStation' },
  'DogParty/iPodClickWheelRecomps': {
    title: 'iPod Click Wheel Recomps',
    console: 'iPod Classic',
  },
  'rrika/cdcEngineDXHR': { title: 'Deus Ex: Human Revolution', console: 'PC' },
  'GensokyoClub/th06': { title: 'Touhou 6: The Embodiment of Scarlet Devil', console: 'PC' },
  'whylurking/IsaacRecomp': { title: 'The Binding of Isaac', console: 'PC' },
  'ioncodes/llvm8': { title: 'CHIP-8 Recomp', console: 'CHIP-8' },
}

type Row = {
  repo: string
  title: string
  game: string | null
  console: string
  mechanism: string
  curated?: boolean
}

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
  // An emulator is not a game: it gets a title and nothing else.
  if (c.game) row.game = c.game
  row.title = c.title
  if (c.console) row.console = c.console
  if (c.mechanism) (row as Record<string, unknown>).mechanism = c.mechanism
  // The mark, not the `game` field, is what protects an entry from the pruner.
  // An emulator is curated and has no game, so the old proxy left Xenia and
  // Mikage to be saved or dropped by a regex.
  row.curated = true
  applied++
  if (c.game && !GAMES[c.game]) missingMeta.add(c.game)
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
