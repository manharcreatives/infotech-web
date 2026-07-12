'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Stacked cards that stick and reveal sequentially on scroll.
 * Each card gets `position: sticky` with calculated `top` offset,
 * and animates from scale(0.92) + opacity(0.6) to full.
 * Inspired by awwwards-portfolio's services stacking.
 */
export function StickyStack({
  children,
  className,
  cardClassName,
}: {
  children: ReactNode[]
  className?: string
  cardClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(
    () => {
      const cards = cardsRef.current
      if (!cards.length) return

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn('relative', className)}>
      {children.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el
          }}
          className={cn('sticky top-24', cardClassName)}
          style={{ zIndex: children.length - i }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
