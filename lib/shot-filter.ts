/**
 * What a screenshot slot must never show, applied by both scans and again when
 * a page is built, so a verdict takes effect without waiting for the weekly
 * rescan.
 */

/**
 * The two sizes of a share card: GitHub's social preview (1280x640) and Open
 * Graph's (1200x630). A README that leads with one is showing a poster, not
 * the game — three of the four promotional images found by looking at every
 * screenshot were exactly these sizes, one of them named social-preview. A
 * game frame is 16:9 or 4:3 and does not land on these numbers.
 *
 * The second scan, shots-extra.ts, took a repository's social preview as a
 * screenshot without this check, and a social preview is one of these two
 * sizes by definition: eleven of them reached the pages by that route.
 */
const SHARE_CARD = new Set(['1280x640', '1200x630'])

/**
 * Images a person looked at and rejected, by their URL or a fragment of it.
 * For what no rule can catch without also catching real screenshots: logos,
 * box scans, launchers listing other games, debugger windows, a progress
 * chart, and a photograph of a red panda.
 */
const REJECTED: string[] = [
  'PM%20thin%201%20-%20full.png',
  // Reviewed on contact sheets on 2026-10-27.
  "https://raw.githubusercontent.com/Alexbeav/fm4-recomp/main/assets/fm4-recompiled-hero.png",
  "https://raw.githubusercontent.com/alondero/aerogauge-recomp/main/docs/aerogauge-fan-art.png",
  "https://raw.githubusercontent.com/alondero/automobililamborghini-recomp/main/docs/lambo-fan-art.png",
  "https://raw.githubusercontent.com/bdragoncore/cor64/master/.github/mandelbrot.png?raw=true",
  "https://raw.githubusercontent.com/bdragoncore/cor64/master/.github/fputest1.png?raw=true",
  "https://raw.githubusercontent.com/bdragoncore/cor64/master/.github/cubes16bpp.png?raw=true",
  "https://raw.githubusercontent.com/dbalatoni13/nfsmw/main/assets/objdiff.png",
  "https://raw.githubusercontent.com/distilledorion-sketch/Initial-D-Arcade-Stage-3-Native-SH-4-Recompilation-WIP-/main/docs/media/native-intro-strip.png",
  "https://raw.githubusercontent.com/goliathret/EdgeOfTimeRecomp/main/docs/image.png",
  "https://raw.githubusercontent.com/GRAnimated/MinecraftLCE-docs/main/img/progress.png",
  "https://raw.githubusercontent.com/florinp93/hells-gate-recomp/main/assets/fan_artwork.png",
  "https://raw.githubusercontent.com/freefrank/LostOdysseyRecomp/main/assets/lost-odyssey-recomp.png",
  "https://repository-images.githubusercontent.com/1404285107/d7b6e3de-3fae-4c9f-9414-ac89fa766469",
  "https://raw.githubusercontent.com/hk21x/pgr2-recomp/main/docs/images/pgr2-pc-port.webp",
  "https://raw.githubusercontent.com/ioncodes/llvm8/master/images/instructions.png",
  "https://raw.githubusercontent.com/ioncodes/llvm8/master/images/llvm.png",
  "https://repository-images.githubusercontent.com/1351803914/37377fc6-f3a2-4871-a502-f0b9787d67c0",
  "https://repository-images.githubusercontent.com/1432695352/f5f3bcd9-d9b7-42f6-a675-49ac4c9d98b4",
  "https://img.youtube.com/vi/ETXCOsip1Uo/maxresdefault.jpg",
  "https://img.youtube.com/vi/hqvoalzgnNU/hqdefault.jpg",
  "https://raw.githubusercontent.com/OAleex/MojoRecomp/main/launcher/public/art/mojorecomp.png",
  "https://raw.githubusercontent.com/Odrannnn/MetroidPrimePort/master/assets/objdiff.png",
  "https://raw.githubusercontent.com/parappadev/parappa2/main/.github/resources/transparent.png",
  "https://alchemy.pascalpixel.com/PROGRESS_CHART.png",
  "https://alchemy.pascalpixel.com/guides/docs/introduction.png",
  "https://repository-images.githubusercontent.com/1351541282/a620cffd-306d-477b-8149-ac0559e9d3f1",
  "https://raw.githubusercontent.com/projectPiki/pikmin2/main/assets/dolphin-extract.png",
  "https://raw.githubusercontent.com/projectPiki/pikmin2/main/assets/objdiff.png",
  "https://repository-images.githubusercontent.com/466264592/aa32c6e3-7143-43fb-b100-48b49af4a392",
  "https://repository-images.githubusercontent.com/1388317348/504b8c7e-a257-4497-bbef-38710f3f818a",
  "https://raw.githubusercontent.com/shihabal3amri/tekken-tag-tournament-2-pc/main/.github/assets/download.png",
  "https://repository-images.githubusercontent.com/1181687250/e14cf723-c361-4566-b361-ebc39700d665",
  "https://repository-images.githubusercontent.com/1375755928/67c41dbc-aabb-43bd-bb8e-1cbc44661436",
  "https://raw.githubusercontent.com/RetroPortingToolKit/Retro-Launcher/main/docs/screenshots/hub-and-game-launcher.png",
  "https://raw.githubusercontent.com/RetroPortingToolKit/Retro-Launcher/main/docs/screenshots/queue-and-background-build.png",
  "https://raw.githubusercontent.com/TechnicallyComputers/Klonoa-Door-to-Phantomile/master/launcher_assets/img/boxart.png",
  "https://raw.githubusercontent.com/RetroPortingToolKit/Retro-Launcher/main/docs/screenshots/hub-and-game-launcher.png",
  "https://raw.githubusercontent.com/RetroPortingToolKit/Retro-Launcher/main/docs/screenshots/queue-and-background-build.png",
  "https://raw.githubusercontent.com/TechnicallyComputers/Street-Fighter-Alpha-3-Recomp/master/launcher_assets/img/boxart.png",
  "https://repository-images.githubusercontent.com/426044477/32ed5181-2454-4dbb-a62d-f1dd82dd3819",
  "https://repository-images.githubusercontent.com/1391290392/43371226-e7f6-4530-9662-35b27022397f",
  "https://repository-images.githubusercontent.com/1106809206/8ca7b8b8-a77b-4a02-a76a-ddb959872328",
  "https://raw.githubusercontent.com/wheremyfoodat/Panda3DS/master/docs/img/panda.jpg",
  "https://repository-images.githubusercontent.com/441414984/96aaa773-f5f1-43a6-8ca4-ad38009540a2",
  "https://repository-images.githubusercontent.com/7550637/e819cd00-6d5a-11e9-9633-e837c2ffe515",
  "https://raw.githubusercontent.com/z3xox/BT3-Recomp/main/ps2xRuntime/assets/background.png",
  // Reviewed on contact sheets on 2026-11-25: logos, settings screens, launcher menus,
  // promotional art and blank or debug frames.
  "https://alchemy.pascalpixel.com/docs.png",
  "https://raw.githubusercontent.com/ZigZagBoi1/ScarlettPort/main/assets/world-fallback-light.png",
  "https://raw.githubusercontent.com/ZigZagBoi1/ScarlettPort/main/assets/tutorial-prompt.png",
  "https://github.com/user-attachments/assets/3682fe9c-0deb-466c-adbe-285a1fd7bbcc",
  "https://raw.githubusercontent.com/Destinity13/TimeSplitters-2-Native-Recomp-Windows-Linux-SteamDeck/main/news/img/2026-11-24-mapmaker-after.jpg",
  "https://github.com/user-attachments/assets/abb979d7-24a5-44f8-98d3-088ba2054a74",
  "https://raw.githubusercontent.com/papand7/Battlefield-1943-BC-Recompilation/main/docs/images/launcher.png",
  "https://github.com/user-attachments/assets/6d9a8f86-322c-4cd2-a3d3-ba68ba2d37e9",
  "https://github.com/user-attachments/assets/9dbfee69-26c8-446a-929c-e58336b61894",
  "https://github.com/user-attachments/assets/6a63daac-5396-4723-833d-4b9519c8006d",
  "https://github.com/user-attachments/assets/eb23ea38-f97d-43a1-b22c-e58a80f90aa7",
  "https://github.com/user-attachments/assets/4bbb3a93-667c-4fba-8a0b-40af41ab8816",
  "https://github.com/user-attachments/assets/80e5b460-b066-4221-aa5c-0543cdbc8745",
  "https://github.com/user-attachments/assets/d3c2a9a7-304d-406f-a649-6dcd6d6916c4",
  "https://github.com/user-attachments/assets/88e4cb18-6560-4736-86dd-b3e03b1cd5b0",
  "https://github.com/user-attachments/assets/8841c75d-1d5b-43f5-b19e-050b05fb7d08",
  "https://github.com/user-attachments/assets/820f864a-ac8d-4ab6-a5d6-f497eeb799a5",
  "https://github.com/user-attachments/assets/698fc8fc-23c1-4b56-9309-6330b743f5d0",
  "https://github.com/user-attachments/assets/d13e1fb6-ba97-4067-84e1-c2362d66d7c4",
  "https://github.com/user-attachments/assets/e0156eb8-c1b5-49d9-ab93-3abb46bf5f47",
  "https://github.com/user-attachments/assets/363e9317-6e84-47c4-882f-de36724157ce",
  "https://raw.githubusercontent.com/TekRantGaming/angry-birds-re-hatched-collection/main/docs/images/launcher-home.jpg",
  "https://raw.githubusercontent.com/TekRantGaming/angry-birds-re-hatched-collection/main/docs/images/header.jpg",
  "https://github.com/user-attachments/assets/a3f0d351-4e54-43b4-bb78-0d2f4bedec8b",
  "https://github.com/user-attachments/assets/1779fdfd-bc3a-416d-8b6c-38874d8eae93",
  "https://github.com/user-attachments/assets/6f59e8e5-6d00-424c-81e1-7b93c6fee169",
  "https://github.com/user-attachments/assets/2bf3f451-05f7-40a8-80ce-93ad4740b90a",
  "https://github.com/user-attachments/assets/d80c06b9-bc26-4fca-b235-22de8d32971b",
  "https://github.com/user-attachments/assets/acde8277-e179-48aa-a379-329655ab4323",
  // Reviewed on contact sheets on 2026-11-28: launcher and settings screens,
  // promotional pages, official art and a frame with Android touch controls.
  "https://raw.githubusercontent.com/iCosiSenpai/age-of-decomp/main/docs/assets/screenshots/home.png",
  "https://raw.githubusercontent.com/iCosiSenpai/age-of-decomp/main/docs/assets/screenshots/setup.png",
  "https://raw.githubusercontent.com/iCosiSenpai/age-of-decomp/main/docs/assets/screenshots/display.png",
  "https://raw.githubusercontent.com/TekRantGaming/Battlefield-1943-Reborn/main/docs/images/readme/hero.png",
  "https://raw.githubusercontent.com/TekRantGaming/Battlefield-1943-Reborn/main/docs/images/readme/board-048.jpg",
  "https://raw.githubusercontent.com/TekRantGaming/Battlefield-1943-Reborn/main/docs/images/readme/chapter-1.png",
  "https://github.com/user-attachments/assets/5dd81a7e-44d2-44fa-8f6b-86bf49129ac8",
  "https://github.com/user-attachments/assets/e07df3fd-04f2-4dbd-af32-0faa8ec42773",
  "https://raw.githubusercontent.com/GenissonEmilio/ShadowOfTheColossusPC/main/docs/android-widescreen.png",
  "https://raw.githubusercontent.com/teclilla18/sonic-riders-recomp/main/docs/images/v0.10.0/online-crossplay.jpg",
  "https://raw.githubusercontent.com/teclilla18/sonic-riders-recomp/main/docs/images/sonic-riders-readme.jpg",
  "https://raw.githubusercontent.com/Destinity13/TimeSplitters-2-Native-Recomp-Windows-Linux-SteamDeck/main/news/img/online-hero.jpg",
  "https://github.com/user-attachments/assets/def470af-3424-4f7b-910c-f9d327352faa",
  "https://raw.githubusercontent.com/AmarilloNL/ssx-recomp/main/art/screenshot-setup.png",
  "https://raw.githubusercontent.com/AmarilloNL/ssx-recomp/main/art/screenshot-f1-display.png",
  "https://github.com/user-attachments/assets/bbcdef35-0007-42e6-ba53-da89b478f862",
]

export function isUsableShot(s: { url: string; w: number; h: number }): boolean {
  if (SHARE_CARD.has(`${s.w}x${s.h}`)) return false
  return !REJECTED.some((r) => s.url.includes(r))
}
