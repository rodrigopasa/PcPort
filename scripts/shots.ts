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

/** A URL is only written if it actually resolves to an image. */
async function reachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok && (res.headers.get('content-type') ?? '').startsWith('image/')
  } catch {
    return false
  }
}

async function main() {
  const rows = JSON.parse(await readFile('lib/catalog.json', 'utf8')) as Row[]
  const out: Record<string, { images: string[]; repo: string }> = {}
  let hits = 0

  for (const row of rows) {
    const found = await readme(row.repo)
    if (!found) {
      console.log(`·  ${row.repo} — no README`)
      continue
    }

    const candidates = extract(found.body, row.repo, found.branch)
    const images: string[] = []
    for (const u of candidates) {
      if (await reachable(u)) images.push(u)
      if (images.length >= 3) break
    }

    if (images.length) {
      out[row.id] = { images, repo: row.repo }
      hits++
      console.log(`✓  ${row.title} — ${images.length} image(s)`)
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
