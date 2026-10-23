import Link from 'next/link'
import type { Lang } from '@/lib/db/schema'
import { DICT, contributePath, guidesPath } from '@/lib/i18n'

export function SiteHeader({
  lang,
  counts,
}: {
  lang: Lang
  counts: { total: number; week: number }
}) {
  const t = DICT[lang]
  const other: Lang = lang === 'pt' ? 'en' : 'pt'

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center gap-5 px-5">
        <Link
          href={`/${lang}`}
          className="text-[15px] font-extrabold tracking-[0.18em] uppercase no-underline"
        >
          PCPort
        </Link>

        <nav className="flex items-center gap-4" aria-label={t.consoles}>
          <Link
            href={`/${lang}/consoles`}
            className="text-[12px] text-muted no-underline hover:text-ink"
          >
            {t.consoles}
          </Link>
          <Link
            href={`/${lang}/radar`}
            className="text-[12px] text-muted no-underline hover:text-ink"
          >
            {t.radar}
          </Link>
          <Link href={guidesPath(lang)} className="text-[12px] text-muted no-underline hover:text-ink">
            {t.guides}
          </Link>
          <Link
            href={contributePath(lang)}
            className="hidden text-[12px] text-native no-underline hover:text-ink sm:inline"
          >
            {t.contribute}
          </Link>
        </nav>

        <p className="tabular ml-auto hidden text-[11px] tracking-[0.08em] text-faint md:block">
          <span className="text-muted">{counts.total}</span> {t.ports}
          <span className="mx-2 text-hairline-strong">·</span>
          <span className="text-muted">{counts.week}</span> {t.thisWeek}
        </p>

        <Link
          href={`/${other}`}
          hrefLang={other === 'pt' ? 'pt-BR' : 'en'}
          className="text-[11px] tracking-[0.14em] uppercase text-faint no-underline hover:text-ink"
        >
          {other}
        </Link>
      </div>
    </header>
  )
}
