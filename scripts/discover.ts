/**
 * Finds the real repositories of this scene.
 *
 *   npx tsx scripts/discover.ts
 *
 * Combines a list of paths worth probing directly with GitHub topic search,
 * and prints only what actually resolves. Nothing here is written to the
 * catalog automatically — the output is reviewed, then seeded.
 */

const API = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN

async function gh<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}${path}`, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'pcport-discover',
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  if (res.status === 403) {
    console.error('Rate limited — set GITHUB_TOKEN and re-run.')
    process.exit(1)
  }
  if (!res.ok) return null
  return (await res.json()) as T
}

type Repo = {
  full_name: string
  stargazers_count: number
  description: string | null
  topics?: string[]
  pushed_at: string
}

/** Paths worth probing: named in coverage, or the scene's known accounts. */
const PROBE = [
  'Zelda64Recomp/Zelda64Recomp',
  'N64Recomp/N64Recomp',
  'Mrsuss60/bloodborne_pc_windows_port',
  'NielsL92/bloodborne-pc-port',
  'HarbourMasters/Shipwright',
  'HarbourMasters/Ghostship',
  '2ship2harkinian/2ship2harkinian',
  'open-goal/jak-project',
  'hedge-dev/UnleashedRecomp',
  'shadps4-emu/shadPS4',
  'taisei-project/taisei',
  'EXOK/Celeste64',
  'sonicdcer/dk64',
  'Mr-Wiseguy/N64Recomp',
  'Mr-Wiseguy/Zelda64Recomp',
  'zeldaret/oot',
  'zeldaret/mm',
  'n64decomp/sm64',
  'pcsx2/pcsx2',
  'RPCS3/rpcs3',
  'dolphin-emu/dolphin',
  'Ryubing/Ryujinx',
  'xenia-canary/xenia-canary',
]

const TOPICS = ['n64-recompilation', 'recompilation', 'decompilation', 'source-port', 'pc-port']

async function main() {
  const found = new Map<string, Repo>()

  for (const path of PROBE) {
    const repo = await gh<Repo>(`/repos/${path}`)
    if (repo) found.set(repo.full_name, repo)
    await new Promise((r) => setTimeout(r, TOKEN ? 120 : 1100))
  }
  console.log(`probe: ${found.size}/${PROBE.length} resolved`)

  for (const topic of TOPICS) {
    const res = await gh<{ items: Repo[] }>(
      `/search/repositories?q=topic:${topic}&sort=stars&per_page=25`,
    )
    for (const r of res?.items ?? []) {
      if (r.stargazers_count >= 40) found.set(r.full_name, r)
    }
    console.log(`topic ${topic}: ${res?.items?.length ?? 0} results`)
    await new Promise((r) => setTimeout(r, TOKEN ? 800 : 6500))
  }

  const rows = [...found.values()].sort((a, b) => b.stargazers_count - a.stargazers_count)

  console.log(`\n=== ${rows.length} REAL REPOSITORIES ===\n`)
  for (const r of rows) {
    console.log(`${r.full_name}  ★${r.stargazers_count}  ${r.pushed_at.slice(0, 10)}`)
    if (r.description) console.log(`   ${r.description.slice(0, 110)}`)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
