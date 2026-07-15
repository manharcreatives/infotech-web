'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/scroll'
import { markPreloaderPending, markPreloaderDone } from '@/lib/preloader'
import { isPageTransitionActive } from '@/lib/transition'

/**
 * Preloader: logo scales in, glow sweep crosses it, then the logo
 * zooms OUT and fades to leave a clean solid-black frame, and the
 * curtains split open to reveal the hero underneath. Runs on every
 * homepage load / refresh — skipped only during client-side route
 * transitions.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const forceShow =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('preloader') === '1'

      const shouldSkip = !forceShow && isPageTransitionActive()

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

      /* 1. Logo fades in smoothly */
      tl.fromTo(
        '.pre-logo',
        { scale: 0.7, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
      )
        /* 2. Purple glow bar sweeps left → right across logo */
        .to(
          '.pre-glow-bar',
          { x: '800%', duration: 0.7, ease: 'power2.inOut' },
          '-=0.2'
        )
        /* 3. Zoom out: logo shrinks and fades away, leaving a clean
           solid-black frame (the bg-ink layer is always underneath) */
        .to(
          '.pre-logo',
          { scale: 0.55, autoAlpha: 0, duration: 0.75, ease: 'power2.inOut' },
          '+=0.25'
        )
        .to(
          '.pre-glow',
          { autoAlpha: 0, duration: 0.3, ease: 'none' },
          '<'
        )
        /* 4. Hold on solid black for a beat */
        .to({}, { duration: 0.25 })
        /* 5. Curtains split open to reveal the website */
        .to(
          '.pre-panel-top',
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }
        )
        .to(
          '.pre-panel-bottom',
          { yPercent: 100, duration: 0.9, ease: 'power4.inOut' },
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
      {/* Solid black background underneath everything */}
      <div className="absolute inset-0 bg-ink" />

      {/* Curtain panels that split open once the logo has faded out */}
      <div className="pre-panel-top absolute inset-x-0 top-0 h-1/2 bg-ink z-[2]" />
      <div className="pre-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink z-[2]" />

      {/* Logo — scales in, glow sweep, then zooms out and fades */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="relative">
          <Image
            src="/images/logo.png"
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
