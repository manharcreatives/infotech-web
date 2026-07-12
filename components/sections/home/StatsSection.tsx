'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { stats } from '@/content/site'
import { Counter } from '@/components/motion/Counter'
import { ClipRevealText } from '@/components/motion/ClipRevealText'

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll<HTMLElement>('.stat-orb')
      if (!items?.length) return

      gsap.set(items, { clipPath: 'circle(0%)' })

      gsap.to(items, {
        clipPath: 'circle(100%)',
        duration: 1.4,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative border-y border-line-2 bg-ink-2">
      <div className="mx-auto grid w-[min(94%,80rem)] grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              'stat-orb group relative px-4 py-14 md:px-6 md:py-20 ' +
              (i !== 0 ? 'border-l border-line-2' : '')
            }
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand/0 to-brand/0 transition-colors duration-700 group-hover:to-brand/10" />
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="relative block whitespace-nowrap font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl"
            />
            <ClipRevealText
              as="p"
              className="relative mt-3 whitespace-normal text-xs uppercase tracking-[0.2em] text-fg-3 md:whitespace-nowrap"
            >
              {stat.label}
            </ClipRevealText>
          </div>
        ))}
      </div>
    </section>
  )
}
