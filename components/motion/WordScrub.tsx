'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Word-by-word opacity scrub tied to scroll position — the paragraph
 * "lights up" as the reader moves through it.
 */
export function WordScrub({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const split = SplitText.create(el, { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      )
      return () => split.revert()
    },
    { scope: ref }
  )

  return (
    <p ref={ref} className={cn(className)}>
      {text}
    </p>
  )
}
