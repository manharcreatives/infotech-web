'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Splits text into lines and reveals each from behind a mask when it
 * scrolls into view — the signature editorial reveal.
 */
export function SplitLines({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.09,
  once = true,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const split = SplitText.create(el, {
        type: 'lines',
        linesClass: 'line-mask-inner',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            stagger,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once,
            },
          }),
      })
      return () => split.revert()
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}
