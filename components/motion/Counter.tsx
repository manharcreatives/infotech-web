'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/** Number that counts up when scrolled into view. */
export function Counter({
  value,
  suffix = '',
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const state = { v: 0 }
      gsap.to(state, {
        v: value,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(state.v).toLocaleString('en-IN')}${suffix}`
        },
      })
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      0{suffix}
    </span>
  )
}
