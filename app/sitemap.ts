import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { blogPosts } from '@/content/blog'

/**
 * XML sitemap (SRS §6.1).
 * DELIBERATELY EXCLUDED: /pricing — the hidden pricing page must never
 * appear in the sitemap (SRS §4.5). Do not add it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/process',
    '/services',
    '/contact',
    '/talent',
    '/refer',
    '/blog',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
