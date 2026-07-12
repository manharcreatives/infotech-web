'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const cards = [
  { value: '4,800+', label: 'Careers placed' },
  { value: '320+', label: 'Companies partnered' },
  { value: '93%', label: 'Offer acceptance rate' },
]

/**
 * Three stat cards that emerge from behind the hero as it scrolls up.
 * Each card splits outward (left / center / right) and flips 180° on
 * its Y-axis to reveal the stat — inspired by Split-Flip.
 */
export function HeroSplitCards({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = ref.current
      if (!container) return
      const cardEls = container.querySelectorAll<HTMLElement>('.split-card')
      const backEls = container.querySelectorAll<HTMLElement>('.split-card-back')
      if (!cardEls.length) return

      gsap.set(cardEls, { autoAlpha: 0 })
      gsap.set(backEls, { rotationY: 180 })

      const parent = container.parentElement
      if (!parent) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top 5%',
          end: 'top -30%',
          scrub: 0.6,
        },
      })

      tl.to(cardEls, { autoAlpha: 1, duration: 0.2, stagger: { amount: 0.1, from: 'center' } })
      tl.to(
        cardEls,
        {
          x: (i) => (i === 0 ? -120 : i === 2 ? 120 : 0),
          y: -24,
          rotationY: 180,
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: { amount: 0.15, from: 'center' },
        },
        '-=0.1'
      )
    },
    { scope: ref }
  )

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center gap-6',
        className
      )}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className="split-card h-44 w-52 [perspective:800px]"
        >
          <div className="relative size-full [transform-style:preserve-3d]">
            {/* Front — subtle placeholder */}
            <div className="split-card-front absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-line-2 bg-ink/80 backdrop-blur-lg [backface-visibility:hidden]">
              <div className="size-10 rounded-full border-2 border-dashed border-fg-3/40" />
              <p className="mt-4 text-xs tracking-[0.15em] text-fg-3 uppercase">
                Loading…
              </p>
            </div>
            {/* Back — stat */}
            <div className="split-card-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-line-2 bg-ink/80 backdrop-blur-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="font-display text-3xl font-bold text-glow">
                {card.value}
              </span>
              <p className="mt-1 text-sm text-fg-3">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
