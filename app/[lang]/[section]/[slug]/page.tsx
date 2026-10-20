import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getEntry,
  getEntries,
  getCounts,
  getRelated,
  formatDate,
  formatSize,
  gameYear,
  consoleSlug,
} from '@/lib/data'
import { buildFaq, mechanismExplainer } from '@/lib/content'
import { isLang, SITE, SITE_NAME, DICT, entryPath } from '@/lib/i18n'
import type { Lang } from '@/lib/db/schema'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { StatusChip } from '@/components/StatusChip'
import { Cover } from '@/components/Cover'
import { AdSlot } from '@/components/AdSlot'

export const revalidate = 300

/** `/pt/jogo/…` and `/en/game/…`; the section word is part of the language. */
const SECTION: Record<Lang, string> = { pt: 'jogo', en: 'game' }

type Params = Promise<{ lang: string; section: string; slug: string }>

export async function generateStaticParams() {
  const [pt, en] = await Promise.all([getEntries('pt'), getEntries('en')])
  return [
    ...pt.map((e) => ({ lang: 'pt', section: 'jogo', slug: e.slug })),
    ...en.map((e) => ({ lang: 'en', section: 'game', slug: e.slug })),
  ]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, section, slug } = await params
  if (!isLang(lang) || section !== SECTION[lang]) return {}
  const entry = await getEntry(lang, slug)
  if (!entry) return {}

  const t = DICT[lang]
  const mech = t.mechanisms[entry.mechanism]
  // The query is "<game> pc port", never "<game> v1.0".
  const title = entry.gameMeta ? t.seoTitle(entry.title, mech) : `${entry.title} — ${mech}`

  const ptUrl = `${SITE}${entryPath('pt', lang === 'pt' ? entry.slug : entry.slugAlt)}`
  const enUrl = `${SITE}${entryPath('en', lang === 'en' ? entry.slug : entry.slugAlt)}`

  return {
    title,
    description: entry.seoDescription,
    keywords: [
      entry.title,
      `${entry.title} PC`,
      lang === 'pt' ? `${entry.title} no PC` : `${entry.title} PC port`,
      lang === 'pt' ? `como jogar ${entry.title} no PC` : `how to play ${entry.title} on PC`,
      `${entry.console} ${lang === 'pt' ? 'no PC' : 'on PC'}`,
      entry.author,
    ],
    alternates: {
      // Self-referencing. Pointing one language's canonical at the other
      // deindexes it — the most common way bilingual sites lose half their pages.
      canonical: lang === 'pt' ? ptUrl : enUrl,
      languages: { 'pt-BR': ptUrl, en: enUrl, 'x-default': enUrl },
    },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      url: lang === 'pt' ? ptUrl : enUrl,
      title,
      description: entry.seoDescription,
      publishedTime: entry.releasedAt ?? undefined,
    },
    twitter: { card: 'summary_large_image', title, description: entry.seoDescription },
  }
}

export default async function EntryPage({ params }: { params: Params }) {
  const { lang, section, slug } = await params
  if (!isLang(lang) || section !== SECTION[lang]) notFound()

  const [entry, counts] = await Promise.all([getEntry(lang, slug), getCounts()])
  if (!entry) notFound()
  const related = await getRelated(lang, entry)

  const t = DICT[lang]
  const url = `${SITE}${entryPath(lang, entry.slug)}`
  const faq = buildFaq(entry, lang)
  const game = entry.gameMeta

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `${entry.title} — ${t.mechanisms[entry.mechanism]}`,
      applicationCategory: 'GameApplication',
      operatingSystem: entry.platforms.join(', '),
      softwareVersion: entry.version ?? undefined,
      datePublished: entry.releasedAt ?? undefined,
      downloadUrl: entry.releaseUrl,
      fileSize: entry.sizeBytes ? `${Math.round(entry.sizeBytes / 1e6)}MB` : undefined,
      isAccessibleForFree: true,
      license: entry.licenseUrl ?? undefined,
      author: { '@type': 'Organization', name: entry.author },
      description: entry.seoDescription,
      url,
      ...(game
        ? {
            about: {
              '@type': 'VideoGame',
              name: entry.title,
              gamePlatform: entry.console,
              datePublished: game.releasedAt,
              genre: game.genres,
              author: { '@type': 'Organization', name: game.developer },
              ...(game.publisher
                ? { publisher: { '@type': 'Organization', name: game.publisher } }
                : {}),
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE}/${lang}` },
        {
          '@type': 'ListItem',
          position: 2,
          name: entry.console,
          item: `${SITE}/${lang}/console/${consoleSlug(entry.console)}`,
        },
        { '@type': 'ListItem', position: 3, name: entry.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  // Two dates that mean different things, labelled so they never read as one.
  const specs = [
    entry.version && { label: t.versionLabel, value: entry.version },
    entry.releasedAt && { label: t.portReleased, value: formatDate(entry.releasedAt, lang)! },
    game && { label: t.gameReleased, value: formatDate(game.releasedAt, lang)! },
    formatSize(entry.sizeBytes) && { label: t.sizeLabel, value: formatSize(entry.sizeBytes)! },
    { label: t.colConsole, value: entry.console },
    { label: 'Build', value: entry.platforms.join(' · ') },
    entry.licenseId && { label: t.license, value: entry.licenseId },
  ].filter(Boolean) as { label: string; value: string }[]

  const gameFacts = game
    ? ([
        { label: t.developer, value: game.developer },
        game.publisher && { label: t.publisher, value: game.publisher },
        game.genres.length && { label: t.genre, value: game.genres.join(' · ') },
        { label: t.gameReleased, value: formatDate(game.releasedAt, lang)! },
      ].filter(Boolean) as { label: string; value: string }[])
    : []

  const h2 = 'text-[11px] tracking-[0.16em] uppercase text-faint'

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
          <Link
            href={`/${lang}/console/${consoleSlug(entry.console)}`}
            className="no-underline hover:text-ink"
          >
            {entry.console}
          </Link>
        </nav>

        <article className="grid gap-x-16 gap-y-10 py-10 lg:grid-cols-[1.3fr_1fr]">
          {/* 1 — the identification the visitor arrived for */}
          <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            <StatusChip mechanism={entry.mechanism} lang={lang} size="lg" />
            <h1 className="settle mt-4 text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance">
              {game ? t.onPc(entry.title) : entry.title}
            </h1>
            <p className="mt-5 max-w-[68ch] text-[16px] leading-relaxed text-muted">
              {entry.seoDescription}
            </p>
          </div>

          {/* 2 — on phones this sits directly under the description, because the
              download and the "will it run" figures are what the visit is for. */}
          <aside className="order-2 self-start lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="mb-6 max-w-[300px]">
              <Cover entry={entry} lang={lang} priority />
            </div>

            <dl className="border-t border-hairline">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-2.5"
                >
                  <dt className="text-[11px] tracking-[0.14em] uppercase text-faint">{s.label}</dt>
                  <dd className="tabular text-right text-[14px] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={entry.releaseUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[2px] border border-native/40 bg-native/10 px-4 text-[14px] font-medium text-native no-underline transition-colors hover:bg-native/20 sm:w-auto"
            >
              {t.openRelease}
            </a>
            <p className="tabular mt-3 text-[11px] text-faint">
              {entry.repo} · ★{entry.stars.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en')}
            </p>

            <AdSlot className="mt-10" />
          </aside>

          {/* 3 — the long tail */}
          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
            {game ? (
              <section>
                <h2 className={h2}>{t.aboutGame}</h2>
                <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.75] text-muted">
                  {game.summary}
                </p>
                <dl className="mt-5 grid gap-x-10 border-t border-hairline sm:grid-cols-2">
                  {gameFacts.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline justify-between gap-4 border-b border-hairline py-2.5"
                    >
                      <dt className="text-[11px] tracking-[0.14em] uppercase text-faint">
                        {f.label}
                      </dt>
                      <dd className="text-right text-[13px] text-muted">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <h2 className={`${game ? 'mt-12' : ''} ${h2}`}>{t.howThisWorks}</h2>
            <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.75] text-muted">
              {mechanismExplainer(entry, lang)}
            </p>
            <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-faint">
              {entry.repoDescription}
            </p>

            <h2 className={`mt-12 ${h2}`}>{t.howToInstall}</h2>
            <ol className="mt-4 border-t border-hairline">
              {entry.installSteps.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-b border-hairline py-3 text-[14px] leading-relaxed"
                >
                  <span className="tabular shrink-0 text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-muted">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[12px] text-faint">{t.ownCopy}</p>

            <h2 className={`mt-12 ${h2}`}>{t.faq}</h2>
            <div className="mt-4 border-t border-hairline">
              {faq.map((f) => (
                <details key={f.q} className="group border-b border-hairline py-3">
                  <summary className="flex cursor-pointer list-none gap-2 text-[15px] font-medium marker:content-none">
                    <span
                      aria-hidden
                      className="shrink-0 text-faint transition-transform duration-200 group-open:rotate-90"
                    >
                      &rsaquo;
                    </span>
                    {f.q}
                  </summary>
                  <p className="expand mt-2 max-w-[68ch] pl-5 text-[14px] leading-relaxed text-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </article>

        {related.length ? (
          <section className="border-t border-hairline pt-8">
            <h2 className={h2}>
              {lang === 'pt' ? `Outros ports de ${entry.console}` : `More ${entry.console} ports`}
            </h2>
            <ul className="deal mt-4 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id} className="border-b border-hairline">
                  <Link
                    href={entryPath(lang, r.slug)}
                    className="flex items-baseline justify-between gap-4 py-3 text-muted no-underline transition-colors hover:text-ink"
                  >
                    <span className="text-[14px]">{r.title}</span>
                    <span className="tabular shrink-0 text-[12px] text-faint">
                      {gameYear(r.gameMeta) ?? r.version ?? '—'}
                    </span>
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
