import assert from 'node:assert/strict'
import test from 'node:test'
import { deriveTitle, fromRepoName } from './title'

// Every case below is a real entry that shipped with a broken name.

test('a stated name is used when it reads like one', () => {
  // 'port via' names no game, so the repository name is used, cased.
  assert.equal(deriveTitle('crackdown-xbox360-recompiled', 'Crackdown native PC port via static recompilation'), 'Crackdown Xbox 360')
  assert.equal(
    deriveTitle('hercules-recompiled', 'Native PC port of Disney\'s Hercules (SCES-00893) plus its decompilation'),
    "Disney's Hercules",
  )
})

test('a generic phrase is never taken for a name', () => {
  // "the N64 Classic: Rush 2" — the name is after the colon.
  assert.equal(deriveTitle('rush2recompiled', 'A recompilation of the N64 Classic: Rush 2'), 'Rush 2')
  // "the Xbox 360 release for Ridge Racer 6" names a release, not a game:
  // the repository name is the better source.
  assert.equal(
    deriveTitle('RidgeRacer6-Recompilation', 'A recompilation of the Xbox 360 release for Ridge Racer 6 on PC'),
    'Ridge Racer 6',
  )
})

test('decoration and leading articles are dropped', () => {
  // "both ☀️ Golden Sun games" is a phrase, so the repository name wins.
  assert.equal(deriveTitle('alchemy', '🌋 Alchemy is a decompilation of both ☀️ Golden Sun games for Gameboy Advance'), 'Alchemy')
})

test('the repository fallback is cased and loses the port vocabulary', () => {
  assert.equal(fromRepoName('naruto-rise-recomp'), 'Naruto Rise')
  assert.equal(fromRepoName('urban-reign-recomp'), 'Urban Reign')
  assert.equal(fromRepoName('fifa09-recomp'), 'Fifa 09')
  assert.equal(fromRepoName('wwe12-pc'), 'Wwe 12')
})

test('the owner’s deliberate casing survives', () => {
  assert.equal(fromRepoName('hl360-Forza2'), 'Hl 360 Forza 2')
  assert.equal(fromRepoName('MegaManX4Recomp'), 'Mega Man X4')
  assert.equal(fromRepoName('SOTC'), 'SOTC')
})

test('no derived title starts in lower case', () => {
  for (const [name, desc] of [
    ['mzm', 'Metroid Zero Mission Decompilation'],
    ['cvlod_recomp', 'Recompile Castlevania: Legacy of Darkness (N64) into a native executable'],
    ['band3_recomp', 'band3 recomp'],
    ['reNut', 'Banjo-Kazooie: Nuts and Bolts Recompilation with Rexglue'],
  ]) {
    const t = deriveTitle(name, desc)
    assert.match(t, /^[A-Z0-9.]/, `${name} -> ${t}`)
  }
})

test('a trailing clause about the port is cut, and only that', () => {
  assert.equal(
    deriveTitle('sotersrecomp', 'Static recompilation of Star Wars: Shadows of the Empire for Nintendo 64'),
    'Star Wars: Shadows of the Empire',
  )
  assert.equal(deriveTitle('hm64', 'A PC port of Harvest Moon 64 made using N64: Recompiled'), 'Harvest Moon 64')
  assert.equal(
    deriveTitle('aidyn', 'Recompilation of Aidyn Chronicles: the First Mage on the Nintendo 64'),
    'Aidyn Chronicles: the First Mage',
  )
  // "for" inside a real name stays: it only cuts before a platform.
  assert.equal(deriveTitle('nfsmw', 'Native PC port of Need for Speed: Most Wanted'), 'Need for Speed: Most Wanted')
})

test('abbreviations, "into" and lower-case "with" clauses are handled', () => {
  assert.equal(deriveTitle('mkvsdc', 'Static recompilation of Mortal Kombat vs. DC Universe for Xbox 360'), 'Mortal Kombat vs. DC Universe')
  assert.equal(deriveTitle('ac5', 'Recompilation of Ace Combat 5 with native rendering'), 'Ace Combat 5')
  assert.equal(deriveTitle('sm64ds', 'Decompilation of Super Mario 64 DS into C/C++'), 'Super Mario 64 DS')
})

test('glued repository names are split and lose the glued port word', () => {
  assert.equal(fromRepoName('ApeEscapeRecomp'), 'Ape Escape')
  assert.equal(fromRepoName('MegaManX4Recomp'), 'Mega Man X4')
  assert.equal(fromRepoName('SuperMarioWorldRecomp'), 'Super Mario World')
  assert.equal(fromRepoName('PerfectDarkZeroRecomp'), 'Perfect Dark Zero')
})
