'use client'

/**
 * Whether an in-app <TransitionLink> navigation is currently in flight
 * (overlay covering the viewport, route content swapping underneath).
 * Read synchronously by components that must not double up on the
 * overlay's own reveal animation (Preloader, CinematicMask).
 */
let active = false

export function setPageTransitionActive(value: boolean) {
  active = value
}

export function isPageTransitionActive(): boolean {
  return active
}
