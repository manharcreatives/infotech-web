'use client'

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { setPageTransitionActive } from '@/lib/transition'

interface RectLike {
  left: number
  top: number
  width: number
  height: number
}

interface TransitionContextValue {
  navigate: (href: string, rect: RectLike) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

/**
 * Manages a full-viewport overlay that expands from a clicked element's
 * position to cover the screen (like Podium's Flip transition), swaps the
 * route client-side underneath it, then contracts back out from the same
 * point to reveal the new page. Because the navigation is client-side (no
 * hard reload), this is one continuous overlay/timeline instead of two
 * separate animations bridged by a blank page load.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pointRef = useRef({ cx: 0, cy: 0 })
  const transitioningRef = useRef(false)
  const isFirstRoute = useRef(true)
  const router = useRouter()
  const pathname = usePathname()

  const navigate = useCallback(
    (href: string, rect: RectLike) => {
      const overlay = overlayRef.current
      if (!overlay || transitioningRef.current) return

      transitioningRef.current = true
      setPageTransitionActive(true)

      const diagonal = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight))
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointRef.current = { cx, cy }

      gsap
        .timeline({
          onComplete: () => {
            router.push(href)
          },
        })
        .set(overlay, {
          display: 'block',
          clipPath: `circle(0% at ${cx}px ${cy}px)`,
        })
        .to(overlay, {
          clipPath: `circle(${diagonal}px at ${cx}px ${cy}px)`,
          duration: 0.7,
          ease: 'power3.inOut',
        })
    },
    [router]
  )

  /* --- Contract the overlay once the new route's content has mounted
     underneath it. Skipped on the very first render (no prior expand). --- */
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return
    }
    if (!transitioningRef.current) return

    const overlay = overlayRef.current
    if (!overlay) return

    const { cx, cy } = pointRef.current
    const diagonal = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight))

    gsap
      .timeline({
        delay: 0.05,
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          transitioningRef.current = false
          setPageTransitionActive(false)
        },
      })
      .set(overlay, {
        display: 'block',
        clipPath: `circle(${diagonal}px at ${cx}px ${cy}px)`,
      })
      .to(overlay, {
        clipPath: `circle(0% at ${cx}px ${cy}px)`,
        duration: 0.6,
        ease: 'power3.inOut',
      })
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[300] hidden bg-ink"
      />
    </TransitionContext.Provider>
  )
}
