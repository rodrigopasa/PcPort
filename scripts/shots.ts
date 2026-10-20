/**
 * Pulls the screenshots each port project publishes in its own README.
 *
 *   npx tsx scripts/shots.ts
 *
 * No credentials: public repos serve raw README over HTTPS. These are the
 * projects' own images of their own work, which is both the most defensible
 * source and the more useful one — a shot of the port running answers more
 * than box art does.
 *
 * Writes lib/shots.json.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { imageSize } from '../lib/imagesize'

type Row = { id: string; repo: string; title: string }

const BRANCHES = ['main', 'master', 'dev', 'develop']
const NAMES = ['README.md', 'readme.md', 'Readme.md', 'README.MD']

/** Badges, logos and chrome are not screenshots. */
const SKIP =
  /badge|shields\.io|licen[sc]e|discord|twitter|patreon|ko-?fi|paypal|\.svg($|\?)|logo|icon|banner|buy.?me|github-readme-stats|star-history/i

function absolute(src: string, repo: string, branch: string): string | null {
  const clean = src.trim().split(/\s+/)[0].replace(/^<|>$/g, '')
  if (clean.startsWith('http')) {
    return clean
      .replace(/github\.com\/([^/]+\/[^/]+)\/blob\//, 'raw.githubusercontent.com/$1/')
      .replace(/\?raw=true$/, '')
  }
  if (clean.startsWith('//') || clean.startsWith('/')) return null
  return `https://raw.githubusercontent.com/${repo}/${branch}/${clean.replace(/^\.\//, '')}`
}

async function readme(repo: string) {
  for (const branch of BRANCHES) {
    for (const name of NAMES) {
      const res = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${name}`)
      if (res.ok) return { body: await res.text(), branch }
    }
  }
  return null
}

function extract(body: string, repo: string, branch: string): string[] {
  const urls = new Set<string>()
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const u = absolute(m[1], repo, branch)
    if (u && !SKIP.test(u)) urls.add(u)
  }
  for (const m of body.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
    const u = absolute(m[1], repo, branch)
    if (u && !SKIP.test(u)) urls.add(u)
  }
  return [...urls].filter((u) => /\.(png|jpe?g|webp)(\?|$)/i.test(u)).slice(0, 5)
}

/**
 * Reads intrinsic dimensions from the file header. The page lays each image out
 * at its own aspect: README images include comparison strips and banners, and
 * forcing those into 16:9 crops them into something that reads as empty.
 */

type Shot = { url: string; w: number; h: number }

async function measure(url: string): Promise<Shot | null> {
  try {
    const res = await fetch(url)
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dim = imageSize(buf)
    // Anything under 480px wide is an icon or a badge that slipped the filter.
    if (!dim || dim.w < 480) return null
    return { url, w: dim.w, h: dim.h }
  } catch {
    return null
  }
}

async function main() {
  const rows = JSON.parse(await readFile('lib/catalog.json', 'utf8')) as Row[]
  const out: Record<string, { images: Shot[]; repo: string }> = {}
  let hits = 0

  for (const row of rows) {
    const found = await readme(row.repo)
    if (!found) {
      console.log(`·  ${row.repo} — no README`)
      continue
    }

    const candidates = extract(found.body, row.repo, found.branch)
    const images: Shot[] = []
    for (const u of candidates) {
      const shot = await measure(u)
      if (shot) images.push(shot)
      if (images.length >= 3) break
    }

    // The lead slot wants a frame that looks like a screen. READMEs mix in
    // banners (6000×2000) and side-by-side comparison strips, which are honest
    // images but read as a cropped mistake at the top of a page, so rank by
    // distance from a normal display aspect and break ties on resolution.
    const screenliness = (s: Shot) => Math.abs(s.w / s.h - 16 / 9)
    images.sort((a, b) => screenliness(a) - screenliness(b) || b.w * b.h - a.w * a.h)

    if (images.length) {
      out[row.id] = { images, repo: row.repo }
      hits++
      console.log(`✓  ${row.title} — ${images.map((i) => `${i.w}×${i.h}`).join(', ')}`)
    } else {
      console.log(`·  ${row.title} — none usable`)
    }
  }

  await writeFile('lib/shots.json', `${JSON.stringify(out, null, 2)}\n`)
  console.log(`\n${hits}/${rows.length} entries have screenshots → lib/shots.json`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
