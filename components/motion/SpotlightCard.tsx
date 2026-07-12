'use client'

import { useRef, type ReactNode, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Card whose brand spotlight + border glow track the cursor,
 * plus a subtle 3D perspective tilt (±6°) that follows the pointer.
 */
export function SpotlightCard({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const targetRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const px = (e.clientX - cx) / (rect.width / 2)
    const py = (e.clientY - cy) / (rect.height / 2)

    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)

    const el = targetRef.current
    if (el) {
      el.style.transform = `rotateX(${py * 6}deg) rotateY(${px * -6}deg)`
    }
  }

  const onLeave = () => {
    const el = targetRef.current
    if (el) {
      el.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          perspective: '800px',
          ...style,
        } as CSSProperties
      }
      className={cn(
        'spotlight-card rounded-2xl border border-line bg-surface/60',
        className
      )}
    >
      <div
        ref={targetRef}
        className="tilt-target size-full transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  )
}
