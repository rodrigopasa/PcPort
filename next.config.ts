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
    ],
  },
}

export default config
