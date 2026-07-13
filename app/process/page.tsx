import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { JourneyScroll } from '@/components/sections/JourneyScroll'
import { StatsSection } from '@/components/sections/home/StatsSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'The 11-step candidate journey, published in full. Every stage tracked and visible to you, from registration to post-placement support.',
  alternates: { canonical: '/process' },
}

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageHero
        index="03"
        eyebrow="The Method"
        bgImage="/images/heroes/hero-process.webp"
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
