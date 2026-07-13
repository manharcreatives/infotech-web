'use client'

const DONE_EVENT = 'ip:preloader-done'

let pending = false

/** Called by <Preloader> once it decides it's actually going to run its
 *  animation, so components on the same page know to wait for the real
 *  completion event instead of guessing how long it takes. */
export function markPreloaderPending() {
  pending = true
}

/** Called by <Preloader> when it finishes (or is skipped). */
export function markPreloaderDone() {
  pending = false
  window.dispatchEvent(new Event(DONE_EVENT))
}

/**
 * Preloader is never considered "done" via a persisted flag — it runs on
 * every full page load / refresh.  Components that need to wait for it
 * should use `onPreloaderReady()` instead of checking this directly.
 */
export function isPreloaderDone(): boolean {
  return false
}

/**
 * Invokes `callback` as soon as it's safe to reveal page content:
 * - synchronously, if no <Preloader> is mounted on this page (inner pages
 *   via client-side nav), or
 * - once the real completion event fires, if a preloader is currently
 *   running.
 *
 * Returns an unsubscribe function.
 */
export function onPreloaderReady(callback: () => void): () => void {
  if (!pending) {
    callback()
    return () => {}
  }
  const handler = () => callback()
  window.addEventListener(DONE_EVENT, handler, { once: true })
  return () => window.removeEventListener(DONE_EVENT, handler)
}
