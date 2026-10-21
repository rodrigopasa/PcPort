import { revalidatePath } from 'next/cache'
import { consoleSlug } from '@/lib/data'
import { reload } from '@/lib/store'

export const dynamic = 'force-dynamic'

type Body = {
  slugs?: { pt: string; en: string }[]
  consoles?: string[]
}

/**
 * The scraper is the only thing that changes content, so it is the only thing
 * that triggers revalidation. Pages stay cached until a release actually lands.
 */
export async function POST(req: Request) {
  const token = req.headers.get('x-revalidate-token')
  const expected = process.env.REVALIDATE_TOKEN

  if (!expected || token !== expected) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: Body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'invalid json' }, { status: 400 })
  }

  // Drop the cached data first: regenerating pages from the old catalog is
  // what made this endpoint a no-op before.
  reload()

  // The sitemap and the console pages are generated from the same catalog, so
  // they go stale with it. Leaving the sitemap out meant a new entry got a
  // page that nothing — including the crawler — could discover.
  const paths: string[] = [
    '/pt',
    '/en',
    '/pt/radar',
    '/en/radar',
    '/pt/consoles',
    '/en/consoles',
    '/sitemap.xml',
  ]

  for (const s of body.slugs ?? []) {
    if (s?.pt) paths.push(`/pt/jogo/${s.pt}`)
    if (s?.en) paths.push(`/en/game/${s.en}`)
  }

  for (const c of body.consoles ?? []) {
    const slug = consoleSlug(c)
    paths.push(`/pt/console/${slug}`, `/en/console/${slug}`)
  }

  for (const p of paths) revalidatePath(p)

  return Response.json({ ok: true, revalidated: paths.length, paths })
}
