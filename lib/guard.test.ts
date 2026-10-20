import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkAsset, checkRelease, checkLink } from './guard'

// The hard constraint is the one rule the project cannot drift on, so it is the
// one piece with tests. Each case below is a real pattern seen in this category.

test('accepts an ordinary port build', () => {
  assert.equal(checkAsset({ name: 'Zelda64Recomp-Windows-v1.2.0.zip', size: 42_000_000 }).ok, true)
  assert.equal(checkAsset({ name: 'soh-linux.AppImage', size: 70_000_000 }).ok, true)
})

test('rejects console game-data extensions', () => {
  for (const name of [
    'Bloodborne-CUSA00900.pkg',
    'game.iso',
    'Zelda.z64',
    'pokemon.nds',
    'title.nsp',
    'disc.chd',
    'backup.rvz',
  ]) {
    assert.equal(checkAsset({ name, size: 1000 }).ok, false, `${name} should be rejected`)
  }
})

test('does not reject .bin, which is any compiled artifact', () => {
  // Regression: this rejected OpenGOAL's language server and dropped the entry.
  assert.equal(checkAsset({ name: 'opengoal-lsp-linux-v0.3.9.bin', size: 9_000_000 }).ok, true)
})

test('rejects names that mark a dump rather than a port', () => {
  assert.equal(checkAsset({ name: 'God.of.War.3.Complete.Edition.zip' }).ok, false)
  assert.equal(checkAsset({ name: 'Shadow.of.the.Colossus-CUSA08809-EUR.zip' }).ok, false)
  assert.equal(checkAsset({ name: 'full_game_backup.7z' }).ok, false)
})

test('rejects file-locker hosts', () => {
  assert.equal(
    checkAsset({ name: 'port.zip', url: 'https://drive.google.com/file/d/abc' }).ok,
    false,
  )
  assert.equal(checkAsset({ name: 'port.zip', url: 'https://mega.nz/file/xyz' }).ok, false)
})

test('rejects assets too large to be a port', () => {
  assert.equal(checkAsset({ name: 'build.zip', size: 22_000_000_000 }).ok, false)
})

test('one bad asset rejects the whole release', () => {
  const verdict = checkRelease([
    { name: 'port-windows.zip', size: 40_000_000 },
    { name: 'game.pkg', size: 20_000_000_000 },
  ])
  assert.equal(verdict.ok, false)
})

test('checkLink guards outbound URLs too', () => {
  assert.equal(checkLink('https://github.com/org/repo/releases').ok, true)
  assert.equal(checkLink('https://mega.nz/file/abc').ok, false)
  assert.equal(checkLink('https://example.com/Bloodborne.pkg').ok, false)
})
