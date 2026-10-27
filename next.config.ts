import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Traefik compresses at the edge; doing it twice burns CPU for nothing.
  compress: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Two hosts only: IGDB for cover art, and GitHub's raw host for the
    // screenshots the port projects publish in their own READMEs.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.igdb.com', pathname: '/igdb/image/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
    ],
  },
  // The contribution form under the other language's word. Done here rather
  // than in the page: the page reads its query string, and the build
  // prerendered these two addresses as a 404 cached for a year. A config
  // redirect never renders, and carries the query (?tipo=novo&jogo=…) along.
  async redirects() {
    return [
      { source: '/en/contribuir', destination: '/en/contribute', permanent: true },
      { source: '/pt/contribute', destination: '/pt/contribuir', permanent: true },
    ]
  },
}

export default config
