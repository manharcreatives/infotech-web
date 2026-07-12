'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Wraps children and shows a floating preview image that follows
 * the cursor on hover. Used for portfolio items, testimonials, etc.
 * Inspired by awwwards-landing-page + awwwards-portfolio.
 *
 * Usage:
 *   <FloatingPreview src="/images/preview.jpg">
 *     <span>Hover me</span>
 *   </FloatingPreview>
 */
export function FloatingPreview({
  children,
  src,
  className,
  previewClassName,
  size = { width: 280, height: 360 },
}: {
  children: React.ReactNode
  src: string
  className?: string
  previewClassName?: string
  size?: { width: number; height: number }
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const handleMouseEnter = () => {
    setVisible(true)
    if (previewRef.current) {
      gsap.set(previewRef.current, { autoAlpha: 1, scale: 0.92 })
      gsap.to(previewRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }

  const handleMouseLeave = () => {
    setVisible(false)
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    let x = e.clientX + 20
    let y = e.clientY - size.height / 2

    if (x + size.width > window.innerWidth - 20) {
      x = e.clientX - size.width - 20
    }
    if (y < 20) y = 20
    if (y + size.height > window.innerHeight - 20) {
      y = window.innerHeight - size.height - 20
    }

    gsap.to(previewRef.current, {
      x,
      y,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      {visible && (
        <div
          ref={previewRef}
          className={cn(
            'pointer-events-none invisible fixed z-300 overflow-hidden rounded-xl border border-line bg-ink-2 shadow-2xl',
            previewClassName
          )}
          style={{
            width: size.width,
            height: size.height,
          }}
        >
          <img
            src={src}
            alt="Preview"
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
        </div>
      )}
    </div>
  )
}
