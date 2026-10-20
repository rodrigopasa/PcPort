import Image from 'next/image'
import type { Lang } from '@/lib/db/schema'
import type { Entry } from '@/lib/data'
import { DICT } from '@/lib/i18n'

/**
 * Real cover art once IGDB is configured. Until then a typographic plate in the
 * page's own language — clearly a placeholder, never fake box art, and never a
 * grey rectangle pretending an image failed to load.
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
  const year = entry.gameMeta?.releasedAt.slice(0, 4) ?? null

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

  return (
    <div
      className="flex aspect-[3/4] w-full flex-col justify-between border border-hairline p-4"
      role="img"
      aria-label={t.noCover}
    >
      <span className="text-[9px] tracking-[0.18em] uppercase text-faint">{entry.console}</span>
      <span className="text-[clamp(.95rem,1.5vw,1.25rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink/90">
        {entry.title}
      </span>
      <span className="tabular text-[10px] tracking-[0.14em] text-faint">{year ?? '—'}</span>
    </div>
  )
}
