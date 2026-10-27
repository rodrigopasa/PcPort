/**
 * Removes entries from the catalog by repository, recording their addresses
 * so they redirect instead of answering 404.
 *
 *   npx tsx scripts/drop-entry.ts owner/repo [owner/repo ...]
 *
 * For the case ingestion cannot see: a repository a person decided to drop.
 * One that disappears from GitHub is dropped by build-catalog.ts itself.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { recordGone, recordMoves, type GoneBook, type SlugHistory, type SlugRow } from '../lib/slugs'

const FILE = 'lib/catalog.json'
const want = new Set(process.argv.slice(2).map((r) => r.toLowerCase()))
if (!want.size) throw new Error('usage: drop-entry.ts owner/repo [...]')

const before: (SlugRow & { repo: string })[] = JSON.parse(readFileSync(FILE, 'utf8'))
const after = before.filter((r) => !want.has(r.repo.toLowerCase()))
const dropped = before.length - after.length
if (dropped !== want.size) throw new Error(`asked for ${want.size}, found ${dropped}`)

const history: SlugHistory = JSON.parse(readFileSync('lib/slug-history.json', 'utf8'))
const gone: GoneBook = JSON.parse(readFileSync('lib/slug-gone.json', 'utf8'))
recordMoves(history, before, after)
const n = recordGone(gone, before, after, history)
writeFileSync(FILE, `${JSON.stringify(after, null, 2)}\n`)
writeFileSync('lib/slug-history.json', `${JSON.stringify(history, null, 2)}\n`)
writeFileSync('lib/slug-gone.json', `${JSON.stringify(gone, null, 2)}\n`)
console.log(`${dropped} removida(s), ${n} enderecos redirecionados`)
