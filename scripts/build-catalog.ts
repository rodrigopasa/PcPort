/**
 * Builds the catalog from GitHub. This is the real pipeline.
 *
 *   GITHUB_TOKEN=... npx tsx scripts/build-catalog.ts
 *
 * Every field written here came from the API: repo, description, release tag,
 * publish date, asset size, licence, owner. Nothing is hand-written, so nothing
 * can be a guess. Entries that fail the game-data guard are dropped.
 *
 * Writes lib/catalog.json. Resumable: existing rows are kept when a run is cut
 * short by the rate limit.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { checkRelease } from '../lib/guard'
import type { Mechanism } from '../lib/db/schema'

const API = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN
const OUT = 'lib/catalog.json'

const PROBE = [
  'HarbourMasters/Shipwright',
  'HarbourMasters/Ghostship',
  '2ship2harkinian/2ship2harkinian',
  'open-goal/jak-project',
  'hedge-dev/UnleashedRecomp',
  'shadps4-emu/shadPS4',
  'taisei-project/taisei',
  'EXOK/Celeste64',
  'TGP482/SCDA-XBERecomp',
  'murkantor/Project-Midas',
  'jkdansereau/goldeneye-pc-port',
  'psxrestore/Condemned2Recomp',
  'NoRain211/doaxvb-re',
  'LittleBitUA/DPRecomp',
  'Jorge262007/FFTARecomp',
  'Yokimitsuro/khdays-port',
  'saulob/dragons-crown-pro-pc',
  'KIexster/god-of-war-recomp',
  'Yharnam-Hunters/Paleblood',
  'JackandBeans/Snap64Recomp',
  'KaikoClanworth1/wwe-svr2011-pc',
  'GiZcesi/OpenTricky',
  'wivi514/Dead_Rising_2_Case_Zero_Xenon_Recomp',
  'vyanhursky/DefJamFFNY-recomp',
  'kirklandsig/halo2-decompiled',
  'some-scurvy-dog/banjo-tooie-scurvy-dog-port',
  'gamboozino/ngbrecomp',
  'invinceble55-wq/Estacado-The-Darkness-Recomp',
  'GenryTheFox0/Project-2099',
  'Shagg88/Athelas',
  'pablocpas/OpenCMR2',
  'alexbeavs-ps1-ports/psxrecomp-ports',
]

type Repo = {
  full_name: string
  name: string
  description: string | null
  topics?: string[]
  license: { spdx_id: string; url: string | null } | null
  owner: { login: string }
  stargazers_count: number
  html_url: string
  pushed_at: string
}

type Release = {
  tag_name: string
  name: string | null
  body: string | null
  published_at: string
  html_url: string
  assets: { name: string; size: number; browser_download_url: string }[]
}

export type CatalogRow = {
  id: string
  repo: string
  title: string
  author: string
  console: string
  mechanism: Mechanism
  platforms: string[]
  stars: number
  description: string
  version: string | null
  releasedAt: string | null
  sizeBytes: number | null
  releaseUrl: string
  licenseId: string | null
  licenseUrl: string | null
}

async function gh<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'pcport-catalog',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  if (res.status === 404) return null
  if (res.status === 403) throw new Error('RATE_LIMIT')
  if (!res.ok) return null
  return (await res.json()) as T
}

/** Read off the repo's own words — never inferred from the game's name. */
function classify(repo: Repo): Mechanism {
  const hay = `${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase()
  if (/\b(wip|work in progress|not playable|unfinished|research|early)\b/.test(hay))
    return 'in-progress'
  if (/recompil/.test(hay)) return 'recompiled'
  if (/emulator|translation layer|compatibility layer|runtime for/.test(hay))
    return 'translation-layer'
  if (/decompil|source port|native|pc port|port of/.test(hay)) return 'native'
  return 'native'
}

const CONSOLES: [RegExp, string][] = [
  [/\b(n64|nintendo 64)\b/i, 'Nintendo 64'],
  [/\bxbox 360\b/i, 'Xbox 360'],
  [/\b(original xbox|xbox)\b/i, 'Xbox'],
  [/\b(ps2|playstation 2)\b/i, 'PlayStation 2'],
  [/\b(ps4|playstation 4)\b/i, 'PlayStation 4'],
  [/\b(ps3|playstation 3)\b/i, 'PlayStation 3'],
  [/\b(psx|ps1|playstation)\b/i, 'PlayStation'],
  [/\bgamecube\b/i, 'GameCube'],
  [/\bwii\b/i, 'Wii'],
  [/\b(gba|game boy advance)\b/i, 'Game Boy Advance'],
  [/\b(nintendo ds|nds)\b/i, 'Nintendo DS'],
  [/\bdreamcast\b/i, 'Dreamcast'],
  [/\bnaomi|arcade\b/i, 'Arcade'],
  [/\bswitch\b/i, 'Nintendo Switch'],
]

function detectConsole(repo: Repo): string {
  const hay = `${repo.description ?? ''} ${(repo.topics ?? []).join(' ')} ${repo.name}`
  for (const [re, name] of CONSOLES) if (re.test(hay)) return name
  return 'PC'
}

function detectPlatforms(release: Release | null, repo: Repo): string[] {
  const hay = `${release?.assets.map((a) => a.name).join(' ') ?? ''} ${repo.description ?? ''}`
  const out: string[] = []
  if (/win|\.exe|\.zip/i.test(hay)) out.push('Windows')
  if (/linux|appimage|\.tar/i.test(hay)) out.push('Linux')
  if (/mac|darwin|osx/i.test(hay)) out.push('macOS')
  return out.length ? out : ['Windows']
}

/** Strip the port's own branding to get at the game's name. */
function gameTitle(repo: Repo): string {
  if (repo.description) {
    const m = repo.description.match(
      /(?:port of|recompilation of|decompilation of|version of)\s+([A-Z][^,.:(]{2,60})/i,
    )
    if (m) return m[1].trim()
  }
  return repo.name.replace(/[-_]/g, ' ').replace(/\b(recomp|port|pc|decomp)\b/gi, '').trim() ||
    repo.name
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  const existing: CatalogRow[] = await readFile(OUT, 'utf8')
    .then((r) => JSON.parse(r))
    .catch(() => [])
  const byRepo = new Map(existing.map((r) => [r.repo, r]))

  let added = 0
  let rejected = 0
  let limited = false

  for (const path of PROBE) {
    if (byRepo.has(path)) continue
    try {
      const repo = await gh<Repo>(`/repos/${path}`)
      if (!repo) continue

      const release = await gh<Release>(`/repos/${path}/releases/latest`)
      const assets = (release?.assets ?? []).map((a) => ({
        name: a.name,
        size: a.size,
        url: a.browser_download_url,
      }))

      const verdict = checkRelease(assets)
      if (!verdict.ok) {
        console.warn(`rejected ${path}: ${verdict.reason}`)
        rejected++
        continue
      }

      const biggest = [...assets].sort((a, b) => b.size - a.size)[0]
      const title = gameTitle(repo)

      byRepo.set(path, {
        id: slugify(repo.full_name),
        repo: repo.full_name,
        title,
        author: repo.owner.login,
        console: detectConsole(repo),
        mechanism: classify(repo),
        platforms: detectPlatforms(release, repo),
        stars: repo.stargazers_count,
        description: repo.description ?? '',
        version: release?.tag_name ?? null,
        releasedAt: release?.published_at?.slice(0, 10) ?? repo.pushed_at.slice(0, 10),
        sizeBytes: biggest?.size ?? null,
        releaseUrl: release?.html_url ?? repo.html_url,
        licenseId: repo.license?.spdx_id ?? null,
        licenseUrl: repo.license?.url ?? null,
      })
      added++
      console.log(`✓ ${path} — ${title} · ${release?.tag_name ?? 'no release'}`)
    } catch (err) {
      if (err instanceof Error && err.message === 'RATE_LIMIT') {
        console.warn('\nrate limit reached — saving what was collected')
        limited = true
        break
      }
      throw err
    }
    await new Promise((r) => setTimeout(r, TOKEN ? 120 : 900))
  }

  const rows = [...byRepo.values()].sort((a, b) =>
    (b.releasedAt ?? '').localeCompare(a.releasedAt ?? ''),
  )
  await writeFile(OUT, `${JSON.stringify(rows, null, 2)}\n`)
  console.log(
    `\n${rows.length} entries in ${OUT} (+${added} this run, ${rejected} rejected)` +
      (limited ? ' — re-run with GITHUB_TOKEN to continue' : ''),
  )
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
