import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { ServicesStack } from '@/components/sections/ServicesStack'
import { IndustriesSplit } from '@/components/sections/IndustriesSplit'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'Career Services — Resume, LinkedIn, Interview & Placement',
  description:
    'Seven career services in one structured program: resume optimization, LinkedIn branding, resume marketing, interview preparation, career counseling and job placement with post-placement support across US, Canada, UK and New Zealand.',
  keywords: [
    'resume optimization service',
    'LinkedIn profile optimization',
    'resume marketing',
    'interview preparation service',
    'career counseling',
    'job placement service',
    'IT career services',
    'non-IT placement services',
  ],
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        index="02"
        eyebrow="Services"
        bgImage="/images/heroes/hero-services.webp"
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
