'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { onPreloaderReady } from '@/lib/preloader'
import { isPageTransitionActive } from '@/lib/transition'

/**
 * A dark overlay that covers the hero content. On mount it immediately
 * covers the full section (circle at full diagonal) so nothing leaks
 * through when the preloader curtains split. Once the preloader is done
 * the circle shrinks to 0 % — a camera-iris opening that reveals the
 * hero from the centre outward.
 *
 * Parent must be `relative` and `overflow-hidden`.
 */
export function CinematicMask() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const parent = el.parentElement
    if (!parent) return

    /* On in-app transitions the PageTransitionProvider overlay already
       handles the circle reveal — skip CinematicMask to avoid a
       double-bubble effect. */
    if (isPageTransitionActive()) {
      gsap.set(el, { autoAlpha: 0, display: 'none' })
      return
    }

    const w = parent.offsetWidth || window.innerWidth
    const h = parent.offsetHeight || window.innerHeight
    const diagonal = Math.ceil(Math.hypot(w, h))

    /* Cover the full section immediately — sits behind the preloader
       (z-20 vs z-300) so it's invisible during the curtain split.
       When the preloader finishes the iris shrinks from centre. */
    gsap.set(el, {
      clipPath: `circle(${diagonal}px at 50% 50%)`,
      display: 'block',
    })

    const unsubscribe = onPreloaderReady(() => {
      gsap.to(el, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.4,
        ease: 'power3.inOut',
      })
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
