import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEntries, getLatest, getCounts, getConsoles } from '@/lib/data'
import {
  isLang,
  SITE,
  SITE_NAME,
  DICT,
  entryPath,
  hubPath,
  guidesPath,
  monthYear,
} from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { LeadBand } from '@/components/LeadBand'
import { Matrix } from '@/components/Matrix'
import { ArrowRight } from '@/components/Icon'

export const revalidate = 300

/**
 * The month in the title, revalidated with the page, so it turns over by
 * itself. A dated result reads as maintained next to undated ones — the
 * largest catalog in this niche does the same, and it is the cheapest
 * click-through signal there is.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const when = monthYear(lang)
  const { total } = await getCounts()
  // `absolute` with the brand written out: the layout's "%s | PCPort" template
  // reaches child segments only, never the page beside it, so the home was the
  // one page shipping without the site's name in its title.
  return {
    title: {
      absolute:
        lang === 'pt'
          ? `Jogos de console no PC: todos os ports nativos (${when}) | ${SITE_NAME}`
          : `Console Games on PC: Every Native Port (${when}) | ${SITE_NAME}`,
    },
    // The tagline served as the description: 65 characters that named no
    // console, no number and no reason to click. This one carries the count,
    // the platforms people search by and the thing only this site has.
    description:
      lang === 'pt'
        ? `${total} ports nativos, recompilações e descompilações de jogos de Xbox, PlayStation e Nintendo para PC, com requisitos e passo a passo de instalação em português.`
        : `${total} native ports, recompilations and decompilations of Xbox, PlayStation and Nintendo games for PC, with requirements and step-by-step install guides.`,
  }
}

/**
 * The comparison pages with the most ports, linked from the home. They answer
 * the head query for their game ("bloodborne pc port"), and until now only the
 * port pages linked to them.
 */
function topHubs(entries: { game: string | null; title: string; stars: number }[], limit = 8) {
  // Named after the best-known port, as the comparison page itself is.
  const byGame = new Map<string, { title: string; n: number; stars: number }>()
  for (const e of entries) {
    if (!e.game) continue
    const hit = byGame.get(e.game)
    if (!hit) byGame.set(e.game, { title: e.title, n: 1, stars: e.stars })
    else {
      hit.n++
      if (e.stars > hit.stars) Object.assign(hit, { title: e.title, stars: e.stars })
    }
  }
  return [...byGame]
    .filter(([, v]) => v.n > 1)
    .sort((a, b) => b[1].n - a[1].n || a[1].title.localeCompare(b[1].title))
    .slice(0, limit)
    .map(([game, v]) => ({ game, title: v.title, n: v.n }))
}

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
  const hubs = topHubs(entries)
  const intro =
    lang === 'pt'
      ? `${counts.total} ports nativos, recompilações e descompilações de jogos de Xbox, PlayStation e Nintendo — cada um com versão, requisitos e o passo a passo de instalação em português. Atualizado a cada hora a partir do GitHub.`
      : `${counts.total} native ports, recompilations and decompilations of Xbox, PlayStation and Nintendo games — each with its version, requirements and a step-by-step install guide. Updated hourly from GitHub.`

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE}/${lang}`,
      inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
      description: intro,
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

      {/* The page's h1 and the one paragraph a search engine needs to know what
          this register is. Kept a size below the lead band so the newest
          release stays the focal move; the two are a pair — what this is, and
          what just shipped. */}
      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-[1400px] gap-x-16 gap-y-5 px-5 pt-9 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0">
            <h1 className="text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance">
              {lang === 'pt' ? 'Jogos de console no PC' : 'Console games on PC'}
            </h1>
            <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">{intro}</p>
          </div>
          {hubs.length ? (
            <nav aria-label={lang === 'pt' ? 'Comparações' : 'Comparisons'} className="lg:max-w-[440px]">
              <p className="text-[11px] tracking-[0.14em] uppercase text-faint">
                {lang === 'pt' ? 'Todos os ports, lado a lado' : 'Every port, side by side'}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {hubs.map((h) => (
                  <li key={h.game}>
                    <Link
                      href={hubPath(lang, h.game)}
                      className="text-[13px] whitespace-nowrap text-muted no-underline hover:text-native"
                    >
                      {h.title}
                      <span className="tabular ml-1.5 text-faint">{h.n}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={guidesPath(lang)}
                    className="group inline-flex items-center gap-1 text-[13px] whitespace-nowrap text-ink no-underline hover:text-native"
                  >
                    {t.guides}
                    <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

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
        <h2 className="sr-only">{lang === 'pt' ? 'Todos os ports' : 'Every port'}</h2>
        <Matrix entries={entries} lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
