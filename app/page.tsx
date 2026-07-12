import type { Metadata } from 'next'
import { faqs } from '@/content/site'
import { Preloader } from '@/components/global/Preloader'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { StatementSection } from '@/components/sections/home/StatementSection'
import { ServicesBento } from '@/components/sections/home/ServicesBento'
import { ProcessHorizontal } from '@/components/sections/home/ProcessHorizontal'
import { BenefitsSection } from '@/components/sections/home/BenefitsSection'
import { StatsSection } from '@/components/sections/home/StatsSection'
import { TestimonialsMarquee } from '@/components/sections/home/TestimonialsMarquee'
import { FAQSection } from '@/components/sections/home/FAQSection'
import { CTASection } from '@/components/sections/home/CTASection'
import { EmployerMarquee } from '@/components/sections/EmployerMarquee'
import { BlogPreview } from '@/components/sections/home/BlogPreview'
import { ReferTicket } from '@/components/sections/home/ReferTicket'

export const metadata: Metadata = {
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
      <BenefitsSection />
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
