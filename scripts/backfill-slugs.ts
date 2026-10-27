/**
 * Records every address a port page has had, from the catalog's git history.
 *
 *   npx tsx scripts/backfill-slugs.ts
 *
 * Run once to recover the renames made before slug-history.json existed;
 * curate.ts and build-catalog.ts record new ones as they write. Old versions
 * are read with today's slug rules, so an address that only an older rule
 * produced cannot be recovered here.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { recordGone, recordMoves, type GoneBook, type SlugHistory, type SlugRow } from '../lib/slugs'

const FILE = 'lib/slug-history.json'
const GONE = 'lib/slug-gone.json'
const history: SlugHistory = JSON.parse(readFileSync(FILE, 'utf8'))
const gone: GoneBook = JSON.parse(readFileSync(GONE, 'utf8'))
const current: SlugRow[] = JSON.parse(readFileSync('lib/catalog.json', 'utf8'))
const git = (...a: string[]) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 28 })

const shas = git('log', '--format=%H', '--', 'lib/catalog.json').trim().split('\n')
let added = 0
let removed = 0
for (const sha of shas) {
  let rows: unknown
  try {
    rows = JSON.parse(git('show', `${sha}:lib/catalog.json`))
  } catch {
    continue
  }
  if (!Array.isArray(rows)) continue
  added += recordMoves(history, rows as SlugRow[], current)
  removed += recordGone(gone, rows as SlugRow[], current, history)
}
writeFileSync(FILE, `${JSON.stringify(history, null, 2)}\n`)
writeFileSync(GONE, `${JSON.stringify(gone, null, 2)}\n`)
console.log(`${shas.length} versoes lidas, ${added} enderecos antigos registrados`)
console.log(`pt ${Object.keys(history.pt).length}, en ${Object.keys(history.en).length}`)
console.log(`${removed} enderecos de entradas removidas: pt ${Object.keys(gone.pt).length}, en ${Object.keys(gone.en).length}`)
