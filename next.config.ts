import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Traefik compresses at the edge; doing it twice burns CPU for nothing.
  compress: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // IGDB is the only external image host; nothing else is allowed through.
    remotePatterns: [{ protocol: 'https', hostname: 'images.igdb.com', pathname: '/igdb/image/**' }],
  },
}

export default config
