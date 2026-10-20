/**
 * Intrinsic image dimensions read from the file header.
 *
 * The page lays every remote image out at its own aspect, so each one has to be
 * measured before it is written to a data file. Build-time only — nothing here
 * ships to the browser.
 */
export type Size = { w: number; h: number }

export function imageSize(buf: Buffer): Size | null {
  return png(buf) ?? webp(buf) ?? jpeg(buf) ?? gif(buf)
}

function png(buf: Buffer): Size | null {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
}

function gif(buf: Buffer): Size | null {
  if (buf.length < 10 || buf.toString('ascii', 0, 3) !== 'GIF') return null
  return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) }
}

/**
 * WebP has three container variants and they store the size differently.
 * Reading only VP8X — the rarest — silently rejected every image Fandom
 * serves, because its CDN transcodes to plain lossy VP8.
 */
function webp(buf: Buffer): Size | null {
  if (
    buf.length < 30 ||
    buf.toString('ascii', 0, 4) !== 'RIFF' ||
    buf.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null
  }

  const chunk = buf.toString('ascii', 12, 16)

  if (chunk === 'VP8X') {
    return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1 }
  }

  if (chunk === 'VP8 ') {
    // Keyframe sync code precedes the 14-bit dimensions.
    if (buf[23] !== 0x9d || buf[24] !== 0x01 || buf[25] !== 0x2a) return null
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
  }

  if (chunk === 'VP8L') {
    if (buf[20] !== 0x2f) return null
    const bits = buf.readUInt32LE(21)
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }
  }

  return null
}

function jpeg(buf: Buffer): Size | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let i = 2
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue }
    const marker = buf[i + 1]
    // SOF0–SOF15 carry the frame size; DHT, JPG and DAC share the range.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) }
    }
    const len = buf.readUInt16BE(i + 2)
    if (len < 2) return null
    i += 2 + len
  }
  return null
}
