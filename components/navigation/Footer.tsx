'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { site, footerLinks } from '@/content/site'
import { getLenis } from '@/lib/scroll'
import { Magnetic } from '@/components/motion/Magnetic'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { ArrowUp } from 'lucide-react'

/**
 * Mega footer: link columns over a giant clipped wordmark that
 * parallax-rises as the footer scrolls into view.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      /* End at 'top 60%' (not 'bottom bottom') — the absolute page bottom
         is not reliably reachable on short pages like /contact, which left
         the wordmark stuck mid-rise and visually cut. This end point is
         crossed well before max scroll on every page. */
      gsap.fromTo(
        '.footer-wordmark',
        { yPercent: 35 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'top 60%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      )
    },
    { scope: ref }
  )

  const scrollTop = () => getLenis()?.scrollTo(0, { duration: 1.6 })

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line-2 bg-ink-2">

      <div className="relative z-10 mx-auto w-[min(94%,80rem)] pt-20">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              InfoTech<span className="text-glow">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-3">
              {site.description}
            </p>
          </div>

          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Services" links={footerLinks.services} />

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-fg-3">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="link-sweep text-fg-2 hover:text-fg">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep text-fg-2 hover:text-fg"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-fg-3">Available 24/7</li>
              <li className="text-fg-3">US · Canada · UK · New Zealand</li>
            </ul>
            <Magnetic className="mt-8 inline-block">
              <button
                onClick={scrollTop}
                aria-label="Back to top"
                className="group flex size-12 items-center justify-center rounded-full border border-line transition-colors duration-300 hover:border-glow hover:bg-brand/10"
              >
                <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-1" />
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line-2 py-6 text-xs text-fg-3 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((l) => (
              <TransitionLink key={l.href} href={l.href} className="link-sweep hover:text-fg-2">
                {l.label}
              </TransitionLink>
            ))}
          </div>
          <p>{site.tagline}</p>
        </div>
      </div>

      {/* Giant wordmark — fully visible at rest (client asked for no
          bottom crop), still parallax-rising as the footer scrolls in */}
      <div aria-hidden="true" className="relative flex justify-center overflow-hidden pb-2 select-none">
        <span className="footer-wordmark bg-gradient-to-b from-line to-transparent bg-clip-text font-display text-[17.5vw] font-bold leading-none tracking-tighter text-transparent">
          INFOTECH
        </span>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-fg-3">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            {/* TransitionLink so footer-only pages (refer, talent, blog…)
                open with the same circle transition as navbar links —
                plain <Link> skipped the overlay and CinematicMask's
                fallback bubble read as a glitch */}
            <TransitionLink href={l.href} className="link-sweep text-fg-2 hover:text-fg">
              {l.label}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
