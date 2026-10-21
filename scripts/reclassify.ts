/**
 * Re-applies the mechanism classification to the catalog already on disk.
 *
 *   npx tsx scripts/reclassify.ts
 *
 * Ingestion classifies on discovery, so entries catalogued before a category
 * existed keep the old one. This brings them forward without waiting for a
 * refresh that the GitHub rate limit would stretch over hours.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { isEmulator } from '../lib/quality'

type Row = { repo: string; title: string; description: string | null; mechanism: string }

const FILE = 'lib/catalog.json'
const rows: Row[] = JSON.parse(readFileSync(FILE, 'utf8'))

let changed = 0
for (const r of rows) {
  const hay = `${r.repo} ${r.title} ${r.description ?? ''}`
  if (isEmulator(hay) && r.mechanism !== 'emulator') {
    console.log(`  ${String(r.title).slice(0, 34).padEnd(34)} ${r.mechanism} -> emulator`)
    r.mechanism = 'emulator'
    changed++
  }
}

writeFileSync(FILE, `${JSON.stringify(rows, null, 2)}\n`)

const dist: Record<string, number> = {}
for (const r of rows) dist[r.mechanism] = (dist[r.mechanism] ?? 0) + 1

console.log(`\nreclassificadas: ${changed}`)
console.log('distribuicao   :', JSON.stringify(dist))
