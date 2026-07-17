'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { getLenis } from '@/lib/scroll'
import { cn } from '@/lib/utils'
import { navLinks, site } from '@/content/site'
import { Magnetic } from '@/components/motion/Magnetic'
import { TransitionLink } from '@/components/ui/TransitionLink'
import { ArrowUpRight } from 'lucide-react'

/**
 * Floating glass pill. Slides away on scroll-down, returns on scroll-up.
 * Desktop: active glow indicator, logo hover effect.
 * Mobile: fullscreen overlay with staggered clip-reveal links + preview.
 */
export function Navbar() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return
    const handleMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(logo, {
        rotateX: y * -8,
        rotateY: x * 8,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    const handleLeave = () => {
      gsap.to(logo, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' })
    }
    logo.addEventListener('mousemove', handleMove)
    logo.addEventListener('mouseleave', handleLeave)
    return () => {
      logo.removeEventListener('mousemove', handleMove)
      logo.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-5 z-100 mx-auto flex w-[min(96%,78rem)] items-center justify-between px-2 [perspective:800px]"
      >
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-full px-5 py-4 transition-all duration-500',
            scrolled ? 'glass shadow-[0_16px_48px_-16px_rgba(0,0,0,0.7)]' : ''
          )}
        >
          <div ref={logoRef} className="[transform-style:preserve-3d]">
            <TransitionLink
              href="/"
              className="relative block h-14 w-[168px]"
              aria-label="InfoTech Placement LLC — home"
            >
              {/* Dark surface (top of page / over hero video) → white-font logo */}
              <Image
                src="/images/Horizontal_Primary DarkBG_ITP_Logo.png"
                alt="InfoTech Placement LLC"
                width={180}
                height={60}
                className={cn(
                  'absolute inset-0 h-14 w-auto transition-opacity duration-500',
                  scrolled ? 'opacity-0' : 'opacity-100'
                )}
                priority
              />
              {/* Glass / light navbar section visible → black-font logo */}
              <Image
                src="/images/Horizontal_Primary LightBG_ITP_Logo.png"
                alt=""
                aria-hidden="true"
                width={180}
                height={60}
                className={cn(
                  'absolute inset-0 h-14 w-auto transition-opacity duration-500',
                  scrolled ? 'opacity-100' : 'opacity-0'
                )}
              />
            </TransitionLink>
          </div>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <TransitionLink
                  href={link.href}
                  className={cn(
                    'link-sweep text-sm font-medium tracking-wide transition-colors duration-300',
                    pathname === link.href
                      ? scrolled ? 'text-ink' : 'text-fg'
                      : scrolled ? 'text-ink-2/70 hover:text-ink' : 'text-fg-2 hover:text-fg'
                  )}
                >
                  {link.label}
                </TransitionLink>
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-glow shadow-[0_0_8px_2px_rgba(255,141,235,0.5)]" />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <TransitionLink
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand-hover"
              >
                Book a Consultation
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </TransitionLink>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-120 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={cn(
                'h-px w-6 bg-fg transition-all duration-400',
                scrolled && 'bg-ink',
                open && 'translate-y-[3.5px] rotate-45'
              )}
            />
            <span
              className={cn(
                'h-px w-6 bg-fg transition-all duration-400',
                scrolled && 'bg-ink',
                open && '-translate-y-[3.5px] -rotate-45'
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-110 flex flex-col justify-end bg-ink/95 backdrop-blur-2xl transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] md:hidden',
          open
            ? '[clip-path:inset(0_0_0%_0)]'
            : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        )}
      >
        <div className="flex flex-1 items-end">
          {/* Preview panel — right side on wider mobile screens */}
          <div className="hidden w-1/3 p-8 sm:block">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-line/50 bg-gradient-to-b from-brand/5 to-glow/5">
              <div className="flex h-full items-center justify-center p-8 text-center">
                <p className="text-xs leading-relaxed text-fg-3">
                  We get you<br />in the room.
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 px-8 pb-10 sm:w-2/3" aria-label="Mobile">
            {[{ label: 'Home', href: '/' }, ...navLinks].map(
              (link, i) => (
                <div
                  key={link.href}
                  className="overflow-hidden"
                  style={{ '--link-delay': open ? `${150 + i * 60}ms` : '0ms' } as React.CSSProperties}
                >
                  <TransitionLink
                    href={link.href}
                    className={cn(
                      'block font-display text-4xl font-medium tracking-tight transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                      pathname === link.href ? 'text-glow' : 'text-fg',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
                      '[transition-delay:var(--link-delay,0ms)]'
                    )}
                  >
                    {link.label}
                  </TransitionLink>
                </div>
              )
            )}
            <p
              className={cn(
                'mt-8 text-sm text-fg-3 transition-opacity duration-700',
                open ? 'opacity-100 delay-700' : 'opacity-0'
              )}
            >
              {site.email}
            </p>
          </nav>
        </div>
      </div>
    </>
  )
}
