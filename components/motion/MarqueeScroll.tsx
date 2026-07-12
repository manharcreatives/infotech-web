'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Infinite horizontal marquee where scroll direction and velocity
 * control the movement direction and speed.
 * Inspired by awwwards-landing-page + awwwards-portfolio.
 *
 * Usage:
 *   <MarqueeScroll speed={1} reverse={false}>
 *     <span>Item 1</span><span>Item 2</span>...
 *   </MarqueeScroll>
 */
export function MarqueeScroll({
  children,
  className,
  speed = 1,
  reverse = false,
  repeat = 3,
  pauseOnHover = false,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  reverse?: boolean
  repeat?: number
  pauseOnHover?: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const items = track.children
      if (!items.length) return

      const itemWidth = (items[0] as HTMLElement).offsetWidth
      const totalWidth = itemWidth * (items.length / repeat)
      const duration = (totalWidth / 100) / speed

      const direction = reverse ? 1 : -1

      const tl = gsap.to(track, {
        xPercent: direction * 100,
        duration,
        ease: 'none',
        repeat: -1,
      })

      if (pauseOnHover) {
        const parent = track.parentElement
        const resume = () => tl.play()
        const pause = () => tl.pause()
        parent?.addEventListener('mouseenter', pause)
        parent?.addEventListener('mouseleave', resume)
        // cleanup in the return
      }

      ScrollTrigger.create({
        trigger: track.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity()
          const timeScale = Math.max(0.5, Math.min(3, Math.abs(velocity) / 200))
          tl.timeScale(timeScale)
          tl.reversed(velocity < 0)
        },
      })

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    },
    { scope: trackRef }
  )

  return (
    <div className={cn('overflow-hidden', className)}>
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0">
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
