import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getByConsole, getConsoles, getCounts } from '@/lib/data'
import { isLang, SITE, SITE_NAME, DICT, entryPath } from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Matrix } from '@/components/Matrix'

export const revalidate = 300

type Params = Promise<{ lang: string; slug: string }>

export async function generateStaticParams() {
  const [pt, en] = await Promise.all([getConsoles('pt'), getConsoles('en')])
  return [
    ...pt.map((c) => ({ lang: 'pt', slug: c.slug })),
    ...en.map((c) => ({ lang: 'en', slug: c.slug })),
  ]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLang(lang)) return {}
  const { rows, name } = await getByConsole(lang, slug)
  if (!name) return {}
  const t = DICT[lang]

  return {
    title: t.portsOn(name),
    description: t.consoleLead(name, rows.length),
    alternates: {
      canonical: `${SITE}/${lang}/console/${slug}`,
      languages: {
        'pt-BR': `${SITE}/pt/console/${slug}`,
        en: `${SITE}/en/console/${slug}`,
        'x-default': `${SITE}/en/console/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      url: `${SITE}/${lang}/console/${slug}`,
      title: t.portsOn(name),
      description: t.consoleLead(name, rows.length),
    },
  }
}

export default async function ConsolePage({ params }: { params: Params }) {
  const { lang, slug } = await params
  if (!isLang(lang)) notFound()

  const [{ rows, name }, counts] = await Promise.all([getByConsole(lang, slug), getCounts()])
  if (!name) notFound()
  const t = DICT[lang]

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.portsOn(name),
    numberOfItems: rows.length,
    itemListElement: rows.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}${entryPath(lang, e.slug)}`,
      name: e.title,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader lang={lang} counts={counts} />

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 py-10">
          <h1 className="text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
            {t.portsOn(name)}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            {t.consoleLead(name, rows.length)}
          </p>
        </div>
      </section>

      <main>
        <Matrix entries={rows} lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
