import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { GuidePage, guideMetadata } from '@/components/GuidePage'
import { GUIDES, guideBySlug } from '@/lib/guides'
import { guidePath, guidesPath } from '@/lib/i18n'

type Params = Promise<{ lang: string; slug: string }>

export const revalidate = 300

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ lang: 'pt', slug: g.slug.pt }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  return lang === 'pt' ? guideMetadata('pt', slug) : {}
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params
  if (lang === 'en') {
    const g = guideBySlug('pt', slug) ?? guideBySlug('en', slug)
    permanentRedirect(g ? guidePath('en', g.slug.en) : guidesPath('en'))
  }
  if (lang !== 'pt') notFound()
  return <GuidePage lang="pt" slug={slug} />
}
