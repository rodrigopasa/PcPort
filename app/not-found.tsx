import Link from 'next/link'

/**
 * The root 404 lives outside `[lang]`, so it has no route language to read and
 * carries both. It renders its own html/body because no layout wraps it here.
 */
export default function NotFound() {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeContent: 'center',
          gap: 14,
          padding: 24,
          background: '#0d0e10',
          color: '#f2f3f5',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          textAlign: 'center',
          colorScheme: 'dark',
        }}
      >
        <span style={{ color: '#35b37e', letterSpacing: '0.18em', fontSize: 12, fontWeight: 800 }}>
          PCPORT
        </span>
        <h1 style={{ margin: 0, fontSize: 22, letterSpacing: '-0.02em' }}>
          Página não encontrada · Page not found
        </h1>
        <p style={{ margin: 0, maxWidth: '44ch', color: '#8b9099', fontSize: 14, lineHeight: 1.6 }}>
          Esse endereço não existe mais, ou nunca existiu.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 4 }}>
          <Link href="/pt" style={{ color: '#35b37e', fontSize: 14 }}>
            Catálogo
          </Link>
          <Link href="/en" style={{ color: '#35b37e', fontSize: 14 }}>
            Catalog
          </Link>
        </div>
      </body>
    </html>
  )
}
