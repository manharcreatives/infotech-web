'use client'

import { useRef, useId, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Pinned section that scrolls content horizontally.
 * Cards animate (scale, rotationY) as they pass center.
 * Inspired by GSAP-Awwwards-Website's flavor slider.
 */
export function HorizontalScrollSection({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode[]
  className?: string
  containerClassName?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const cards = track.querySelectorAll<HTMLElement>('.hs-card')

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth
      }

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none' })

      cards.forEach((card) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left center',
              end: 'right center',
              scrub: 1,
            },
          })
          .fromTo(
            card,
            { scale: 0.85, rotateY: 12, filter: 'blur(4px)' },
            { scale: 1, rotateY: 0, filter: 'blur(0px)', ease: 'power2.out' }
          )
          .to(card, {
            scale: 0.85,
            rotateY: -12,
            filter: 'blur(4px)',
            ease: 'power2.in',
          })
      })

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} className={cn('relative overflow-hidden', className)}>
      <div
        ref={trackRef}
        className={cn('flex gap-8 will-change-transform', containerClassName)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children.map((child, i) => (
          <div
            key={`${id}-${i}`}
            className="hs-card shrink-0 [transform-style:preserve-3d]"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
