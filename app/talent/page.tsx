import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { TalentPillars } from '@/components/sections/TalentPillars'
import { TestimonialsMarquee } from '@/components/sections/home/TestimonialsMarquee'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'For Talent',
  description:
    'A structured placement program: resume, LinkedIn, marketing, interview prep, offer support and post-placement care, handled end to end.',
  alternates: { canonical: '/talent' },
}

export default function TalentPage() {
  return (
    <main id="main-content">
      <PageHero
        index="05"
        eyebrow="For Talent"
        title={
          <>
            The goal isn&rsquo;t an interview.
            <br />
            It&rsquo;s the job.
          </>
        }
        lede="A structured program for IT and Non-IT professionals in the US, Canada, UK and New Zealand. Your resume rebuilt, your profile marketed, your interview secured — and a team that stays until you're placed."
      />

      <TalentPillars />

      <TestimonialsMarquee />
      <CTASection />
    </main>
  )
}
