'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function ClipRevealText({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
  duration = 1.2,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p' | 'span'
  delay?: number
  duration?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 45%',
            toggleActions: once ? 'play none none reverse' : 'play none none none',
          },
        })
        .set(el, {
          clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
        })
        .to(
          el,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration,
            ease: 'power4.inOut',
            delay,
          },
          0
        )
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      <Tag>{children}</Tag>
    </div>
  )
}
