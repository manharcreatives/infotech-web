import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { WordColorReveal } from '@/components/motion/WordColorReveal'
import { SplitLines } from '@/components/motion/SplitLines'
import { MissionVision } from '@/components/sections/about/MissionVision'
import { ValuesReel } from '@/components/sections/about/ValuesReel'
import { StatsSection } from '@/components/sections/home/StatsSection'
import { CTASection } from '@/components/sections/home/CTASection'
import { Button } from '@/components/ui/Button'
import { whatDrivesUs, promise, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About Us — Career Placement Company',
  description:
    'Founded November 2025, InfoTech Placement LLC is a career consulting and placement company serving IT and Non-IT professionals across the US, Canada, UK and New Zealand with a structured 11-step program.',
  keywords: [
    'career placement company',
    'about InfoTech Placement',
    'IT recruitment company',
    'career consulting firm',
    'job placement agency US',
  ],
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        index="01"
        eyebrow="Who we are"
        bgImage="/images/heroes/hero-about.webp"
        bgPosition="right center"
        title={
          <>
            We don&rsquo;t fill vacancies.
            <br />
            We build careers.
          </>
        }
        lede="InfoTech Placement LLC was founded in November 2025 on a simple belief: every talented professional deserves the right opportunity, and a structured path to reach it."
      >
        {/* Hero CTAs per SRS §5.2.1 — LinkedIn is external, so it uses a
            plain anchor rather than the TransitionLink-based Button */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-brand-hover"
          >
            Join us on LinkedIn
          </a>
          <Button href="/services" variant="ghost">
            Explore our services
          </Button>
        </div>
      </PageHero>

      {/* Founding story */}
      <section className="relative overflow-hidden bg-ink-2 py-28 md:py-40">
        <img
          src="/bgr2.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
        />
        <div className="relative z-10 mx-auto w-[min(94%,68rem)]">
          <WordColorReveal
            as="h2"
            className="font-display text-[clamp(1.6rem,3.8vw,3rem)] font-medium leading-[1.3] tracking-tight"
            stagger={0.05}
            color="#FF8DEB"
          >
            We are deliberately new. No legacy database, no volume quotas. A structured multi-phase program, full visibility into every application we send, and a team that answers at any hour, across the United States, Canada, the United Kingdom and New Zealand. We would rather earn trust through process than claim it through history.
          </WordColorReveal>
        </div>
      </section>

      {/* Mission & Vision — full editorial spread */}
      <MissionVision />

      {/* Core values — pinned scroll-driven reel */}
      <ValuesReel />

      {/* What drives us + promise */}
      <section className="bg-ink py-24 md:py-32">
        <div className="mx-auto grid w-[min(94%,80rem)] gap-14 md:grid-cols-[1fr_1.3fr]">
          <div>
            <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( What drives us )
            </SplitLines>
            <SplitLines
              as="h2"
              className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
            >
              The work behind the words.
            </SplitLines>
            <ol className="mt-10 border-t border-line-2">
              {whatDrivesUs.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-baseline gap-5 border-b border-line-2 py-4 text-sm leading-relaxed text-fg-2 transition-colors duration-300 hover:text-fg"
                >
                  <span className="text-stroke font-display text-lg font-bold transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-center">
            <blockquote className="border-l-2 border-brand pl-8">
              <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-[1.4] tracking-tight text-fg">
                &ldquo;{promise}&rdquo;
              </p>
              <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-fg-3">
                Our promise
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <StatsSection />
      <CTASection />
    </main>
  )
}
