'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { AnimatedTitle3D } from '@/components/motion/AnimatedTitle3D'
import { ClipRevealText } from '@/components/motion/ClipRevealText'
import { SplitLines } from '@/components/motion/SplitLines'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* Orb removed for clean design */
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-36 md:py-52">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,black_25%,transparent_75%)]" />

      <div className="relative z-10 mx-auto flex w-[min(94%,80rem)] flex-col items-center text-center">
        <ClipRevealText as="p" className="mb-6 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( 07 | Your move )
        </ClipRevealText>

        <AnimatedTitle3D
          as="h2"
          className="font-display text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.95] tracking-tight"
          stagger={0.03}
        >
          Your next role is waiting.
        </AnimatedTitle3D>

        <p className="mt-8 max-w-md text-base leading-relaxed text-fg-2">
          Book a free consultation. We&rsquo;ll map the path from your resume
          to a full-time offer, and the support beyond it. Then you decide.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact">Book a Free Consultation</Button>
          <Button href="/services" variant="ghost">
            Explore services
          </Button>
        </div>
      </div>
    </section>
  )
}
