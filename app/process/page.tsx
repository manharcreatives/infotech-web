import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { JourneyScroll } from '@/components/sections/JourneyScroll'
import { StatsSection } from '@/components/sections/home/StatsSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'Our Process — 11-Step Career Placement Journey',
  description:
    'The complete 11-step candidate journey published in full: registration, career consultation, resume optimization, LinkedIn branding, resume marketing, interview preparation, placement and post-placement support.',
  keywords: [
    '11 step placement process',
    'career placement journey',
    'how job placement works',
    'recruitment process',
    'career consulting steps',
    'placement program process',
  ],
  alternates: { canonical: '/process' },
}

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageHero
        index="03"
        eyebrow="The Method"
        bgImage="/images/heroes/hero-process.webp"
        bgPosition="center 62%"
        className="md:pt-72 md:pb-36"
        title={
          <>
            Eleven steps.
            <br />
            Zero guesswork.
          </>
        }
        lede="No black box. Your enrollment follows a published, structured path from first conversation to placement and beyond. You always know which step you're on."
      />

      {/* The 7-step ProcessHorizontal is deliberately home-only
          (client direction, July 2026) — this page owns the full
          11-step journey instead. */}
      <JourneyScroll />

      <StatsSection />
      <CTASection />
    </main>
  )
}
