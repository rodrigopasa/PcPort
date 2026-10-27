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
]

export function isUsableShot(s: { url: string; w: number; h: number }): boolean {
  if (SHARE_CARD.has(`${s.w}x${s.h}`)) return false
  return !REJECTED.some((r) => s.url.includes(r))
}
