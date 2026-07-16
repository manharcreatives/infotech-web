import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { Button } from '@/components/ui/Button'
import { blogPosts, getPost } from '@/content/blog'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'InfoTech Placement LLC' },
  }

  return (
    <main id="main-content">
      <article className="pt-40 md:pt-48">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* Header */}
        <header className="mx-auto w-[min(94%,52rem)]">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-brand">{post.category}</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-fg-3">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
             · {post.readingTime} · InfoTech Placement LLC
          </p>
        </header>

        {/* Featured image (ChatGPT-generated, brand palette) */}
        <div className="mx-auto mt-10 w-[min(94%,64rem)]">
          <div className="relative aspect-[16/7] overflow-hidden border border-line bg-gradient-to-br from-brand/25 via-ink-2 to-glow/10">
            <Image
              src={`/images/blog/${post.slug}.png`}
              alt={`${post.title} — featured illustration`}
              fill
              unoptimized
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto w-[min(94%,52rem)] py-14 md:py-20">
          <p className="text-lg leading-relaxed text-fg-2">{post.excerpt}</p>

          {post.sections.map((section, i) => (
            <div key={section.heading}>
              <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-5 text-base leading-relaxed text-fg-2">
                  {p}
                </p>
              ))}

              {/* In-body resource block after the second section (internal links) */}
              {i === 1 && (
                <aside className="mt-10 border-l-2 border-brand bg-surface/40 p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-fg-3">
                    Go deeper
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <TransitionLink href="/services" className="link-sweep text-fg-2 hover:text-fg">
                        Our services, for candidates and employers →
                      </TransitionLink>
                    </li>
                    <li>
                      <TransitionLink href="/process" className="link-sweep text-fg-2 hover:text-fg">
                        The 11-step candidate journey, published in full →
                      </TransitionLink>
                    </li>
                    <li>
                      <TransitionLink href="/contact" className="link-sweep text-fg-2 hover:text-fg">
                        Book a free consultation →
                      </TransitionLink>
                    </li>
                  </ul>
                </aside>
              )}
            </div>
          ))}

          <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            The takeaway
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-2">{post.takeaway}</p>

          {/* Closing CTA */}
          <div className="mt-14 border border-line bg-surface/40 p-8 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight">
              Ready to move from reading to placed?
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-3">
              Book a free consultation. We&rsquo;ll assess your profile and map
              the path from resume to full-time offer.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact">Book a Free Consultation</Button>
            </div>
          </div>
        </div>

        {/* Related articles */}
        <section className="border-t border-line-2 bg-ink-2 py-16 md:py-20">
          <div className="mx-auto w-[min(94%,80rem)]">
            <p className="mb-8 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( Related articles )
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <TransitionLink
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group border border-line bg-surface/40 p-6 transition-colors duration-500 hover:border-glow/40"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-fg-3">{r.category}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-glow">
                    {r.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium text-brand">Read more →</p>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}
