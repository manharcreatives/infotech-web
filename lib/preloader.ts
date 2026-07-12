'use client'

const DONE_EVENT = 'ip:preloader-done'
const STORAGE_KEY = 'ip-preloaded'

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
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(DONE_EVENT))
}

export function isPreloaderDone(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Invokes `callback` as soon as it's safe to reveal page content:
 * - synchronously, if the preloader already finished or never applies
 *   to this page (no <Preloader> mounted here), or
 * - once the real completion event fires, if it's currently pending.
 *
 * Returns an unsubscribe function.
 */
export function onPreloaderReady(callback: () => void): () => void {
  if (isPreloaderDone() || !pending) {
    callback()
    return () => {}
  }
  const handler = () => callback()
  window.addEventListener(DONE_EVENT, handler, { once: true })
  return () => window.removeEventListener(DONE_EVENT, handler)
}
