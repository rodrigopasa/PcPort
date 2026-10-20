import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEntries, getLatest, getCounts, getConsoles } from '@/lib/data'
import { isLang, SITE, SITE_NAME, DICT, entryPath } from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { LeadBand } from '@/components/LeadBand'
import { Matrix } from '@/components/Matrix'

export const revalidate = 300

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  const [entries, latest, counts, consoles] = await Promise.all([
    getEntries(lang),
    getLatest(lang),
    getCounts(),
    getConsoles(lang),
  ])
  const t = DICT[lang]

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE}/${lang}`,
      inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
      description: t.tagline,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${SITE_NAME} — ${t.tagline}`,
      numberOfItems: entries.length,
      itemListElement: entries.slice(0, 30).map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}${entryPath(lang, e.slug)}`,
        name: e.title,
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader lang={lang} counts={counts} />
      {latest ? <LeadBand entry={latest} lang={lang} /> : null}
      {/* Every category page linked from the index: internal links are how the
          console pages accumulate authority instead of sitting orphaned. */}
      <nav aria-label={t.consoles} className="border-b border-hairline">
        <ul className="mx-auto flex max-w-[1400px] flex-wrap gap-x-5 gap-y-2 px-5 py-3">
          {consoles.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/${lang}/console/${c.slug}`}
                className="text-[12px] whitespace-nowrap text-muted no-underline hover:text-native"
              >
                {c.name}
                <span className="tabular ml-1.5 text-faint">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main id="conteudo">
        <h2 className="sr-only">{t.tagline}</h2>
        <Matrix entries={entries} lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
