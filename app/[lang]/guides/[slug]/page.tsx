import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GuidePage, guideMetadata } from '@/components/GuidePage'
import { GUIDES } from '@/lib/guides'

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
  if (lang !== 'en') notFound()
  return <GuidePage lang="en" slug={slug} />
}
