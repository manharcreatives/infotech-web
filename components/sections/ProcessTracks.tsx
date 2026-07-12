'use client'

import { cn } from '@/lib/utils'
import { candidateJourney } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'
import { SpotlightCard } from '@/components/motion/SpotlightCard'

/**
 * Full candidate journey (employer track removed at client direction,
 * July 2026): the 11 steps as a staggered card cascade along a center
 * line — a journey down the page, not a numbered list.
 */
export function ProcessTracks() {
  return (
    <section className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto w-[min(94%,80rem)]">
        <div className="mb-12">
          <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
            ( Every step, published )
          </SplitLines>
          <SplitLines
            as="h2"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            The 11-step candidate journey.
          </SplitLines>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-4 hidden w-px bg-line-2 md:left-1/2 md:block"
          />
          <ol className="space-y-6">
            {candidateJourney.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  'md:grid md:grid-cols-2 md:gap-12',
                  i % 2 === 0 ? '' : 'md:[direction:rtl]'
                )}
              >
                <SpotlightCard className="p-7 md:[direction:ltr]">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl font-bold text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-3">{step.description}</p>
                </SpotlightCard>
                <div aria-hidden="true" className="hidden md:block" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
