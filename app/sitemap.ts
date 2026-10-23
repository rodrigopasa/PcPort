import type { MetadataRoute } from 'next'
import { getEntries, getConsoles, getHubGames } from '@/lib/data'
import { SITE, entryPath, hubPath, guidePath, guidesPath, contributePath } from '@/lib/i18n'
import { liveGuides } from '@/lib/guides'

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

  // Guides, each paired with its translation by key rather than by word.
  const guides = liveGuides(pt)
  for (const lang of ['pt', 'en'] as const) {
    out.push({
      url: `${SITE}${guidesPath(lang)}`,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: { languages: pair(guidesPath('pt'), guidesPath('en')) },
    })
    for (const { guide } of guides) {
      out.push({
        url: `${SITE}${guidePath(lang, guide.slug[lang])}`,
        changeFrequency: guide.kind === 'list' ? 'daily' : 'monthly',
        priority: 0.7,
        alternates: {
          languages: pair(guidePath('pt', guide.slug.pt), guidePath('en', guide.slug.en)),
        },
      })
    }
    // Comparison pages answer the head query for their game, so they rank
    // with the entries themselves.
    for (const { game } of getHubGames()) {
      out.push({
        url: `${SITE}${hubPath(lang, game)}`,
        changeFrequency: 'daily',
        priority: 0.85,
        alternates: { languages: pair(hubPath('pt', game), hubPath('en', game)) },
      })
    }
    out.push({
      url: `${SITE}${contributePath(lang)}`,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: { languages: pair(contributePath('pt'), contributePath('en')) },
    })
  }

  // Entries are paired by index: getEntries sorts both languages identically.
  pt.forEach((e, i) => {
    // Uncurated entries are noindex; listing them here would contradict that.
    if (!e.curated) return
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
