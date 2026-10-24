import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { GuidePage, guideMetadata } from '@/components/GuidePage'
import { GUIDES, guideBySlug } from '@/lib/guides'
import { guidePath, guidesPath } from '@/lib/i18n'

type Params = Promise<{ lang: string; slug: string }>

export const revalidate = 300

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ lang: 'en', slug: g.slug.en }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  return lang === 'en' ? guideMetadata('en', slug) : {}
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params
  if (lang === 'pt') {
    const g = guideBySlug('en', slug) ?? guideBySlug('pt', slug)
    permanentRedirect(g ? guidePath('pt', g.slug.pt) : guidesPath('pt'))
  }
  if (lang !== 'en') notFound()
  return <GuidePage lang="en" slug={slug} />
}
