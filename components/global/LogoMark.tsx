import { LOGO_MARK_INNER } from '@/lib/logoMarkSvg'

/**
 * Inline ITP logo mark, generated from `public/logo.svg`.
 *
 * Each of the 11 dimensional faces is wrapped in a `<g class="lm-face …">`
 * carrying its convergence choreography (`data-order`, `data-fx`, `data-fy`,
 * `data-fs`) so the preloader can animate every face independently while the
 * SVG stays a single, perfectly-aligned artwork (shared viewBox, no
 * rasterisation). The wordmark lives in `<g class="lm-wordmark">`.
 *
 * The markup is injected verbatim (SVG namespace, gradient defs intact) so no
 * brand geometry is reconstructed by hand. This component is intentionally
 * server-safe — only the <Preloader> that consumes it is a Client Component.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 3000 3000"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: LOGO_MARK_INNER }}
    />
  )
}
