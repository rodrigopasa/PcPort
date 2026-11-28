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
import { recordGone, recordMoves, type GoneBook, type SlugHistory, type SlugRow } from '../lib/slugs'

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
  // Dyotson/ForzaHorizon1-ReImagined moved to FH1-ReImagined/…, below.
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
  // Odrannnn/MetroidPrimePort: deleted from GitHub on 13 November.
  // PrimeDecomp/prime was removed from GitHub in October 2026; the native
  // port built on it stays, and the decompilation's address redirects there.
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
  // Shagg88/Athelas left on 8 November: it became a launcher for four Lord of the
  // Rings games, which the filter turns away.
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
  // umarzubair392/ambient-ocarina-toolkit was removed from GitHub on 2026-10-28.

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
  // Ninth batch: the gap the comparison with PlayPorted found, seeded in
  // build-catalog.ts. Bloodborne goes from one port to four.
  "deadinside28/bloodborne_pc": { game: "bloodborne", title: "Bloodborne", console: "PlayStation 4" },
  "Supermedo/bloodborne_pc": { game: "bloodborne", title: "Bloodborne", console: "PlayStation 4" },
  "droogie/bbhost": { game: "bloodborne", title: "Bloodborne", console: "PlayStation 4" },
  "TwilitRealm/dusklight": { game: "twilight-princess", title: "The Legend of Zelda: Twilight Princess", console: "GameCube" },
  "snesrev/zelda3": { game: "link-to-the-past", title: "The Legend of Zelda: A Link to the Past", console: "SNES" },
  "HarbourMasters/SpaghettiKart": { game: "mario-kart-64", title: "Mario Kart 64", console: "Nintendo 64" },
  "HarbourMasters/Starship": { game: "star-fox-64", title: "Star Fox 64", console: "Nintendo 64" },
  "BanjoRecomp/BanjoRecomp": { game: "banjo-kazooie", title: "Banjo-Kazooie", console: "Nintendo 64" },
  "perfect-dark-pc-port/perfect_dark": { game: "perfect-dark", title: "Perfect Dark", console: "Nintendo 64" },
  "Rainchus/Donkey-Kong-64-Recompiled": { game: "dk64", title: "Donkey Kong 64", console: "Nintendo 64" },
  "chrissotraidis/bluewake": { game: "wind-waker", title: "The Legend of Zelda: The Wind Waker", console: "GameCube" },
  "ZeldaWWHDRecomp/ZeldaWWHDRecomp": { game: "wind-waker-hd", title: "The Legend of Zelda: The Wind Waker HD", console: "Wii U" },
  "flyngmt/Nookery": { game: "animal-crossing", title: "Animal Crossing", console: "GameCube" },
  "new-coke/strikers": { game: "mario-strikers", title: "Super Mario Strikers", console: "GameCube" },
  "peiikai/LASRecomp": { game: "links-awakening", title: "The Legend of Zelda: Link's Awakening", console: "Nintendo Switch" },
  "K0NL/B2recomp": { game: "bayonetta-2", title: "Bayonetta 2", console: "Nintendo Switch" },
  "LoreanXavier/pt-pc": { game: "pt", title: "P.T.", console: "PlayStation 4" },
  "Supermedo/uncharted_pc": { game: "uncharted-collection", title: "Uncharted: The Nathan Drake Collection", console: "PlayStation 4" },
  "AjncSystem/ShadowOfTheColossus-PC": { game: "sotc-ps4", title: "Shadow of the Colossus", console: "PlayStation 4" },
  "z3xox/Tenkaichi3Decomp": { game: "dbz-bt3", title: "Dragon Ball Z: Budokai Tenkaichi 3", console: "PlayStation 2" },
  "BodbDearg/PsyDoom": { game: "psx-doom", title: "PlayStation Doom", console: "PlayStation" },
  "mchughalex/skate3recomp": { game: "skate-3", title: "Skate 3", console: "Xbox 360" },
  "freefrank/LostOdysseyRecomp": { game: "lost-odyssey", title: "Lost Odyssey", console: "Xbox 360" },
  "sonicnext-dev/MarathonRecomp": { game: "sonic-06", title: "Sonic the Hedgehog (2006)", console: "Xbox 360" },
  "florinp93/hells-gate-recomp": { game: "dantes-inferno", title: "Dante's Inferno", console: "Xbox 360" },
  "sal063/AC6_recomp": { game: "ace-combat-6", title: "Ace Combat 6: Fires of Liberation", console: "Xbox 360" },
  "YesterMester/TheSimpsonsGameRecomp": { game: "simpsons-game", title: "The Simpsons Game", console: "Xbox 360" },
  "Ekspym/Tekken6-native-online": { game: "tekken-6", title: "Tekken 6", console: "Xbox 360" },
  "djyt/cannonball": { game: "outrun", title: "OutRun", console: "Arcade" },
  // Tenth batch: legitimate ports from the widened discovery. Most are a
  // second or third port of a game already in the catalog, which is what
  // the comparison pages are for.
  "SunJaycy/GoldenEye-Recomp": { game: "goldeneye-007", title: "GoldenEye 007", console: "Xbox 360" },
  "Fable2Recomp/beanRecomp": { game: "goldeneye-007", title: "GoldenEye 007", console: "Xbox 360" },
  "sonicdcer/Starfox64Recomp": { game: "star-fox-64", title: "Star Fox 64", console: "Nintendo 64" },
  "birabittoh/NocturneRecomp": { game: "castlevania-sotn", title: "Castlevania: Symphony of the Night", console: "Xbox 360" },
  "portingpete/The-Darkness-Recomp": { game: "the-darkness", title: "The Darkness", console: "Xbox 360" },
  "sciaschi/CBFD-Recompiled": { game: "conkers-bad-fur-day", title: "Conker's Bad Fur Day", console: "Nintendo 64" },
  "madelrandel-blip/NFSMW-Recompiled": { game: "nfs-most-wanted", title: "Need for Speed: Most Wanted", console: "Xbox 360" },
  "0herculabs/hl360-forza4": { game: "forza-motorsport-4", title: "Forza Motorsport 4", console: "Xbox 360" },
  "z3xox/BT3-Recomp": { game: "dbz-bt3", title: "Dragon Ball Z: Budokai Tenkaichi 3", console: "PlayStation 2" },
  "YYOzcan/Tobiichi-Port": { game: "god-of-war", title: "God of War", console: "PlayStation 2" },
  "mstan/ZeldaAlttPSNESRecomp": { game: "link-to-the-past", title: "The Legend of Zelda: A Link to the Past", console: "SNES" },
  "goliathret/EdgeOfTimeRecomp": { game: "spider-man-edge-of-time", title: "Spider-Man: Edge of Time", console: "Xbox 360" },
  "mahmoud-mess/tekken6-recomp": { game: "tekken-6", title: "Tekken 6", console: "Xbox 360" },
  "cdlewis/snowboardkids2-decomp": { game: "snowboard-kids-2", title: "Snowboard Kids 2", console: "Nintendo 64" },
  "zolaware/reblue": { game: "blue-dragon", title: "Blue Dragon", console: "Xbox 360" },
  "himdo/Fable-2-Recomp": { game: "fable-2", title: "Fable II", console: "Xbox 360" },
  "Fable2Recomp/Fable2Remake": { game: "fable-2", title: "Fable II", console: "Xbox 360" },
  "theclub654/ProjectCane": { game: "sly-cooper", title: "Sly Cooper and the Thievius Raccoonus", console: "PlayStation 2" },
  "TheOnlyZac/sly1": { game: "sly-cooper", title: "Sly Cooper and the Thievius Raccoonus", console: "PlayStation 2" },
  "Matteo842/CrashBandicoot-Launcher": { game: "crash-bandicoot", title: "Crash Bandicoot", console: "PlayStation" },
  // Tenth batch: names. These shipped to the catalog table as "the N64
  // Classic", "both Golden Sun games for Gameboy Advance", "fifa09". Every
  // name below comes from the repository's own description or README —
  // WWE '12, '13 and 2K14 each say Xbox 360 in theirs; .hack//IMOQ is the
  // PS2 quadrilogy; Trouble Makers is Mischief Makers under its Japanese
  // title. None was guessed from the repository name alone.
  "PascalPixel/alchemy": { game: "golden-sun", title: "Golden Sun", console: "Game Boy Advance" },
  "bryantmh/rush2recompiled": { title: "Rush 2: Extreme Racing USA", console: "Nintendo 64" },
  "jorjbarbosa/naruto-rise-recomp": { game: "naruto-rise-of-a-ninja", title: "Naruto: Rise of a Ninja", console: "Xbox 360" },
  "ChunchunQ/fifa09-recomp": { title: "FIFA 09", console: "Xbox 360" },
  "doc-haz/infinite-undiscovery-recomp": { game: "infinite-undiscovery", title: "Infinite Undiscovery", console: "Xbox 360" },
  "thiagordsfx/urban-reign-recomp": { title: "Urban Reign", console: "PlayStation 2" },
  "HossEz/fifa-world-cup-2014-recompiled": { title: "2014 FIFA World Cup Brazil", console: "Xbox 360" },
  "Decryptu/pokerecomp": { title: "Pokémon Red, Blue, Gold e Silver", console: "Game Boy Color" },
  "fliperama86/cvlod_recomp": { title: "Castlevania: Legacy of Darkness", console: "Nintendo 64" },
  "masterspike52/reNut": { game: "banjo-kazooie-nuts-bolts", title: "Banjo-Kazooie: Nuts & Bolts", console: "Xbox 360" },
  "nlwstein/skullburglar": { game: "50-cent-blood-on-the-sand", title: "50 Cent: Blood on the Sand", console: "Xbox 360" },
  "iMrBurn/wwe12-pc": { title: "WWE '12", console: "Xbox 360" },
  "soyjxck/dod3-recomp": { game: "drakengard-3", title: "Drakengard 3", console: "PlayStation 3" },
  "saulob/crackdown-xbox360-recompiled": { game: "crackdown", title: "Crackdown", console: "Xbox 360" },
  "chrissotraidis/paperpad": { title: "Paper Mario", console: "Nintendo 64" },
  "guimaraf/plusalpha-recomp": { title: "Street Fighter EX Plus Alpha", console: "PlayStation" },
  "0herculabs/hl360-Forza2": { game: "forza-motorsport-2", title: "Forza Motorsport 2", console: "Xbox 360" },
  "metroidret/mzm": { game: "metroid-zero-mission", title: "Metroid: Zero Mission", console: "Game Boy Advance" },
  "PromethenDev/wwe2k14-recomp": { title: "WWE 2K14", console: "Xbox 360" },
  "saulob/ssf2t-hd-remix-recompiled": { game: "ssf2t-hd-remix", title: "Super Street Fighter II Turbo HD Remix", console: "Xbox 360" },
  "obaidr1/hercules-recompiled": { title: "Disney's Hercules", console: "PlayStation" },
  "RussoPhone/tomodachi-ltd-recomp": { title: "Tomodachi Life: Living the Dream", console: "Nintendo Switch" },
  "0herculabs/hl360-forza3": { game: "forza-motorsport-3", title: "Forza Motorsport 3", console: "Xbox 360" },
  "lfarroco/ogre-battle-64-recomp": { game: "ogre-battle-64", title: "Ogre Battle 64: Person of Lordly Caliber", console: "Nintendo 64" },
  "PromethenDev/wwe13-recomp": { title: "WWE '13", console: "Xbox 360" },
  "OverkillLabs3/gears-judgement-recomp": { game: "gears-of-war-judgment", title: "Gears of War: Judgment", console: "Xbox 360" },
  "Sirhalo23/RidgeRacer6-Recompilation": { game: "ridge-racer-6", title: "Ridge Racer 6", console: "Xbox 360" },
  "ThiagoLira/trouble-makers-pc-recomp": { game: "mischief-makers", title: "Mischief Makers", console: "Nintendo 64" },
  "ihatecompvir/band3_recomp": { game: "rock-band-3", title: "Rock Band 3", console: "Xbox 360" },
  "parappadev/parappa2": { game: "parappa-the-rapper-2", title: "PaRappa the Rapper 2", console: "PlayStation 2" },
  "danielgomesvieira2000/pilotwings-64-recomp": { game: "pilotwings-64", title: "Pilotwings 64", console: "Nintendo 64" },
  "danielgomesvieira2000/wave-race-64-recomp": { game: "wave-race-64", title: "Wave Race 64", console: "Nintendo 64" },
  "dothacktranslate/dothack-recompilation": { title: ".hack//IMOQ", console: "PlayStation 2" },
  "mkst/sssv": { game: "space-station-silicon-valley", title: "Space Station Silicon Valley", console: "Nintendo 64" },
  "masterspike52/reDAHM": { title: "Destroy All Humans! Path of the Furon", console: "Xbox 360" },
  "puckhead73/nhl-legacy-recomp": { title: "NHL Legacy", console: "Xbox 360" },
  "kholdfuzion/GoldenRecomp": { game: "goldeneye-007", title: "GoldenEye 007", console: "Nintendo 64" },
  "Fantaskink/SOTC": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 2" },
  "open-ribbon/open-ribbon": { game: "vib-ribbon", title: "Vib-Ribbon", console: "PlayStation" },
  "bdragoncore/cor64": { title: "Cor64", console: "Nintendo 64", mechanism: "emulator" },
  "BttrDrgn/f-zerox": { game: "f-zero-x", title: "F-Zero X", console: "Nintendo 64" },
  // Eleventh batch: everything the table still showed uncurated — "Co D3",
  // "SDOJ", "RB2", and a console column that said PC for games that never
  // ran on one. Names and consoles come from each repository's description
  // or README: SDOJ is DoDonPachi SaiDaiOuJou, Mojo is Crash of the Titans,
  // Xerenge is Burnout Revenge, DBZ1 is Budokai HD. WET, Wave Race 64 and
  // Space Station Silicon Valley now have two ports each, so they share a key.
  "tangosdev/sm64ds-decomp": { game: "super-mario-64-ds", title: "Super Mario 64 DS", console: "Nintendo DS" },
  "dreamingmoths/memory-of-alessa": { game: "silent-hill-3", title: "Silent Hill 3", console: "PlayStation 2" },
  "mstan/MegaManXSNESRecomp": { game: "mega-man-x", title: "Mega Man X", console: "SNES" },
  "mstan/SuperMarioWorldRecomp": { game: "super-mario-world", title: "Super Mario World", console: "SNES" },
  "GTTeancum/SotE-Recomp": { game: "shadows-of-the-empire", title: "Star Wars: Shadows of the Empire", console: "Nintendo 64" },
  "TekRantGaming/king-kong-recompiled": { game: "king-kong", title: "Peter Jackson's King Kong", console: "Xbox 360" },
  "shipa-2/Xerenge": { game: "burnout-revenge", title: "Burnout Revenge", console: "Xbox 360" },
  "crazyriddler/FinestHourRemastered": { game: "cod-finest-hour", title: "Call of Duty: Finest Hour", console: "Xbox" },
  "mstan/MegaManX4Recomp": { game: "mega-man-x4", title: "Mega Man X4", console: "PlayStation" },
  "mstan/TombaRecomp": { title: "Tomba!", console: "PlayStation" },
  "nikolaygorb/PerfectDarkZeroRecomp": { game: "perfect-dark-zero", title: "Perfect Dark Zero", console: "Xbox 360" },
  "novapowers0/DBZ-Budokai-3-HD-Collection": { title: "Dragon Ball Z: Budokai 3 HD", console: "Xbox 360" },
  "birabittoh/EternalSonataReprise": { game: "eternal-sonata", title: "Eternal Sonata", console: "Xbox 360" },
  // toowasmir/WebOfShadowsRecomp was removed from GitHub in October 2026.
  "FrankHUN88453/CoD3Recomp": { game: "call-of-duty-3", title: "Call of Duty 3", console: "Xbox 360" },
  "OpokXeno/xenogears-recomp": { game: "xenogears", title: "Xenogears", console: "PlayStation" },
  "jessetbh/WCWvsNWOWorldTourRecomp": { title: "WCW vs. nWo World Tour", console: "Nintendo 64" },
  "nikolaygorb/WetRecomp": { game: "wet", title: "WET", console: "Xbox 360" },
  "eandis/SDOJ-Recomp": { title: "DoDonPachi SaiDaiOuJou", console: "Xbox 360" },
  "BrazilianHobbyist/Project-RE-Visited-RE3": { game: "resident-evil-3", title: "Resident Evil 3: Nemesis", console: "PlayStation" },
  "NeverCookFirst/DimensionsRecomp": { game: "lego-dimensions", title: "LEGO Dimensions", console: "Xbox 360" },
  "holdmysocks/mcla-recomp": { game: "midnight-club-la", title: "Midnight Club: Los Angeles", console: "Xbox 360" },
  "TekRantGaming/earthworm-jim-hd-recompiled": { title: "Earthworm Jim HD", console: "Xbox 360" },
  "davidptrssvea/Table-Tennis-Rockstar-PC": { game: "table-tennis", title: "Rockstar Games Presents Table Tennis", console: "Xbox 360" },
  "shihabal3amri/tekken-tag-tournament-2-pc": { game: "tekken-tag-tournament-2", title: "Tekken Tag Tournament 2", console: "Xbox 360" },
  "alondero/automobililamborghini-recomp": { title: "Automobili Lamborghini", console: "Nintendo 64" },
  "beatrixzy/PGR4-Recomp": { game: "project-gotham-racing-4", title: "Project Gotham Racing 4", console: "Xbox 360" },
  "pret/pmd-red": { game: "pokemon-mystery-dungeon-red", title: "Pokémon Mystery Dungeon: Red Rescue Team", console: "Game Boy Advance" },
  "danisandoval/fukami": { game: "ridge-racer-v", title: "Ridge Racer V", console: "PlayStation 2" },
  "pret/pokepinballrs": { game: "pokemon-pinball-rs", title: "Pokémon Pinball: Ruby & Sapphire", console: "Game Boy Advance" },
  "Sinan-Karakaya/DQ8-Recompiled": { game: "dragon-quest-viii", title: "Dragon Quest VIII: Journey of the Cursed King", console: "PlayStation 2" },
  "mstan/ApeEscapeRecomp": { title: "Ape Escape", console: "PlayStation" },
  "OAleex/MojoRecomp": { game: "crash-of-the-titans", title: "Crash of the Titans", console: "Xbox 360" },
  "Supermedo/wet-recomp": { game: "wet", title: "WET", console: "Xbox 360" },
  "alondero/aerogauge-recomp": { title: "AeroGauge", console: "Nintendo 64" },
  "mstan/MegaManX6Recomp": { game: "mega-man-x6", title: "Mega Man X6", console: "PlayStation" },
  "SolarCookies/TiP-Recomp": { game: "viva-pinata-tip", title: "Viva Piñata: Trouble in Paradise", console: "Xbox 360" },
  "TechnicallyComputers/Street-Fighter-Alpha-3-Recomp": { title: "Street Fighter Alpha 3", console: "PlayStation" },
  "ThatGuyMcd/Rocket-R": { title: "Rocket: Robot on Wheels", console: "Nintendo 64" },
  "HarvestMoon64Recomp/HarvestMoon64Recomp": { title: "Harvest Moon 64", console: "Nintendo 64" },
  "KawaiiBunga/MKVDCU-Recomp": { game: "mk-vs-dc", title: "Mortal Kombat vs. DC Universe", console: "Xbox 360" },
  "blackgamma7/Aidyn": { title: "Aidyn Chronicles: The First Mage", console: "Nintendo 64" },
  "danielgomesvieira2000/beetle-adventure-racing-recomp": { title: "Beetle Adventure Racing!", console: "Nintendo 64" },
  "sal063/Ace-Combat-5-Static-recompilation": { game: "ace-combat-5", title: "Ace Combat 5: The Unsung War", console: "PlayStation 2" },
  "jiangzhengwenjz/katam": { game: "kirby-amazing-mirror", title: "Kirby & The Amazing Mirror", console: "Game Boy Advance" },
  "DomazinUS/RaceWave46": { game: "wave-race-64", title: "Wave Race 64", console: "Nintendo 64" },
  "Kirby64Ret/kirby64": { game: "kirby-64", title: "Kirby 64: The Crystal Shards", console: "Nintendo 64" },
  "mstan/MegaManX5Recomp": { game: "mega-man-x5", title: "Mega Man X5", console: "PlayStation" },
  "Ed1z19/ValkyrieRecomp": { game: "valkyrie-profile", title: "Valkyrie Profile", console: "PlayStation" },
  "strider973/Einhander-Recompiled": { game: "einhander", title: "Einhänder", console: "PlayStation" },
  "kazuyette/rr-decomp": { title: "Ridge Racer", console: "PlayStation" },
  "luisxl15/GTA-IV-RECOMP-XBOX-360": { game: "gta-iv", title: "Grand Theft Auto IV", console: "Xbox 360" },
  "Subarasheese/daytona-xbla-recomp": { title: "Daytona USA", console: "Xbox 360" },
  "RayCarrot/Rayman3Readvanced": { title: "Rayman 3: Hoodlum Havoc", console: "Game Boy Advance" },
  "xbret/xenoblade": { game: "xenoblade-chronicles", title: "Xenoblade Chronicles", console: "Wii" },
  "MaxDeadBear/KameoRePowered": { game: "kameo", title: "Kameo: Elements of Power", console: "Xbox 360" },
  "HollywoodAkeem/SVR07-Recomp": { game: "svr-2007", title: "WWE SmackDown vs. Raw 2007", console: "Xbox 360" },
  "Cellenseres/SSSV_Recomp": { game: "space-station-silicon-valley", title: "Space Station Silicon Valley", console: "Nintendo 64" },
  "ronniecloud/re-wor": { game: "gh-warriors-of-rock", title: "Guitar Hero: Warriors of Rock", console: "Xbox 360" },
  "WistfulHopes/DBZ1": { title: "Dragon Ball Z: Budokai HD", console: "Xbox 360" },
  "WistfulHopes/RB2": { title: "Dragon Ball: Raging Blast 2", console: "Xbox 360" },
  "Rainchus/Quest64-Recomp": { title: "Quest 64", console: "Nintendo 64" },

  // Twelfth batch: what discovery added from 23 to 27 October. Names and
  // consoles from each README. Shadow of the Colossus, Crash of the Titans,
  // Tekken Tag Tournament 2, Forza Motorsport 2 and Project Gotham Racing 4
  // now have two or more ports, so the earlier ones join their key.
  "wootbeer/snprecomp": { game: "sin-and-punishment", title: "Sin and Punishment", console: "Nintendo 64" },
  "MysteriousAeon/rayman3-hd-recompiled": { title: "Rayman 3 HD", console: "Xbox 360" },
  "zer0ducksgiven/Forza-Motorsport-2-ReGPU": { game: "forza-motorsport-2", title: "Forza Motorsport 2", console: "Xbox 360" },
  "DrummingBird1/gow-psp-recomp": { title: "God of War: Chains of Olympus & Ghost of Sparta", console: "PSP" },
  "Petexy/Golden-Fist-Launcher": { game: "tekken-tag-tournament-2", title: "Tekken Tag Tournament 2: Wii U Edition", console: "Wii U" },
  "HenryKun55/celosia": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 2" },
  "VitoMiguelF/crashott-pc": { game: "crash-of-the-titans", title: "Crash of the Titans", console: "Xbox 360" },
  "n0madic/Soulcalibur2HD-recomp": { title: "Soulcalibur II HD Online", console: "PlayStation 3" },
  "saulob/marvel-ultimate-alliance-bundle-recompiled": { title: "Marvel: Ultimate Alliance 1 & 2", console: "Xbox 360" },
  "hk21x/pgr1-recomp": { game: "project-gotham-racing", title: "Project Gotham Racing", console: "Xbox" },
  "hk21x/pgr2-recomp": { game: "pgr2", title: "Project Gotham Racing 2", console: "Xbox" },
  "FH1-ReImagined/ForzaHorizon1-ReImagined": { game: "forza-horizon", title: "Forza Horizon", console: "Xbox 360" },
  "Mango77x/MHForever": { game: "monster-hunter-freedom-unite", title: "Monster Hunter Freedom Unite", console: "PSP" },
  "SmokeDoggy044/CoD2-BRO-Native-Loader": { game: "cod2-big-red-one", title: "Call of Duty 2: Big Red One", console: "Xbox" },
  "GioPixelGH/Crash-Twinsanity-Windows": { game: "crash-twinsanity", title: "Crash Twinsanity", console: "PlayStation 2" },
  "SlaveOfIDO/blastcorps-recomp": { title: "Blast Corps", console: "Nintendo 64" },
  "shaunsingh/pgr4-native": { game: "project-gotham-racing-4", title: "Project Gotham Racing 4", console: "Xbox 360" },
  "Hyant4/Knack-II-pc-port": { game: "knack-2", title: "Knack II", console: "PlayStation 4" },
  "ryderclanky/BotW-Native": { game: "breath-of-the-wild", title: "The Legend of Zelda: Breath of the Wild", console: "Wii U" },
  "mr-finster/vf3-recomp": { title: "Virtua Fighter 3", console: "Arcade" },
  "thibautbus/top": { title: "The Legend of Zelda: Oracle of Ages & Oracle of Seasons", console: "Game Boy Color" },
  "VantageEX/infamous-first-light-pc": { game: "infamous-first-light", title: "inFAMOUS First Light", console: "PlayStation 4" },
  "ly05010419/MacNativeGames": { title: "Tears of the Kingdom & Breath of the Wild", console: "Nintendo Switch" },
  "Masterllgod/naruto-storm-3-full-burst-port-nativo": { title: "Naruto Shippuden: Ultimate Ninja Storm 3 Full Burst", console: "Xbox 360" },
  "kuraeow/ultratears": { game: "tears-of-the-kingdom", title: "The Legend of Zelda: Tears of the Kingdom", console: "Nintendo Switch" },
  "Vnnc1/gow-native-pc": { game: "god-of-war", title: "God of War", console: "PlayStation 2" },
  "OpenRAC/OpenRAC": { game: "ratchet-and-clank", title: "Ratchet & Clank", console: "PlayStation 2" },
  "jjmhalew/RampageRE": { title: "Rampage: Total Destruction", console: "PlayStation 2" },
  "TGP482/007FRWL-XBERecomp": { game: "007-from-russia-with-love", title: "007: From Russia with Love", console: "Xbox" },
  "hibikifukui22/Dead-or-Alive-Xtreme-2-Recompilation": { title: "Dead or Alive Xtreme 2", console: "Xbox 360" },
  "NoRain211/doa2u-re": { title: "Dead or Alive 2 Ultimate", console: "Xbox" },
  "james2doyle/ffta-recomp": { game: "ffta", title: "Final Fantasy Tactics Advance", console: "Game Boy Advance" },
  "0c0de/splatterhouse-decomp": { game: "splatterhouse", title: "Splatterhouse", console: "Xbox 360" },
  "jorjbarbosa/broken-bond-recomp": { game: "naruto-broken-bond", title: "Naruto: The Broken Bond", console: "Xbox 360" },
  "Waffle565/God-Of-War-Native-Port": { game: "god-of-war", title: "God of War", console: "PlayStation 2" },
  "nakaionyt/ShadowOfTheColossus-PC-FrameGen": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 4" },
  "SulphurS16/AC4-Port": { game: "armored-core-4", title: "Armored Core 4", console: "PlayStation 3" },
  "codepdbh/NFS-CARBON-360-ANDROID-RECOMP": { game: "nfs-carbon", title: "Need for Speed: Carbon", console: "Xbox 360" },
  "BlackLabelHQ/MediEvilRecomp": { title: "MediEvil", console: "PlayStation" },
  "TechnicallyComputers/Klonoa-Door-to-Phantomile": { game: "klonoa", title: "Klonoa: Door to Phantomile", console: "PlayStation" },
  "alexbeavs-ps1-ports/syphon-filter-2-recomp": { title: "Syphon Filter 2", console: "PlayStation" },
  "strider973/STRIDER-2-Recompiled": { title: "Strider 2", console: "PlayStation" },

  // Thirteenth batch, 28 October. Names and consoles from each README.
  "skuza-oss/downhill-revived": { title: "Downhill Domination", console: "PlayStation 2" },
  "saulob/odin-sphere-leifthrasir-pc": { game: "odin-sphere-leifthrasir", title: "Odin Sphere Leifthrasir", console: "PlayStation 4" },
  "hk21x/007eon-recomp": { game: "007-everything-or-nothing", title: "007: Everything or Nothing", console: "Xbox" },
  "Masterllgod/naruto-storm-2-port-nativo": { title: "Naruto Shippuden: Ultimate Ninja Storm 2", console: "Xbox 360" },
  // GTTeancum/Timesplitters: deleted from GitHub on 19 November.
  "OZORDI/SanRecomp": { game: "gta-v", title: "Grand Theft Auto V", console: "Xbox 360" },

  // Fourteenth batch, 3 November: what discovery added that week. Tears of
  // the Kingdom, GTA V, Nightfire, The Broken Bond, Call of Duty 3, Need for
  // Speed Carbon and Pilotwings 64 now have two or more ports each.
  "zer0ducksgiven/PGR4-ReGPU": { game: "project-gotham-racing-4", title: "Project Gotham Racing 4", console: "Xbox 360" },
  "ravencaio/tlou-remastered-pc": { game: "last-of-us-remastered", title: "The Last of Us Remastered", console: "PlayStation 4" },
  "timboat/demons-souls-recomp": { game: "demons-souls", title: "Demon's Souls", console: "PlayStation 3" },
  "Lucas-blip-png/dkb-pc-recomp": { game: "donkey-kong-bananza", title: "Donkey Kong Bananza", console: "Nintendo Switch 2" },
  "victor-takai/rogue-galaxy-recomp": { game: "rogue-galaxy", title: "Rogue Galaxy", console: "PlayStation 2" },
  "danielalves96/gow-pc-port": { game: "god-of-war", title: "God of War", console: "PlayStation 2" },
  "Shagg88/COGBox": { title: "Gears of War 2, 3 & Judgment", console: "Xbox 360" },
  "daniel-madrid-07/weeping-of-the-empire": { game: "tears-of-the-kingdom", title: "The Legend of Zelda: Tears of the Kingdom", console: "Nintendo Switch" },
  "lakshya16157/midtown-madness-3-PC-Native": { title: "Midtown Madness 3", console: "Xbox" },
  "Juansolo457/fear360-recomp": { title: "F.E.A.R. & F.E.A.R. Files", console: "Xbox 360" },
  "Mabec-games/Conker-Recomped-and-Reloaded": { game: "conker-live-reloaded", title: "Conker: Live & Reloaded", console: "Xbox" },
  "undecuple/project-pyrrhus": { game: "killzone-2", title: "Killzone 2", console: "PlayStation 3" },
  "undecuple/project-helghast": { game: "killzone-3", title: "Killzone 3", console: "PlayStation 3" },
  "NoRain211/doa3-re": { game: "doa3", title: "Dead or Alive 3", console: "Xbox" },
  "jcsix694/def-jam-vendetta-recomp": { game: "def-jam-vendetta", title: "Def Jam Vendetta", console: "PlayStation 2" },
  // Odrannnn/MetroidPrime2Port: deleted from GitHub on 13 November.
  "gothamor/gta-vcs-recomp": { game: "gta-vice-city-stories", title: "Grand Theft Auto: Vice City Stories", console: "PlayStation 2" },
  "valentderah/totk-pc-recomp": { game: "tears-of-the-kingdom", title: "The Legend of Zelda: Tears of the Kingdom", console: "Nintendo Switch" },
  // badcompany94-rcmp/project-tandem: deleted from GitHub on 9 November.
  "96dot/Dragon-Age-Origins-Recomp": { game: "dragon-age-origins", title: "Dragon Age: Origins", console: "Xbox 360" },
  "CarlosExabyte/Arceuszada": { game: "pokemon-legends-arceus", title: "Pokémon Legends: Arceus", console: "Nintendo Switch" },
  // drakolordx7/pokopia-recomp: deleted from GitHub on 5 November.
  "andrewnakas/gtav-recomp": { game: "gta-v", title: "Grand Theft Auto V", console: "Xbox 360" },
  "Re-TeRo17/ratchet-tod-recomp": { game: "ratchet-tools-of-destruction", title: "Ratchet & Clank: Tools of Destruction", console: "PlayStation 3" },
  "SpeedBreakerProject/speedbreaker-carbon": { game: "nfs-carbon", title: "Need for Speed: Carbon", console: "Xbox 360" },
  "TGP482/007Nightfire-XBERecomp": { game: "nightfire", title: "007: Nightfire", console: "Xbox" },
  "Yaz-Myst/ZOE-Recompiled": { game: "zone-of-the-enders", title: "Zone of the Enders", console: "PlayStation 2" },
  "hk21x/nightfire-recomp": { game: "nightfire", title: "007: Nightfire", console: "Xbox" },
  "fearkov/zakuro": { title: "Zakuro", console: "Nintendo 3DS", mechanism: "emulator" },
  "N900x4/HauntingGround-Recomp-Project": { game: "haunting-ground", title: "Haunting Ground", console: "PlayStation 2" },
  "Flippage/gears-of-war-3-recomp": { game: "gears-of-war-3", title: "Gears of War 3", console: "Xbox 360" },
  "Auremana666/Naruto-The-Broken-Bond-PC-Port": { game: "naruto-broken-bond", title: "Naruto: The Broken Bond", console: "Xbox 360" },
  "Masterllgod/naruto-storm-4-mod-port-nativo": { title: "Naruto Shippuden: Ultimate Ninja Storm Revolution", console: "Xbox 360" },
  "zenit2893-cmyk/Call-of-Duty-3-PC-Editon": { game: "call-of-duty-3", title: "Call of Duty 3", console: "Xbox 360" },
  "jessetbh/WWFNoMercyRecomp": { game: "wwf-no-mercy", title: "WWF No Mercy", console: "Nintendo 64" },
  "i2kiselev/fm4-static-recomp": { game: "forza-motorsport-4", title: "Forza Motorsport 4", console: "Xbox 360" },
  "BigDaddyJRich/hctp-recomp": { title: "WWE SmackDown! Here Comes the Pain", console: "PlayStation 2" },
  "Coz-0/smo-recomp": { game: "super-mario-odyssey", title: "Super Mario Odyssey", console: "Nintendo Switch" },
  "phobos665/split2-recomp": { game: "timesplitters-2", title: "TimeSplitters 2", console: "Xbox" },
  "wootbeer/dinotale": { game: "yoshis-story", title: "Yoshi's Story", console: "Nintendo 64" },
  "AbdelmoumenDeghbouche/knack_pc": { game: "knack", title: "Knack", console: "PlayStation 4" },
  "Antriksh1984/TheWarriors-XBERecomp": { game: "the-warriors", title: "The Warriors", console: "Xbox" },
  "FractalEngineer/Medal-Of-Honor-PSX-Recomp": { title: "Medal of Honor", console: "PlayStation" },
  "NoahVl/Birdman64": { game: "pilotwings-64", title: "Pilotwings 64", console: "Nintendo 64" },
  "Boron853/Souls-of-the-Reaper": { game: "diablo-iii", title: "Diablo III", console: "Xbox 360" },

  // Fifteenth batch, 3 November: seeded by hand (see SEED in build-catalog.ts).
  // Midnight Club: Los Angeles now has two ports.
  "whompay/SaintsReborn": { game: "saints-row", title: "Saints Row", console: "Xbox 360", mechanism: "recompiled" },
  "whompay/FNCReborn": { game: "fight-night-champion", title: "Fight Night Champion", console: "Xbox 360", mechanism: "recompiled" },
  "Wrexxial/HarmonyRecomp": { game: "castlevania-hod", title: "Castlevania: Harmony of Despair", console: "Xbox 360", mechanism: "recompiled" },
  "MaxDeadBear/NaughtyBear_ReStuff": { title: "Naughty Bear: Gold Edition", console: "Xbox 360", mechanism: "recompiled" },
  "nikolaygorb/PerfectDarkRemasterRecomp": { game: "perfect-dark-remaster", title: "Perfect Dark Remaster", console: "Xbox 360", mechanism: "recompiled" },
  "mzzvxm/LARecomp": { game: "midnight-club-la", title: "Midnight Club: Los Angeles", console: "Xbox 360", mechanism: "recompiled" },
  "RevoSucks/BM64Recomp": { title: "Bomberman 64", console: "Nintendo 64", mechanism: "recompiled" },
  "RevoSucks/BMHeroRecomp": { title: "Bomberman Hero", console: "Nintendo 64", mechanism: "recompiled" },
  "Zumbo06/Crash2Recomp": { game: "crash-bandicoot-2", title: "Crash Bandicoot 2: Cortex Strikes Back", console: "PlayStation", mechanism: "recompiled" },
  "Rotmill/Dino-Crisis-Modern-Edition": { game: "dino-crisis", title: "Dino Crisis", console: "PlayStation", mechanism: "recompiled" },
  "bromurok/BloodyRoarExtremeRecomp": { title: "Bloody Roar Extreme", console: "Xbox", mechanism: "recompiled" },
  "LightVelox/sotc-vibe-pc": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 2", mechanism: "recompiled" },
  "rages4calm/earthbound-companion": { game: "earthbound", title: "EarthBound", console: "SNES", mechanism: "native" },
  "yaz0r/Azel": { game: "panzer-dragoon-saga", title: "Panzer Dragoon Saga", console: "Sega Saturn", mechanism: "in-progress" },

  // Sixteenth batch, 12 November: what discovery added since the 3rd. God of War:
  // Ascension, inFAMOUS 2, Red Dead Revolver, Perfect Dark Remaster, Conker: Live &
  // Reloaded, Monster Hunter Freedom Unite and Pokopia now have two ports each.
  "scarletnx/ScarletNX": { title: "ScarletNX", console: "Nintendo Switch", mechanism: "emulator" },
  "rigaz29/Ascension-R": { game: "god-of-war-ascension", title: "God of War: Ascension", console: "PlayStation 3", mechanism: "recompiled" },
  "otavix010/gow-ascension-pc": { game: "god-of-war-ascension", title: "God of War: Ascension", console: "PlayStation 3", mechanism: "recompiled" },
  "kayliox/transformers-armada-recomp": { title: "Transformers", console: "PlayStation 2", mechanism: "recompiled" },
  "Dittobyte/Recompia": { game: "pokemon-pokopia", title: "Pokémon Pokopia", console: "Nintendo Switch 2", mechanism: "recompiled" },
  "TheRealestNwah/sotc-decomp": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 2", mechanism: "in-progress" },
  "SerenityG4K/SpaceAnimalsRecomp": { title: "Star Fox", console: "Nintendo Switch 2", mechanism: "recompiled" },
  "n64hub/mario-party-recomp": { game: "mario-party", title: "Mario Party", console: "Nintendo 64", mechanism: "recompiled" },
  "PateeerQ/FreedomUniteRecomp": { game: "monster-hunter-freedom-unite", title: "Monster Hunter Freedom Unite", console: "PSP", mechanism: "recompiled" },
  "bhuiyah/infamous2-recomp": { game: "infamous-2", title: "inFAMOUS 2", console: "PlayStation 3", mechanism: "recompiled" },
  "ThiagoFraga761/infamous2-pc": { game: "infamous-2", title: "inFAMOUS 2", console: "PlayStation 3", mechanism: "recompiled" },
  "Korvonordico/shadow-of-rome-recompiled": { game: "shadow-of-rome", title: "Shadow of Rome", console: "PlayStation 2", mechanism: "recompiled" },
  "OpenGP-dev/OpenGP": { title: "Mario Kart Arcade GP e GP 2", console: "Arcade", mechanism: "recompiled" },
  "TekRantGaming/Battlefield-1943-Reborn": { game: "battlefield-1943", title: "Battlefield 1943", console: "Xbox 360" },
  "galarianpikachu2021-hue/Racing-8-DX-Recomp": { game: "mario-kart-8-deluxe", title: "Mario Kart 8 Deluxe", console: "Nintendo Switch", mechanism: "recompiled" },
  "gamboozino/ng2recomp": { game: "ninja-gaiden-2", title: "Ninja Gaiden II", console: "Xbox 360", mechanism: "recompiled" },
  "bassobr/Far-Cry-Instincts-Recomp": { game: "far-cry-instincts", title: "Far Cry Instincts", console: "Xbox", mechanism: "recompiled" },
  "CaiusCodes/Perfect-Dark-XBLA-PC-Recomp": { game: "perfect-dark-remaster", title: "Perfect Dark Remaster", console: "Xbox 360", mechanism: "recompiled" },
  "saulob/tmnt-turtles-in-time-reshelled-recompiled": { title: "TMNT: Turtles in Time Re-Shelled", console: "Xbox 360", mechanism: "recompiled" },
  "TGP482/RDR-XBERecomp": { game: "red-dead-revolver", title: "Red Dead Revolver", console: "Xbox", mechanism: "recompiled" },
  "dennisabalo18-bot/red-dead-revolver-pc": { game: "red-dead-revolver", title: "Red Dead Revolver", console: "Xbox", mechanism: "recompiled" },
  // Goldoire/fefw-recomp: deleted from GitHub on 14 November.
  "TheBozos/TMB_Recomp": { game: "twisted-metal-black", title: "Twisted Metal: Black", console: "PlayStation 2", mechanism: "recompiled" },
  "LLCOOLT/paper-cut": { game: "paper-mario-ttyd", title: "Paper Mario: The Thousand-Year Door", console: "GameCube", mechanism: "native" },
  "saulob/13-sentinels-aegis-rim-pc": { game: "13-sentinels", title: "13 Sentinels: Aegis Rim", console: "PlayStation 4", mechanism: "native" },
  "ChupathingyCE/chupathingyce": { game: "halo-ce", title: "Halo: Combat Evolved", console: "Xbox", mechanism: "native" },
  "giacomozama/live-and-recompiled": { game: "conker-live-reloaded", title: "Conker: Live & Reloaded", console: "Xbox", mechanism: "recompiled" },
  "nikolaygorb/GoldenEye007ReloadedRecomp": { game: "goldeneye-reloaded", title: "GoldenEye 007: Reloaded", console: "Xbox 360", mechanism: "recompiled" },
  "dyzz/srw64-recomp": { title: "Super Robot Wars 64", console: "Nintendo 64", mechanism: "recompiled" },
  "TekRantGaming/Trials-ReVolution-Collection": { title: "Trials HD, Evolution e Fusion", console: "Xbox 360", mechanism: "recompiled" },
  "VibinToast/JetForceGemini-Recompiled": { game: "jet-force-gemini", title: "Jet Force Gemini", console: "Nintendo 64", mechanism: "recompiled" },
  "LasVola/godhand-recomp": { game: "god-hand", title: "God Hand", console: "PlayStation 2", mechanism: "recompiled" },
  "n0madic/StarCraft64-recomp": { title: "StarCraft 64", console: "Nintendo 64", mechanism: "recompiled" },
  "Dyotson/RecompiledHaloReach": { game: "halo-reach", title: "Halo: Reach", console: "Xbox 360", mechanism: "recompiled" },
  "JFryy/reshadowtower": { game: "shadow-tower", title: "Shadow Tower", console: "PlayStation", mechanism: "recompiled" },
  "FluffyQuack/rexglue-MetalSlugXX": { title: "Metal Slug XX", console: "Xbox 360", mechanism: "recompiled" },
  "Conker64Recomp/conker64-recompiled": { game: "conkers-bad-fur-day", title: "Conker's Bad Fur Day", console: "Nintendo 64", mechanism: "recompiled" },
  "matty45/Crackdown2-Recomp": { game: "crackdown-2", title: "Crackdown 2", console: "Xbox 360", mechanism: "in-progress" },

  // Seventeenth batch, 25 November: what discovery added since the 12th. Super Mario
  // Odyssey, Mario Kart 8 Deluxe, Battlefield 1943, TimeSplitters 2 and Diablo III now
  // have two ports or more each.
  "ZigZagBoi1/ScarlettPort": { title: "ScarlettPort", console: "Xbox Series X|S", mechanism: "translation-layer" },
  "ProjectLeonidaL/leonida": { game: "gta-vi", title: "Grand Theft Auto VI", console: "Xbox Series X|S", mechanism: "in-progress" },
  "Simon3Sarkis/super-odyssey-pc-recomp": { game: "super-mario-odyssey", title: "Super Mario Odyssey", console: "Nintendo Switch", mechanism: "recompiled" },
  "Vnnc1/MK8-online": { game: "mario-kart-8-deluxe", title: "Mario Kart 8 Deluxe", console: "Nintendo Switch", mechanism: "recompiled" },
  "CaduGimenes/SanctuaryPort": { game: "diablo-iii", title: "Diablo III", console: "PlayStation 4", mechanism: "native" },
  "papand7/Battlefield-1943-BC-Recompilation": { game: "battlefield-1943", title: "Battlefield 1943 e Bad Company", console: "Xbox 360", mechanism: "recompiled" },
  "Destinity13/TimeSplitters-2-Native-Recomp-Windows-Linux-SteamDeck": { game: "timesplitters-2", title: "TimeSplitters 2", console: "PlayStation 2", mechanism: "recompiled" },
  "SamiEnazi/infamous2-port": { game: "infamous-2", title: "inFAMOUS 2", console: "PlayStation 3", mechanism: "recompiled" },
  "cxldsakeb/GoW2-nativo-PS2": { game: "god-of-war-2", title: "God of War II", console: "PlayStation 2", mechanism: "in-progress" },
  "st4rwhx/Resident-Evil-4-Native-Port": { game: "resident-evil-4", title: "Resident Evil 4", console: "GameCube", mechanism: "native" },
  "Dipshet/GracemeriaRecomp": { game: "ace-combat-6", title: "Ace Combat 6: Fires of Liberation", console: "Xbox 360", mechanism: "recompiled" },
  "Jstar269/Nakagawa-Recomp": { title: "Nakagawa Recomp", console: "PSP", mechanism: "emulator" },
  "noahbaxter/GHClassic": { title: "Guitar Hero II", console: "PlayStation 2", mechanism: "recompiled" },
  "aoxzh/bayo3-recomp": { game: "bayonetta-3", title: "Bayonetta 3", console: "Nintendo Switch", mechanism: "recompiled" },
  "MormonFTP-hub/gt5-recomp": { game: "gran-turismo-5", title: "Gran Turismo 5", console: "PlayStation 3", mechanism: "recompiled" },
  "MikeSemicolonD/RogueSquadron64Recomp": { title: "Star Wars: Rogue Squadron", console: "Nintendo 64", mechanism: "recompiled" },
  "tyle-beep/Haiku": { game: "fire-emblem-fates", title: "Fire Emblem Fates", console: "Nintendo 3DS", mechanism: "recompiled" },
  "Tokatta007/OpenTM2": { title: "Twisted Metal 2", console: "PlayStation", mechanism: "recompiled" },
  "u0rhs/burnout3-native": { game: "burnout-3", title: "Burnout 3: Takedown", console: "PlayStation 2", mechanism: "native" },
  "PC-PORTERS/SplatPC-Splatoon-Native-PC-Port": { game: "splatoon", title: "Splatoon", console: "Wii U", mechanism: "recompiled" },
  "Adolini1715/Concrete-Jungle-PC": { title: "Predator: Concrete Jungle", console: "Xbox", mechanism: "recompiled" },
  "FoxWorkshop/ShadowRecomp": { game: "shadow-the-hedgehog", title: "Shadow the Hedgehog", console: "Xbox", mechanism: "recompiled" },
  "roz1077/true-crime-new-york-city-recomp": { game: "true-crime-nyc", title: "True Crime: New York City", console: "Xbox", mechanism: "recompiled" },
  "denzi-gh/crashwoc-nuworld": { game: "crash-wrath-of-cortex", title: "Crash Bandicoot: The Wrath of Cortex", console: "PlayStation 2", mechanism: "native" },
  "ReRevvedRecomp/rerevved": { game: "civilization-revolution", title: "Civilization Revolution", console: "Xbox 360", mechanism: "recompiled" },
  "Elie-0066/SPR-Recomp-Project": { title: "Splatoon Raiders", console: "Nintendo Switch 2", mechanism: "recompiled" },
  "MnkyArts/ProjectAvalanche": { game: "ssx-2012", title: "SSX", console: "Xbox 360", mechanism: "native" },
  "TheRealAfsan/Shinobi-PS2-Recomp": { title: "Shinobi", console: "PlayStation 2", mechanism: "native" },
  "ILFforever/YW4Recomp": { title: "Yo-kai Watch 4++", console: "Nintendo Switch", mechanism: "recompiled" },
  "Alano6678/hwaoi-recomp": { game: "hyrule-warriors-aoi", title: "Hyrule Warriors: Age of Imprisonment", console: "Nintendo Switch 2", mechanism: "recompiled" },
  "teclilla18/sonic-riders-recomp": { game: "sonic-riders", title: "Sonic Riders", console: "GameCube", mechanism: "recompiled" },
  "yozander2009-stack/Metroid-Dread-Recomp": { game: "metroid-dread", title: "Metroid Dread", console: "Nintendo Switch", mechanism: "recompiled" },
  "Scotho/socom-unzipped": { title: "SOCOM II: U.S. Navy SEALs", console: "PlayStation 2", mechanism: "recompiled" },
  "alexbeavs-ps1-ports/metal-gear-solid-recomp": { game: "metal-gear-solid", title: "Metal Gear Solid", console: "PlayStation", mechanism: "recompiled" },
  "alexbeavs-ps1-ports/parasite-eve-recomp": { game: "parasite-eve", title: "Parasite Eve", console: "PlayStation", mechanism: "recompiled" },
  "Coaltergeist/Brothership-Recomp": { game: "mario-luigi-brothership", title: "Mario & Luigi: Brothership", console: "Nintendo Switch", mechanism: "recompiled" },
  "geno55/kigold-recomp": { title: "Killer Instinct Gold", console: "Nintendo 64", mechanism: "recompiled" },
  "hk21x/007-agentunderfire-recomp": { title: "007: Agent Under Fire", console: "Xbox", mechanism: "recompiled" },
  "petrishevgeorgii-debug/prototype-pc-slop": { title: "Prototype e Prototype 2", console: "PlayStation 4", mechanism: "native" },
  "monscriser/HydroThunderPORT": { game: "hydro-thunder-hurricane", title: "Hydro Thunder Hurricane", console: "Xbox 360", mechanism: "recompiled" },
  "ElGuslml/PiratesAtWorldsEndRecomp": { title: "Pirates of the Caribbean: At World's End", console: "Xbox 360", mechanism: "recompiled" },
  "saulob/el-chavo-kart-recompiled": { title: "Chaves Kart", console: "Xbox 360", mechanism: "recompiled" },
  "TekRantGaming/angry-birds-re-hatched-collection": { title: "Angry Birds Trilogy e Star Wars", console: "Xbox 360", mechanism: "recompiled" },
  "projectedan/McRae05-XBE-Recomp": { title: "Colin McRae Rally 2005", console: "Xbox", mechanism: "recompiled" },
  "giangra/stuntdouble-reignition": { title: "Stuntman: Ignition", console: "Xbox 360", mechanism: "recompiled" },
  "mstan/StarFoxSNESRecomp": { game: "star-fox-snes", title: "Star Fox", console: "SNES", mechanism: "recompiled" },
  "omegakatana92/RidgeRacer4Recomp": { game: "ridge-racer-type-4", title: "Ridge Racer Type 4", console: "PlayStation", mechanism: "in-progress" },
  "FluffyQuack/rexglue-SoulCaliburIV": { game: "soulcalibur-iv", title: "SoulCalibur IV", console: "Xbox 360", mechanism: "recompiled" },

  // Eighteenth batch, 28 November. Hyrule Warriors: Age of Imprisonment and SSX
  // (2012) now have two ports each; GTA VI has two, both still early.
  "pixl27/ProjectReCity": { game: "gta-vi", title: "Grand Theft Auto VI", console: "Xbox Series X|S", mechanism: "in-progress" },
  "iCosiSenpai/age-of-decomp": { game: "hyrule-warriors-aoi", title: "Hyrule Warriors: Age of Imprisonment", console: "Nintendo Switch 2", mechanism: "recompiled" },
  "GenissonEmilio/ShadowOfTheColossusPC": { game: "shadow-of-the-colossus", title: "Shadow of the Colossus", console: "PlayStation 2", mechanism: "recompiled" },
  "TGP482/FCIP-XEXRecomp": { game: "far-cry-instincts-predator", title: "Far Cry Instincts: Predator", console: "Xbox 360", mechanism: "recompiled" },
  "AmarilloNL/ssx-recomp": { game: "ssx-2012", title: "SSX", console: "Xbox 360", mechanism: "recompiled" },
  "IvanBarbosaFilho/Yakuza-Kenzan-Recomp": { title: "Ryu ga Gotoku Kenzan!", console: "PlayStation 3", mechanism: "recompiled" },
  "Guuzzeji/otogi-xunchain": { game: "otogi", title: "Otogi: Myth of Demons", console: "Xbox", mechanism: "recompiled" },
  "efm-games/scarface-recomp": { title: "Scarface: The World Is Yours", console: "Xbox", mechanism: "recompiled" },
}

/**
 * A renamed or removed entry keeps answering at its old address: see
 * lib/slugs.ts.
 */
function recordSlugMoves(before: SlugRow[], after: SlugRow[]) {
  const file = 'lib/slug-history.json'
  const history: SlugHistory = JSON.parse(readFileSync(file, 'utf8'))
  const n = recordMoves(history, before, after)
  writeFileSync(file, `${JSON.stringify(history, null, 2)}\n`)
  if (n) console.log(`enderecos antigos  : ${n} redirecionados`)
  const goneFile = 'lib/slug-gone.json'
  const gone: GoneBook = JSON.parse(readFileSync(goneFile, 'utf8'))
  const g = recordGone(gone, before, after, history)
  writeFileSync(goneFile, `${JSON.stringify(gone, null, 2)}\n`)
  if (g) console.log(`entradas removidas : ${g} enderecos redirecionados`)
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
// Rows are edited in place below; the copy is what the addresses were.
const before = structuredClone(rows) as unknown as SlugRow[]

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
recordSlugMoves(before, rows as unknown as SlugRow[])

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
