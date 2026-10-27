import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getConsoles, getCounts } from '@/lib/data'
import { isLang, SITE, SITE_NAME, DICT } from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const revalidate = 300

type Params = Promise<{ lang: string }>

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }]
}

const SEO = {
  pt: {
    title: 'Consoles: os jogos de cada console que rodam no PC',
    description:
      'Xbox 360, Nintendo 64, PlayStation e mais: escolha o console e veja cada jogo dele que já roda no PC, com versão, requisitos e passo a passo.',
  },
  en: {
    title: 'Consoles: the games from each console that run on PC',
    description:
      'Xbox 360, Nintendo 64, PlayStation and more: pick a console and see every one of its games that runs on PC, with version, requirements and setup.',
  },
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = DICT[lang]
  return {
    title: SEO[lang].title,
    description: SEO[lang].description,
    alternates: {
      canonical: `${SITE}/${lang}/consoles`,
      languages: {
        'pt-BR': `${SITE}/pt/consoles`,
        en: `${SITE}/en/consoles`,
        'x-default': `${SITE}/en/consoles`,
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title: SEO[lang].title,
      description: SEO[lang].description,
      images: [`${SITE}/${lang}/opengraph-image`],
    },
  }
}

export default async function ConsolesPage({ params }: { params: Params }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const [consoles, counts] = await Promise.all([getConsoles(lang), getCounts()])
  const t = DICT[lang]

  return (
    <>
      <SiteHeader lang={lang} counts={counts} />
      <main className="mx-auto max-w-[1400px] px-5 pb-20">
        <div className="py-10">
          <h1 className="text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
            {t.consoles}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            {t.consolesLead}
          </p>
        </div>

        <ul className="grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
          {consoles.map((c) => (
            <li key={c.slug} className="border-b border-hairline">
              <Link
                href={`/${lang}/console/${c.slug}`}
                className="flex items-baseline justify-between gap-4 py-4 pr-4 no-underline hover:text-native"
              >
                <span className="text-[16px] font-medium">{c.name}</span>
                <span className="tabular shrink-0 text-[13px] text-faint">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
