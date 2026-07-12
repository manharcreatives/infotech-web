'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { processSteps } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * Signature moment: the section pins on desktop and process cards travel
 * horizontally as you scroll vertically. A spacer pushes cards off-screen
 * so the section starts empty. Cards enter one-by-one from the right edge,
 * fading in as they cross into view. The track scrolls until the last card
 * is centered. Falls back to a vertical stack on mobile.
 */
export function ProcessHorizontal() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const track = ref.current!.querySelector('.process-track') as HTMLElement
        const cards = gsap.utils.toArray<HTMLElement>('.process-card')
        const numbers = gsap.utils.toArray<HTMLElement>('.process-number')

        if (!track || cards.length === 0) return

        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        const lastCard = cards[cards.length - 1]
        const lastCardWidth = lastCard.offsetWidth
        const centerOffset = (viewportWidth - lastCardWidth) / 2
        const totalScroll = trackWidth - viewportWidth + centerOffset

        gsap.set(cards, { opacity: 0 })

        const mainTween = gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        cards.forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTween,
              start: 'left 100%',
              end: 'left 80%',
              scrub: true,
            },
          })
        })

        numbers.forEach((num) => {
          gsap.fromTo(
            num,
            { xPercent: 22 },
            {
              xPercent: -22,
              ease: 'none',
              scrollTrigger: {
                trigger: num,
                containerAnimation: mainTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          )
        })

        gsap.fromTo(
          '.process-progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: () => `+=${totalScroll}`,
              scrub: true,
            },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      {/* Atmospheric backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/sections/bg-method.png"
          alt=""
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="relative flex min-h-svh flex-col justify-center py-24 md:py-0">
        <div className="mx-auto mb-14 w-[min(94%,80rem)] md:mb-10">
          <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
            ( 03 | The Method )
          </SplitLines>
          <SplitLines
            as="h2"
            className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Seven steps from resume to placement.
          </SplitLines>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-2">
            The complete arc — assessment, branding, marketing, the written
            interview guarantee, preparation, negotiation and placement.
            Keep scrolling to walk it.
          </p>
        </div>

        <div className="process-track flex flex-col gap-6 px-[3%] md:flex-row md:gap-8 md:pr-[24vw]">
          <div className="hidden shrink-0 md:block md:w-[38vw]" aria-hidden="true" />
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="process-card relative flex min-h-[22rem] shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-line bg-surface/50 p-8 md:h-[52vh] md:w-[38vw] md:min-w-[26rem]"
            >
              <span
                aria-hidden="true"
                className="process-number text-stroke pointer-events-none absolute -top-8 right-2 font-display text-[9rem] font-bold leading-none md:text-[12rem]"
              >
                {step.number}
              </span>
              <div className="relative z-10">
                <span className="mb-4 inline-block h-px w-14 bg-glow" />
                <h3 className="font-display text-3xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-2">
                  {step.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 hover:opacity-100" />
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 hidden h-px w-[min(94%,80rem)] bg-line-2 md:block">
          <div className="process-progress h-px w-full bg-glow" />
        </div>
      </div>
    </section>
  )
}
