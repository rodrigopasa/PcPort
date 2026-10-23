import type { Metadata } from 'next'
import { getConsoles, getCounts, getEntryByRepo } from '@/lib/data'
import { SITE, SITE_NAME, contributePath } from '@/lib/i18n'
import { KINDS, type ErrorCode, type Kind } from '@/lib/contribute'
import type { Lang } from '@/lib/db/schema'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { ContributeForm } from './ContributeForm'

export type ContributeSearch = Promise<{
  tipo?: string
  porte?: string
  erro?: string
  enviado?: string
}>

const COPY = {
  pt: {
    title: 'Contribuir',
    eyebrow: 'Contribuir',
    h1: 'Conhece um port que falta aqui?',
    lead: 'Indique um projeto, corrija uma página ou peça a remoção do seu. Cada envio é lido por uma pessoa antes de qualquer mudança no site.',
    description:
      'Indique um port nativo de console para PC que falta no PCPort, corrija uma página ou peça a remoção de um projeto que você mantém.',
    howTitle: 'Como funciona',
    how: [
      'Você envia. Nada vai ao ar automaticamente.',
      'Uma pessoa revisa: confere o projeto, o link e o que ele faz.',
      'Aceito, o port entra no catálogo nas duas línguas, com página e guia de instalação.',
    ],
    ruleTitle: 'Nunca o jogo',
    rule: 'O PCPort lista só o projeto de port, que é de código aberto. Link para ROM, imagem de disco ou serviço de hospedagem de arquivos é recusado no próprio formulário.',
    privacyTitle: 'Privacidade',
    privacy:
      'Nome e e-mail são opcionais e ficam só no nosso servidor, para podermos responder. O conteúdo técnico do envio pode virar uma issue pública no nosso GitHub, sem nome nem e-mail.',
    maintainerTitle: 'Mantém um projeto?',
    maintainer:
      'Peça correção ou remoção quando quiser — remoção pedida por quem mantém o projeto é atendida. Cada página de port também traz um selo opcional para o seu README.',
  },
  en: {
    title: 'Contribute',
    eyebrow: 'Contribute',
    h1: 'Know a port we are missing?',
    lead: 'Suggest a project, correct a page or ask for your own to be removed. Every submission is read by a person before anything on the site changes.',
    description:
      'Suggest a native console-to-PC port missing from PCPort, correct a page, or request the removal of a project you maintain.',
    howTitle: 'How it works',
    how: [
      'You send it. Nothing goes live automatically.',
      'A person reviews it: the project, the link and what it does.',
      'Once accepted, the port joins the catalog in both languages, with a page and an install guide.',
    ],
    ruleTitle: 'Never the game',
    rule: 'PCPort lists only the port project, which is open source. A link to a ROM, a disc image or a file-hosting service is refused by the form itself.',
    privacyTitle: 'Privacy',
    privacy:
      'Name and email are optional and stay on our server, so we can reply. The technical content may become a public issue on our GitHub, without name or email.',
    maintainerTitle: 'Maintain a project?',
    maintainer:
      'Ask for a correction or a removal whenever you like — a removal requested by the maintainer is honoured. Every port page also offers an optional badge for your README.',
  },
} as const

export function contributeMetadata(lang: Lang): Metadata {
  const c = COPY[lang]
  const pt = `${SITE}${contributePath('pt')}`
  const en = `${SITE}${contributePath('en')}`
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: lang === 'pt' ? pt : en,
      languages: { 'pt-BR': pt, en, 'x-default': en },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      url: lang === 'pt' ? pt : en,
      title: c.h1,
      description: c.description,
    },
  }
}

const ERRORS: ErrorCode[] = ['bot', 'fast', 'kind', 'missing', 'url', 'gamefile', 'email', 'rate', 'store']

export async function ContributePage({ lang, search }: { lang: Lang; search: ContributeSearch }) {
  const q = await search
  const c = COPY[lang]

  const [counts, consoles, entry] = await Promise.all([
    getCounts(),
    getConsoles(lang),
    q.porte ? getEntryByRepo(lang, q.porte) : Promise.resolve(null),
  ])

  // A port named in the link starts the form on a correction, since that is
  // what someone arriving from a port page almost always wants.
  const asked = (KINDS as readonly string[]).includes(q.tipo ?? '') ? (q.tipo as Kind) : null
  const initialKind: Kind = asked ?? (entry ? 'correcao' : 'novo')
  const sentKind = (KINDS as readonly string[]).includes(q.enviado ?? '') ? (q.enviado as Kind) : null
  const initialError = (ERRORS as string[]).includes(q.erro ?? '') ? (q.erro as ErrorCode) : null

  const h2 = 'text-[11px] tracking-[0.16em] uppercase text-faint'

  return (
    <>
      <SiteHeader lang={lang} counts={counts} />

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 py-10">
          <p className={h2}>{c.eyebrow}</p>
          <h1 className="settle mt-3 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance">
            {c.h1}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">{c.lead}</p>
        </div>
      </section>

      <main
        id="conteudo"
        className="mx-auto grid max-w-[1400px] gap-x-16 gap-y-12 px-5 py-10 pb-20 lg:grid-cols-[1.6fr_1fr]"
      >
        <div className="relative min-w-0">
          <ContributeForm
            lang={lang}
            consoles={consoles.map((x) => x.name)}
            port={entry ? { repo: entry.repo, title: entry.title } : null}
            initialKind={initialKind}
            initialError={initialError}
            sentKind={sentKind}
            rendered={Date.now()}
          />
        </div>

        <aside className="space-y-10 self-start lg:sticky lg:top-6">
          <section>
            <h2 className={h2}>{c.howTitle}</h2>
            <ol className="mt-3 border-t border-hairline">
              {c.how.map((step, i) => (
                <li key={i} className="flex gap-4 border-b border-hairline py-3 text-[14px] leading-relaxed">
                  <span className="tabular shrink-0 text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className={h2}>{c.ruleTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{c.rule}</p>
          </section>
          <section>
            <h2 className={h2}>{c.maintainerTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{c.maintainer}</p>
          </section>
          <section>
            <h2 className={h2}>{c.privacyTitle}</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-faint">{c.privacy}</p>
          </section>
        </aside>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
