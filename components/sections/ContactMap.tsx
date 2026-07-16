'use client'

import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'
import { site } from '@/content/site'

const OfficeMap = dynamic(() => import('@/components/sections/OfficeMap').then((m) => m.OfficeMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-72 items-center justify-center bg-ink">
      <div className="text-sm text-fg-3">Loading map...</div>
    </div>
  ),
})

/**
 * Half-screen map section (SRS §5.5.3 / Phase 3 §4.5).
 * Now displays the confirmed office location with an interactive
 * OpenStreetMap via Leaflet.
 */
export function ContactMap() {
  return (
    <section className="border-t border-line-2 bg-ink">
      <div className="mx-auto grid w-[min(94%,80rem)] items-stretch md:grid-cols-2" style={{ minHeight: '50vh' }}>
        {/* Left: contact details on Carbon surface */}
        <div className="flex flex-col justify-center gap-6 bg-ink-2 p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.35em] text-fg-3">( Find us )</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Four time zones.
            <br />
            One team.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-fg-3">
            Our team operates across four time zones to support candidates in
            the USA, Canada, the UK and New Zealand — whenever you reach out,
            someone is working.
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="link-sweep text-fg-2 hover:text-fg"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep text-fg-2 hover:text-fg"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-fg-3">Available 24/7</li>
          </ul>

          {/* Office address */}
          <div className="mt-4 rounded-xl border border-line/60 bg-surface/30 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-ink/40">
                <MapPin className="size-4 text-brand" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-fg-3">Office Address</p>
                <p className="mt-1 text-sm font-medium text-fg-2">{site.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive map */}
        <div className="relative min-h-[288px] border-t border-line-2 md:border-l md:border-t-0" style={{ height: '100%' }}>
          <OfficeMap
            lat={site.coordinates.lat}
            lng={site.coordinates.lng}
            address={site.address}
            name={site.name}
          />
        </div>
      </div>
    </section>
  )
}
