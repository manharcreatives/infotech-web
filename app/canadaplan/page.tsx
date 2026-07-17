import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { CanadaPlanTiers } from '@/components/sections/CanadaPlanTiers'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'

/**
 * Canada enrollment plans — Professional, Elite.
 * Hidden from search engines (noindex/nofollow), shared by direct URL only.
 */
export const metadata: Metadata = {
  title: 'Canada Plans',
  description:
    'InfoTech Placement LLC Canada enrollment plans: Professional and Elite — one structured program, deeper support at every tier.',
  robots: { index: false, follow: false },
}

export default function CanadaPlanPage() {
  return (
    <main id="main-content">
      <PageHero
        index="08"
        eyebrow="Canada Plans"
        bgImage="/images/heroes/hero-canadaplan.webp"
        bgPosition="right center"
        title={
          <>
            The Right Connection
            <br />
            Changes Everything.
          </>
        }
        lede="Pick the level of support you want on the way to placement — every plan runs on the same structured program, with the same team behind it."
      />

      <CanadaPlanTiers />

      <FAQSection />
      <CTASection />
    </main>
  )
}
