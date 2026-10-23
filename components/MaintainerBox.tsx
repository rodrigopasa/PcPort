import Link from 'next/link'
import type { Lang } from '@/lib/db/schema'
import { SITE, contributePath } from '@/lib/i18n'
import { CopySnippet } from './CopySnippet'

/**
 * The bottom of every port page, for the people who make the ports.
 *
 * Two jobs. The correction and removal links are how a maintainer tells us we
 * got something wrong, or that they would rather not be listed — a request
 * from the maintainer is honoured, and the form says so.
 *
 * The badge is the other job, and it is optional. A maintainer who wants it
 * pastes one line into their README; that line links back to this page from
 * a repository's front page, which is the kind of link search engines weigh
 * most. It is offered, never asked for.
 */
const COPY = {
  pt: {
    title: 'Mantém este projeto?',
    lead: 'Diga se algo aqui está errado ou desatualizado, ou se prefere que o projeto não seja listado. Toda solicitação é lida por uma pessoa.',
    correct: 'Pedir correção',
    remove: 'Pedir remoção',
    broken: 'Avisar de link quebrado',
    badgeTitle: 'Selo opcional para o README',
    badgeAlt: 'Listado no PCPort',
    badgeFile: 'selo.svg',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  en: {
    title: 'Maintain this project?',
    lead: 'Tell us if something here is wrong or out of date, or if you would rather the project was not listed. Every request is read by a person.',
    correct: 'Request a correction',
    remove: 'Request removal',
    broken: 'Report a broken link',
    badgeTitle: 'Optional badge for your README',
    badgeAlt: 'Listed on PCPort',
    badgeFile: 'badge.svg',
    copy: 'Copy',
    copied: 'Copied',
  },
} as const

export function MaintainerBox({ lang, repo, path }: { lang: Lang; repo: string; path: string }) {
  const c = COPY[lang]
  const form = (tipo: string) =>
    `${contributePath(lang)}?tipo=${tipo}&porte=${encodeURIComponent(repo)}`

  const page = `${SITE}${path}`
  const img = `${SITE}/${c.badgeFile}`
  const width = lang === 'pt' ? 122 : 116
  const markdown = `[![${c.badgeAlt}](${img})](${page})`
  const html = `<a href="${page}"><img src="${img}" alt="${c.badgeAlt}" width="${width}" height="20"></a>`

  const link = 'text-[13px] text-muted underline decoration-hairline-strong underline-offset-4 hover:text-ink'

  return (
    <section className="mt-12 border-t border-hairline pt-8">
      <h2 className="text-[11px] tracking-[0.16em] uppercase text-faint">{c.title}</h2>
      <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-muted">{c.lead}</p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link href={form('correcao')} className={link} rel="nofollow">
          {c.correct}
        </Link>
        <Link href={form('remocao')} className={link} rel="nofollow">
          {c.remove}
        </Link>
        <Link href={form('link')} className={link} rel="nofollow">
          {c.broken}
        </Link>
      </p>

      <div className="mt-8 max-w-[68ch]">
        <h3 className="text-[11px] tracking-[0.16em] uppercase text-faint">{c.badgeTitle}</h3>
        {/* eslint-disable-next-line @next/next/no-img-element -- the badge as it will look in a README */}
        <img src={`/${c.badgeFile}`} alt={c.badgeAlt} width={width} height={20} className="mt-3" />
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4">
          <CopySnippet label="Markdown" code={markdown} copy={c.copy} copied={c.copied} />
          <CopySnippet label="HTML" code={html} copy={c.copy} copied={c.copied} />
        </div>
      </div>
    </section>
  )
}
