'use client'

import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/motion/Magnetic'
import { TransitionLink } from '@/components/ui/TransitionLink'

/**
 * Primary action: magnetic pill with a brand fill that sweeps up on
 * hover and an arrow that jumps corner-to-corner.
 */
export function Button({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
  type,
}: {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const inner = (
    <span
      className={cn(
        'group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500',
        variant === 'primary'
          ? 'bg-brand text-white shadow-[0_0_32px_-8px_rgba(177,78,255,0.65)]'
          : 'border border-line text-fg-2 hover:text-fg',
        className
      )}
    >
      {/* hover fill sweep */}
      <span
        className={cn(
          'absolute inset-0 translate-y-full rounded-full transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0',
          variant === 'primary' ? 'bg-brand-hover' : 'bg-surface'
        )}
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 grid size-4 place-items-center overflow-hidden">
        <ArrowUpRight
          className="col-start-1 row-start-1 size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-5 group-hover:translate-x-5"
        />
        <ArrowUpRight
          className="col-start-1 row-start-1 size-4 -translate-x-5 translate-y-5 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </span>
  )

  return (
    <Magnetic className="inline-block">
      {href ? (
        <TransitionLink href={href} className="inline-block">
          {inner}
        </TransitionLink>
      ) : (
        <button type={type ?? 'button'} onClick={onClick} className="inline-block">
          {inner}
        </button>
      )}
    </Magnetic>
  )
}
