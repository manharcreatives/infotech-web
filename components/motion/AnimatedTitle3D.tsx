'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function AnimatedTitle3D({
  children,
  className,
  as: Tag = 'h2',
  stagger = 0.02,
  once = true,
}: {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p'
  stagger?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const words = el.querySelectorAll('.word-3d')
      if (!words.length) return

      gsap.fromTo(
        words,
        {
          opacity: 0,
          rotateY: 90,
          rotateX: 20,
          y: 50,
        },
        {
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 1,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 45%',
            toggleActions: once ? 'play none none reverse' : 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  const words = children.split(' ')

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <Tag className="sr-only">{children}</Tag>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="word-3d mr-[0.3em] inline-block [transform-style:preserve-3d]">
            {word}
          </span>
        ))}
      </span>
    </div>
  )
}
