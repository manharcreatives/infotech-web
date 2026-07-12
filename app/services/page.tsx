import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { ServicesStack } from '@/components/sections/ServicesStack'
import { IndustriesSplit } from '@/components/sections/IndustriesSplit'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Seven career services in one structured program: resume, LinkedIn, marketing, interview prep, counseling and placement with post-placement support.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        index="02"
        eyebrow="Services"
        title={
          <>
            Everything between you
            <br />
            and your next role.
          </>
        }
        lede="Seven services that carry you from first consultation to placement and beyond — one structured program, across four countries."
      />

      {/* Full-screen stacking deck — one service over another on scroll */}
      <ServicesStack />

      {/* Industries we place into — full split-screen chapter */}
      <IndustriesSplit />

      <FAQSection />
      <CTASection />
    </main>
  )
}
