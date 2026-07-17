'use client'

import { useEffect } from 'react'

/**
 * Globally adds `.sr-visible` to every element carrying a scroll-reveal
 * class once it enters the viewport. Works on all pages — no per-section
 * setup needed. Just add `sr-fade-up`, `sr-fade-left`, or `sr-fade-right`
 * to any element and it will animate in when scrolled to.
 *
 * Respects `prefers-reduced-motion`: skips observation and leaves elements
 * visible when the user has requested reduced motion.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll<HTMLElement>('.sr-fade-up,.sr-fade-left,.sr-fade-right').forEach((el) => {
        el.classList.add('sr-visible')
      })
      return
    }

    const selector = '.sr-fade-up, .sr-fade-left, .sr-fade-right'

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!el.classList.contains('sr-visible')) {
          io.observe(el)
        }
      })
    }

    observe()

    // Re-observe after dynamic content loads (route changes in Next.js)
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
