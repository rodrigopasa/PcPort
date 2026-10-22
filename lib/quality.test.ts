import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isCatalogable } from './quality'

// Every case below is a real repository the first automated discovery pulled
// in, which is why the filter exists at all.

test('rejects awesome-lists by repository name', () => {
  for (const repo of [
    'SubmitGame/awesome-decomp-games',
    'CharlotteCross1998/awesome-game-decompilations',
    'bailo167/awesome-game-mashups',
    'Sebastrion/awesome-unofficial-pc-ports',
  ]) {
    const v = isCatalogable({ repo, description: 'Curated list of PC ports' })
    assert.equal(v.ok, false, `${repo} should be rejected`)
  }
})

test('rejects emulator tooling that is not a port', () => {
  const cases = [
    { repo: 'x/xenia-settings', description: 'cool place that should fix your issues on xenia game settings' },
    { repo: 'x/patches', description: 'Game patches for the Xenia emulator' },
    { repo: 'x/tui-hub', description: 'Best Xbox 360 Mod Suite for Homebrew and Trainers' },
  ]
  for (const c of cases) {
    assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
  }
})

test('keeps real ports whose description never says the word "port"', () => {
  // These were rejected by an earlier keyword filter, which is why the rule
  // leans on release assets instead.
  const v = isCatalogable({
    repo: 'x/snowboardkids2',
    description: 'Snowboard Kids 2 for PC (Windows/Linux/MacOS)',
    version: 'v1.0',
    sizeBytes: 30_000_000,
  })
  assert.equal(v.ok, true)
})

test('keeps a port identified only by its release asset', () => {
  const v = isCatalogable({
    repo: 'andrebrumdev/gow2-recomp',
    title: 'gow2',
    description: 'God of War 2',
    version: 'v0.2',
    sizeBytes: 18_000_000,
  })
  assert.equal(v.ok, true)
})

test('keeps an in-progress decompilation with no release', () => {
  const v = isCatalogable({
    repo: 'kirklandsig/halo2-decompiled',
    description: 'Halo 2 decompilation for the original Xbox: a matching decompilation into C/C++ source.',
  })
  assert.equal(v.ok, true)
})

test('rejects general-purpose decompiler tooling', () => {
  // Both slipped through on the `decomp` prefix alone.
  const cases = [
    { repo: 'x/ddc', title: 'ddc', description: 'Android DEX → Java decompiler in Rust, built for speed' },
    { repo: 'x/kuna', title: 'kuna', description: 'An agent-first decompiler designed to be refined by models' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('keeps a game decompilation, which is the thing itself', () => {
  const v = isCatalogable({
    repo: 'pret/pokeplatinum',
    title: 'Pokémon Platinum',
    description: 'Decompilation of Pokémon Platinum',
  })
  assert.equal(v.ok, true)
})

test('rejects source ports of games that were already PC games', () => {
  const cases = [
    { repo: 'fabiangreffrath/woof', description: 'Woof! is a continuation of the Boom/MBF bloodline of Doom source ports' },
    { repo: 'bibendovsky/bstone', description: 'Unofficial source port for Blake Stone series' },
    { repo: 'skyjake/Doomsday-Engine', description: 'A portable, enhanced source port of Doom, Heretic and Hexen.' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('rejects ports whose only target is not a PC', () => {
  const cases = [
    { repo: 'x/harkinianpad', description: 'Ocarina of Time native on iOS and iPadOS via Ship of Harkinian' },
    { repo: 'x/Watch_Quake', description: 'Quake 1 port for Apple Watch' },
    { repo: 'x/PS5X360', description: 'Experimental Xbox 360 emulator for PlayStation 5' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('keeps a port that lists a phone alongside the PC', () => {
  // The non-PC rule must not catch the many ports that ship Windows and
  // Android from one codebase.
  const v = isCatalogable({
    repo: 'nathanialf/ico-pc',
    description: 'PC, Android, iOS and macOS port of the ICO (PS2) decompilation',
    version: 'v1',
    sizeBytes: 20_000_000,
  })
  assert.equal(v.ok, true)
})

test('rejects developer tooling that supports porting without being a port', () => {
  const cases = [
    { repo: 'ethteck/splat', description: 'A binary splitting tool to assist with decompilation and modding projects' },
    { repo: 'emoose/idaxex', description: 'XEX/XBE loader plugin for IDA 9' },
    { repo: 'iliazeus/iso2god-rs', description: 'A command-line tool to convert Xbox 360 ISOs' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('a release asset is not evidence on its own', () => {
  // This walked in with 1811 stars because it ships releases. It encrypts
  // Spring Boot JARs.
  const v = isCatalogable({
    repo: 'core-lib/xjar',
    title: 'xjar',
    description: 'Spring Boot JAR 安全加密运行工具，支持的原生JAR。',
    version: 'v4.0.2',
    sizeBytes: 5_000_000,
  })
  assert.equal(v.ok, false)
})

test('keeps emulators, which are long-tail content rather than the focus', () => {
  // Native ports are what the catalog is about, but an emulator is how a lot
  // of people actually reach a console game on the PC. They are kept and get
  // their own status so a visitor can tell them apart and filter them out.
  const cases = [
    { repo: 'wheremyfoodat/Panda3DS', description: 'HLE 3DS emulator' },
    { repo: 'shadps4-emu/shadPS4', description: 'PlayStation 4 emulator for Windows, Linux and macOS' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, true, `${c.repo} should be kept`)
})

test('an emulator manager is still tooling, not an emulator', () => {
  const v = isCatalogable({
    repo: 'xenia-manager/xenia-manager',
    description: 'Xenia Manager is a tool that tries to make using Xenia Emulator easier.',
  })
  assert.equal(v.ok, false)
})

test('keeps ports that describe themselves as having no emulator', () => {
  // The denial and the claim are nearly the same words, which is why the
  // emulator check reads them rather than pattern-matching one of them.
  const cases = [
    { repo: 'x/gow3', description: 'Native PS4-to-PC port with no emulator: the executable runs on the CPU', version: 'v1', sizeBytes: 1e7 },
    { repo: 'x/ngb', description: 'Ninja Gaiden Black statically recompiled into native builds, without an emulator', version: 'v1', sizeBytes: 1e7 },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, true, `${c.repo} should be kept`)
})

test('rejects hardware and data utilities', () => {
  const cases = [
    { repo: 'dancol90/mi-360', description: 'Xbox360 controller emulation for Xiaomi Gamepad, with vibration support' },
    { repo: 'aerosoul94/FATXTools', description: 'FATX Data Recovery Tools (C#)' },
    { repo: 'larscom/xbox360-controller-manager', description: 'see the battery status of the connected controller' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('keeps a port whose non-PC platform is the source, not the target', () => {
  // `platforms` cannot settle this: detectPlatforms falls back to Windows when
  // it finds nothing, so every row claims it. The words have to carry it.
  const v = isCatalogable({
    repo: 'MaryNCRT/Ultimate-Mortal-Kombat-3-iOS-Decompiled',
    title: 'Ultimate Mortal Kombat 3 iOS Decompiled',
    description:
      'Ultimate Mortal Kombat 3 (iOS, EA Mobile 2011), fully decompiled. ' +
      'Native port in progress. No game assets - bring your own copy.',
  })
  assert.equal(v.ok, true, (v as { reason?: string }).reason)
})

test('rejects a port whose target is another console or a phone', () => {
  const cases = [
    { repo: 'centollOS/SwitchWakerHD', description: 'Wind Waker HD (Wii U) static recompilation for Nintendo Switch, deko3d renderer' },
    { repo: 'x/projectreach', description: 'Halo: Combat Evolved on iPhone, iPad and Mac.' },
  ]
  for (const c of cases) assert.equal(isCatalogable(c).ok, false, `${c.repo} should be rejected`)
})

test('rejects a repository with neither a build nor any port signal', () => {
  const v = isCatalogable({ repo: 'x/nbcraft', description: 'The ultimate cross-platform mining experience.' })
  assert.equal(v.ok, false)
})

test('rejects an empty description with no release', () => {
  assert.equal(isCatalogable({ repo: 'x/mystery', description: null }).ok, false)
})
