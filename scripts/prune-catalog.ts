/**
 * Applies the quality filter to the catalog already on disk.
 *
 *   npx tsx scripts/prune-catalog.ts [--dry]
 *
 * The first automated discovery run pulled in 210 repositories, and a good
 * share of them were awesome-lists and emulator tooling rather than ports.
 * Ingestion now filters at the source; this removes what landed before it did.
 *
 * Curated entries are never touched: a person already judged those, and a
 * regex does not get to overrule a human. The mark is `curated`, not a `game`
 * mapping — an emulator is curated and maps to no game, so keying off `game`
 * left exactly the long-tail entries unprotected.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { isCatalogable } from '../lib/quality'

const FILE = 'lib/catalog.json'
const dry = process.argv.includes('--dry')

type Row = {
  repo: string
  title: string
  game: string | null
  curated?: boolean
  description: string | null
  platforms?: string[]
  version: string | null
  sizeBytes: number | null
  stars: number
}

const rows: Row[] = JSON.parse(readFileSync(FILE, 'utf8'))
const keep: Row[] = []
const drop: { row: Row; why: string }[] = []

for (const row of rows) {
  if (row.curated || row.game) {
    keep.push(row)
    continue
  }
  const verdict = isCatalogable(row)
  if (verdict.ok) keep.push(row)
  else drop.push({ row, why: verdict.reason })
}

console.log(`entradas      : ${rows.length}`)
console.log(`mantidas      : ${keep.length}`)
console.log(`removidas     : ${drop.length}`)
console.log(`curadas (intocadas): ${rows.filter((r) => r.curated || r.game).length}`)
console.log('')
console.log('--- o que sai ---')
for (const d of drop.slice(0, 20)) {
  console.log(`  ${d.row.title.slice(0, 34).padEnd(34)} | ${d.why.slice(0, 52)}`)
}
if (drop.length > 20) console.log(`  … e mais ${drop.length - 20}`)

if (dry) {
  console.log('\n--dry: nada foi escrito')
} else {
  writeFileSync(FILE, `${JSON.stringify(keep, null, 2)}\n`)
  console.log(`\n${FILE} reescrito com ${keep.length} entradas`)
}
