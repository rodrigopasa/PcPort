import { test } from 'node:test'
import assert from 'node:assert/strict'
import { imageSize } from './imagesize'

// Minimal valid headers; only the fields the reader touches need to be real.

test('reads PNG', () => {
  const b = Buffer.alloc(24)
  b.writeUInt32BE(0x89504e47, 0)
  b.writeUInt32BE(1920, 16)
  b.writeUInt32BE(1080, 20)
  assert.deepEqual(imageSize(b), { w: 1920, h: 1080 })
})

test('reads GIF', () => {
  const b = Buffer.alloc(10)
  b.write('GIF89a', 0, 'ascii')
  b.writeUInt16LE(640, 6)
  b.writeUInt16LE(480, 8)
  assert.deepEqual(imageSize(b), { w: 640, h: 480 })
})

test('reads lossy VP8 WebP', () => {
  // Regression: only VP8X was handled, so every image Fandom's CDN
  // transcodes — which is all of them — measured as null and was dropped.
  const b = Buffer.alloc(32)
  b.write('RIFF', 0, 'ascii')
  b.write('WEBP', 8, 'ascii')
  b.write('VP8 ', 12, 'ascii')
  b[23] = 0x9d
  b[24] = 0x01
  b[25] = 0x2a
  b.writeUInt16LE(1514, 26)
  b.writeUInt16LE(2172, 28)
  assert.deepEqual(imageSize(b), { w: 1514, h: 2172 })
})

test('reads lossless VP8L WebP', () => {
  const b = Buffer.alloc(32)
  b.write('RIFF', 0, 'ascii')
  b.write('WEBP', 8, 'ascii')
  b.write('VP8L', 12, 'ascii')
  b[20] = 0x2f
  // 14 bits of (width-1), then 14 bits of (height-1)
  b.writeUInt32LE((799 & 0x3fff) | ((599 & 0x3fff) << 14), 21)
  assert.deepEqual(imageSize(b), { w: 800, h: 600 })
})

test('reads VP8X WebP', () => {
  const b = Buffer.alloc(32)
  b.write('RIFF', 0, 'ascii')
  b.write('WEBP', 8, 'ascii')
  b.write('VP8X', 12, 'ascii')
  b.writeUIntLE(1279, 24, 3)
  b.writeUIntLE(719, 27, 3)
  assert.deepEqual(imageSize(b), { w: 1280, h: 720 })
})

test('reads JPEG past a leading APP0 segment', () => {
  const b = Buffer.alloc(40)
  b[0] = 0xff
  b[1] = 0xd8
  b[2] = 0xff
  b[3] = 0xe0
  b.writeUInt16BE(10, 4) // APP0 length
  const sof = 14
  b[sof] = 0xff
  b[sof + 1] = 0xc0
  b.writeUInt16BE(17, sof + 2)
  b.writeUInt16BE(1036, sof + 5) // height
  b.writeUInt16BE(1920, sof + 7) // width
  assert.deepEqual(imageSize(b), { w: 1920, h: 1036 })
})

test('returns null on something that is not an image', () => {
  assert.equal(imageSize(Buffer.from('<!doctype html><html>')), null)
})
