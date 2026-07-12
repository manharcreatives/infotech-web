import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import { Button } from '@/components/ui/Button'

/**
 * HIDDEN PAGE (SRS §4.5 / §5.7):
 *  - noindex, nofollow (metadata.robots below)
 *  - never linked from navigation, footer, or any sitemap
 *  - shared by the client via direct URL only
 *
 * [PENDING: SRS B-6] Final pricing tiers to be supplied by the client
 * before launch. The old website has no published plans to carry over,
 * so this interim version directs visitors to the consultation where
 * pricing is scoped. Replace with real tiers on client delivery.
 */
export const metadata: Metadata = {
  title: 'Program Pricing',
  description: 'InfoTech Placement program pricing, shared by direct link.',
  robots: { index: false, follow: false },
}

export default function PricingPage() {
  return (
    <main id="main-content">
      <PageHero
        index="10"
        eyebrow="Program Pricing"
        title={
          <>
            Priced to your path,
            <br />
            not a price list.
          </>
        }
        lede="You received this link directly from our team. Program pricing is scoped to your profile, target market and timeline. Here's how that works."
      />

      <section className="bg-ink-2 py-24 md:py-32">
        <div className="mx-auto w-[min(94%,64rem)]">
          <div className="grid gap-4 md:grid-cols-3">
            <SpotlightCard className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-fg-3">Step 1</p>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
                Free consultation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-3">
                We assess your profile, target roles and countries, and tell
                you honestly what the program can do for you.
              </p>
            </SpotlightCard>
            <SpotlightCard className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-fg-3">Step 2</p>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
                A scoped quote, in writing
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-3">
                Pricing depends on the services you enroll for. You receive the
                full cost, terms and guarantees in writing before you commit.
              </p>
            </SpotlightCard>
            <SpotlightCard className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-fg-3">Step 3</p>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
                Covered by the guarantee
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-3">
                Every enrollment includes the interview commitment and the
                conditional 90 to 120 day money-back guarantee.
              </p>
            </SpotlightCard>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
