import Link from 'next/link'
import type { Lang } from '@/lib/db/schema'
import type { Entry } from '@/lib/data'
import { formatDate, formatSize, gameYear } from '@/lib/data'
import { DICT, entryPath } from '@/lib/i18n'
import { StatusChip } from './StatusChip'
import { Cover } from './Cover'
import { LeadShot } from './Shots'

/**
 * The page's single focal move. The scale jump between the title and the
 * figures is the whole composition, and the LCP element is text the server
 * already sent.
 *
 * Its title is an h2. It used to be the home's only h1, so the page told a
 * search engine it was about whichever game shipped last — "Halo 2 no PC" one
 * hour, something else the next. The h1 is now the catalog's own name, set
 * above this band at a smaller size so the focal move stays this one.
 */
export function LeadBand({ entry, lang }: { entry: Entry; lang: Lang }) {
  const t = DICT[lang]

  const figures = [
    entry.version && { value: entry.version, label: t.versionLabel },
    entry.releasedAt && { value: formatDate(entry.releasedAt, lang)!, label: t.portReleased },
    gameYear(entry.gameMeta) && { value: gameYear(entry.gameMeta)!, label: t.gameReleased },
    formatSize(entry.sizeBytes) && { value: formatSize(entry.sizeBytes)!, label: t.sizeLabel },
  ].filter(Boolean) as { value: string; label: string }[]

  return (
    <section className="border-b border-hairline">
      <div className="mx-auto grid max-w-[1400px] items-end gap-8 px-5 py-10 md:py-14 lg:grid-cols-[auto_1.2fr_auto] lg:gap-12">
        {/* A shot of the port running says more than box art; the cover plate
            is the fallback when the project publishes none. */}
        <div className={`hidden lg:block ${entry.screenshots.length ? 'w-[380px]' : 'w-[180px]'}`}>
          {entry.screenshots.length ? (
            <LeadShot entry={entry} lang={lang} />
          ) : (
            <Cover entry={entry} lang={lang} priority />
          )}
        </div>

        <div className="min-w-0">
          <StatusChip mechanism={entry.mechanism} lang={lang} size="lg" />
          <h2 className="mt-4 text-[clamp(2rem,4.8vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-balance">
            <Link
              href={entryPath(lang, entry.slug)}
              className="no-underline hover:underline decoration-hairline-strong"
            >
              {entry.gameMeta ? t.onPc(entry.title) : entry.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
            {entry.gameMeta?.summary ?? entry.repoDescription}
          </p>
          <p className="tabular mt-5 text-[12px] tracking-[0.1em] uppercase text-faint">
            {entry.console} · {entry.author}
          </p>
        </div>

        {/* A spec block, not stat tiles: value above, label below, hairline between. */}
        <dl className="settle min-w-[220px] self-end border-t border-hairline">
          {figures.map((f) => (
            <div
              key={f.label}
              className="flex items-baseline justify-between gap-6 border-b border-hairline py-3"
            >
              <dd className="tabular order-1 text-[clamp(1.2rem,2.2vw,1.75rem)] leading-none font-medium">
                {f.value}
              </dd>
              <dt className="order-2 text-[11px] tracking-[0.16em] uppercase text-faint">
                {f.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
