import { readFileSync } from 'node:fs'
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
 * Reading from a directory the container mounts means new data takes effect on
 * revalidation, with no rebuild and no deploy.
 *
 * DATA_DIR defaults to the bundled copy, so local development and the build
 * itself keep working with no configuration.
 */
const DATA_DIR = process.env.DATA_DIR ?? join(process.cwd(), 'lib')

type Cache = { catalog?: unknown; shots?: unknown; fandom?: unknown; covers?: unknown }
let cache: Cache = {}

function read<T>(name: keyof Cache, fallback: T): T {
  if (cache[name] !== undefined) return cache[name] as T
  try {
    const raw = readFileSync(join(DATA_DIR, `${name}.json`), 'utf8')
    cache[name] = JSON.parse(raw)
  } catch {
    // A missing or malformed data file must not take the site down: the page
    // renders with whatever the other files hold.
    cache[name] = fallback
  }
  return cache[name] as T
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

/** Called by the revalidate endpoint so fresh data is picked up without a restart. */
export function reload(): void {
  cache = {}
}

export { DATA_DIR }
