'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SplitLines } from '@/components/motion/SplitLines'
import { Button } from '@/components/ui/Button'

/**
 * Refer & Earn as a golden-ticket moment: the whole offer rendered as a
 * perforated ticket — pitch on the main body, "UP TO $300" on the stub,
 * complete with notches and a decorative barcode. A gradient keyline
 * border, deep violet surface and a periodic holographic sheen make the
 * ticket sit ON the page instead of blending into it. Tilts in on
 * scroll like it was just torn off, then floats gently.
 */

/* deterministic pseudo-barcode strip */
const BARCODE = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 2, 1, 4, 1, 2]

export function ReferTicket() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.ticket', {
        y: 80,
        rotate: -3,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ticket', start: 'top 82%', once: true },
      })

      // gentle idle float so the ticket feels physical
      gsap.to('.ticket', {
        y: -8,
        rotate: 0.4,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      })

      // periodic holographic sheen sweeping across the ticket face
      gsap.fromTo(
        '.ticket-sheen',
        { xPercent: -140 },
        {
          xPercent: 320,
          duration: 2,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 3.2,
          delay: 2.2,
        }
      )
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
      {/* ambient glow behind the ticket */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60rem 32rem at 50% 55%, rgb(177 78 255 / 0.14), transparent 65%)',
        }}
      />

      <div className="relative mx-auto w-[min(94%,80rem)]">
        <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( 05 | Refer &amp; Earn )
        </SplitLines>
        <SplitLines
          as="h2"
          className="mb-14 max-w-2xl font-display text-4xl font-semibold tracking-tight md:mb-20 md:text-5xl"
        >
          Good careers travel by word of mouth.
        </SplitLines>

        {/* ── The ticket ── */}
        <div className="ticket relative mx-auto max-w-5xl">
          {/* gradient keyline border + deep glow so the ticket pops off the page */}
          <div className="relative rounded-3xl bg-gradient-to-br from-brand/70 via-glow/35 to-deep/70 p-px shadow-[0_30px_90px_-20px_rgba(177,78,255,0.45),0_0_40px_-12px_rgba(255,141,235,0.35)]">
            <div
              className="relative grid overflow-hidden rounded-[calc(1.5rem-1px)] md:grid-cols-[1.6fr_1fr]"
              style={{
                background:
                  'linear-gradient(135deg, #2B1743 0%, #1C0F30 48%, #2A123F 100%)',
              }}
            >
              {/* holographic sheen */}
              <div
                aria-hidden="true"
                className="ticket-sheen pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/8 to-transparent"
              />
              {/* soft inner accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-brand/20 blur-3xl"
              />

              {/* main body */}
              <div className="relative p-8 md:p-14">
                <p className="text-xs uppercase tracking-[0.3em] text-glow/90">
                  Admit one · Career referral
                </p>
                <h3 className="mt-5 max-w-md font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Know someone who deserves better than job boards?
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-fg-2">
                  Send them our way. They get the full structured program —
                  consultation to placement, with support after they start.
                  You get a thank-you that cashes.
                </p>
                <div className="mt-9">
                  <Button href="/refer">Refer someone</Button>
                </div>
              </div>

              {/* perforation + stub */}
              <div
                aria-hidden="true"
                className="relative hidden border-l-2 border-dashed border-glow/25 md:block"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 bg-white/[0.02] p-10 text-center">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-fg-3">
                    Referral bonus
                  </p>
                  <p className="font-display text-6xl font-bold leading-none text-gradient-brand drop-shadow-[0_0_24px_rgba(213,108,255,0.45)] lg:text-7xl">
                    $300
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em] text-fg-2">
                    up to · per placement
                  </p>

                  {/* barcode */}
                  <div className="mt-6 flex h-10 items-stretch gap-[3px] opacity-80">
                    {BARCODE.map((w, i) => (
                      <span key={i} className="bg-fg-2" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-fg-3">
                    Valid · US · CA · UK · NZ
                  </p>
                </div>
              </div>

              {/* mobile stub (stacked under body) */}
              <div className="border-t-2 border-dashed border-glow/25 bg-white/[0.02] p-8 text-center md:hidden">
                <p className="text-[10px] uppercase tracking-[0.35em] text-fg-3">
                  Referral bonus
                </p>
                <p className="mt-3 font-display text-5xl font-bold leading-none text-gradient-brand">
                  $300
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-fg-2">
                  up to · per placement
                </p>
              </div>
            </div>
          </div>

          {/* punched notches where the perforation meets the edges
              (stub column = 1fr of 2.6fr → 38.46% from the right) */}
          <span
            aria-hidden="true"
            className="absolute -top-4 right-[38.46%] hidden size-8 translate-x-1/2 rounded-full border border-brand/40 bg-ink-2 md:block"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-4 right-[38.46%] hidden size-8 translate-x-1/2 rounded-full border border-brand/40 bg-ink-2 md:block"
          />
        </div>
      </div>
    </section>
  )
}
