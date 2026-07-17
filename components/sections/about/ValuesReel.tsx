'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { coreValues } from '@/content/site'

/**
 * The eight core values as a pinned cinema reel: the section locks to
 * the viewport and scrolling flips through the values one by one —
 * giant gradient title swapping in, description following, a huge
 * stroke watermark drifting behind, and a live index rail on the left
 * showing where you are in the deck. Mobile skips the pin and renders
 * an elegant stacked ledger instead.
 */
export function ValuesReel() {
  const ref = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          '.vr-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
            ease: 'none',
            scrollTrigger: {
              trigger: '.vr-stage',
              start: 'top top',
              end: () => `+=${window.innerHeight * 5.5}`,
              pin: true,
              scrub: 0.4,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  coreValues.length - 1,
                  Math.floor(self.progress * coreValues.length)
                )
                setActive((prev) => (prev === idx ? prev : idx))
              },
            },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  /* Swap animation whenever the active value changes */
  useEffect(() => {
    if (!titleRef.current || !descRef.current) return
    gsap
      .timeline()
      .fromTo(
        titleRef.current,
        { yPercent: 55, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.65, ease: 'power4.out' }
      )
      .fromTo(
        descRef.current,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' },
        '-=0.4'
      )
    if (markRef.current) {
      gsap.fromTo(
        markRef.current,
        { xPercent: active % 2 === 0 ? 4 : -4, autoAlpha: 0.25 },
        { xPercent: 0, autoAlpha: 0.5, duration: 0.9, ease: 'power3.out' }
      )
    }
  }, [active])

  const v = coreValues[active]

  return (
    <section ref={ref} className="relative bg-ink-2">
      {/* ── Desktop: pinned reel ── */}
      <div className="vr-stage relative hidden h-svh overflow-hidden md:block">
        {/* full-screen artistic backdrop that swaps with the active value */}
        {coreValues.map((cv, i) => (
          <div
            key={cv.title}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active === i ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={`/images/values/value-${String(i + 1).padStart(2, '0')}.webp`}
              alt=""
              fill
              unoptimized
              className="size-full object-cover"
            />
          </div>
        ))}
        {/* legibility scrim: darker toward the left rail where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-2 via-ink-2/85 to-ink-2/55" />

        {/* giant watermark of the current value */}
        <span
          ref={markRef}
          aria-hidden="true"
          className="text-stroke pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 text-center font-display text-[16vw] font-bold leading-none tracking-tight whitespace-nowrap opacity-50 select-none"
        >
          {v.title.toUpperCase()}
        </span>

        <div className="relative z-10 mx-auto grid h-full w-[min(94%,84rem)] grid-cols-[minmax(15rem,1fr)_2fr] items-center gap-16">
          {/* index rail */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-fg-3">( Values )</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Eight values.
              <br />
              No posters, just practice.
            </h2>

            <div className="mt-10 flex items-end gap-2">
              <span className="font-display text-6xl font-bold leading-none text-gradient-brand">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="pb-0.5 font-display text-lg text-fg-3">/ 08</span>
            </div>

            <ol className="mt-8 space-y-2.5">
              {coreValues.map((cv, i) => (
                <li
                  key={cv.title}
                  className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                    i === active ? 'translate-x-1.5 text-fg' : 'text-fg-3'
                  }`}
                >
                  <span
                    className={`inline-block size-1.5 rounded-full transition-all duration-500 ${
                      i === active
                        ? 'bg-glow shadow-[0_0_10px_2px_rgba(255,141,235,0.6)]'
                        : i < active
                          ? 'bg-brand/60'
                          : 'bg-line'
                    }`}
                  />
                  {cv.title}
                </li>
              ))}
            </ol>
          </div>

          {/* the reel */}
          <div className="overflow-hidden py-6">
            <h3
              ref={titleRef}
              className="font-display text-[clamp(3rem,6.5vw,6rem)] font-bold leading-[1.02] tracking-tight text-gradient-brand"
            >
              {v.title}
            </h3>
            <p ref={descRef} className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2">
              {v.description}
            </p>
          </div>
        </div>

        {/* progress bar */}
        <div className="absolute inset-x-0 bottom-10">
          <div className="mx-auto h-px w-[min(94%,84rem)] bg-line-2">
            <div className="vr-progress h-px w-full bg-gradient-to-r from-brand via-glow to-brand" />
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ledger ── */}
      <div className="mx-auto w-[min(94%,80rem)] py-24 md:hidden">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">( Values )</p>
        <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight">
          Eight values. No posters, just practice.
        </h2>
        <ol className="space-y-10">
          {coreValues.map((cv, i) => (
            <li key={cv.title} className="sr-fade-up relative overflow-hidden rounded-2xl border border-line-2 pl-5 pr-5 pt-10 pb-8" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <Image
                src={`/images/values/value-${String(i + 1).padStart(2, '0')}.webp`}
                alt=""
                fill
                unoptimized
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ink/80 via-ink/70 to-ink/60" />
              <span className="relative text-xs uppercase tracking-[0.3em] text-fg-3">
                {String(i + 1).padStart(2, '0')} / 08
              </span>
              <h3 className="relative mt-2 font-display text-2xl font-bold tracking-tight text-gradient-brand">
                {cv.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-fg-2">{cv.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
