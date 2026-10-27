/**
 * Second pass for entries whose README carries no usable image.
 *
 *   npx tsx scripts/shots-extra.ts
 *
 * Two further sources, both the project's own material and both free of
 * credentials or rate limits:
 *
 *   1. The repository's social preview, but ONLY when the maintainer uploaded
 *      one. A curated banner is served from repository-images.githubusercontent
 *      .com; GitHub's auto-generated card comes from opengraph.githubassets.com
 *      and is just the repo name on a gradient, so it is rejected.
 *   2. Images embedded in release notes, read from the releases Atom feed,
 *      which needs no API token.
 *
 * Merges into lib/shots.json without touching entries that already have images.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { imageSize } from '../lib/imagesize'
import { isUsableShot } from '../lib/shot-filter'

type Row = { id: string; repo: string; title: string }
type Shot = { url: string; w: number; h: number }
type Store = Record<string, { images: Shot[]; repo: string }>

const SKIP = /badge|shields\.io|licen[sc]e|discord|twitter|patreon|ko-?fi|paypal|\.svg($|\?)|star-history/i


async function measure(url: string): Promise<Shot | null> {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const dim = imageSize(Buffer.from(await res.arrayBuffer()))
    if (!dim || dim.w < 480) return null
    const shot = { url, w: dim.w, h: dim.h }
    return isUsableShot(shot) ? shot : null
  } catch {
    return null
  }
}

/** Only a maintainer-uploaded preview counts; the generated card does not. */
async function socialPreview(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`https://github.com/${repo}`, {
      headers: { 'user-agent': 'Mozilla/5.0 pcport' },
    })
    if (!res.ok) return null
    const html = await res.text()
    const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    const url = m?.[1]
    if (!url) return null
    return url.includes('repository-images.githubusercontent.com') ? url : null
  } catch {
    return null
  }
}

/** Release notes often carry the screenshots the README never got. */
async function releaseImages(repo: string): Promise<string[]> {
  try {
    const res = await fetch(`https://github.com/${repo}/releases.atom`)
    if (!res.ok) return []
    const xml = await res.text()
    const urls = new Set<string>()
    for (const m of xml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
      const u = m[1].replace(/&amp;/g, '&')
      if (/^https?:/.test(u) && !SKIP.test(u) && /\.(png|jpe?g|webp)(\?|$)/i.test(u)) urls.add(u)
    }
    return [...urls].slice(0, 6)
  } catch {
    return []
  }
}

async function main() {
  const rows = JSON.parse(await readFile('lib/catalog.json', 'utf8')) as Row[]
  const store: Store = JSON.parse(await readFile('lib/shots.json', 'utf8'))

  let added = 0
  for (const row of rows) {
    if (store[row.id]?.images.length) continue

    const found: Shot[] = []

    const preview = await socialPreview(row.repo)
    if (preview) {
      const shot = await measure(preview)
      if (shot) found.push(shot)
    }

    if (found.length < 3) {
      for (const u of await releaseImages(row.repo)) {
        const shot = await measure(u)
        if (shot) found.push(shot)
        if (found.length >= 3) break
      }
    }

    if (found.length) {
      const screenliness = (s: Shot) => Math.abs(s.w / s.h - 16 / 9)
      found.sort((a, b) => screenliness(a) - screenliness(b) || b.w * b.h - a.w * a.h)
      store[row.id] = { images: found, repo: row.repo }
      added++
      console.log(`✓  ${row.title} — ${found.map((s) => `${s.w}×${s.h}`).join(', ')}`)
    } else {
      console.log(`·  ${row.title} — still none`)
    }
    await new Promise((r) => setTimeout(r, 400))
  }

  await writeFile('lib/shots.json', `${JSON.stringify(store, null, 2)}\n`)
  const total = Object.values(store).filter((s) => s.images.length).length
  console.log(`\n+${added} this pass · ${total}/${rows.length} entries now have images`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
