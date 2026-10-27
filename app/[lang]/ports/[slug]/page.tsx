import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  getCounts,
  getGamePorts,
  formerHubPage,
  getHubGames,
  consoleSlug,
  formatDate,
  type Entry,
} from '@/lib/data'
import { isLang, SITE, SITE_NAME, DICT, entryPath, hubPath, monthYear } from '@/lib/i18n'
import type { Lang, Mechanism } from '@/lib/db/schema'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StatusChip } from '@/components/StatusChip'
import { Cover } from '@/components/Cover'
import { ArrowRight } from '@/components/Icon'

/**
 * Every port of one game, side by side.
 *
 * The search is "bloodborne pc port", not the name of any one project, and
 * when four projects exist each separate page competes with the other three.
 * This page answers that search: what exists, how each one works, where it
 * runs and which is furthest along — and then sends the reader to the port
 * page that has the install steps.
 *
 * Only for games with two or more ports. With one, this would be a thin copy
 * of the port page.
 */

export const revalidate = 300

type Params = Promise<{ lang: string; slug: string }>

export async function generateStaticParams() {
  return getHubGames().flatMap(({ game }) => [
    { lang: 'pt', slug: game },
    { lang: 'en', slug: game },
  ])
}

const COPY = {
  pt: {
    h1: (g: string, n: number) => `${g} no PC: os ${n} ports comparados`,
    title: (g: string, n: number, when: string) => `${g} no PC: os ${n} ports comparados (${when})`,
    description: (g: string, n: number, c: string) =>
      `${n} projetos de código aberto levam ${g} de ${c} ao PC. Compare método, sistemas, versão e data de cada um, com o passo a passo de instalação em português.`,
    lead: (g: string, n: number, parts: string) =>
      `${n} projetos levam ${g} ao PC: ${parts}. Todos precisam da sua própria cópia do jogo — nenhum distribui o jogo.`,
    sideBySide: 'Lado a lado',
    project: 'Projeto',
    method: 'Método',
    runsOn: 'Roda em',
    version: 'Versão',
    date: 'Data',
    stars: 'Estrelas',
    unconfirmed: 'Não informado',
    noRelease: 'Sem release',
    open: 'Ver guia de instalação',
    install: 'Como instalar',
    mostStarred: (p: string) => `Mais seguido no GitHub: ${p}.`,
    updated: (d: string) => `Atualizado em ${d}`,
    about: 'Sobre o jogo',
  },
  en: {
    h1: (g: string, n: number) => `${g} PC Ports: All ${n} Compared`,
    title: (g: string, n: number, when: string) => `${g} PC Ports: All ${n} Compared (${when})`,
    description: (g: string, n: number, c: string) =>
      `${n} open-source projects bring ${c} ${g} to PC. Compare the method, systems, version and date of each, with step-by-step install guides.`,
    lead: (g: string, n: number, parts: string) =>
      `${n} projects bring ${g} to PC: ${parts}. Every one needs your own copy of the game — none of them ships it.`,
    sideBySide: 'Side by side',
    project: 'Project',
    method: 'Method',
    runsOn: 'Runs on',
    version: 'Version',
    date: 'Date',
    stars: 'Stars',
    unconfirmed: 'Not stated',
    noRelease: 'No release',
    open: 'Open install guide',
    install: 'Install guide',
    mostStarred: (p: string) => `Most followed on GitHub: ${p}.`,
    updated: (d: string) => `Updated ${d}`,
    about: 'About the game',
  },
} as const

/**
 * Singular and plural, written out. Appending an "s" produced "2 emuladors"
 * and "2 em progressos"; neither language pluralises these by rule.
 */
const FORMS: Record<Lang, Record<Mechanism, [string, string]>> = {
  pt: {
    native: ['nativo', 'nativos'],
    recompiled: ['recompilado', 'recompilados'],
    'translation-layer': ['camada de tradução', 'camadas de tradução'],
    emulator: ['emulador', 'emuladores'],
    'in-progress': ['em progresso', 'em progresso'],
  },
  en: {
    native: ['native port', 'native ports'],
    recompiled: ['recompilation', 'recompilations'],
    'translation-layer': ['translation layer', 'translation layers'],
    emulator: ['emulator', 'emulators'],
    'in-progress': ['work in progress', 'works in progress'],
  },
}

/** "2 recompilados, 1 nativo" — built from the catalog, never written by hand. */
function breakdown(lang: Lang, ports: Entry[]): string {
  const n = new Map<Mechanism, number>()
  for (const p of ports) n.set(p.mechanism, (n.get(p.mechanism) ?? 0) + 1)
  return [...n]
    .sort((a, b) => b[1] - a[1])
    .map(([m, k]) => `${k} ${FORMS[lang][m][k === 1 ? 0 : 1]}`)
    .join(', ')
}

async function load(lang: string, slug: string) {
  if (!isLang(lang)) return null
  const ports = await getGamePorts(lang, slug)
  if (ports.length < 2) return null
  return { lang, ports, lead: ports[0] }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const hit = await load(lang, slug)
  if (!hit) return {}
  const c = COPY[hit.lang]
  const n = hit.ports.length
  const title = c.title(hit.lead.title, n, monthYear(hit.lang))
  const description = c.description(hit.lead.title, n, hit.lead.console)
  const pt = `${SITE}${hubPath('pt', slug)}`
  const en = `${SITE}${hubPath('en', slug)}`

  return {
    // The month sits in the title on purpose: in a results page full of
    // undated listings, a current date is what reads as alive.
    title,
    description,
    alternates: {
      canonical: hit.lang === 'pt' ? pt : en,
      languages: { 'pt-BR': pt, en, 'x-default': en },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: hit.lang === 'pt' ? 'pt_BR' : 'en_US',
      url: hit.lang === 'pt' ? pt : en,
      images: [`${SITE}/${hit.lang}/opengraph-image`],
      title,
      description,
    },
  }
}

export default async function HubPage({ params }: { params: Params }) {
  const { lang: rawLang, slug } = await params
  const hit = await load(rawLang, slug)
  if (!hit) {
    // Down to one port, or none: the comparison has nothing to compare.
    const moved = isLang(rawLang) ? formerHubPage(rawLang, slug) : null
    if (moved) permanentRedirect(moved)
    notFound()
  }
  const { lang, ports, lead } = hit
  const t = DICT[lang]
  const c = COPY[lang]
  const counts = await getCounts()
  const n = ports.length
  const game = lead.gameMeta
  const url = `${SITE}${hubPath(lang, slug)}`

  const newest = ports
    .map((p) => p.releasedAt)
    .filter(Boolean)
    .sort()
    .at(-1)

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: c.h1(lead.title, n),
      numberOfItems: n,
      itemListElement: ports.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}${entryPath(lang, p.slug)}`,
        name: `${p.title} — ${p.repo}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE}/${lang}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: lead.console,
          item: `${SITE}/${lang}/console/${consoleSlug(lead.console)}`,
        },
        { '@type': 'ListItem', position: 3, name: c.h1(lead.title, n), item: url },
      ],
    },
    ...(game
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: lead.title,
            gamePlatform: lead.console,
            datePublished: game.releasedAt,
            genre: game.genres,
            author: { '@type': 'Organization', name: game.developer },
          },
        ]
      : []),
  ]

  const h2 = 'text-[11px] tracking-[0.16em] uppercase text-faint'
  const th = 'py-2.5 pr-6 text-left text-[11px] font-normal tracking-[0.14em] uppercase text-faint'
  const locale = lang === 'pt' ? 'pt-BR' : 'en'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader lang={lang} counts={counts} />

      <main id="conteudo" className="mx-auto max-w-[1400px] px-5 pb-20">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-hairline py-3 text-[11px] tracking-[0.14em] uppercase text-faint"
        >
          <Link href={`/${lang}`} className="no-underline hover:text-ink">
            {SITE_NAME}
          </Link>
          <span className="mx-2 text-hairline-strong">/</span>
          <Link href={`/${lang}/console/${consoleSlug(lead.console)}`} className="no-underline hover:text-ink">
            {lead.console}
          </Link>
        </nav>

        <header className="grid gap-x-16 gap-y-8 py-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <h1 className="settle text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">
              {c.h1(lead.title, n)}
            </h1>
            <p className="mt-5 max-w-[68ch] text-[16px] leading-relaxed text-muted">
              {c.lead(lead.title, n, breakdown(lang, ports))}
            </p>
            <p className="tabular mt-4 text-[12px] text-faint">
              {c.mostStarred(ports[0].repo)}
              {newest ? <> · {c.updated(formatDate(newest, lang)!)}</> : null}
            </p>
          </div>
          <div className="max-w-[260px]">
            <Cover entry={lead} lang={lang} priority />
          </div>
        </header>

        <section>
          <h2 className={h2}>{c.sideBySide}</h2>

          {/* From 768px, a real table: this is tabular data and a screen reader
              should announce it as such. Below that it used to scroll sideways
              with nothing saying it could, and a phone showed two of seven
              columns — so on a phone each port is its own block, every value
              still beside its label. */}
          <div className="mt-4 hidden md:block">
            <table className="w-full border-t border-hairline text-[14px]">
              <thead>
                <tr className="border-b border-hairline">
                  <th scope="col" className={th}>{c.project}</th>
                  <th scope="col" className={th}>{c.method}</th>
                  <th scope="col" className={th}>{c.runsOn}</th>
                  <th scope="col" className={th}>{c.version}</th>
                  <th scope="col" className={th}>{c.date}</th>
                  <th scope="col" className={`${th} text-right`}>{c.stars}</th>
                  <th scope="col" className={`${th} pr-0`}>
                    <span className="sr-only">{c.open}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ports.map((p) => (
                  <tr key={p.id} className="group border-b border-hairline align-baseline">
                    <th scope="row" className="py-3.5 pr-6 text-left font-normal">
                      <Link href={entryPath(lang, p.slug)} className="text-ink no-underline hover:text-native">
                        {p.repo.split('/')[1]}
                      </Link>
                      <span className="block text-[12px] text-faint">{p.author}</span>
                    </th>
                    <td className="py-3.5 pr-6">
                      <StatusChip mechanism={p.mechanism} lang={lang} />
                    </td>
                    <td className="py-3.5 pr-6 text-muted">
                      {p.platforms.length ? p.platforms.join(' · ') : <span className="text-faint">{c.unconfirmed}</span>}
                    </td>
                    <td className="tabular py-3.5 pr-6 text-muted">
                      {p.version ?? <span className="text-faint">{c.noRelease}</span>}
                    </td>
                    <td className="tabular py-3.5 pr-6 text-muted">{formatDate(p.releasedAt, lang) ?? '—'}</td>
                    <td className="tabular py-3.5 pr-6 text-right text-muted">{p.stars.toLocaleString(locale)}</td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={entryPath(lang, p.slug)}
                        className="inline-flex items-center gap-1.5 text-[13px] whitespace-nowrap text-muted no-underline transition-colors hover:text-native"
                        aria-label={`${c.open}: ${p.repo.split('/')[1]}`}
                      >
                        {c.install}
                        <ArrowRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 border-t border-hairline md:hidden">
            {ports.map((p) => (
              <li key={p.id} className="border-b border-hairline py-4">
                <Link
                  href={entryPath(lang, p.slug)}
                  className="group flex items-center justify-between gap-4 text-ink no-underline"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium">{p.repo.split('/')[1]}</span>
                    <span className="block text-[12px] text-faint">{p.author}</span>
                  </span>
                  <ArrowRight className="text-faint transition-colors group-hover:text-native" />
                </Link>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
                  <div>
                    <dt className="text-[10px] tracking-[0.14em] uppercase text-faint">{c.method}</dt>
                    <dd className="mt-1">
                      <StatusChip mechanism={p.mechanism} lang={lang} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.14em] uppercase text-faint">{c.runsOn}</dt>
                    <dd className="mt-1 text-[13px] text-muted">
                      {p.platforms.length ? p.platforms.join(' · ') : <span className="text-faint">{c.unconfirmed}</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.14em] uppercase text-faint">{c.version}</dt>
                    <dd className="tabular mt-1 text-[13px] text-muted">
                      {p.version ?? <span className="text-faint">{c.noRelease}</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.14em] uppercase text-faint">{c.stars}</dt>
                    <dd className="tabular mt-1 text-[13px] text-muted">{p.stars.toLocaleString(locale)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[12px] text-faint">{t.ownCopy}</p>
        </section>

        {game ? (
          <section className="mt-14 max-w-[68ch]">
            <h2 className={h2}>{c.about}</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-muted">{game.summary}</p>
            <p className="tabular mt-3 text-[12px] text-faint">
              {game.developer} · {formatDate(game.releasedAt, lang)}
            </p>
          </section>
        ) : null}
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
