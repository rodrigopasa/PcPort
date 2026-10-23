import Link from 'next/link'
import type { Lang } from '@/lib/db/schema'
import { DICT, SITE_NAME, contributePath, guidesPath } from '@/lib/i18n'
import { InstallApp } from './InstallApp'

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = DICT[lang]
  const other: Lang = lang === 'pt' ? 'en' : 'pt'

  const nav = [
    { href: `/${lang}`, label: SITE_NAME },
    { href: `/${lang}/${lang === 'pt' ? 'consoles' : 'consoles'}`, label: t.consoles },
    { href: `/${lang}/radar`, label: t.radar },
    { href: guidesPath(lang), label: t.guides },
    { href: contributePath(lang), label: t.contribute },
  ]

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <nav className="flex flex-col gap-2" aria-label={SITE_NAME}>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-[13px] text-muted no-underline hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={`/${other}`}
            hrefLang={other === 'pt' ? 'pt-BR' : 'en'}
            className="text-[13px] text-muted no-underline hover:text-ink"
          >
            {other === 'pt' ? 'Português' : 'English'}
          </Link>
        </nav>

        <div>
          <h2 className="text-[11px] tracking-[0.16em] uppercase text-faint">{t.installApp}</h2>
          <p className="mt-2 max-w-[34ch] text-[12px] leading-relaxed text-muted">
            {t.installAppLead}
          </p>
          <div className="mt-3">
            <InstallApp lang={lang} />
          </div>
        </div>

        <div>
          <h2 className="text-[11px] tracking-[0.16em] uppercase text-faint">{t.donate}</h2>
          <p className="mt-2 max-w-[34ch] text-[12px] leading-relaxed text-muted">{t.donateLead}</p>
        </div>

        <p className="max-w-[40ch] text-[12px] leading-relaxed text-faint">{t.footerNote}</p>
      </div>
    </footer>
  )
}
