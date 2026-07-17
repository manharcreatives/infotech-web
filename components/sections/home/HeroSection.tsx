'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { heroWords, trustedRoles } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { ScrambleText } from '@/components/motion/ScrambleText'
import { CinematicMask } from '@/components/motion/CinematicMask'
import { onPreloaderReady } from '@/lib/preloader'

/**
 * Full-viewport hero. Choreography:
 * 1. CinematicMask covers the full section on mount (sits behind the
 *    preloader at z-20). After preloader curtains part the mask shrinks
 *    (iris opening) to reveal the hero from the centre outward, while
 *    headline lines rise, rotating word cycles, CTAs and ticker fade in.
 * 2. On scroll the hero content drifts up, scales down and fades out.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const heroContent = rootRef.current!.querySelector('.hero-content') as HTMLElement

      let intervalId: ReturnType<typeof setInterval> | undefined

      /* --- Entrance: waits for the preloader to finish (or fires
         immediately on inner pages where no preloader is mounted). --- */
      const unsubscribe = onPreloaderReady(() => {
        /* --- Entrance --- */
        /* (The old post-reveal title re-scramble is gone on purpose: it
           rewrote the headline's DOM — destroying the gradient span on
           "placed." — and its random glyph widths re-wrapped the lines,
           which is what made the other hero elements jump around.) */
        const h1 = rootRef.current!.querySelector('.hero-title')!
        const split = SplitText.create(h1, { type: 'lines', mask: 'lines' })

        /* Queried explicitly (not via string selector) because this code
           runs asynchronously off the preloader-ready event, outside the
           synchronous window where useGSAP's scope-selector proxying
           applies — a plain '.hero-fade' string would otherwise miss. */
        const tl = gsap.timeline()
        tl.from(split.lines, {
          yPercent: 118,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
        })
          .from(
            rootRef.current!.querySelectorAll('.hero-fade'),
            { y: 28, autoAlpha: 0, duration: 1, stagger: 0.12 },
            '-=0.9'
          )
          .from(
            rootRef.current!.querySelectorAll('.hero-line-h'),
            { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power4.inOut' },
            '-=1'
          )

        /* --- Rotating word --- */
        let index = 0
        const cycle = () => {
          const el = wordRef.current
          if (!el) return
          index = (index + 1) % heroWords.length
          gsap
            .timeline()
            .to(el, { yPercent: -110, autoAlpha: 0, duration: 0.55, ease: 'power3.in' })
            .call(() => {
              el.textContent = heroWords[index]
            })
            .fromTo(
              el,
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' }
            )
        }
        intervalId = setInterval(cycle, 2600)
      })

      /* --- Scroll exit: drift/fade out (no blur) --- */
      gsap.fromTo(
        '.hero-content',
        { yPercent: 0, scale: 1, autoAlpha: 1 },
        {
          yPercent: -18,
          scale: 0.92,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '85% top',
            scrub: 0.4,
          },
        }
      )

      return () => {
        unsubscribe()
        if (intervalId) clearInterval(intervalId)
      }
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      id="site-hero"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* --- Backdrop video (auto-loop) + overlay; still image as poster
          so the frame is never empty while the video buffers --- */}
      <video
        src="https://res.cloudinary.com/rc8wd02c/video/upload/v1784109584/infotech_2nd_video_ejryeb.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/sections/bg-hero-home.png"
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30" />

      <CinematicMask />

      <div className="hero-content relative z-10 mx-auto flex w-[min(94%,80rem)] flex-1 flex-col justify-center pt-32 pb-16">
        <p className="hero-fade mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-fg-2">
          <span className="inline-block size-1.5 rounded-full bg-success shadow-[0_0_12px_2px_rgba(34,197,94,0.5)]" />
          Serving the US · Canada · UK · New Zealand
        </p>

        <h1 className="hero-title font-display text-[clamp(2.9rem,9vw,7.5rem)] font-semibold leading-[0.98] tracking-tight">
          Don&rsquo;t just get interviews.
          <br />
          Get{' '}
          <span className="relative inline-block overflow-hidden align-bottom bg-linear-to-r from-glow via-brand to-brand-hover bg-clip-text text-transparent">
            placed<span className="text-glow">.</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <ScrambleText
            as="p"
            className="max-w-md text-base leading-relaxed text-white/75 md:text-lg"
            delay={1.35}
            scrambleDuration={1.4}
            stagger={0.03}
            useScrollTrigger={false}
            waitForPreloader
          >
            Structured career consulting across four countries: from resume to
            full-time offer, with support after you start.
          </ScrambleText>

          <div className="hero-fade flex flex-wrap items-center gap-4">
            <Button href="/contact">Book a Free Consultation</Button>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-6">
          <div className="hero-line-h h-px flex-1 bg-line" />
          <p className="hero-fade font-display text-sm tracking-[0.2em] text-fg-3">
            <span className="text-fg-2">EVERY</span>&nbsp;CANDIDATE&nbsp;
            <span
              ref={wordRef}
              className="inline-block min-w-[12ch] text-glow"
            >
              {heroWords[0]}
            </span>
          </p>
        </div>
      </div>

      {/* --- Bottom ticker --- */}
      <div className="relative z-10 overflow-hidden border-t border-line-2 bg-ink/60 py-4">
        <div className="marquee-track hero-fade gap-0" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {trustedRoles.map((role) => (
                <span
                  key={`${copy}-${role}`}
                  className="flex items-center gap-6 pr-6 text-sm tracking-[0.15em] text-fg-3 uppercase whitespace-nowrap"
                >
                  {role}
                  <span aria-hidden="true" className="text-fg-3/40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
