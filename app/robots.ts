import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/i18n'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Outbound redirect hops carry no content and should not be crawled.
        disallow: ['/api/', '/ir/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
