'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { statement } from '@/content/site'
import { WordColorReveal } from '@/components/motion/WordColorReveal'
import { SplitLines } from '@/components/motion/SplitLines'

export function StatementSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const sweep = ref.current?.querySelector('.statement-sweep')
    if (!sweep) return

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          scrub: 0.6,
        },
      })
      .fromTo(
        sweep,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: 'none' }
      )
  })

  return (
    <section ref={ref} className="relative min-h-svh bg-ink">
      {/* Sweep layer — brand gradient + atmospheric image slide in from the
          left with the existing clip-path scrub (image reveals as you scroll;
          inherits the section's motion + reduced-motion behavior) */}
      <div className="statement-sweep absolute inset-0 bg-gradient-to-r from-brand/8 to-transparent">
        <Image
          src="/images/sections/philosophy-bg.png"
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-[0.18]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-[min(94%,68rem)] flex-col justify-center py-32 md:py-44">
        <SplitLines
          as="p"
          className="mb-10 text-xs uppercase tracking-[0.35em] text-fg-3"
        >
          ( 01 | The Philosophy )
        </SplitLines>

        <WordColorReveal
          as="h2"
          className="max-w-5xl font-display text-[clamp(1.7rem,4.2vw,3.4rem)] font-medium leading-[1.25] tracking-tight"
          stagger={0.06}
          color="#FF8DEB"
        >
          {statement}
        </WordColorReveal>
      </div>
    </section>
  )
}
