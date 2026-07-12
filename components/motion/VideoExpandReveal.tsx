'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Pins itself in the viewport and reveals children via a circular clip-path
 * that expands from a small circle (6%) to full screen (100%) on scroll.
 *
 * DOM structure:
 *   outer div (ref, h-screen) ← pinned by ScrollTrigger
 *     ├─ inner .video-box div  ← fromTo clipPath animated
 *     │    └─ children         ← clipped content (video, spin circle…)
 *     └─ overlay               ← NOT clipped (play button, labels…)
 */
export function VideoExpandReveal({
  children,
  overlay,
  className,
  startSize = 6,
  pinDistance = '2500px',
  onScrollUpdate,
}: {
  children: ReactNode
  /** Rendered inside the pinned wrapper but OUTSIDE the clip — always visible */
  overlay?: ReactNode
  className?: string
  /** Starting circle radius in % (default 6) */
  startSize?: number
  /** Total scroll distance the element stays pinned (default "2500px") */
  pinDistance?: string
  /** Called every frame during scroll with progress (0→1) and direction (1 = forward, -1 = backward) */
  onScrollUpdate?: (progress: number, direction: number) => void
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const onUpdateRef = useRef(onScrollUpdate)
  onUpdateRef.current = onScrollUpdate

  useGSAP(
    () => {
      const outer = outerRef.current
      const box = boxRef.current
      if (!outer || !box) return

      gsap
        .timeline({
          scrollTrigger: {
            trigger: outer,
            pin: true,
            pinSpacing: true,
            start: 'top top',
            end: `+=${pinDistance}`,
            scrub: 1.5,
            onUpdate: (self) => {
              onUpdateRef.current?.(self.progress, self.direction)
            },
          },
        })
        .fromTo(
          box,
          { clipPath: `circle(${startSize}% at 50% 50%)` },
          {
            clipPath: 'circle(100% at 50% 50%)',
            ease: 'power1.inOut',
            duration: 0.6,
          }
        )
    },
    { dependencies: [pinDistance, startSize] }
  )

  return (
    /* Outer: full-screen, this is what gets pinned */
    <div ref={outerRef} className="relative h-screen w-full overflow-hidden">
      {/* Inner video-box: receives the clip-path animation */}
      <div
        ref={boxRef}
        className={cn('relative size-full overflow-hidden', className)}
      >
        {children}
      </div>

      {/*
        Overlay slot: sits on top of the clipped box but is itself never clipped.
        Use this for the play button, labels, or any UI that must stay fully visible
        while the circle is still expanding.
      */}
      {overlay}
    </div>
  )
}
