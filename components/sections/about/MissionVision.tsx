'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { mission, vision } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'
import { WordColorReveal } from '@/components/motion/WordColorReveal'

/**
 * Mission & Vision as two full-bleed editorial panels instead of two
 * half-width cards. Each panel carries a giant parallax watermark of its
 * own word, an index rail, the statement in large display type revealed
 * word-by-word, and a meta row of keyword chips. The watermarks drift in
 * opposite directions on scroll so the section reads as one composed
 * spread, not a grid cell.
 */

const panels = [
  {
    index: '01',
    word: 'MISSION',
    label: 'Our Mission',
    sub: 'The direction',
    text: mission,
    chips: ['Personalized guidance', 'Branding & placement', 'Talent that grows business', 'US · CA · UK · NZ'],
    drift: 1,
  },
  {
    index: '02',
    word: 'VISION',
    label: 'Our Vision',
    sub: 'The destination',
    text: vision,
    chips: ['Trusted globally', 'Efficient & transparent', 'Rewarding for both sides'],
    drift: -1,
  },
]

export function MissionVision() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const marks = gsap.utils.toArray<HTMLElement>('.mv-watermark')
      marks.forEach((mark) => {
        const dir = Number(mark.dataset.drift || 1)
        gsap.fromTo(
          mark,
          { xPercent: 6 * dir },
          {
            xPercent: -6 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: mark.closest('.mv-panel'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.mv-rail-line').forEach((line) => {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: line.closest('.mv-panel'), start: 'top 70%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('.mv-chip').forEach((chip, i) => {
        gsap.from(chip, {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          delay: (i % 4) * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: chip, start: 'top 92%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* ambient glow spine down the center of the section */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand/25 to-transparent"
      />

      <div className="mx-auto w-[min(94%,80rem)]">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( Why we exist )
        </SplitLines>
        <SplitLines
          as="h2"
          className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Where we&rsquo;re going, and why.
        </SplitLines>
      </div>

      <div className="mt-8 md:mt-4">
        {panels.map((p) => (
          <article
            key={p.word}
            className="mv-panel relative border-t border-line-2 py-20 first:border-t-0 md:py-28"
          >
            {/* giant parallax watermark */}
            <span
              aria-hidden="true"
              data-drift={p.drift}
              className="mv-watermark text-stroke pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 font-display text-[clamp(6rem,17vw,15rem)] font-bold leading-none whitespace-nowrap opacity-40 select-none"
            >
              {p.word}&nbsp;{p.word}
            </span>

            <div className="relative z-10 mx-auto grid w-[min(94%,80rem)] gap-10 md:grid-cols-[8rem_1fr]">
              {/* index rail */}
              <div className="flex items-start gap-5 md:flex-col md:items-center md:gap-6">
                <span className="font-display text-2xl font-bold text-gradient-brand">
                  {p.index}
                </span>
                <span
                  aria-hidden="true"
                  className="mv-rail-line hidden h-28 w-px bg-gradient-to-b from-glow/70 to-transparent md:block"
                />
                <p className="text-xs uppercase tracking-[0.3em] text-fg-3 md:[writing-mode:vertical-rl]">
                  {p.label}
                </p>
              </div>

              <div className={p.drift === -1 ? 'md:pl-[10%]' : 'md:pr-[10%]'}>
                <p className="mb-6 text-xs uppercase tracking-[0.25em] text-glow">
                  {p.sub}
                </p>
                <WordColorReveal
                  as="p"
                  className="max-w-4xl font-display text-[clamp(1.4rem,2.9vw,2.3rem)] font-medium leading-[1.35] tracking-tight"
                  stagger={0.03}
                  color="#FF8DEB"
                >
                  {p.text}
                </WordColorReveal>

                <ul className="mt-10 flex flex-wrap gap-2.5">
                  {p.chips.map((chip) => (
                    <li
                      key={chip}
                      className="mv-chip rounded-full border border-line bg-surface/50 px-4 py-1.5 text-xs tracking-wide text-fg-2 backdrop-blur-sm transition-colors duration-300 hover:border-glow/50 hover:text-fg"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
