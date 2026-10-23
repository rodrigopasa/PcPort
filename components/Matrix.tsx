'use client'

import { Fragment, useMemo, useState, useId } from 'react'
import Link from 'next/link'
import type { Lang, Mechanism } from '@/lib/db/schema'
import type { Entry } from '@/lib/data'
import { formatDate, gameYear } from '@/lib/format'
import { DICT, entryPath } from '@/lib/i18n'
import { StatusChip } from './StatusChip'

type Sort = 'recent' | 'alpha' | 'stars'

const CELL = 'px-3 py-2.5 align-middle'

/** The hover rule takes its colour from the row, which the chip already set. */
const TONE: Record<Mechanism, string> = {
  native: 'text-native',
  recompiled: 'text-recompiled',
  'translation-layer': 'text-translation',
  emulator: 'text-emulator',
  'in-progress': 'text-progress',
}

export function Matrix({ entries, lang }: { entries: Entry[]; lang: Lang }) {
  const t = DICT[lang]
  const [q, setQ] = useState('')
  const [consoleFilter, setConsoleFilter] = useState('')
  const [mech, setMech] = useState('')
  const [sort, setSort] = useState<Sort>('recent')
  const [open, setOpen] = useState<string | null>(null)
  const searchId = useId()

  const consoles = useMemo(() => [...new Set(entries.map((e) => e.console))].sort(), [entries])

  const needle = q.trim().toLowerCase()
  const matchesText = (e: Entry) =>
    !needle ||
    e.title.toLowerCase().includes(needle) ||
    e.console.toLowerCase().includes(needle) ||
    e.author.toLowerCase().includes(needle)

  /**
   * Counts beside every option, as facets: each count honours the OTHER active
   * filters and the search, so "Nintendo 64 (14)" means fourteen rows will be
   * there after the click. A count that ignored them would promise rows the
   * table then does not show.
   */
  const facets = useMemo(() => {
    const byConsole = new Map<string, number>()
    const byMech = new Map<Mechanism, number>()
    const total = new Map<Mechanism, number>()
    for (const e of entries) {
      total.set(e.mechanism, (total.get(e.mechanism) ?? 0) + 1)
      if (!matchesText(e)) continue
      if (!mech || e.mechanism === mech) byConsole.set(e.console, (byConsole.get(e.console) ?? 0) + 1)
      if (!consoleFilter || e.console === consoleFilter) {
        byMech.set(e.mechanism, (byMech.get(e.mechanism) ?? 0) + 1)
      }
    }
    return { byConsole, byMech, total }
    // matchesText reads `needle`, which is derived from q.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, needle, mech, consoleFilter])

  const rows = useMemo(() => {
    const out = entries.filter((e) => {
      if (consoleFilter && e.console !== consoleFilter) return false
      if (mech && e.mechanism !== mech) return false
      return matchesText(e)
    })
    if (sort === 'alpha') return [...out].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'stars') return [...out].sort((a, b) => b.stars - a.stars)
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, needle, consoleFilter, mech, sort])

  const control =
    'h-9 rounded-[2px] border border-hairline bg-transparent px-2.5 text-[13px] text-ink ' +
    'transition-colors hover:border-hairline-strong focus:border-native focus:outline-none'

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24">
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline py-4">
        <label htmlFor={searchId} className="sr-only">
          {t.search}
        </label>
        <input
          id={searchId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search}
          className={`${control} min-w-[220px] flex-1 placeholder:text-faint`}
        />
        <select
          value={consoleFilter}
          onChange={(e) => setConsoleFilter(e.target.value)}
          aria-label={t.filterConsole}
          className={control}
        >
          <option value="">{`${t.filterConsole}: ${t.filterAll}`}</option>
          {consoles.map((c) => {
            const n = facets.byConsole.get(c) ?? 0
            return (
              <option key={c} value={c} disabled={n === 0 && c !== consoleFilter}>
                {`${c} (${n})`}
              </option>
            )
          })}
        </select>
        <select
          value={mech}
          onChange={(e) => setMech(e.target.value)}
          aria-label={t.filterMechanism}
          className={control}
        >
          <option value="">{`${t.filterMechanism}: ${t.filterAll}`}</option>
          {(Object.keys(t.mechanisms) as Mechanism[])
            // A mechanism this list has none of is noise, not an option.
            .filter((m) => (facets.total.get(m) ?? 0) > 0)
            .map((m) => {
              const n = facets.byMech.get(m) ?? 0
              return (
                <option key={m} value={m} disabled={n === 0 && m !== mech}>
                  {`${t.mechanisms[m]} (${n})`}
                </option>
              )
            })}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          aria-label={t.sortRecent}
          className={control}
        >
          <option value="recent">{t.sortRecent}</option>
          <option value="stars">{t.sortStars}</option>
          <option value="alpha">{t.sortAlpha}</option>
        </select>
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="text-[10px] tracking-[0.16em] uppercase text-faint">
            <th scope="col" className={`${CELL} font-medium`}>{t.colGame}</th>
            <th scope="col" className={`${CELL} font-medium`}>{t.colConsole}</th>
            <th scope="col" className={`${CELL} hidden font-medium xl:table-cell`}>{t.colYear}</th>
            <th scope="col" className={`${CELL} hidden font-medium md:table-cell`}>
              {t.colMechanism}
            </th>
            <th scope="col" className={`${CELL} hidden font-medium sm:table-cell`}>
              {t.colVersion}
            </th>
            <th scope="col" className={`${CELL} hidden font-medium lg:table-cell`}>{t.colDate}</th>
            <th scope="col" className={`${CELL} font-medium`}>{t.colStatus}</th>
          </tr>
        </thead>
        {/* `key` on the body restarts the deal when the filter changes, so the
            result reads as a new hand rather than a silent swap. */}
        <tbody key={`${q}|${consoleFilter}|${mech}|${sort}`} className="deal">
          {rows.map((e) => {
            const isOpen = open === e.id
            return (
              <Fragment key={e.id}>
                <tr
                  onClick={() => setOpen(isOpen ? null : e.id)}
                  data-open={isOpen}
                  className={`cursor-pointer border-t border-hairline transition-colors hover:bg-raise ${TONE[e.mechanism]}`}
                >
                  {/* A real anchor, not just a clickable row: a crawler does
                      not follow onClick, and without this the entry pages have
                      no internal links pointing at them at all. The row still
                      expands; the link stops the click from reaching it. */}
                  <td className={`row-mark ${CELL} text-[15px] font-medium`}>
                    <Link
                      href={entryPath(lang, e.slug)}
                      onClick={(ev) => ev.stopPropagation()}
                      className="text-ink no-underline hover:underline decoration-hairline-strong"
                    >
                      {e.title}
                    </Link>
                  </td>
                  <td className={`${CELL} text-[13px] text-muted`}>{e.console}</td>
                  <td className={`${CELL} tabular hidden text-[13px] text-muted xl:table-cell`}>
                    {gameYear(e.gameMeta) ?? '—'}
                  </td>
                  <td
                    className={`${CELL} hidden whitespace-nowrap text-[13px] text-muted md:table-cell`}
                  >
                    {t.mechanisms[e.mechanism]}
                  </td>
                  <td
                    className={`${CELL} tabular hidden whitespace-nowrap text-[13px] text-muted sm:table-cell`}
                  >
                    {e.version ?? '—'}
                  </td>
                  <td
                    className={`${CELL} tabular hidden whitespace-nowrap text-[13px] text-muted lg:table-cell`}
                  >
                    {formatDate(e.releasedAt, lang) ?? '—'}
                  </td>
                  <td className={CELL}>
                    <StatusChip mechanism={e.mechanism} lang={lang} />
                  </td>
                </tr>
                {isOpen ? (
                  <tr className="border-t border-hairline bg-raise">
                    <td colSpan={7} className="px-3 pt-4 pb-6">
                      <div className="expand grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                          <p className="max-w-[68ch] text-[14px] leading-relaxed text-muted">
                            {e.gameMeta?.summary ?? e.repoDescription}
                          </p>
                          <ol className="mt-4 space-y-1.5">
                            {e.installSteps.slice(0, 4).map((s, i) => (
                              <li key={i} className="flex gap-3 text-[13px] leading-relaxed">
                                <span className="tabular shrink-0 text-faint">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="text-muted">{s}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="flex flex-col items-start gap-3 lg:items-end">
                          <Link
                            href={entryPath(lang, e.slug)}
                            className="inline-flex h-9 items-center rounded-[2px] border border-native/40 bg-native/10 px-3 text-[13px] font-medium text-native no-underline transition-colors hover:bg-native/20"
                          >
                            {t.fullPage}
                          </Link>
                          <a
                            href={e.releaseUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="text-[13px] text-muted underline decoration-hairline-strong hover:text-ink"
                          >
                            {t.openRelease}
                          </a>
                          <p className="tabular text-[11px] text-faint lg:text-right">
                            {e.repo} · ★{e.stars.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en')}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>

      {rows.length === 0 ? (
        <p className="border-t border-hairline py-10 text-[14px] text-muted">{t.noResults}</p>
      ) : null}

      <p className="mt-8 border-t border-hairline pt-4 text-[12px] text-faint">{t.ownCopy}</p>
    </section>
  )
}
