'use client'

import { useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * "Where we place" as a full split-screen chapter instead of two pill
 * clusters: IT and Non-IT as twin numbered indexes divided by a center
 * spine, followed by the one-program flow (consultation → placement →
 * ongoing support) and the four countries — so the section carries the
 * weight of a full page act, not a footnote.
 */

const tracks = [
  {
    key: 'it',
    label: 'IT roles',
    tagline: 'Our deepest bench.',
    roles: [
      'Software Development',
      'Data & Analytics',
      'Cloud & DevOps',
      'QA & Testing',
      'Cybersecurity',
      'IT Project Management',
    ],
  },
  {
    key: 'non-it',
    label: 'Non-IT roles',
    tagline: 'The same commitment.',
    roles: [
      'Finance & Accounting',
      'Healthcare',
      'Human Resources',
      'Sales & Marketing',
      'Engineering',
      'Customer Service & Admin',
    ],
  },
]

const programFlow = ['Consultation', 'Branding', 'Marketing', 'Preparation', 'Placement']

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'NZ', name: 'New Zealand' },
]

export function IndustriesSplit() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.ind-role').forEach((row, i) => {
        gsap.from(row, {
          y: 26,
          autoAlpha: 0,
          duration: 0.8,
          delay: (i % 6) * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 92%', once: true },
        })
      })

      const spine = ref.current?.querySelector('.ind-spine')
      if (spine) {
        gsap.from(spine, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.6,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: spine, start: 'top 80%', once: true },
        })
      }

      gsap.utils.toArray<HTMLElement>('.ind-flow-step').forEach((step, i) => {
        gsap.from(step, {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.ind-flow', start: 'top 88%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 md:py-36">
      {/* ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70rem 40rem at 50% -10%, rgb(111 40 185 / 0.16), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-[min(94%,84rem)]">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( Where we place )
        </SplitLines>
        <SplitLines
          as="h2"
          className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
        >
          IT is our depth.
          <br />
          It isn&rsquo;t our limit.
        </SplitLines>

        {/* Twin indexes */}
        <div className="relative mt-16 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-0">
          {/* center spine (desktop) */}
          <div
            aria-hidden="true"
            className="ind-spine absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-glow/50 via-line to-transparent md:block"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface font-display text-lg font-semibold text-glow md:grid"
          >
            &amp;
          </span>

          {tracks.map((track, t) => (
            <div key={track.key} className={t === 0 ? 'md:pr-14' : 'md:pl-14'}>
              <div className="mb-8 flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {track.label}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-fg-3">{track.tagline}</p>
              </div>
              <ol className="border-t border-line-2">
                {track.roles.map((role, i) => (
                  <li
                    key={role}
                    className="ind-role group relative flex items-center gap-5 overflow-hidden border-b border-line-2 py-4.5 md:py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand/10 to-transparent transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <span className="text-stroke relative font-display text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="relative flex-1 text-base text-fg-2 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-fg md:text-lg">
                      {role}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="relative size-4 -translate-x-2 text-glow opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* One program, both tracks */}
        <div className="ind-flow mt-20 rounded-2xl border border-line bg-surface/40 p-8 backdrop-blur-sm md:mt-24 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-fg-3">
            One program. Both tracks.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-5">
            {programFlow.map((step, i) => (
              <span key={step} className="ind-flow-step flex items-center gap-4">
                <span className="font-display text-xl font-medium tracking-tight text-fg md:text-2xl">
                  {step}
                </span>
                {i < programFlow.length - 1 && (
                  <ArrowRight aria-hidden="true" className="size-4 text-brand" />
                )}
              </span>
            ))}
            <span className="ind-flow-step flex items-center gap-4">
              <ArrowRight aria-hidden="true" className="size-4 text-brand" />
              <span className="rounded-full border border-glow/40 bg-glow/10 px-4 py-1.5 font-display text-sm font-medium text-glow md:text-base">
                Support after your start date
              </span>
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line-2 pt-8">
            <p className="mr-3 text-xs uppercase tracking-[0.25em] text-fg-3">Across</p>
            {countries.map((c) => (
              <span
                key={c.code}
                className="group flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-fg-2 transition-colors duration-300 hover:border-glow/50 hover:text-fg"
              >
                <span className="font-display text-xs font-bold text-glow">{c.code}</span>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
