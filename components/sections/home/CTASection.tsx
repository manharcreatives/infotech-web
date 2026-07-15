'use client'

import { Button } from '@/components/ui/Button'
import { AnimatedTitle3D } from '@/components/motion/AnimatedTitle3D'
import { ClipRevealText } from '@/components/motion/ClipRevealText'

export function CTASection() {

  return (
    <section className="relative overflow-hidden bg-ink py-36 md:py-52">
      {/* Aurora glow + watermark backdrop */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-glow/5" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,black_25%,transparent_75%)]" />

        <div className="cta-aurora-a absolute -left-1/4 top-0 size-[42rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="cta-aurora-b absolute -right-1/4 bottom-0 size-[38rem] rounded-full bg-glow/20 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-[min(94%,80rem)] flex-col items-center text-center">
        <ClipRevealText as="p" className="mb-6 text-xs uppercase tracking-[0.35em] text-fg-3">
          Your move
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
