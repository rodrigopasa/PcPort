import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEntries, getCounts } from '@/lib/data'
import { isLang, SITE, SITE_NAME, DICT } from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Matrix } from '@/components/Matrix'

export const revalidate = 300

type Params = Promise<{ lang: string }>

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = DICT[lang]
  return {
    title: t.radar,
    description: t.radarLead,
    alternates: {
      canonical: `${SITE}/${lang}/radar`,
      languages: {
        'pt-BR': `${SITE}/pt/radar`,
        en: `${SITE}/en/radar`,
        'x-default': `${SITE}/en/radar`,
      },
    },
    openGraph: { siteName: SITE_NAME, title: t.radar, description: t.radarLead },
  }
}

export default async function RadarPage({ params }: { params: Params }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const [entries, counts] = await Promise.all([getEntries(lang), getCounts()])
  const t = DICT[lang]

  return (
    <>
      <SiteHeader lang={lang} counts={counts} />
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 py-10">
          <h1 className="text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
            {t.radar}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">{t.radarLead}</p>
        </div>
      </section>
      <main>
        <Matrix entries={entries} lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
