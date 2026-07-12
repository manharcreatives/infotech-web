'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Dot + trailing ring cursor. The ring expands over interactive elements.
 * Desktop-pointer only; the native cursor stays visible for reliability.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const dot = dotRef.current!
    const ring = ringRef.current!

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, overwrite: 'auto' })
    }

    const over = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      )
      gsap.to(ring, {
        scale: interactive ? 2.2 : 1,
        borderColor: interactive ? 'rgba(255,141,235,0.9)' : 'rgba(255,141,235,0.45)',
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: interactive ? 0.4 : 1, duration: 0.35 })
    }

    const leave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-260 hidden [@media(pointer:fine)]:block">
      <div
        ref={ringRef}
        className="invisible absolute -left-4 -top-4 h-8 w-8 rounded-full border border-glow/45"
      />
      <div
        ref={dotRef}
        className="invisible absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-glow"
      />
    </div>
  )
}
