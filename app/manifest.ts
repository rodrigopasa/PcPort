import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/i18n'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — native console ports on PC`,
    short_name: SITE_NAME,
    description:
      'Catalog of open-source native console-to-PC ports, recompilations and tools, kept current from GitHub.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0d0e10',
    theme_color: '#0d0e10',
    categories: ['games', 'utilities'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  }
}
