import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'
import { site } from '@/content/site'
import { ClipRevealText } from '@/components/motion/ClipRevealText'
import { EmployerMarquee } from '@/components/sections/EmployerMarquee'
import { ContactMap } from '@/components/sections/ContactMap'

export const metadata: Metadata = {
  title: 'Contact Us — Free Career Consultation',
  description:
    'Book a free career consultation with InfoTech Placement LLC. We operate 24/7 across the US, Canada, UK and New Zealand. A real consultant answers any hour — not a chatbot.',
  keywords: [
    'free career consultation',
    'book career consultation',
    'contact career placement company',
    'career counseling appointment',
    'job placement consultation',
    '24/7 career support',
  ],
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        index="06"
        eyebrow="Contact Us"
        bgImage="/images/heroes/hero-contact.webp"
        title={
          <>
            Whatever the hour,
            <br />
            we&rsquo;re working.
          </>
        }
        lede="Candidates and employers: tell us what you need. We operate around the clock, so a real consultant replies whenever you write, not next business day."
      />

      <section className="bg-ink-2 py-24 md:py-32">
        <div className="mx-auto grid w-[min(94%,80rem)] gap-16 md:grid-cols-[1fr_1.3fr]">
          <div className="sr-fade-left">
            <ClipRevealText as="p" className="mb-8 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( Reach us directly )
            </ClipRevealText>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-sweep mt-1 inline-block font-display text-xl font-medium tracking-tight text-fg md:text-2xl"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">Phone</p>
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="link-sweep mt-1 inline-block font-display text-xl font-medium tracking-tight text-fg md:text-2xl"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">Hours</p>
                <p className="mt-1 text-sm text-fg-2">
                  24/7, across US, Canada, UK and New Zealand time zones
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">LinkedIn</p>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep mt-1 inline-block text-sm text-fg-2 hover:text-fg"
                >
                  linkedin.com/company/infotech-placement
                </a>
              </div>
            </div>
          </div>

          <div className="sr-fade-right">
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />

      <EmployerMarquee />
    </main>
  )
}
