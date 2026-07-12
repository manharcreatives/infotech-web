'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onPreloaderReady } from '@/lib/preloader'
import { isPageTransitionActive } from '@/lib/transition'

/**
 * A dark overlay that covers the hero content. At reveal time a circular
 * cutout expands from the center outward — like a camera iris opening —
 * then the overlay fades away.
 *
 * Parent must be `relative` and `overflow-hidden`.
 */
export function CinematicMask() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    /* On in-app transitions the PageTransitionProvider overlay already
       handles the circle reveal — skip CinematicMask to avoid a
       double-bubble effect. */
    if (isPageTransitionActive()) {
      gsap.set(el, { autoAlpha: 0, display: 'none' })
      return
    }

    const parent = el.parentElement
    if (!parent) return

    /* Waits for the real preloader completion event (homepage) or fires
       immediately when there's no preloader on this page (inner pages),
       instead of guessing a fixed delay. */
    const unsubscribe = onPreloaderReady(() => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      const diagonal = Math.ceil(Math.hypot(w, h))

      gsap
        .timeline()
        .set(el, { clipPath: `circle(0% at 50% 50%)`, display: 'block' })
        .to(el, {
          clipPath: `circle(${diagonal}px at 50% 50%)`,
          duration: 1.4,
          ease: 'power3.inOut',
        })
        .to(el, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    })

    return unsubscribe
  })

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 hidden bg-ink"
    />
  )
}
