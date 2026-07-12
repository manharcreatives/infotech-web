import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

/** robots.txt (SRS §6.1) — pricing page excluded from crawling (§4.5). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/pricing',
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
