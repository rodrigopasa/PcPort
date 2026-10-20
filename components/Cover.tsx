import Image from 'next/image'
import type { Lang, Mechanism } from '@/lib/db/schema'
import type { Entry } from '@/lib/data'
import { DICT } from '@/lib/i18n'

const RULE: Record<Mechanism, string> = {
  native: 'bg-native',
  recompiled: 'bg-recompiled',
  'translation-layer': 'bg-translation',
  'in-progress': 'bg-progress',
}

/**
 * Real cover art once IGDB is configured, and otherwise a cartridge-label plate
 * built from what the entry already knows. Seventeen of the catalogue's
 * projects publish no image anywhere, so this is a permanent state for them,
 * not a loading placeholder — it is designed to be looked at rather than
 * excused. Never fake box art, and never a grey rectangle pretending a request
 * failed.
 */
export function Cover({
  entry,
  lang,
  priority = false,
}: {
  entry: Entry
  lang: Lang
  priority?: boolean
}) {
  const t = DICT[lang]
  const url = entry.gameMeta?.coverUrl ?? null

  if (url) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-hairline">
        <Image
          src={url}
          alt={t.coverOf(entry.title)}
          fill
          sizes="(max-width: 1024px) 60vw, 320px"
          className="object-cover"
          priority={priority}
        />
      </div>
    )
  }

  const year = entry.gameMeta?.releasedAt.slice(0, 4) ?? null
  const initial = entry.title.replace(/^(the|a|o|os|as)\s+/i, '').charAt(0).toUpperCase()

  return (
    <div
      role="img"
      aria-label={t.coverOf(entry.title)}
      className="relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden border border-hairline bg-raise p-4"
    >
      {/* The ghosted initial gives the plate a focal mass; it is decoration
          derived from the title, never a stand-in for artwork. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-0.04em] bottom-[-0.16em] text-[7.5rem] leading-none font-extrabold tracking-[-0.06em] text-ink/[0.06] select-none"
      >
        {initial}
      </span>

      <div className="relative flex items-start justify-between gap-2">
        <span className="text-[9px] leading-tight tracking-[0.18em] uppercase text-faint">
          {entry.console}
        </span>
        <span className={`mt-1 h-[2px] w-6 shrink-0 ${RULE[entry.mechanism]}`} />
      </div>

      <span className="relative text-[clamp(.95rem,1.6vw,1.3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-ink/90 text-balance">
        {entry.title}
      </span>

      <div className="relative flex items-baseline justify-between gap-2">
        <span className="tabular text-[10px] tracking-[0.14em] text-faint">{year ?? '—'}</span>
        <span className="text-[9px] tracking-[0.14em] uppercase text-faint">
          {t.mechanisms[entry.mechanism]}
        </span>
      </div>
    </div>
  )
}
