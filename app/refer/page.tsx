import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { SplitLines } from '@/components/motion/SplitLines'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import { ReferralForm } from '@/components/forms/ReferralForm'
import { CTASection } from '@/components/sections/home/CTASection'

export const metadata: Metadata = {
  title: 'Refer & Earn',
  description:
    'Know a talented professional looking for their next opportunity? Refer them to InfoTech Placement LLC and earn up to $300 when they are successfully placed.',
  alternates: { canonical: '/refer' },
}

/**
 * Referral amount disclosure: CLIENT OVERRIDE confirmed (July 2026,
 * via Manhar Creatives). "Up to $300" wording per instruction; the
 * client pack's flat "$300" phrasing is flagged in the report.
 * USD footnote protects against cross-currency confusion (4 countries).
 */
const steps = [
  {
    title: 'Share their profile',
    description:
      'Send us the name and contact of someone looking for their next opportunity, with their permission.',
  },
  {
    title: 'We guide their journey',
    description:
      'They move through the same structured placement process as every candidate: consultation to placement.',
  },
  {
    title: 'Earn up to $300',
    description:
      'When your referral is successfully placed, you earn a referral bonus of up to $300.',
  },
]

export default function ReferPage() {
  return (
    <main id="main-content">
      <PageHero
        index="07"
        eyebrow="Refer & Earn"
        bgImage="/images/heroes/hero-refer.webp"
        title={
          <>
            Refer. Support.
            <br />
            Earn.
          </>
        }
        lede="Know a talented professional looking for their next opportunity? Refer them to InfoTech Placement LLC and earn up to $300 when they're successfully placed."
      />

      <section className="bg-ink-2 py-28 md:py-36">
        <div className="mx-auto w-[min(94%,80rem)]">
          <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
            ( How it works )
          </SplitLines>
          <SplitLines
            as="h2"
            className="mb-14 font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Three steps. One thank-you.
          </SplitLines>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <SpotlightCard key={s.title} className="p-8">
                <span className="text-stroke font-display text-4xl font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-3">{s.description}</p>
              </SpotlightCard>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#referral-form"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium tracking-wide text-white shadow-[0_0_32px_-8px_rgba(177,78,255,0.65)] transition-colors duration-300 hover:bg-brand-hover"
            >
              Start Referring ↓
            </a>
            <p className="text-xs leading-relaxed text-fg-3">
              Referral bonus paid in USD equivalent. Terms apply — full
              conditions confirmed in writing when you refer.
            </p>
          </div>
        </div>
      </section>

      {/* Referral form */}
      <section id="referral-form" className="relative overflow-hidden bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/sections/refer-form-bg.webp"
            alt=""
            fill
            unoptimized
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="relative z-10 mx-auto grid w-[min(94%,80rem)] gap-14 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div>
            <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( Make the introduction )
            </SplitLines>
            <SplitLines
              as="h2"
              className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
            >
              Two minutes now. A career changed later.
            </SplitLines>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-fg-3">
              Share their details below and our team takes it from there —
              first conversation, structured program, placement. You&rsquo;ll
              hear from us at every milestone, including the one where you
              get paid.
            </p>
            <ul className="mt-10 space-y-4 border-t border-line-2 pt-8">
              {[
                'We contact your referral within 24 hours',
                'You can track where they are in the journey',
                'Bonus of up to $300 on successful placement',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-fg-2">
                  <span className="mt-1 inline-block size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-8 md:p-10">
            <ReferralForm />
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
