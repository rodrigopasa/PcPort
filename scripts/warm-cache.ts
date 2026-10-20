/**
 * Walks the sitemap so every page is in Cloudflare's cache before a visitor
 * asks for it.
 *
 *   npx tsx scripts/warm-cache.ts [--origin https://pcport.org] [--concurrency 8]
 *
 * Measured on this site: a cached page answers in ~100 ms, an uncached one in
 * 800–1100 ms, because the origin is in Germany and the audience is in Brazil.
 * `stale-while-revalidate` only helps once a page has been fetched at least
 * once, so on a site this new almost every visit would pay the cold price —
 * including the crawler's.
 *
 * Run it after each deploy.
 */

const origin = argValue('--origin') ?? 'https://pcport.org'
const concurrency = Number(argValue('--concurrency') ?? 8)

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i > -1 ? process.argv[i + 1] : undefined
}

async function sitemapUrls(): Promise<string[]> {
  const res = await fetch(`${origin}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap: HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

type Result = { url: string; status: number; cache: string; ms: number }

async function warm(url: string): Promise<Result> {
  const t = Date.now()
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'pcport-cache-warmer' },
      redirect: 'follow',
    })
    // Drain the body: the edge only stores a response that was fully read.
    await res.arrayBuffer()
    return {
      url,
      status: res.status,
      cache: res.headers.get('cf-cache-status') ?? '—',
      ms: Date.now() - t,
    }
  } catch {
    return { url, status: 0, cache: 'erro', ms: Date.now() - t }
  }
}

async function main() {
  const urls = await sitemapUrls()
  console.log(`${urls.length} URLs no sitemap · ${concurrency} em paralelo\n`)

  const results: Result[] = []
  let next = 0

  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (next < urls.length) {
        const url = urls[next++]
        const r = await warm(url)
        results.push(r)
        if (r.status !== 200) console.warn(`  ${r.status} ${r.url}`)
        if (results.length % 50 === 0) console.log(`  ${results.length}/${urls.length}`)
      }
    }),
  )

  const byCache: Record<string, number> = {}
  for (const r of results) byCache[r.cache] = (byCache[r.cache] ?? 0) + 1
  const ok = results.filter((r) => r.status === 200)
  const media = Math.round(ok.reduce((s, r) => s + r.ms, 0) / Math.max(ok.length, 1))

  console.log(`\n${ok.length}/${results.length} responderam 200 · média ${media} ms`)
  console.log(`estado do cache: ${JSON.stringify(byCache)}`)

  const quebradas = results.filter((r) => r.status !== 200)
  if (quebradas.length) {
    console.log(`\n${quebradas.length} NAO responderam 200:`)
    quebradas.slice(0, 15).forEach((r) => console.log(`  ${r.status}  ${r.url}`))
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
