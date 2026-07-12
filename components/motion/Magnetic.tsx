'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

/** Wraps a child so it magnetically follows the cursor within its bounds. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.35)',
    })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  )
}
