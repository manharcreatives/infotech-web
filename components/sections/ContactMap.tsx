import { MapPin } from 'lucide-react'
import { site } from '@/content/site'

/**
 * Half-screen map section (SRS §5.5.3 / Phase 3 §4.5).
 *
 * [PENDING: SRS B-7] The office address is not yet confirmed, so the
 * right half renders an on-brand placeholder panel instead of a wrong
 * address. When the client confirms the address, replace the placeholder
 * <div> below with a single Google Maps <iframe> embed (structure is
 * ready for a one-line swap).
 */
export function ContactMap() {
  return (
    <section className="border-t border-line-2 bg-ink">
      <div className="mx-auto grid w-[min(94%,80rem)] md:min-h-[50vh] md:grid-cols-2">
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
        </div>

        {/* Right: map slot — swap this div for the Google Maps iframe
            once the client confirms the office address (B-7) */}
        <div className="relative min-h-72 overflow-hidden border-t border-line-2 md:border-l md:border-t-0">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_80%)]" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
            <span className="grid size-12 place-items-center rounded-full border border-line bg-surface/60">
              <MapPin className="size-5 text-brand" />
            </span>
            <p className="font-display text-lg font-medium tracking-tight text-fg-2">
              Our office location will be displayed here.
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-fg-3">
              Until then, we&rsquo;re one email away — around the clock.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
