import test from 'node:test'
import assert from 'node:assert/strict'
import { detectPlatforms, readPlatforms } from './platforms'

test('an .apk-only release is Android, never Windows', () => {
  // The case that paid for this file: Ashnar2602/X360-Mobile---OFFICIAL ships
  // nothing but .apk files, and the old fallback recorded Windows.
  const r = readPlatforms([{ name: 'X360-Mobile-v1.2.apk' }, { name: 'X360-Mobile-v1.2-arm64.apk' }])
  assert.deepEqual(r.platforms, ['Android'])
  assert.equal(r.nonPcOnly, true)
})

test('an .exe release is Windows', () => {
  assert.deepEqual(detectPlatforms([{ name: 'setup.exe' }]), ['Windows'])
})

test('a mixed Windows and Android release reports both', () => {
  const r = readPlatforms([
    { name: 'game-windows-x64.zip' },
    { name: 'game-android.apk' },
  ])
  assert.deepEqual(r.platforms, ['Windows', 'Android'])
  assert.equal(r.nonPcOnly, false, 'a PC build is there, so the entry belongs here')
})

test('no release claims nothing, and says it was not judged', () => {
  const r = readPlatforms(null)
  assert.deepEqual(r.platforms, [])
  assert.equal(r.judged, false)
  assert.equal(r.nonPcOnly, false)
})

test('a release whose file names say nothing is judged and still claims nothing', () => {
  // Different from the case above: this one WAS read. A bare .zip is not
  // evidence of an operating system, which is what the old fallback assumed.
  const r = readPlatforms([{ name: 'sm64ex.zip' }, { name: 'source-code.7z' }])
  assert.deepEqual(r.platforms, [])
  assert.equal(r.judged, true)
  assert.equal(r.nonPcOnly, false, 'nothing was read, so nothing is rejected on it')
})

test('platforms come out in a stable order', () => {
  assert.deepEqual(
    detectPlatforms([
      { name: 'port-macos.dmg' },
      { name: 'port-linux.AppImage' },
      { name: 'port-win64.zip' },
    ]),
    ['Windows', 'Linux', 'macOS'],
  )
})

test('word rules do not fire on words that merely contain them', () => {
  // `darwin` contains `win`, and an unbounded `mac` matches Pac-Man.
  assert.deepEqual(detectPlatforms([{ name: 'port-darwin-arm64.tar.gz' }]), ['macOS'])
  assert.deepEqual(detectPlatforms([{ name: 'pacman-remake.7z' }]), [])
})

test('a file that says only PC reports PC, which still counts as a desktop build', () => {
  const r = readPlatforms([{ name: 'SvR2011-PC-v2.1.4.1.zip' }, { name: 'SvR2011-Android-v2.1.4.1.apk' }])
  assert.deepEqual(r.platforms, ['PC', 'Android'])
  assert.equal(r.nonPcOnly, false, 'there is a desktop build, so the quality rule must not fire')
})

test('PC gives way to a named desktop OS in the same release', () => {
  assert.deepEqual(detectPlatforms([{ name: 'port-pc-win64.zip' }]), ['Windows'])
})
