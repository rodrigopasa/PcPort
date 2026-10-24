import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { getCounts, getEntries, type Entry } from '@/lib/data'
import { DICT, SITE, SITE_NAME, entryPath, guidePath, guidesPath, monthYear } from '@/lib/i18n'
import { guideBySlug, guideEntries, liveGuides, MIN_ENTRIES, type Guide } from '@/lib/guides'
import type { Lang, Mechanism } from '@/lib/db/schema'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { Matrix } from './Matrix'
import { ArrowRight } from './Icon'

const h2 = 'text-[11px] tracking-[0.16em] uppercase text-faint'

async function resolve(lang: Lang, slug: string) {
  const guide = guideBySlug(lang, slug)
  if (!guide) return null
  const all = await getEntries(lang)
  const entries = guideEntries(guide, all)
  if (guide.kind === 'list' && entries.length < MIN_ENTRIES) return null
  return { guide, all, entries }
}

export async function guideMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const hit = await resolve(lang, slug)
  if (!hit) return {}
  const { guide, entries } = hit
  const pt = `${SITE}${guidePath('pt', guide.slug.pt)}`
  const en = `${SITE}${guidePath('en', guide.slug.en)}`
  // Lists carry the month and the count; the article is evergreen and does not.
  const title =
    guide.kind === 'list'
      ? `${guide.h1[lang]} (${monthYear(lang)})`
      : guide.h1[lang]
  return {
    title,
    description: guide.description[lang],
    alternates: {
      canonical: lang === 'pt' ? pt : en,
      languages: { 'pt-BR': pt, en, 'x-default': en },
    },
    openGraph: {
      type: guide.kind === 'article' ? 'article' : 'website',
      siteName: SITE_NAME,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      url: lang === 'pt' ? pt : en,
      title,
      description:
        guide.kind === 'list'
          ? `${entries.length} — ${guide.description[lang]}`
          : guide.description[lang],
    },
  }
}

export async function GuidePage({ lang, slug }: { lang: Lang; slug: string }) {
  const hit = await resolve(lang, slug)
  if (!hit) {
    // A list guide that fell under its minimum still has an address people
    // may hold: it sends them to the guides it sits among.
    if (guideBySlug(lang, slug)) permanentRedirect(guidesPath(lang))
    notFound()
  }
  const { guide, all, entries } = hit
  const counts = await getCounts()
  const others = liveGuides(all).filter((g) => g.guide.key !== guide.key)
  const url = `${SITE}${guidePath(lang, guide.slug[lang])}`

  const ld =
    guide.kind === 'list'
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: guide.h1[lang],
          numberOfItems: entries.length,
          itemListElement: entries.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE}${entryPath(lang, e.slug)}`,
            name: e.title,
          })),
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.h1[lang],
          description: guide.description[lang],
          inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
          mainEntityOfPage: url,
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE },
        }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteHeader lang={lang} counts={counts} />

      <div className="mx-auto max-w-[1400px] px-5">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-hairline py-3 text-[11px] tracking-[0.14em] uppercase text-faint"
        >
          <Link href={`/${lang}`} className="no-underline hover:text-ink">
            {SITE_NAME}
          </Link>
          <span className="mx-2 text-hairline-strong">/</span>
          <Link href={guidesPath(lang)} className="no-underline hover:text-ink">
            {DICT[lang].guides}
          </Link>
        </nav>
      </div>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 py-10">
          <h1 className="settle max-w-[22ch] text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance">
            {guide.h1[lang]}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            {guide.description[lang]}
          </p>
          {guide.kind === 'list' ? (
            <p className="tabular mt-3 text-[12px] text-faint">
              {lang === 'pt'
                ? `${entries.length} ports · ${monthYear(lang)}`
                : `${entries.length} ports · ${monthYear(lang)}`}
            </p>
          ) : null}
        </div>
      </section>

      <main id="conteudo">
        {guide.kind === 'list' ? (
          <Matrix entries={entries} lang={lang} />
        ) : (
          <DecompArticle lang={lang} all={all} />
        )}

        {others.length ? (
          <section className="mx-auto max-w-[1400px] border-t border-hairline px-5 py-10">
            <h2 className={h2}>{lang === 'pt' ? 'Outros guias' : 'More guides'}</h2>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {others.map(({ guide: g, count }) => (
                <li key={g.key} className="border-b border-hairline">
                  <Link
                    href={guidePath(lang, g.slug[lang])}
                    className="flex items-baseline justify-between gap-4 py-3 text-muted no-underline transition-colors hover:text-ink"
                  >
                    <span className="text-[14px]">{g.h1[lang]}</span>
                    {g.kind === 'list' ? (
                      <span className="tabular shrink-0 text-[12px] text-faint">{count}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}

export async function GuidesIndex({ lang }: { lang: Lang }) {
  const [all, counts] = await Promise.all([getEntries(lang), getCounts()])
  const live = liveGuides(all)
  const t = DICT[lang]

  return (
    <>
      <SiteHeader lang={lang} counts={counts} />
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-5 py-10">
          <h1 className="settle text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1] font-extrabold tracking-[-0.04em]">
            {t.guides}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            {lang === 'pt'
              ? 'Listas vivas montadas a partir do catálogo: por método, por sistema e o que já tem download. Um port novo entra em todas as listas a que pertence assim que o catálogo é atualizado.'
              : 'Live lists built from the catalog: by method, by system, and what already has a download. A new port joins every list it belongs to as soon as the catalog refreshes.'}
          </p>
        </div>
      </section>
      <main id="conteudo" className="mx-auto max-w-[1400px] px-5 py-10 pb-20">
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {live.map(({ guide, count }) => (
            <li key={guide.key} className="border-b border-hairline">
              <Link
                href={guidePath(lang, guide.slug[lang])}
                className="block py-4 no-underline transition-colors hover:text-ink"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-[16px] font-medium text-ink">{guide.h1[lang]}</span>
                  {guide.kind === 'list' ? (
                    <span className="tabular shrink-0 text-[13px] text-faint">{count}</span>
                  ) : null}
                </span>
                <span className="mt-1 block max-w-[60ch] text-[13px] leading-snug text-muted">
                  {guide.description[lang]}
                </span>
              </Link>
            </li>
          ))}
          <li className="border-b border-hairline">
            <Link href={`/${lang}/consoles`} className="block py-4 no-underline">
              <span className="text-[16px] font-medium text-ink">{t.consoles}</span>
              <span className="mt-1 block max-w-[60ch] text-[13px] leading-snug text-muted">
                {t.consolesLead}
              </span>
            </Link>
          </li>
        </ul>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}

/* ------------------------------------------------------------------------ */

const ARTICLE = {
  pt: {
    intro: [
      'Um jogo de console foi compilado para um processador e um hardware específicos. Para ele rodar no PC, alguém precisa resolver essa distância — e há quatro formas de fazer isso, com consequências bem diferentes para o desempenho, para os mods e para o que você precisa ter em mãos.',
      'Nenhuma delas dispensa o jogo: o código e a arte pertencem a quem fez o jogo, e os projetos distribuem só o próprio trabalho. Por isso todo port pede a sua cópia — e por isso o PCPort nunca aponta para arquivos de jogo.',
    ],
    sections: [
      {
        mech: 'native' as Mechanism,
        title: 'Descompilação e port nativo',
        body: [
          'Na descompilação, pessoas reconstroem à mão um código-fonte em C que, compilado, gera um binário idêntico ao original, byte por byte. É um trabalho de anos. Quando termina, o jogo deixa de depender do console: dá para compilá-lo para Windows, Linux ou Mac, trocar o renderizador, liberar o FPS e aceitar mods.',
          'O resultado é um port nativo — o jogo vira um programa de PC de verdade, sem nada emulado no meio. É a forma que melhor aproveita máquina modesta.',
        ],
      },
      {
        mech: 'recompiled' as Mechanism,
        title: 'Recompilação estática',
        body: [
          'Na recompilação, uma ferramenta lê o código de máquina original e o traduz automaticamente para C ou C++, que então é compilado para o PC. Ferramentas como N64Recomp e ReXGlue tornaram isso viável para catálogos inteiros, e é por isso que a maior parte dos ports novos vem por aqui.',
          'É bem mais rápido que descompilar à mão, e o jogo também roda nativo. A diferença é que o código gerado não é pensado para ser lido: corrigir e modificar é mais difícil que numa descompilação.',
        ],
      },
      {
        mech: 'translation-layer' as Mechanism,
        title: 'Camada de tradução',
        body: [
          'Aqui o executável original roda direto no seu processador, e só as chamadas ao sistema e à placa de vídeo do console são convertidas enquanto o jogo roda. Fica entre o port nativo e o emulador: mais leve que emular tudo, menos previsível que um port feito à mão.',
        ],
      },
      {
        mech: 'emulator' as Mechanism,
        title: 'Emulador',
        body: [
          'O emulador recria o console inteiro em software e roda o jogo original sem alterá-lo. Exige bem mais da máquina, mas atende a biblioteca toda do console de uma vez — é a saída quando o jogo que você quer ainda não ganhou um port.',
        ],
      },
    ],
    examples: 'No catálogo',
    choose: 'Qual escolher',
    chooseBody:
      'Se o jogo tem um port nativo ou uma recompilação, comece por ele: costuma rodar melhor, com widescreen e FPS livre, e o guia de instalação de cada página diz exatamente qual cópia do jogo o projeto aceita. O emulador fica para quando não existe port — ou para jogar vários títulos do mesmo console.',
    seeAll: 'Ver todos',
  },
  en: {
    intro: [
      'A console game was compiled for one specific processor and piece of hardware. For it to run on a PC, someone has to bridge that gap — and there are four ways to do it, with very different consequences for performance, for mods and for what you need to have on hand.',
      'None of them does away with the game: the code and the art belong to whoever made it, and the projects distribute only their own work. That is why every port asks for your copy — and why PCPort never points at game files.',
    ],
    sections: [
      {
        mech: 'native' as Mechanism,
        title: 'Decompilation and native ports',
        body: [
          'In a decompilation, people rebuild by hand a C source that, once compiled, produces a binary identical to the original, byte for byte. It takes years. When it is done, the game no longer depends on the console: it can be built for Windows, Linux or Mac, given a new renderer, an uncapped framerate and mod support.',
          'The result is a native port — the game becomes a real PC program with nothing emulated in between. It is the approach that gets the most out of modest hardware.',
        ],
      },
      {
        mech: 'recompiled' as Mechanism,
        title: 'Static recompilation',
        body: [
          'In a recompilation, a tool reads the original machine code and translates it automatically into C or C++, which is then compiled for the PC. Tools such as N64Recomp and ReXGlue made this viable for whole libraries, which is why most new ports arrive this way.',
          'It is much faster than decompiling by hand, and the game runs natively too. The difference is that the generated code is not meant to be read: fixing and modding it is harder than in a decompilation.',
        ],
      },
      {
        mech: 'translation-layer' as Mechanism,
        title: 'Translation layer',
        body: [
          "Here the original executable runs directly on your processor, and only the calls to the console's system and graphics hardware are converted while the game runs. It sits between a native port and an emulator: lighter than emulating everything, less predictable than a hand-made port.",
        ],
      },
      {
        mech: 'emulator' as Mechanism,
        title: 'Emulator',
        body: [
          "An emulator recreates the whole console in software and runs the original game unmodified. It asks much more of the machine, but it covers the console's entire library at once — the way in when the game you want has no port yet.",
        ],
      },
    ],
    examples: 'In the catalog',
    choose: 'Which one to pick',
    chooseBody:
      'If the game has a native port or a recompilation, start there: it usually runs better, with widescreen and a free framerate, and every page’s install guide says exactly which copy of the game the project accepts. The emulator is for when no port exists — or for playing several games from the same console.',
    seeAll: 'See all',
  },
} as const

const GUIDE_FOR: Partial<Record<Mechanism, string>> = {
  native: 'native',
  recompiled: 'recompiled',
  emulator: 'emulators',
}

function DecompArticle({ lang, all }: { lang: Lang; all: Entry[] }) {
  const a = ARTICLE[lang]
  const top = (m: Mechanism) =>
    all
      .filter((e) => e.mechanism === m && e.gameMeta)
      .sort((x, y) => y.stars - x.stars)
      .slice(0, 4)

  const listSlug = (m: Mechanism): string | null => {
    const key = GUIDE_FOR[m]
    const g = key ? (liveGuides(all).find((x) => x.guide.key === key)?.guide as Guide | undefined) : undefined
    return g ? guidePath(lang, g.slug[lang]) : null
  }

  return (
    <article className="mx-auto max-w-[1400px] px-5 py-10 pb-16">
      <div className="max-w-[68ch]">
        {a.intro.map((p, i) => (
          <p key={i} className={`${i ? 'mt-4' : ''} text-[16px] leading-[1.75] text-muted`}>
            {p}
          </p>
        ))}
      </div>

      {a.sections.map((s) => {
        const ex = top(s.mech)
        const more = listSlug(s.mech)
        return (
          <section key={s.mech} className="mt-14 grid gap-x-16 gap-y-6 border-t border-hairline pt-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-[68ch]">
              <h2 className="text-[clamp(1.35rem,2.4vw,1.75rem)] leading-tight font-bold tracking-[-0.02em] text-ink">
                {s.title}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 text-[15px] leading-[1.75] text-muted">
                  {p}
                </p>
              ))}
            </div>
            {ex.length ? (
              <div>
                <h3 className={h2}>{a.examples}</h3>
                <ul className="mt-3 border-t border-hairline">
                  {ex.map((e) => (
                    <li key={e.id} className="border-b border-hairline">
                      <Link
                        href={entryPath(lang, e.slug)}
                        className="flex items-baseline justify-between gap-4 py-2.5 text-[14px] text-muted no-underline hover:text-ink"
                      >
                        <span>{e.title}</span>
                        <span className="tabular shrink-0 text-[12px] text-faint">{e.console}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {more ? (
                  <Link
                    href={more}
                    className="group mt-3 inline-flex items-center gap-1.5 text-[13px] text-muted no-underline hover:text-ink"
                  >
                    {a.seeAll}
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                ) : null}
              </div>
            ) : null}
          </section>
        )
      })}

      <section className="mt-14 max-w-[68ch] border-t border-hairline pt-8">
        <h2 className="text-[clamp(1.35rem,2.4vw,1.75rem)] leading-tight font-bold tracking-[-0.02em] text-ink">
          {a.choose}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.75] text-muted">{a.chooseBody}</p>
      </section>
    </article>
  )
}
