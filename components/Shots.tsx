import Image from 'next/image'
import type { Lang } from '@/lib/db/schema'
import type { Entry } from '@/lib/data'
import { DICT } from '@/lib/i18n'

/**
 * The project's own screenshots of the port running. More useful than box art
 * for the question the visitor actually has — does this look like the game, and
 * does it look finished — and it is the project's own material.
 */
export function Shots({ entry, lang }: { entry: Entry; lang: Lang }) {
  if (!entry.screenshots.length) return null
  const t = DICT[lang]
  const [lead, ...rest] = entry.screenshots

  return (
    <figure className="m-0">
      <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-raise">
        <Image
          src={lead}
          alt={t.shotOf(entry.title)}
          fill
          sizes="(max-width: 1024px) 100vw, 860px"
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {rest.length ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {rest.map((src, i) => (
            <div
              key={src}
              className="relative aspect-video overflow-hidden border border-hairline bg-raise"
            >
              <Image
                src={src}
                alt={`${t.shotOf(entry.title)} ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 50vw, 420px"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : null}

      <figcaption className="mt-2 text-[11px] text-faint">{t.shotCredit(entry.repo)}</figcaption>
    </figure>
  )
}

/** A single wide shot, for the home band. */
export function LeadShot({ entry, lang }: { entry: Entry; lang: Lang }) {
  const src = entry.screenshots[0]
  if (!src) return null
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-raise">
      <Image
        src={src}
        alt={DICT[lang].shotOf(entry.title)}
        fill
        sizes="(max-width: 1024px) 100vw, 520px"
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  )
}
