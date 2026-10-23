import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GuidePage, guideMetadata } from '@/components/GuidePage'
import { GUIDES } from '@/lib/guides'

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
  if (lang !== 'pt') notFound()
  return <GuidePage lang="pt" slug={slug} />
}
