import { ImageResponse } from 'next/og'
import { getEntry, getEntries, formatDate } from '@/lib/data'
import { isLang, DICT, SITE_NAME } from '@/lib/i18n'
import type { Mechanism } from '@/lib/db/schema'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'PCPort'

/** Prerendered, so the first share of a new release is not the slow one. */
export async function generateStaticParams() {
  const [pt, en] = await Promise.all([getEntries('pt'), getEntries('en')])
  return [
    ...pt.map((e) => ({ lang: 'pt', section: 'jogo', slug: e.slug })),
    ...en.map((e) => ({ lang: 'en', section: 'game', slug: e.slug })),
  ]
}

const TONE: Record<Mechanism, string> = {
  native: '#35b37e',
  recompiled: '#d99a2b',
  'translation-layer': '#7b6cf6',
  emulator: '#5b94d6',
  'in-progress': '#6b7280',
}

/**
 * Built from type and the status colour — never box art. A catalog that
 * generates its own share images has nothing to be served a notice over.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLang(lang)) return new ImageResponse(<div />, size)

  const entry = await getEntry(lang, slug)
  if (!entry) return new ImageResponse(<div />, size)

  const t = DICT[lang]
  const tone = TONE[entry.mechanism]

  const facts = [
    entry.version && { label: t.versionLabel, value: entry.version },
    entry.gameMeta && { label: t.gameReleased, value: entry.gameMeta.releasedAt.slice(0, 4) },
    entry.releasedAt && { label: t.portReleased, value: formatDate(entry.releasedAt, lang)! },
  ].filter(Boolean) as { label: string; value: string }[]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d0e10',
          color: '#f2f3f5',
          padding: '64px 72px',
          justifyContent: 'space-between',
          borderTop: `8px solid ${tone}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 24, letterSpacing: 6, fontWeight: 800 }}>
            {SITE_NAME.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 3,
              color: tone,
              border: `1px solid ${tone}`,
              padding: '6px 14px',
            }}
          >
            {t.mechanisms[entry.mechanism].toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: entry.title.length > 42 ? 62 : 82,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {entry.title}
          </div>
          <div style={{ fontSize: 26, color: '#8b9099', marginTop: 20, letterSpacing: 2 }}>
            {entry.author ? `${entry.console}  ·  ${entry.author}` : entry.console}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 56, borderTop: '1px solid #2a2d33', paddingTop: 24 }}>
          {facts.map((f) => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 40, fontWeight: 600 }}>{f.value}</span>
              <span style={{ fontSize: 18, color: '#5d636c', letterSpacing: 3, marginTop: 6 }}>
                {f.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
