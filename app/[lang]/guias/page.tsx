import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { GuidesIndex } from '@/components/GuidePage'
import { DICT, SITE, guidesPath } from '@/lib/i18n'

/** Only `/pt/guias` — the other language has its own word for this page. */
type Params = Promise<{ lang: string }>

export const revalidate = 300

export async function generateStaticParams() {
  return [{ lang: 'pt' }]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  if (lang !== 'pt') return {}
  const pt = `${SITE}${guidesPath('pt')}`
  const en = `${SITE}${guidesPath('en')}`
  return {
    title: DICT.pt.guides,
    alternates: { canonical: `${SITE}${guidesPath('pt')}`, languages: { 'pt-BR': pt, en, 'x-default': en } },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params
  if (lang === 'en') permanentRedirect('/en/guides')
  if (lang !== 'pt') notFound()
  return <GuidesIndex lang="pt" />
}
