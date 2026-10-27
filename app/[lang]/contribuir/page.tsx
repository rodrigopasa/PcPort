import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContributePage, contributeMetadata, type ContributeSearch } from '@/components/ContributePage'

/** Portuguese address. `/en/contribuir` is not a page; the English one is /en/contribute. */
type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  return lang === 'pt' ? contributeMetadata('pt') : {}
}


export default async function Page({ params, searchParams }: { params: Params; searchParams: ContributeSearch }) {
  const { lang } = await params
  if (lang !== 'pt') notFound()
  return <ContributePage lang="pt" search={searchParams} />
}
