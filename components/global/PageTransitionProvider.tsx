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
 * position to cover the screen, swaps the route underneath it, then
 * contracts back to reveal the new page.
 *
 * Robustness guarantees:
 *  - Same-page clicks are silently ignored (no overlay at all).
 *  - Browser back / forward (popstate) immediately kills any in-flight
 *    animation and hides the overlay so the page is always accessible.
 *  - A 3-second safety timeout forcibly clears the overlay if a
 *    contract animation never fires (e.g. the pathname didn't change
 *    because the server returned an error).
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pointRef = useRef({ cx: 0, cy: 0 })
  const transitioningRef = useRef(false)
  const isFirstRoute = useRef(true)
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  /* ─── helpers ─────────────────────────────────────────────────── */
  const clearOverlay = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }
    gsap.killTweensOf(overlay)
    gsap.set(overlay, { display: 'none', clipPath: 'circle(0% at 50% 50%)' })
    transitioningRef.current = false
    setPageTransitionActive(false)
  }, [])

  /* ─── browser back / forward — kill overlay immediately ───────── */
  useEffect(() => {
    const handlePopState = () => {
      if (transitioningRef.current) {
        clearOverlay()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [clearOverlay])

  /* ─── navigate (called by TransitionLink / Button) ────────────── */
  const navigate = useCallback(
    (href: string, rect: RectLike) => {
      const overlay = overlayRef.current
      if (!overlay) return

      // Skip animation when already transitioning or same page
      if (transitioningRef.current) return
      if (href === window.location.pathname) {
        router.push(href)
        return
      }

      transitioningRef.current = true
      setPageTransitionActive(true)

      const diagonal = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight))
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointRef.current = { cx, cy }

      // Safety timeout: if the contract animation never fires within 3 s,
      // force-clear the overlay so the user is never stuck on a black screen.
      safetyTimerRef.current = setTimeout(() => {
        clearOverlay()
      }, 3000)

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
          duration: 0.65,
          ease: 'power3.inOut',
        })
    },
    [router, clearOverlay]
  )

  /* ─── contract overlay once new route mounts ───────────────────── */
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return
    }

    // If an overlay is visible (whether or not transitioningRef is set),
    // always contract it — this handles edge cases where the ref got out of
    // sync with the actual overlay display state.
    const overlay = overlayRef.current
    if (!overlay) return

    const isVisible = overlay.style.display === 'block'
    if (!transitioningRef.current && !isVisible) return

    const { cx, cy } = pointRef.current
    const diagonal = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight))

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }

    gsap.killTweensOf(overlay)

    gsap
      .timeline({
        delay: 0.05,
        onComplete: clearOverlay,
      })
      .set(overlay, {
        display: 'block',
        clipPath: `circle(${diagonal}px at ${cx}px ${cy}px)`,
      })
      .to(overlay, {
        clipPath: `circle(0% at ${cx}px ${cy}px)`,
        duration: 0.55,
        ease: 'power3.inOut',
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[300] hidden bg-ink"
      />
    </TransitionContext.Provider>
  )
}
