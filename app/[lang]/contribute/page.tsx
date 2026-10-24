import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ContributePage, contributeMetadata, type ContributeSearch } from '@/components/ContributePage'

/** English address. `/pt/contribute` is not a page; the Portuguese one is /pt/contribuir. */
type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  return lang === 'en' ? contributeMetadata('en') : {}
}

/** The query string again, so a prefilled form survives the redirect. */
async function query(search: ContributeSearch) {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(await search)) if (typeof v === 'string') q.set(k, v)
  const s = q.toString()
  return s ? `?${s}` : ''
}

export default async function Page({ params, searchParams }: { params: Params; searchParams: ContributeSearch }) {
  const { lang } = await params
  if (lang === 'pt') permanentRedirect(`/pt/contribuir${await query(searchParams)}`)
  if (lang !== 'en') notFound()
  return <ContributePage lang="en" search={searchParams} />
}
