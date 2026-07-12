'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { CinematicMask } from '@/components/motion/CinematicMask'
import { onPreloaderReady, isPreloaderDone } from '@/lib/preloader'

/**
 * Shared inner-page opener with the same cinematic treatments as the
 * homepage hero: line-mask reveal + character scramble + iris mask.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  lede,
  bgImage,
}: {
  index: string
  eyebrow: string
  title: ReactNode
  lede?: string
  /** Optional atmospheric backdrop (brand-purple art); rendered behind
      the existing grid/orb layers with a legibility overlay. */
  bgImage?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const h1 = ref.current?.querySelector('.page-hero-title')
      if (!h1) return
      const split = SplitText.create(h1, { type: 'lines', mask: 'lines' })

      /* Inner pages never have a <Preloader> — this only waits on it when
         you've arrived here mid-transition from the homepage's preloader;
         otherwise it fires with a small polish buffer, not a fixed guess. */
      const settleDelay = isPreloaderDone() ? 0.35 : 0.15
      const unsubscribe = onPreloaderReady(() => {
        gsap
          .timeline({ delay: settleDelay })
          .from(split.lines, {
            yPercent: 118,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out',
          })
          .from(
            ref.current!.querySelectorAll('.page-hero-lede'),
            { y: 24, autoAlpha: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
          )
      })

      return () => {
        unsubscribe()
        split.revert()
      }
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-44 pb-20 md:pt-56 md:pb-28"
    >
      {bgImage ? (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/70" />
        </>
      ) : null}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_75%)]" />

      <CinematicMask />

      <div className="relative z-10 mx-auto w-[min(94%,80rem)]">
        <ScrambleText
          as="p"
          className="mb-6 text-xs uppercase tracking-[0.35em] text-fg-3"
          scrambleDuration={0.6}
          stagger={0.03}
          useScrollTrigger={false}
          waitForPreloader
          delay={0.5}
        >
          {`( ${index} | ${eyebrow} )`}
        </ScrambleText>
        <h1 className="page-hero-title max-w-4xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight">
          {title}
        </h1>
        {lede ? (
          <ScrambleText
            as="p"
            className="page-hero-lede mt-8 max-w-xl text-base leading-relaxed text-fg-2 md:text-lg"
            scrambleDuration={1}
            stagger={0.025}
            useScrollTrigger={false}
            waitForPreloader
            delay={0.8}
          >
            {lede}
          </ScrambleText>
        ) : null}
      </div>
    </section>
  )
}
