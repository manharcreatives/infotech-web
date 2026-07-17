import type { Metadata } from 'next'
import { faqs } from '@/content/site'
import { Preloader } from '@/components/global/Preloader'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { StatementSection } from '@/components/sections/home/StatementSection'
import { ServicesBento } from '@/components/sections/home/ServicesBento'
import { ProcessHorizontal } from '@/components/sections/home/ProcessHorizontal'
import { StatsSection } from '@/components/sections/home/StatsSection'
import { TestimonialsMarquee } from '@/components/sections/home/TestimonialsMarquee'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'
import { EmployerMarquee } from '@/components/sections/EmployerMarquee'
import { BlogPreview } from '@/components/sections/home/BlogPreview'
import { ReferTicket } from '@/components/sections/home/ReferTicket'

export const metadata: Metadata = {
  title: 'Career Consulting & Job Placement | US, Canada, UK, New Zealand',
  description:
    'Get placed in a full-time role across the US, Canada, UK or New Zealand. InfoTech Placement LLC offers structured resume marketing, LinkedIn branding, interview prep and a written interview guarantee.',
  keywords: [
    'job placement guarantee',
    'career consulting USA',
    'resume marketing service',
    'interview preparation coaching',
    'IT job placement',
    'non-IT career placement',
    'job placement Canada UK New Zealand',
  ],
  alternates: { canonical: '/' },
}

/** FAQPage structured data — generated from content/site.ts so it never drifts. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function HomePage() {
  return (
    <main id="main-content">
      <Preloader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <StatementSection />
      <ServicesBento />
      <ProcessHorizontal />
      <BlogPreview />
      <TestimonialsMarquee />
      <StatsSection />
      <EmployerMarquee />
      <ReferTicket />
      <FAQSection />
      <CTASection />
    </main>
  )
}
