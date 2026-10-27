import { ImageResponse } from 'next/og'
import { getConsoles, getCounts } from '@/lib/data'
import { isLang, SITE_NAME } from '@/lib/i18n'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'PCPort'
export const revalidate = 3600

/**
 * The share card for every page that has none of its own: the home, the
 * console pages, the comparisons and the guides. They shared as a bare link
 * before. Port pages keep theirs, made from the port's own facts.
 *
 * Type and the catalog's colours only, never box art, as on the port cards.
 */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const pt = !isLang(lang) || lang === 'pt'
  const [{ total }, consoles] = await Promise.all([getCounts(), getConsoles(pt ? 'pt' : 'en')])
  const top = consoles
    .slice()
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

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
          borderTop: '8px solid #35b37e',
        }}
      >
        <span style={{ fontSize: 24, letterSpacing: 6, fontWeight: 800 }}>{SITE_NAME.toUpperCase()}</span>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            {pt ? 'Jogos de console no PC' : 'Console games on PC'}
          </div>
          <div style={{ fontSize: 28, color: '#8b9099', marginTop: 22 }}>
            {pt
              ? 'Ports nativos, recompilações e descompilações, com o passo a passo de instalação.'
              : 'Native ports, recompilations and decompilations, with step-by-step install guides.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 48, borderTop: '1px solid #2a2d33', paddingTop: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, fontWeight: 600 }}>{total}</span>
            <span style={{ fontSize: 18, color: '#7a8089', letterSpacing: 3, marginTop: 6 }}>PORTS</span>
          </div>
          {top.map((c) => (
            <div key={c.slug} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 40, fontWeight: 600 }}>{c.count}</span>
              <span style={{ fontSize: 18, color: '#7a8089', letterSpacing: 3, marginTop: 6 }}>
                {c.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
