'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { site } from '@/content/site'

/**
 * WhatsApp floating action button — bottom-right corner.
 * Hidden while the page's hero (#site-hero) is in view on every page —
 * it would otherwise sit on top of hero content/CTAs — and fades in once
 * the visitor scrolls past it. Includes pulse ring animation, tooltip on
 * hover, and iOS Safari safe positioning.
 */
export function WhatsAppFloat() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const phone = site.phone.replace(/\s/g, '').replace('+', '')
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hi, I would like to know more about InfoTech Placement.')}`

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const hero = document.getElementById('site-hero')
    if (!hero) {
      setVisible(true)
      return
    }

    setVisible(false)
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [pathname])

  if (!mounted || !visible) return null

  return (
    <div className="floating-safe-bottom fixed right-4 z-[100] flex flex-col items-end gap-3 sm:right-6">
      {/* Desktop tooltip */}
      <span className="pointer-events-none hidden rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-lg sm:block opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        Chat on WhatsApp
      </span>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="size-7 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.25l6.078-1.958A15.93 15.93 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.318 22.608c-.39 1.1-1.932 2.014-3.168 2.28-.84.18-1.938.322-5.626-1.206-4.72-1.96-7.754-6.764-7.988-7.076-.226-.312-1.862-2.484-1.862-4.738s1.176-3.36 1.594-3.816c.39-.426.924-.57 1.232-.57h.896c.284 0 .672-.108 1.048.81.39.946 1.314 3.21 1.428 3.44.114.228.19.492.038.784-.152.312-.228.504-.44.784-.214.28-.426.618-.61.834-.19.228-.39.472-.162.912s.998 1.662 2.138 2.696c1.468 1.334 2.682 1.76 3.084 1.946.39.186.618.152.846-.092.228-.244.972-1.136 1.232-1.532.262-.396.524-.33.896-.198.374.132 2.352 1.106 2.756 1.308.404.202.674.304.774.474.1.17.1 1.004-.292 2.104z" />
        </svg>
      </a>
    </div>
  )
}
