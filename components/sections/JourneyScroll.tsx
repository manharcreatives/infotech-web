'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { candidateJourney } from '@/content/site'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * The 11-step candidate journey as a scrollytelling chapter:
 * a sticky media stage on the left (step counter + swappable visual
 * frame — client-supplied SVG art drops into each frame later) and the
 * steps flowing down the right along a serpentine glowing route. The
 * route is a real SVG path generated from the measured step positions,
 * drawn progressively as you scroll, with a comet that travels the
 * curve and milestone nodes that light up as it passes them.
 * Desktop-only; mobile gets the full journey inline with per-step
 * visuals and no route.
 */
export function JourneyScroll() {
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const fillRef = useRef<SVGPathElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        /* ── Build the serpentine route through the measured step
           positions. Node x alternates left/right so the path snakes. ── */
        const buildPath = () => {
          const spine = spineRef.current
          const ghost = ghostRef.current
          const fill = fillRef.current
          if (!spine || !ghost || !fill) return

          const spineRect = spine.getBoundingClientRect()
          const w = spineRect.width
          const h = spine.clientHeight
          const steps = gsap.utils.toArray<HTMLElement>('.jr-step')
          if (!steps.length || w === 0) return

          const pts = steps.map((step, i) => {
            const r = step.getBoundingClientRect()
            return {
              x: i % 2 === 0 ? w * 0.24 : w * 0.76,
              y: r.top - spineRect.top + 72,
            }
          })

          let d = `M ${w / 2} 0`
          let prev = { x: w / 2, y: 0 }
          pts.forEach((p) => {
            const midY = (prev.y + p.y) / 2
            d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
            prev = p
          })
          const endY = h
          const midY = (prev.y + endY) / 2
          d += ` C ${prev.x} ${midY}, ${w / 2} ${midY}, ${w / 2} ${endY}`

          ghost.setAttribute('d', d)
          fill.setAttribute('d', d)
          const len = fill.getTotalLength()
          fill.style.strokeDasharray = `${len}`
          fill.style.strokeDashoffset = `${len}`
          setNodes(pts)
          return len
        }

        const len = buildPath() ?? 0

        /* Draw the route + drive the comet along it with scroll. */
        const fill = fillRef.current
        const comet = cometRef.current
        if (fill && comet && len > 0) {
          const start = fill.getPointAtLength(0)
          gsap.set(comet, { x: start.x, y: start.y })
          const proxy = { p: 0 }
          gsap.to(proxy, {
            p: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current!.querySelector('.jr-steps'),
              start: 'top 55%',
              end: 'bottom 55%',
              scrub: 0.4,
            },
            onUpdate: () => {
              const l = fill.getTotalLength()
              fill.style.strokeDashoffset = `${l * (1 - proxy.p)}`
              const pt = fill.getPointAtLength(l * proxy.p)
              gsap.set(comet, { x: pt.x, y: pt.y })
            },
          })
        }

        /* Activate a step as its block crosses the viewport center. */
        gsap.utils.toArray<HTMLElement>('.jr-step').forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive) setActive(i)
            },
          })
        })

        /* Rebuild on refresh (resize, font load, layout shifts). */
        const onRefresh = () => buildPath()
        ScrollTrigger.addEventListener('refresh', onRefresh)
        return () => ScrollTrigger.removeEventListener('refresh', onRefresh)
      })

      /* Desktop step reveal: subtle fade-up (desktop has the route animation as main effect) */
      mm.add('(min-width: 768px)', () => {
        gsap.utils.toArray<HTMLElement>('.jr-step-inner').forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
      })

      /* Mobile step reveal: alternating slide from left and right */
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('.jr-step-inner').forEach((el, i) => {
          gsap.from(el, {
            x: i % 2 === 0 ? -65 : 65,
            autoAlpha: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  /* Counter flip on step change */
  useEffect(() => {
    if (!counterRef.current) return
    gsap.fromTo(
      counterRef.current,
      { yPercent: 45, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }
    )
  }, [active])

  return (
    // NOTE: no overflow-hidden on this section — an overflow ancestor
    // disables position:sticky, which kills the pinned media stage.
    <section ref={ref} className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto w-[min(94%,84rem)]">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          Every step, published
        </SplitLines>
        <SplitLines
          as="h2"
          className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Your journey, start to finish.
        </SplitLines>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-3">
          Eleven steps, in the order they happen. Scroll the route — the
          stage on the left follows you.
        </p>

        <div className="mt-16 grid gap-0 md:mt-24 md:grid-cols-[1fr_7rem_1.1fr] md:gap-4">
          {/* ── Sticky stage (desktop) ── */}
          <div className="hidden md:block">
            <div className="sticky top-0 flex h-svh flex-col justify-center py-10">
              {/* step counter */}
              <div className="mb-6 flex items-end gap-3">
                <span className="inline-block overflow-hidden">
                  <span
                    ref={counterRef}
                    className="inline-block font-display text-7xl font-bold leading-none text-gradient-brand"
                  >
                    {String(active + 1).padStart(2, '0')}
                  </span>
                </span>
                <span className="pb-1 font-display text-xl text-fg-3">/ 11</span>
              </div>

              {/* media stage — client SVG art drops into each frame */}
              <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface/40">
                {candidateJourney.map((step, i) => (
                  <figure
                    key={step.title}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      active === i ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
                    }`}
                  >
                    <Image
                      src={`/images/journey/step-${String(i + 1).padStart(2, '0')}.webp`}
                      alt=""
                      fill
                      unoptimized
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-deep/25 via-transparent to-ink/25" />
                    <span
                      aria-hidden="true"
                      className="text-stroke absolute -bottom-6 -right-4 font-display text-[8rem] font-bold leading-none opacity-70"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </figure>
                ))}
              </div>

              <p className="mt-6 max-w-sm text-xs uppercase tracking-[0.3em] text-fg-3">
                Now:{' '}
                <span className="text-glow normal-case tracking-normal">
                  {candidateJourney[active].title}
                </span>
              </p>
            </div>
          </div>

          {/* ── Serpentine route ── */}
          <div ref={spineRef} aria-hidden="true" className="relative hidden md:block">
            <svg className="absolute inset-0 size-full overflow-visible">
              <defs>
                <linearGradient id="jr-route" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B14EFF" />
                  <stop offset="50%" stopColor="#FF8DEB" />
                  <stop offset="100%" stopColor="#B14EFF" />
                </linearGradient>
              </defs>
              {/* the road ahead — faint dashed guide */}
              <path
                ref={ghostRef}
                fill="none"
                stroke="#37204D"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                strokeLinecap="round"
              />
              {/* the traveled route — glowing gradient, drawn by scroll */}
              <path
                ref={fillRef}
                fill="none"
                stroke="url(#jr-route)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,141,235,0.55))' }}
              />
            </svg>

            {/* milestone nodes on the route */}
            {nodes.map((n, i) => (
              <span
                key={i}
                className={`absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
                  active >= i
                    ? 'border-glow bg-glow shadow-[0_0_16px_3px_rgba(255,141,235,0.55)]'
                    : 'border-line bg-ink'
                }`}
                style={{ left: n.x, top: n.y }}
              />
            ))}

            {/* the comet riding the route */}
            <div ref={cometRef} className="absolute left-0 top-0">
              <span className="absolute -translate-x-1/2 -translate-y-1/2">
                <span className="block size-4 rounded-full bg-glow shadow-[0_0_24px_8px_rgba(255,141,235,0.65)]" />
                <span className="absolute inset-0 -z-10 block size-4 animate-ping rounded-full bg-glow/50" />
              </span>
            </div>
          </div>

          {/* ── Steps ── */}
          <ol className="jr-steps">
            {candidateJourney.map((step, i) => (
              <li key={step.title} className="jr-step relative md:min-h-[46svh]">
                <div className="jr-step-inner relative py-10 md:py-14">
                  <div
                    className={`transition-opacity duration-500 ${
                      active === i ? 'md:opacity-100' : 'md:opacity-40'
                    }`}
                  >
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-fg-3 md:hidden">
                      Step {String(i + 1).padStart(2, '0')} / 11
                    </p>
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`hidden font-display text-xl font-bold md:inline ${
                          active === i ? 'text-glow' : 'text-fg-3'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg-3 md:pl-[calc(1.25rem+1.5rem)] md:text-base">
                      {step.description}
                    </p>

                    {/* inline visual on mobile — same frame the stage shows on desktop */}
                    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface/40 md:hidden">
                      <Image
                        src={`/images/journey/step-${String(i + 1).padStart(2, '0')}.webp`}
                        alt=""
                        fill
                        unoptimized
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-deep/25 via-transparent to-ink/25" />
                      <span
                        aria-hidden="true"
                        className="text-stroke absolute -bottom-4 -right-2 font-display text-[5rem] font-bold leading-none opacity-70"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
