import type { MetadataRoute } from 'next'
import { getEntries, getConsoles } from '@/lib/data'
import { SITE, entryPath } from '@/lib/i18n'

/**
 * Both languages in one sitemap, each URL declaring its alternates. The
 * incumbent in this category serves a 404 here, which is why it is step one.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pt, en, consoles] = await Promise.all([
    getEntries('pt'),
    getEntries('en'),
    getConsoles('pt'),
  ])

  const pair = (ptPath: string, enPath: string) => ({
    'pt-BR': `${SITE}${ptPath}`,
    en: `${SITE}${enPath}`,
  })

  const out: MetadataRoute.Sitemap = []

  for (const lang of ['pt', 'en'] as const) {
    out.push({
      url: `${SITE}/${lang}`,
      changeFrequency: 'hourly',
      priority: 1,
      alternates: { languages: pair('/pt', '/en') },
    })
    out.push({
      url: `${SITE}/${lang}/radar`,
      changeFrequency: 'hourly',
      priority: 0.7,
      alternates: { languages: pair('/pt/radar', '/en/radar') },
    })
    out.push({
      url: `${SITE}/${lang}/consoles`,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: { languages: pair('/pt/consoles', '/en/consoles') },
    })
    for (const c of consoles) {
      out.push({
        url: `${SITE}/${lang}/console/${c.slug}`,
        changeFrequency: 'daily',
        priority: 0.75,
        alternates: {
          languages: pair(`/pt/console/${c.slug}`, `/en/console/${c.slug}`),
        },
      })
    }
  }

  // Entries are paired by index: getEntries sorts both languages identically.
  pt.forEach((e, i) => {
    const twin = en[i]
    const languages = pair(entryPath('pt', e.slug), entryPath('en', twin.slug))
    const lastModified = e.releasedAt ? new Date(e.releasedAt) : undefined
    out.push({
      url: `${SITE}${entryPath('pt', e.slug)}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages },
    })
    out.push({
      url: `${SITE}${entryPath('en', twin.slug)}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages },
    })
  })

  return out
}
