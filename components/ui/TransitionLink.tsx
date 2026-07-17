'use client'

import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react'
import { usePageTransition } from '@/components/global/PageTransitionProvider'

/**
 * Drop-in replacement for `<a>` / Next.js `<Link>` that triggers the
 * cinematic page-flip overlay on click.
 */
export function TransitionLink({
  href,
  children,
  className,
  style,
}: {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { navigate } = usePageTransition()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    // Same-page: let the browser handle it (no black overlay)
    if (href === window.location.pathname) return
    e.preventDefault()
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: 0,
      height: 0,
    }
    navigate(href, rect)
  }

  return (
    <a ref={ref} href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  )
}
