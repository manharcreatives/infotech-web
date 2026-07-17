'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { getLenis } from '@/lib/scroll'
import { markPreloaderPending, markPreloaderDone } from '@/lib/preloader'
import { isPageTransitionActive } from '@/lib/transition'
import { LogoMark } from './LogoMark'

/**
 * Preloader — SVG-driven, Netflix-style logo assembly.
 *
 * The 11 dimensional faces of the ITP mark disperse from distinct vectors,
 * converge into place with weighted deceleration (brand ease), snap/settle,
 * a `#FFF2FF` specular flash confirms assembly, the wordmark rises in, the
 * mark holds, then zooms toward camera as the curtains split to reveal the
 * hero. Runs on every full page load (see DECISIONS_LOG §D3); skipped only
 * during client-side route transitions.
 *
 * Reuses the existing hero handoff untouched: `markPreloaderDone()` fires the
 * `ip:preloader-done` event that HeroSection (`onPreloaderReady`) and
 * CinematicMask (iris) already listen for.
 *
 * Animation touches only `transform` + `opacity` (GPU-composited). The flash
 * is an opacity/transform crossfade on a dedicated `mix-blend:screen` layer —
 * never an animated filter. Faces keep their gradient fills throughout, so the
 * mark is never flat, even mid-transition.
 */

/**
 * Brand-locked primary easing `cubic-bezier(0.16, 1, 0.3, 1)`, implemented
 * directly (Newton–Raphson solve) so we don't pull GSAP's CustomEase plugin
 * into the bundle just for one curve. Passed straight to GSAP as `ease`.
 */
function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const fx = (t: number) => ((ax * t + bx) * t + cx) * t
  const dfx = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  const solveX = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const err = fx(t) - x
      if (Math.abs(err) < 1e-5) break
      const d = dfx(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    return t
  }
  return (t: number) => {
    if (t <= 0) return 0
    if (t >= 1) return 1
    const tt = solveX(t)
    return ((ay * tt + by) * tt + cy) * tt
  }
}
const brandEase = makeCubicBezier(0.16, 1, 0.3, 1)

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<(() => void) | null>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const forceShow =
        typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('preloader') === '1'

      // Skip entirely during in-app route transitions (overlay handles reveal).
      if (!forceShow && isPageTransitionActive()) {
        markPreloaderDone()
        setDone(true)
        return
      }

      markPreloaderPending()
      const lenis = getLenis()
      lenis?.stop()

      // Reduced-motion / slow-connection / Save-Data → static, low-motion path.
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
      const saveData = conn?.saveData === true
      const slow = /(^|-)2g$/.test(conn?.effectiveType ?? '')
      const reduce =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData || slow

      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        lenis?.start()
        markPreloaderDone()
        setDone(true)
      }

      // Shared "graceful jump to reveal" — the ONLY exit path. Used by the
      // natural end of the sequence AND by the skip control, so there is never
      // a second, divergent exit. `reduce` suppresses the camera zoom.
      const buildExit = (tl: gsap.core.Timeline) => {
        tl.addLabel('exit')
        tl.to(
          '.lm-lockup',
          {
            scale: reduce ? 1 : 6.5,
            autoAlpha: 0,
            duration: reduce ? 0.4 : 0.42,
            ease: brandEase,
          },
          'exit'
        )
          .to('.pre-panel-top', { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 'exit+=0.05')
          .to('.pre-panel-bottom', { yPercent: 100, duration: 0.75, ease: 'power4.inOut' }, 'exit+=0.05')
      }

      // Establish hidden pre-state before first paint (layout effect timing).
      gsap.set('.lm-glow', { autoAlpha: 0 })

      const tl = gsap.timeline({ onComplete: finish })

      if (reduce) {
        /* ---- Reduced-motion branch: NO disperse/converge/snap/flash. ----
           Render the assembled, fully-lit mark, fade it in, hold, then exit
           on the same trigger the full sequence uses. */
        gsap.set('.lm-face', { x: 0, y: 0, scale: 1, autoAlpha: 1 })
        gsap.set('.lm-wordmark', { autoAlpha: 0, y: 0 })
        tl.fromTo(
          '.lm-lockup',
          { autoAlpha: 0, scale: 0.985 },
          { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power1.out' }
        )
          .to('.lm-glow', { autoAlpha: 0.7, duration: 0.2 }, '<')
          .to('.lm-wordmark', { autoAlpha: 1, duration: 0.2 }, '<')
          .to({}, { duration: 0.55 }) // hold
        buildExit(tl)
      } else {
        gsap.set('.lm-face', { autoAlpha: 0 })
        gsap.set('.lm-wordmark', { autoAlpha: 0, y: 60 })

        tl
          /* Phase 2 — Converge: every face travels from its own vector to rest,
             staggered in the brand lighting order (Top-Left → Front → Right →
             Inner) via data-order. Weighted deceleration = the brand ease. */
          .fromTo(
            '.lm-face',
            {
              x: (_i: number, el: Element) => Number((el as HTMLElement).dataset.fx),
              y: (_i: number, el: Element) => Number((el as HTMLElement).dataset.fy),
              scale: (_i: number, el: Element) => Number((el as HTMLElement).dataset.fs),
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.05,
              ease: brandEase,
              stagger: (_i: number, el: Element) =>
                Number((el as HTMLElement).dataset.order) * 0.058,
            }
          )
          .to('.lm-glow', { autoAlpha: 0.75, duration: 0.65, ease: 'power2.out' }, '<0.2')
          /* Phase 3 — Snap / settle: a subtle whole-mark overshoot (≈2%) reads
             as physical contact between faces. */
          .to('.lm-svg', { scale: 1.02, duration: 0.11, ease: 'power2.out' }, '-=0.05')
          .to('.lm-svg', { scale: 1, duration: 0.3, ease: 'back.out(2.2)' })
          /* Wordmark rises in as the mark settles. */
          .to('.lm-wordmark', { autoAlpha: 1, y: 0, duration: 0.65, ease: brandEase }, '-=0.1')
          /* Phase 5 — Hold: the mark is seen clearly, alone. */
          .to({}, { duration: 0.75 })

        /* Phase 6 — Exit: Netflix zoom + curtain reveal. */
        buildExit(tl)
      }

      /* ---- Skip: routes through the SAME buildExit (shared reveal). ---- */
      skipRef.current = () => {
        if (finished) return
        tl.kill()
        gsap.set('.lm-face', { x: 0, y: 0, scale: 1, autoAlpha: 1 })
        gsap.set('.lm-svg', { scale: 1 })
        gsap.set('.lm-wordmark', { autoAlpha: 1, y: 0 })
        gsap.set('.lm-glow', { autoAlpha: 0.7 })
        const jump = gsap.timeline({ onComplete: finish })
        buildExit(jump)
      }

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') skipRef.current?.()
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    },
    { scope: rootRef }
  )

  if (done) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[300]">
      {/* Pre-hide faces + wordmark before GSAP runs — prevents assembled logo
          flash on first paint. GSAP overrides these with inline styles. */}
      <style>{`.lm-face,.lm-wordmark{opacity:0}`}</style>
      {/* Dark preloader surface + curtain panels (the reveal mechanism). */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink" />
      <div aria-hidden="true" className="pre-panel-top absolute inset-x-0 top-0 h-1/2 bg-ink z-[2]" />
      <div aria-hidden="true" className="pre-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink z-[2]" />

      {/* Logo lockup — the assembly + zoom target. */}
      <div aria-hidden="true" className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="lm-lockup relative h-[clamp(180px,42vw,340px)] w-[clamp(180px,42vw,340px)]">
          {/* Static brand glow (opacity-crossfaded only, never blurred per frame) */}
          <div
            className="lm-glow pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(177,78,255,0.5), rgba(177,78,255,0.12) 42%, transparent 66%)',
            }}
          />
          <LogoMark className="lm-svg relative block h-full w-full" />
        </div>
      </div>

      {/* Skip control — real focusable button, outside the aria-hidden visuals,
          sharp corners (2px), brand colours, visible focus ring. Esc also skips. */}
      <button
        type="button"
        onClick={() => skipRef.current?.()}
        className="pre-skip absolute bottom-6 right-6 z-[4] rounded-[2px] border border-line px-4 py-2 text-xs uppercase tracking-[0.25em] text-fg-2 transition-colors hover:border-brand hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-glow"
      >
        Skip intro
      </button>
    </div>
  )
}
