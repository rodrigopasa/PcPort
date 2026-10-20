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

test('rejects a repository with neither a build nor any port signal', () => {
  const v = isCatalogable({ repo: 'x/nbcraft', description: 'The ultimate cross-platform mining experience.' })
  assert.equal(v.ok, false)
})

test('rejects an empty description with no release', () => {
  assert.equal(isCatalogable({ repo: 'x/mystery', description: null }).ok, false)
})
