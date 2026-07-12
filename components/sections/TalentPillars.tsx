'use client'

import { useRef } from 'react'
import { ShieldCheck, HeartHandshake, Eye, MessagesSquare } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * The four talent commitments as an asymmetric bento: the Interview
 * Guarantee anchors the grid as a double-size feature card with a
 * "written commitment" seal; the rest orbit it. Blueprint corner ticks,
 * ambient orbs and icon chips replace the generic spotlight cards.
 */

const pillars = [
  {
    icon: ShieldCheck,
    title: 'An interview, guaranteed',
    description:
      'Every enrolled candidate receives an interview opportunity. It is the commitment the entire program is built on.',
    badge: 'Written commitment',
    featured: true,
  },
  {
    icon: HeartHandshake,
    title: 'Support past your start date',
    description:
      'Placement is not the end of the program. We stay through onboarding and into your career growth.',
  },
  {
    icon: Eye,
    title: 'Your status, always visible',
    description:
      'Full transparency into every application made on your behalf. No chasing anyone for updates.',
  },
  {
    icon: MessagesSquare,
    title: 'Prepared, not thrown in',
    description:
      'Technical and mock interview sessions until the real one feels familiar, not frightening.',
  },
]

function CornerTicks() {
  return (
    <>
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} font-mono text-[10px] leading-none text-line select-none`}
        >
          +
        </span>
      ))}
    </>
  )
}

export function TalentPillars() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.pillar-card').forEach((card, i) => {
        gsap.from(card, {
          y: 56,
          autoAlpha: 0,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
      })
    },
    { scope: ref }
  )

  const [feature, ...rest] = pillars

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
      <div className="mx-auto w-[min(94%,80rem)]">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( What you get )
        </SplitLines>
        <SplitLines
          as="h2"
          className="mb-14 font-display text-4xl font-semibold tracking-tight md:text-5xl"
        >
          More than a job board ever gave you.
        </SplitLines>

        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
          {/* feature — the guarantee */}
          <article className="pillar-card group relative overflow-hidden rounded-2xl border border-line bg-surface/40 p-8 transition-colors duration-500 hover:border-glow/50 md:col-span-2 md:row-span-2 md:p-12">
            <CornerTicks />
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-24 size-96 rounded-full bg-brand/12 opacity-70 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="text-stroke pointer-events-none absolute -top-6 right-4 font-display text-[8rem] font-bold leading-none opacity-60 md:text-[11rem]"
            >
              01
            </span>

            <div className="relative flex h-full flex-col">
              <span className="grid size-12 place-items-center rounded-xl border border-glow/30 bg-glow/10">
                <feature.icon className="size-5 text-glow" />
              </span>

              <div className="mt-auto pt-16 md:pt-28">
                <span className="inline-flex items-center gap-2 rounded-full border border-glow/40 bg-glow/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-glow">
                  <span className="inline-block size-1.5 rounded-full bg-glow" />
                  {feature.badge}
                </span>
                <h3 className="mt-5 max-w-md font-display text-3xl font-semibold tracking-tight md:text-5xl">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-3 md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          </article>

          {/* the rest */}
          {rest.map((p, i) => (
            <article
              key={p.title}
              className={`pillar-card group relative overflow-hidden rounded-2xl border border-line bg-surface/40 p-8 transition-colors duration-500 hover:border-glow/50 ${
                i === rest.length - 1 ? 'md:col-span-3' : ''
              }`}
            >
              <CornerTicks />
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-48 rounded-full bg-deep/25 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="text-stroke pointer-events-none absolute -top-3 right-3 font-display text-6xl font-bold leading-none opacity-60"
              >
                {String(i + 2).padStart(2, '0')}
              </span>

              <div
                className={`relative ${
                  i === rest.length - 1
                    ? 'md:flex md:items-center md:gap-10'
                    : ''
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface/70 transition-colors duration-500 group-hover:border-glow/40">
                  <p.icon className="size-5 text-brand transition-colors duration-500 group-hover:text-glow" />
                </span>
                <h3
                  className={`mt-6 font-display text-xl font-semibold tracking-tight md:text-2xl ${
                    i === rest.length - 1 ? 'md:mt-0' : ''
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed text-fg-3 ${
                    i === rest.length - 1 ? 'md:mt-0 md:max-w-md' : ''
                  }`}
                >
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
