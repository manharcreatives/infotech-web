'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackScrollDepth } from './events'
import type { ScrollDepth } from '@/types/analytics'

const DEPTHS: ScrollDepth[] = [25, 50, 75, 100]

export function AnalyticsTracker() {
  const pathname = usePathname()
  const firedDepths = useRef<Set<ScrollDepth>>(new Set())

  useEffect(() => {
    trackPageView(pathname)
    firedDepths.current = new Set()
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const pct = (window.scrollY / scrollHeight) * 100

      for (const depth of DEPTHS) {
        if (pct >= depth && !firedDepths.current.has(depth)) {
          firedDepths.current.add(depth)
          trackScrollDepth(depth)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
