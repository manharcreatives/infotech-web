'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { blogPosts } from '@/content/blog'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { SplitLines } from '@/components/motion/SplitLines'
import { ClipRevealText } from '@/components/motion/ClipRevealText'

/**
 * Home "Insights & Resources" preview (SRS §5.1.9): the three latest
 * articles as editorial cards, linking to /blog. Scroll-reveal uses the
 * existing GSAP pattern (transform/opacity only, once).
 */
export function BlogPreview() {
  const ref = useRef<HTMLElement>(null)
  const latest = blogPosts.slice(0, 3)

  useGSAP(
    () => {
      gsap.from('.blog-card', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 82%', once: true },
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative bg-ink py-28 md:py-36">
      <div className="mx-auto w-[min(94%,80rem)]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <ClipRevealText as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( 04 | Insights )
            </ClipRevealText>
            <SplitLines
              as="h2"
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
            >
              Read before you apply.
            </SplitLines>
          </div>
          <TransitionLink
            href="/blog"
            className="link-sweep shrink-0 text-sm tracking-wide text-fg-2 hover:text-fg"
          >
            All resources →
          </TransitionLink>
        </div>

        <div className="blog-grid grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <TransitionLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group flex flex-col overflow-hidden border border-line bg-surface/40 transition-colors duration-500 hover:border-glow/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/25 via-ink-2 to-glow/10">
                <img
                  src={`/images/blog/${post.slug}.png`}
                  alt={`${post.title} — featured illustration`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full border border-line bg-ink/60 px-3 py-1 text-[11px] tracking-wide text-fg-2 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  · {post.readingTime}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-glow">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-3">{post.excerpt}</p>
                <p className="mt-5 text-sm font-medium text-brand">Read more →</p>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  )
}
