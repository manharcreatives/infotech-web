import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { blogPosts } from '@/content/blog'

/**
 * XML sitemap (SRS §6.1).
 * DELIBERATELY EXCLUDED: /pricing — the hidden pricing page must never
 * appear in the sitemap (SRS §4.5). Do not add it.
 */
const routeConfig: Record<string, { changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }> = {
  '': { changeFrequency: 'weekly', priority: 1.0 },
  '/services': { changeFrequency: 'monthly', priority: 0.95 },
  '/contact': { changeFrequency: 'monthly', priority: 0.9 },
  '/about': { changeFrequency: 'monthly', priority: 0.85 },
  '/process': { changeFrequency: 'monthly', priority: 0.85 },
  '/blog': { changeFrequency: 'weekly', priority: 0.8 },
  '/talent': { changeFrequency: 'monthly', priority: 0.8 },
  '/refer': { changeFrequency: 'monthly', priority: 0.7 },
  '/privacy-policy': { changeFrequency: 'yearly', priority: 0.3 },
  '/terms': { changeFrequency: 'yearly', priority: 0.3 },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.entries(routeConfig).map(([path, config]) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: config.changeFrequency,
    priority: config.priority,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
