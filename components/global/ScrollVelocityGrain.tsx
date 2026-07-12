'use client'

import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { getLenis } from '@/lib/scroll'

/**
 * Listens to Lenis scroll velocity and cranks the grain opacity up when
 * the user scrolls fast — fades back to the baseline 0.035 when still.
 */
export function ScrollVelocityGrain() {
  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return

    const root = document.documentElement
    let current = 0.035

    const onScroll = ({ velocity }: { velocity: number }) => {
      const speed = Math.abs(velocity)
      const target = 0.035 + Math.min(speed * 0.08, 0.25)
      current += (target - current) * 0.12
      root.style.setProperty('--grain-opacity', String(current))
    }

    lenis.on('scroll', onScroll)

    return () => {
      lenis.off('scroll', onScroll)
      root.style.setProperty('--grain-opacity', '0.035')
    }
  }, [])

  return null
}
