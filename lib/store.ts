import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Reads the catalog from disk at runtime instead of importing it.
 *
 * `import CATALOG from './catalog.json'` compiles the data into the bundle, so
 * the running container held whatever the image was built with. The hourly
 * ingestion updated the repository and production never saw it, and
 * `/api/revalidate` regenerated pages from the same frozen data — the
 * automation looked alive and changed nothing.
 *
 * Invalidation is by file mtime rather than an explicit reload call. Next
 * bundles per route, so `lib/store.ts` is instantiated separately in the API
 * route and in each page: clearing a module-level cache from the endpoint
 * cleared only the endpoint's own copy, and the pages kept rendering stale
 * data. Checking the file's timestamp needs no coordination between bundles
 * and no cache-busting call at all — whoever writes the file wins.
 *
 * A `statSync` per read costs microseconds and only happens when a page is
 * actually regenerated, which ISR makes rare.
 *
 * DATA_DIR defaults to the bundled copy, so development and the build itself
 * keep working with no configuration.
 */
const DATA_DIR = process.env.DATA_DIR ?? join(process.cwd(), 'lib')

type Entry = { mtime: number; value: unknown }

/**
 * On globalThis so the separate per-route bundles share one cache instead of
 * each re-parsing the same file.
 */
const store: Map<string, Entry> = ((globalThis as Record<string, unknown>).__pcportStore ??=
  new Map()) as Map<string, Entry>

function read<T>(name: string, fallback: T): T {
  const path = join(DATA_DIR, `${name}.json`)

  let mtime = 0
  try {
    mtime = statSync(path).mtimeMs
  } catch {
    // No file at all: serve the fallback rather than taking the site down.
    return (store.get(name)?.value as T) ?? fallback
  }

  const hit = store.get(name)
  if (hit && hit.mtime === mtime) return hit.value as T

  try {
    const value = JSON.parse(readFileSync(path, 'utf8')) as T
    store.set(name, { mtime, value })
    return value
  } catch {
    // Malformed JSON — most likely a half-written file. Keep serving the last
    // good copy instead of rendering an empty catalog.
    return (hit?.value as T) ?? fallback
  }
}

export function catalog<T>(): T {
  return read('catalog', [] as unknown as T)
}
export function shots<T>(): T {
  return read('shots', {} as unknown as T)
}
export function fandom<T>(): T {
  return read('fandom', {} as unknown as T)
}
export function covers<T>(): T {
  return read('covers', {} as unknown as T)
}

/**
 * Kept for the revalidate endpoint. Invalidation is by mtime, so this is only
 * a belt-and-braces drop of the cache.
 */
export function reload(): void {
  store.clear()
}

export { DATA_DIR }
