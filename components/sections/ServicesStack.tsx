'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { candidateServices } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * Services deep-dive as a full-screen deck: each service is a
 * 100svh panel that sticks to the top of the viewport; the next one
 * slides over it while the covered panel scales down and dims —
 * a card-over-card journey instead of a flat list. Desktop-only pin
 * (mobile scrolls normally through the same panels).
 *
 * Media frames are placeholders — final artwork will be dropped in
 * (client to supply generated images).
 */
export function ServicesStack() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.svc-panel')

        panels.forEach((panel, i) => {
          const next = panels[i + 1]
          if (!next) return

          // As the next panel slides over, this one recedes and dims.
          gsap.fromTo(
            panel.querySelector('.svc-card'),
            { scale: 1 },
            {
              scale: 0.93,
              transformOrigin: 'center top',
              ease: 'none',
              scrollTrigger: {
                trigger: next,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            }
          )
          gsap.fromTo(
            panel.querySelector('.svc-dim'),
            { opacity: 0 },
            {
              opacity: 0.6,
              ease: 'none',
              scrollTrigger: {
                trigger: next,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            }
          )
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative bg-ink-2">
      {/* Intro screen for the deck */}
      <div className="mx-auto flex min-h-[60svh] w-[min(94%,80rem)] flex-col justify-center py-24">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( The full program )
        </SplitLines>
        <SplitLines
          as="h2"
          className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Seven services.
          <br />
          One journey.
        </SplitLines>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-fg-3">
          Scroll through the deck. Each service hands off to the next —
          exactly the way the program works.
        </p>
      </div>

      {/* The deck */}
      <div className="relative">
        {candidateServices.map((s, i) => (
          <div
            key={s.title}
            className="svc-panel relative md:sticky md:top-0 md:h-svh"
            style={{ zIndex: i + 1 }}
          >
            <article className="svc-card relative flex min-h-svh flex-col overflow-hidden border-t border-line bg-ink will-change-transform md:h-svh">
              {/* per-panel atmosphere */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(90rem 60rem at ${i % 2 === 0 ? '85%' : '15%'} 110%, rgb(111 40 185 / 0.22), transparent 60%)`,
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_30%,transparent_80%)]" />

              {/* deck position readout */}
              <div className="relative z-10 mx-auto flex w-[min(94%,84rem)] items-center justify-between pt-24 md:pt-28">
                <p className="text-xs uppercase tracking-[0.3em] text-fg-3">
                  Service <span className="text-glow">{String(i + 1).padStart(2, '0')}</span> / 07
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {candidateServices.map((_, j) => (
                    <span
                      key={j}
                      className={`h-1 rounded-full transition-all ${
                        j === i ? 'w-8 bg-glow' : 'w-3 bg-line'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`relative z-10 mx-auto grid w-[min(94%,84rem)] flex-1 items-center gap-12 py-14 md:grid-cols-[1.15fr_1fr] md:gap-20 ${
                  i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
                }`}
              >
                {/* copy */}
                <div>
                  <span className="text-stroke font-display text-[clamp(4rem,9vw,8rem)] font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-fg-2">
                    {s.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-3 rounded-full border border-glow/30 bg-glow/5 px-5 py-2 text-sm font-medium text-glow">
                    <span className="inline-block size-1.5 rounded-full bg-glow" />
                    {s.outcome}
                  </p>

                  <div className="mt-10">
                    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-fg-3">
                      What you get
                    </p>
                    <ul className="grid gap-2.5 sm:grid-cols-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-fg-2">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* media placeholder — final artwork to be supplied */}
                <div className="relative hidden aspect-[4/5] max-h-[62svh] overflow-hidden rounded-2xl border border-line bg-surface/40 md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-deep/30 via-transparent to-brand/15" />
                  <span
                    aria-hidden="true"
                    className="text-stroke absolute -right-6 -bottom-8 font-display text-[10rem] font-bold leading-none opacity-60"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute inset-0 grid place-items-center">
                    <p className="rounded-full border border-dashed border-line px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-fg-3">
                      Visual — coming soon
                    </p>
                  </div>
                </div>
              </div>

              {/* dim overlay driven while the next card covers this one */}
              <div
                aria-hidden="true"
                className="svc-dim pointer-events-none absolute inset-0 z-20 bg-ink opacity-0"
              />
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
