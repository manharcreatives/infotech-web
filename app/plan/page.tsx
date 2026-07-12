import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { PlanTiers } from '@/components/sections/PlanTiers'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'

/**
 * Enrollment plans with the client's real tiers (delivered July 2026,
 * superseding the interim /pricing explainer).
 *
 * Follows the same visibility policy as /pricing (SRS §4.5):
 * noindex/nofollow, not in the sitemap, not linked from navigation or
 * footer — shared by the client via direct URL only. If the client
 * wants this page public, lift the robots block and add it to
 * app/sitemap.ts deliberately.
 */
export const metadata: Metadata = {
  title: 'Plans',
  description:
    'InfoTech Placement enrollment plans: Basic, Advance and Premium — one structured program, deeper support at every tier.',
  robots: { index: false, follow: false },
}

export default function PlanPage() {
  return (
    <main id="main-content">
      <PageHero
        index="08"
        eyebrow="Plans"
        title={
          <>
            Three plans.
            <br />
            One destination.
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
