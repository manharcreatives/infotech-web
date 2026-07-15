'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import { services } from '@/content/site'
import { SpotlightCard } from '@/components/motion/SpotlightCard'
import { SplitLines } from '@/components/motion/SplitLines'
import { ClipRevealText } from '@/components/motion/ClipRevealText'
import { MatchGraph } from '@/components/illustrations/MatchGraph'

export function ServicesBento() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.bento-card', {
        y: 80,
        scale: 0.95,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.bento-grid', start: 'top 82%', once: true },
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative bg-ink-2 py-28 md:py-40">
      <div className="relative z-10 mx-auto w-[min(94%,80rem)]">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <ClipRevealText as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
              What we do
            </ClipRevealText>
            <SplitLines
              as="h2"
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
            >
            Five services. One destination: placed.
            </SplitLines>
          </div>
          <Link
            href="/services"
            className="link-sweep shrink-0 text-sm tracking-wide text-fg-2 hover:text-fg"
          >
            All services →
          </Link>
        </div>

        <div className="bento-grid grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service, i) => (
            <SpotlightCard
              key={service.id}
              className={
                'bento-card group p-8 transition-transform duration-500 ' +
                (i === 0
                  ? 'md:col-span-2 md:row-span-2'
                  : i === 3
                    ? 'md:col-span-2'
                    : '')
              }
            >
              <div className="flex h-full flex-col justify-between gap-10">
                {i === 0 && (
                  <MatchGraph className="pointer-events-none absolute inset-x-6 top-1/2 hidden max-h-[52%] w-[calc(100%-3rem)] -translate-y-[58%] opacity-80 md:block" />
                )}
                <div className="flex items-start justify-between">
                  <span className="text-stroke font-display text-5xl font-bold md:text-6xl">
                    {service.id}
                  </span>
                </div>
                <div>
                  <h3
                    className={
                      'font-display font-semibold tracking-tight ' +
                      (i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl')
                    }
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-3">
                    {service.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-fg-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
