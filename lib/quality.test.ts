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
  // `platforms` cannot settle this either way: this project publishes no
  // release at all, so there is no binary to read. The words have to carry it.
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

test('rejects a project that describes itself as a companion app', () => {
  // This checks the description rule only. It does NOT cover the repository
  // that prompted it: those words are in that project's README, and the
  // catalog stores only the repo blurb. See the deny-list test below.
  const v = isCatalogable({
    repo: 'x/some-companion',
    title: 'pokopia desktop edition',
    description:
      'A desktop companion for the Pokemon Pokopia universe: a Pokedex, trainer management console and real-time battle assistant.',
    topics: ['pc-port', 'pokopia-pc', 'pokopia-windows', 'nintendo-port'],
  })
  assert.equal(v.ok, false)
})

test('the deny list rejects a repository on its real stored text', () => {
  // Exactly what lib/catalog.json holds for it: repo, title, description. No
  // topics, no README. Nothing in this text gives the project away, which is
  // the whole reason the deny list exists.
  const v = isCatalogable({
    repo: 'aleksandarsimjanoski/pokopia-desktop-edition',
    title: 'pokopia desktop edition',
    description:
      "Pok\u00e9mon Pokopia Desktop | Catch \u2018Em All in 2026 on Windows & Nintendo PC Ports",
  })
  assert.equal(v.ok, false)
  assert.match((v as { reason: string }).reason, /not a port/)
})

test('a decompiler tool is rejected however its topics are tagged', () => {
  // These came back every hour. Ingestion passes the repository's topics and
  // the pruner cannot, so `decompilation` as a topic re-admitted nine entries
  // that had been removed by hand. The verdict must not depend on it.
  const tool = {
    repo: 'Vector35/binaryninja-api',
    title: 'binaryninja api',
    description: 'Public API, examples, documentation and issues for Binary Ninja',
  }
  const bare = isCatalogable(tool)
  const tagged = isCatalogable({
    ...tool,
    topics: ['decompilation', 'reverse-engineering', 'binary-analysis'],
  })
  assert.equal(bare.ok, false)
  assert.equal(tagged.ok, false, 'topics must not rescue a tool the description rejects')
})

test('rejects a repository with neither a build nor any port signal', () => {
  const v = isCatalogable({ repo: 'x/nbcraft', description: 'The ultimate cross-platform mining experience.' })
  assert.equal(v.ok, false)
})

test('rejects an empty description with no release', () => {
  assert.equal(isCatalogable({ repo: 'x/mystery', description: null }).ok, false)
})


test('rejects an entry whose release ships only phone binaries', () => {
  // The binary counterpart of the rule above, and the one that would have
  // caught X360-Mobile without a hand-written deny-list entry: platforms is
  // read off the release's own file names, so .apk-only reads as Android.
  const v = isCatalogable({
    repo: 'x/some-360-emulator',
    description: 'Xbox 360 emulator, fast and accurate',
    platforms: ['Android'],
  })
  assert.equal(v.ok, false)
  assert.match((v as { reason: string }).reason, /not the PC/)
})

test('keeps an entry that ships a phone build alongside a PC one', () => {
  const v = isCatalogable({
    repo: 'x/gow2-recomp',
    description: 'God of War 2 static recompilation, native build',
    platforms: ['Windows', 'Android'],
  })
  assert.equal(v.ok, true, (v as { reason?: string }).reason)
})

test('an empty platforms list rejects nothing', () => {
  // Empty means nothing could be read, not that there is no PC build. An
  // in-progress decompilation with no release has to survive this.
  const v = isCatalogable({
    repo: 'x/mk-decomp',
    description: 'Mortal Kombat (N64) decompilation in progress, native port',
    platforms: [],
  })
  assert.equal(v.ok, true, (v as { reason?: string }).reason)
})
