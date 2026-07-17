import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { TalentPillars } from '@/components/sections/TalentPillars'
import { TestimonialsMarquee } from '@/components/sections/home/TestimonialsMarquee'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'For Candidates — Job Placement Program',
  description:
    'A structured end-to-end placement program for IT and Non-IT professionals in the US, Canada, UK and New Zealand. Resume optimization, LinkedIn branding, resume marketing, interview prep and offer support — until you are placed.',
  keywords: [
    'job placement for candidates',
    'IT job placement program',
    'career placement for professionals',
    'resume to job placement',
    'structured placement program',
    'job placement IT non-IT',
  ],
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
