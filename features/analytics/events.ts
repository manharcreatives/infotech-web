import type { FormName, CTALocation, ScrollDepth } from '@/types/analytics'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type DataLayerEvent = Record<string, unknown>

function pushEvent(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(event)
}

export function trackFormSubmit(formName: FormName): void {
  pushEvent({ event: 'form_submit', form_name: formName })
}

export function trackCTAClick(label: string, location?: CTALocation | string): void {
  pushEvent({ event: 'cta_click', cta_label: label, cta_location: location ?? 'unknown' })
}

export function trackScrollDepth(depth: ScrollDepth): void {
  pushEvent({ event: 'scroll_depth', depth })
}

export function trackPageView(path: string): void {
  pushEvent({ event: 'page_view', page_path: path })
}

export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return
  const value = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
  })
  pushEvent({ event: 'consent_update', analytics_consent: value })
}
