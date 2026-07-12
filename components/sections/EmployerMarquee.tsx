'use client'

import { ClipRevealText } from '@/components/motion/ClipRevealText'

/**
 * Employer logo wall. Logos are real brand marks served locally from
 * /public/images/employers (downloaded once — no third-party requests
 * at runtime, no broken-image states). Each mark sits on a white coin
 * so true brand colors read correctly on the dark theme — including
 * dark wordmarks like Berkshire Hathaway and Fannie Mae.
 */

const employerData = [
  { name: 'Amazon', logo: 'amazon' },
  { name: 'Meta', logo: 'meta' },
  { name: 'JPMorgan Chase', logo: 'jpmorgan' },
  { name: 'IBM', logo: 'ibm' },
  { name: 'Oracle', logo: 'oracle' },
  { name: 'Toyota', logo: 'toyota' },
  { name: 'UnitedHealth Group', logo: 'unitedhealth' },
  { name: 'CVS Health', logo: 'cvs' },
  { name: 'Berkshire Hathaway', logo: 'berkshire' },
  { name: 'McKesson', logo: 'mckesson' },
  { name: 'Costco', logo: 'costco' },
  { name: 'The Cigna Group', logo: 'cigna' },
  { name: 'Elevance Health', logo: 'elevance' },
  { name: 'The Home Depot', logo: 'homedepot' },
  { name: 'Fannie Mae', logo: 'fanniemae' },
  { name: 'Walt Disney', logo: 'disney' },
  { name: 'Wells Fargo', logo: 'wellsfargo' },
  { name: 'Morgan Stanley', logo: 'morganstanley' },
  { name: 'UPS', logo: 'ups' },
  { name: 'FedEx', logo: 'fedex' },
  { name: 'Red Bull', logo: 'redbull' },
]

/* split into two rows so the band reads as a wall of logos */
const rowA = employerData.filter((_, i) => i % 2 === 0)
const rowB = employerData.filter((_, i) => i % 2 === 1)

function LogoPill({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="group/logo mr-4 flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface/40 py-2 pr-5 pl-2 whitespace-nowrap backdrop-blur-sm transition-colors duration-300 hover:border-glow/40 hover:bg-surface/70"
      title={name}
    >
      {/* white coin keeps true brand colors legible on the dark theme */}
      <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5">
        <img
          src={`/images/employers/${logo}.png`}
          alt={`${name} logo`}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </span>
      <span className="text-sm font-medium tracking-tight text-fg-2 transition-colors duration-300 group-hover/logo:text-fg">
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof employerData
  reverse?: boolean
}) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className={`marquee-track items-center ${reverse ? 'reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((emp) => (
              <LogoPill key={`${copy}-${emp.logo}`} name={emp.name} logo={emp.logo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function EmployerMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-line-2 bg-ink py-16 md:py-20">
      {/* faint ambient glow behind the logo wall */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50rem 20rem at 50% 50%, rgb(111 40 185 / 0.10), transparent 65%)',
        }}
      />

      <div className="relative mx-auto mb-10 w-[min(94%,80rem)]">
        <ClipRevealText as="p" className="mb-3 block text-xs uppercase tracking-[0.35em] text-fg-3">
          ( Placement network )
        </ClipRevealText>
        <ClipRevealText
          as="h2"
          className="block font-display text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Companies where our candidates have been placed.
        </ClipRevealText>
      </div>

      <div className="relative space-y-4" aria-label="Employer placement network">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  )
}
