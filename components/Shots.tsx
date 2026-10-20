import Image from 'next/image'
import type { Lang } from '@/lib/db/schema'
import type { Entry, Shot } from '@/lib/data'
import { DICT } from '@/lib/i18n'

/**
 * Each image is laid out at its own intrinsic aspect. READMEs mix screenshots
 * with comparison strips and banners, and forcing those into a fixed frame
 * crops them into something that reads as empty.
 */
function Plate({
  shot,
  alt,
  priority = false,
  sizes,
}: {
  shot: Shot
  alt: string
  priority?: boolean
  sizes: string
}) {
  return (
    <Image
      src={shot.url}
      alt={alt}
      width={shot.w}
      height={shot.h}
      sizes={sizes}
      priority={priority}
      unoptimized
      className="h-auto w-full border border-hairline bg-raise"
    />
  )
}

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
      <Plate
        shot={lead}
        alt={t.shotOf(entry.title)}
        priority
        sizes="(max-width: 1024px) 100vw, 860px"
      />

      {rest.length ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {rest.map((shot, i) => (
            <Plate
              key={shot.url}
              shot={shot}
              alt={`${t.shotOf(entry.title)} ${i + 2}`}
              sizes="(max-width: 1024px) 50vw, 420px"
            />
          ))}
        </div>
      ) : null}

      <figcaption className="mt-2 text-[11px] text-faint">{t.shotCredit(entry.repo)}</figcaption>
    </figure>
  )
}

/** A single shot for the home band. */
export function LeadShot({ entry, lang }: { entry: Entry; lang: Lang }) {
  const shot = entry.screenshots[0]
  if (!shot) return null
  return (
    <Plate
      shot={shot}
      alt={DICT[lang].shotOf(entry.title)}
      priority
      sizes="(max-width: 1024px) 100vw, 400px"
    />
  )
}
