'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { setLenis } from '@/lib/scroll'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: true,
    })
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return <>{children}</>
}
