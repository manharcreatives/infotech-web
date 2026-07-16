import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { PlanTiers } from '@/components/sections/PlanTiers'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'

/**
 * US enrollment plans — Basic, Advance, Premium.
 * Hidden from search engines (noindex/nofollow), shared by direct URL only.
 */
export const metadata: Metadata = {
  title: 'US Plans',
  description:
    'InfoTech Placement LLC US enrollment plans: Basic, Advance and Premium — one structured program, deeper support at every tier.',
  robots: { index: false, follow: false },
}

export default function USPlanPage() {
  return (
    <main id="main-content">
      <PageHero
        index="08"
        eyebrow="US Plans"
        title={
          <>
            The Right Connection
            <br />
            Changes Everything.
          </>
        }
        lede="Pick the level of support you want on the way to placement — every plan runs on the same structured program, with the same team behind it."
      />

      <PlanTiers />

      <FAQSection />
      <CTASection />
    </main>
  )
}
