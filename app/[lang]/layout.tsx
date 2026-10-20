import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Archivo, Spline_Sans_Mono } from 'next/font/google'
import { isLang, SITE, SITE_NAME, DICT } from '@/lib/i18n'
import { ServiceWorker } from '@/components/ServiceWorker'
import '../globals.css'

// Self-hosted at build time by next/font — no render-blocking request to Google.
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' })
const mono = Spline_Sans_Mono({ subsets: ['latin'], variable: '--font-mono-face', display: 'swap' })

export function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = DICT[lang]
  return {
    metadataBase: new URL(SITE),
    title: {
      default: `${SITE_NAME} — ${lang === 'pt' ? 'ports nativos de console no PC' : 'native console ports on PC'}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: t.tagline,
    alternates: {
      canonical: `${SITE}/${lang}`,
      languages: {
        'pt-BR': `${SITE}/pt`,
        en: `${SITE}/en`,
        'x-default': `${SITE}/en`,
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      type: 'website',
      url: `${SITE}/${lang}`,
    },
    twitter: { card: 'summary_large_image' },
    manifest: '/manifest.webmanifest',
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'black-translucent' },
    icons: { icon: '/icon.svg', apple: '/icon.svg' },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  }
}

export const viewport: Viewport = {
  themeColor: '#0d0e10',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()

  return (
    <html
      lang={lang === 'pt' ? 'pt-BR' : 'en'}
      className={`${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-[2px] focus:bg-raise focus:px-3 focus:py-2 focus:text-[13px]"
        >
          {lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
        </a>
        {children}
        <ServiceWorker />
      </body>
    </html>
  )
}
