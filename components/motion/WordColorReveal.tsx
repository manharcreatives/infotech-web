'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function WordColorReveal({
  children,
  className,
  as: Tag = 'p',
  stagger = 0.04,
  color = '#FF8DEB',
}: {
  children: string
  className?: string
  as?: 'h2' | 'h3' | 'p' | 'div'
  stagger?: number
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const words = el.querySelectorAll<HTMLElement>('.wcr-word')
      if (!words.length) return

      gsap.fromTo(
        words,
        { color: 'transparent' },
        {
          color,
          duration: 0.8,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        }
      )
    },
    { scope: ref }
  )

  const words = children.split(' ')

  return (
    <div ref={ref} className={cn('inline', className)}>
      <Tag className="sr-only">{children}</Tag>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="wcr-word mr-[0.3em] inline-block">
            {word}
          </span>
        ))}
      </span>
    </div>
  )
}
