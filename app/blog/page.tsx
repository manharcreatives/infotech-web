import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { CTASection } from '@/components/sections/home/CTASection'
import { blogPosts } from '@/content/blog'

export const metadata: Metadata = {
  title: 'Career Insights & Job Search Resources',
  description:
    'Practical, no-hype guides on international job placement, resume optimization, interview preparation and career strategy for the US, Canada, UK and New Zealand job markets.',
  keywords: [
    'career insights',
    'job search tips',
    'resume tips',
    'interview preparation guide',
    'international job placement guide',
    'career strategy',
    'how to get job USA',
    'career blog',
  ],
  alternates: { canonical: '/blog' },
}

export default function BlogIndexPage() {
  return (
    <main id="main-content">
      <PageHero
        index="11"
        eyebrow="Insights & Resources"
        bgImage="/images/heroes/hero-services.webp"
        title={
          <>
            Read before
            <br />
            you apply.
          </>
        }
        lede="Practical, no-hype guides to international job placement: resumes, interviews, markets and strategy, written by the team that does this daily."
      />

      <section className="bg-ink-2 py-20 md:py-28">
        <div className="mx-auto grid w-[min(94%,80rem)] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <TransitionLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="sr-fade-up group flex flex-col overflow-hidden border border-line bg-surface/40 transition-colors duration-500 hover:border-glow/40"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-brand/25 via-ink to-glow/10">
                <Image
                  src={`/images/blog/${post.slug}.png`}
                  alt={`${post.title} — featured illustration`}
                  fill
                  unoptimized
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
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  · {post.readingTime}
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-glow">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-3">{post.excerpt}</p>
                <p className="mt-5 text-sm font-medium text-brand">Read more →</p>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  )
}
