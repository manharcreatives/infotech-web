'use client'

import { useRef, type ElementType } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { onPreloaderReady } from '@/lib/preloader'
import { cn } from '@/lib/utils'

const CHARS = '!<>-_\\/[]{}—=+*^?#__abcdefghijklmnopqrstuvwxyz'

/**
 * Splits text into characters. On entering the viewport each character
 * scrambles through random glyphs before settling into its final letter
 * — the signature "hacker / glitch" reveal.
 *
 * Two stability guarantees keep the effect from glitching the layout:
 * - every glyph is width-locked to its final letter, so random
 *   replacement characters can never reflow or re-wrap the line;
 * - with `waitForPreloader`, the timeline doesn't start on a clock —
 *   it starts when the preloader actually finishes, so it can't fire
 *   mid-curtain or drift out of sync with the hero entrance.
 */
export function ScrambleText({
  children,
  as: Tag = 'div',
  className,
  scrambleDuration = 1.2,
  stagger = 0.04,
  delay = 0,
  once = true,
  useScrollTrigger = true,
  waitForPreloader = false,
}: {
  children: string
  as?: ElementType
  className?: string
  scrambleDuration?: number
  stagger?: number
  delay?: number
  once?: boolean
  useScrollTrigger?: boolean
  waitForPreloader?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      /* 'words,chars' so lines can only wrap between words — width-locking
         each word (below) keeps the wrap points identical while random
         scramble glyphs cycle, so the block never reflows mid-animation. */
      const split = SplitText.create(el, {
        type: 'words,chars',
        charsClass: 'char',
      })
      const chars = split.chars as HTMLSpanElement[]
      const words = split.words as HTMLSpanElement[]

      words.forEach((word) => {
        const w = word.getBoundingClientRect().width
        word.style.display = 'inline-block'
        word.style.width = `${w}px`
        word.style.whiteSpace = 'nowrap'
      })

      chars.forEach((char) => {
        char.dataset.original = char.textContent || ' '
      })

      gsap.set(chars, { opacity: 0 })

      let unsubscribe = () => {}

      const build = () => {
        const tl = gsap.timeline({
          scrollTrigger: useScrollTrigger && once
            ? { trigger: el, start: 'top 88%', once: true }
            : undefined,
          delay,
        })

        chars.forEach((char, i) => {
          tl.call(
            () => {
              const original = char.dataset.original || ' '
              const startTime = performance.now()

              char.style.opacity = '1'

              const loop = () => {
                const elapsed = performance.now() - startTime
                const progress = Math.min(elapsed / (scrambleDuration * 1000), 1)

                if (progress >= 1) {
                  char.textContent = original
                  return
                }

                let txt = ''
                for (let j = 0; j < original.length; j++) {
                  if (Math.random() < progress * 1.5) {
                    txt += original[j]
                  } else {
                    txt += CHARS[Math.floor(Math.random() * CHARS.length)]
                  }
                }
                char.textContent = txt
                requestAnimationFrame(loop)
              }

              requestAnimationFrame(loop)
            },
            undefined,
            i * stagger
          )
        })
      }

      if (waitForPreloader) {
        unsubscribe = onPreloaderReady(build)
      } else {
        build()
      }

      return () => {
        unsubscribe()
        split.revert()
      }
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  )
}
