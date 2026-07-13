'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/scroll'
import { markPreloaderPending, markPreloaderDone, isPreloaderDone } from '@/lib/preloader'
import { isPageTransitionActive } from '@/lib/transition'

/**
 * SVG logo-only entry: logo scales in with 3D perspective tilt,
 * purple glow sweep crosses it, brief hold, then twin curtains split
 * vertically to unveil the hero.
 * Only runs on the homepage on a fresh visit/reload — never on page transitions
 * or inner pages. The skip decision and the timeline are built in a single
 * effect so there's no stale-closure race between them.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const forceShow =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('preloader') === '1'

      const shouldSkip = !forceShow && (isPageTransitionActive() || isPreloaderDone())

      if (shouldSkip) {
        markPreloaderDone()
        setDone(true)
        return
      }

      markPreloaderPending()

      const lenis = getLenis()
      lenis?.stop()

      const tl = gsap.timeline({
        onComplete: () => {
          lenis?.start()
          markPreloaderDone()
          setDone(true)
        },
      })

      /* 1. Logo scales in with 3D perspective tilt */
      tl.fromTo(
        '.pre-logo',
        { scale: 0.6, autoAlpha: 0, rotationX: -12 },
        { scale: 1, autoAlpha: 1, rotationX: 0, duration: 0.8, ease: 'power3.out' }
      )
        /* 2. Purple glow bar sweeps left → right across logo */
        .to(
          '.pre-glow-bar',
          { x: '400%', duration: 0.7, ease: 'power2.inOut' },
          '-=0.2'
        )
        /* 3. Subtle breathe pulse */
        .to(
          '.pre-logo',
          { scale: 1.02, duration: 0.25, ease: 'power1.inOut', yoyo: true, repeat: 1 },
          '-=0.3'
        )
        /* 4. Logo fades out */
        .to('.pre-logo', {
          scale: 1.08,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.in',
        })
        /* 5. Curtains split */
        .to(
          '.pre-panel-top',
          { yPercent: -100, duration: 0.8, ease: 'power4.inOut' },
          '-=0.1'
        )
        .to(
          '.pre-panel-bottom',
          { yPercent: 100, duration: 0.8, ease: 'power4.inOut' },
          '<'
        )
    },
    { scope: rootRef }
  )

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300]"
      aria-hidden="true"
      role="presentation"
    >
      <div className="pre-panel-top absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div className="pre-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="pre-fade absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ perspective: 800 }}>
          <Image
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            width={208}
            height={0}
            className="pre-logo relative z-10 w-40 sm:w-52"
          />
          <div className="pre-glow pointer-events-none absolute inset-0 overflow-hidden">
            <div className="pre-glow-bar absolute -left-full top-0 h-full w-1/3 skew-x-[-12deg] bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
