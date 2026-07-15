'use client'

import Image from 'next/image'
import { ClipRevealText } from '@/components/motion/ClipRevealText'

/**
 * Employer logo wall — professional, award-worthy presentation.
 * Single row of logos in card-like containers with hover effects.
 * Clean, minimal design that reads as a trust badge section.
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

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="group/logo relative flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-line/60 bg-surface/30 px-6 py-5 backdrop-blur-sm transition-all duration-500 hover:border-glow/40 hover:bg-surface/60 hover:shadow-[0_8px_32px_-8px_rgba(177,78,255,0.2)]"
      title={name}
    >
      {/* white coin keeps true brand colors legible on the dark theme */}
      <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-2 shadow-sm transition-transform duration-500 group-hover/logo:scale-110">
        <Image
          src={`/images/employers/${logo}.png`}
          alt={`${name} logo`}
          width={48}
          height={48}
          unoptimized
          className="max-h-full max-w-full object-contain"
        />
      </span>
      <span className="text-xs font-medium tracking-wide text-fg-3 transition-colors duration-300 group-hover/logo:text-fg-2">
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
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className={`marquee-track items-center ${reverse ? 'reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-4" aria-hidden={copy === 1}>
            {items.map((emp) => (
              <LogoCard key={`${copy}-${emp.logo}`} name={emp.name} logo={emp.logo} />
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
          Placement network
        </ClipRevealText>
        <ClipRevealText
          as="h2"
          className="block font-display text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Companies where our candidates have been placed.
        </ClipRevealText>
      </div>

      <div className="relative" aria-label="Employer placement network">
        <MarqueeRow items={employerData} />
      </div>
    </section>
  )
}
