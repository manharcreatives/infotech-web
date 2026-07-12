'use client'

import { Check } from 'lucide-react'
import { candidateServices } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * Services page deep-dive — candidate services only (employer track
 * removed at client direction, July 2026). Horizontal cards: number
 * left, content middle, "what you get" bullets right — deliberately
 * different from the home page's bento preview.
 */
export function ServiceTracks() {
  return (
    <section className="relative bg-ink-2 py-24 md:py-32">
      <div className="mx-auto w-[min(94%,80rem)]">
        <div className="mb-12">
          <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
            ( The full program )
          </SplitLines>
          <SplitLines
            as="h2"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Seven services. One journey.
          </SplitLines>
        </div>

        <div className="space-y-4">
          {candidateServices.map((s, i) => (
            <article
              key={s.title}
              className="group grid gap-6 border border-line bg-surface/40 p-8 transition-colors duration-500 hover:border-glow/40 hover:bg-surface/70 md:grid-cols-[6rem_1.2fr_1fr] md:gap-10"
            >
              <span className="text-stroke font-display text-4xl font-bold md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-3">{s.description}</p>
                <p className="mt-4 text-sm font-medium text-glow">{s.outcome}</p>
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-fg-3">
                  What you get
                </p>
                <ul className="space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
