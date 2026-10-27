import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContributePage, contributeMetadata, type ContributeSearch } from '@/components/ContributePage'

/** English address. `/pt/contribute` is not a page; the Portuguese one is /pt/contribuir. */
type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  return lang === 'en' ? contributeMetadata('en') : {}
}


export default async function Page({ params, searchParams }: { params: Params; searchParams: ContributeSearch }) {
  const { lang } = await params
  if (lang !== 'en') notFound()
  return <ContributePage lang="en" search={searchParams} />
}
