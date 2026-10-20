/**
 * Fills cover art and IGDB ids for the games in lib/games.ts.
 *
 *   IGDB_CLIENT_ID=... IGDB_CLIENT_SECRET=... npx tsx scripts/enrich.ts
 *
 * Writes lib/covers.json, which the data layer merges over GAMES. Hand-written
 * release dates and summaries win — IGDB only supplies what is missing, so a
 * fuzzy match can never overwrite a verified fact.
 */
import { writeFile, readFile } from 'node:fs/promises'
import { searchGame, normalize } from '../lib/igdb'
import { GAMES } from '../lib/games'

type Row = { igdbId: number; coverUrl: string | null; matched: string }

/** The catalog's titles, keyed by the game record they point at. */
async function titles(): Promise<Map<string, string>> {
  const raw = await readFile('lib/catalog.json', 'utf8')
  const rows = JSON.parse(raw) as { game: string | null; title: string }[]
  const out = new Map<string, string>()
  for (const r of rows) if (r.game && !out.has(r.game)) out.set(r.game, r.title)
  return out
}

async function main() {
  if (!process.env.IGDB_CLIENT_ID || !process.env.IGDB_CLIENT_SECRET) {
    console.error('Set IGDB_CLIENT_ID and IGDB_CLIENT_SECRET first. See .env.example.')
    process.exit(1)
  }

  const names = await titles()
  const out: Record<string, Row> = {}
  let hit = 0
  let miss = 0

  for (const key of Object.keys(GAMES)) {
    const name = names.get(key) ?? key.replace(/-/g, ' ')
    try {
      const found = await searchGame(name)
      if (!found) {
        console.warn(`· no match: ${name}`)
        miss++
      } else {
        const n = normalize(found)
        out[key] = { igdbId: n.igdbId, coverUrl: n.coverUrl, matched: found.name }
        console.log(`✓ ${name} → ${found.name}${n.coverUrl ? '' : ' (no cover)'}`)
        hit++
      }
    } catch (err) {
      console.error(`✗ ${name}: ${err instanceof Error ? err.message : err}`)
      miss++
    }
    // Four requests per second is IGDB's documented ceiling.
    await new Promise((r) => setTimeout(r, 280))
  }

  await writeFile('lib/covers.json', `${JSON.stringify(out, null, 2)}\n`)
  console.log(`\nwrote lib/covers.json · ${hit} matched · ${miss} missed`)
  console.log('Check the `matched` field on each row: search is fuzzy and can pick a remake.')
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
