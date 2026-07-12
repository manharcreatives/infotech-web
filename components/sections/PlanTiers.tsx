'use client'

import { useRef } from 'react'
import { Check, ShieldCheck, Sparkles } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'

/**
 * The three enrollment plans as a tiered stage: the Advance plan is
 * physically elevated with a gradient keyline, glow and "Most Popular"
 * seal; Basic and Premium flank it. Premium's three guarantee items sit
 * behind their own divider with shield marks — they're the reason the
 * plan exists, so they read as a vault, not three more bullets.
 * Client-supplied tiers (July 2026) — copy verbatim.
 */

interface Plan {
  name: string
  price: string
  payment: string
  features: string[]
  guarantees?: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: 'Basic Plan',
    price: '$2,000',
    payment: 'Upfront + 11% of annual package (1st year)',
    features: [
      'Resume Preparation',
      'Resume Understanding Session (1:1)',
      '8 Months of Marketing',
      'Dedicated Recruiter',
    ],
  },
  {
    name: 'Advance Plan',
    price: '$2,600',
    payment: 'Upfront + 10% of annual package (1st year)',
    featured: true,
    features: [
      'Resume Preparation',
      'Resume Understanding Session (1:1)',
      '8 Months of Marketing',
      'Dedicated Recruiter',
      'Technical Training',
      'TQC Session',
      'JDC Session',
      'Assessment Support in Coding',
      'Interview Support Until Placement',
    ],
  },
  {
    name: 'Premium Plan',
    price: '$3,600',
    payment: 'Upfront + 9% of annual package (1st year)',
    features: [
      'Resume Preparation',
      'Resume Understanding Session (1:1)',
      '8 Months of Marketing',
      'Dedicated Recruiter',
      'Technical Training',
      'TQC Session',
      'JDC Session',
      'Assessment Support in Coding',
      'Interview Support Until Placement',
    ],
    guarantees: [
      'Money-Back Guarantee',
      '120 Working Days Job Guarantee',
      'Flat 60% Refund on Upfront Amount',
    ],
  },
]

function CornerTicks() {
  return (
    <>
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} font-mono text-[10px] leading-none text-line select-none`}
        >
          +
        </span>
      ))}
    </>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  const inner = (
    <div
      className={`relative flex h-full flex-col overflow-hidden p-8 md:p-10 ${
        plan.featured ? 'rounded-[calc(1.5rem-1px)]' : 'rounded-3xl border border-line bg-surface/40'
      }`}
      style={
        plan.featured
          ? { background: 'linear-gradient(160deg, #2B1743 0%, #1C0F30 55%, #241036 100%)' }
          : undefined
      }
    >
      {!plan.featured && <CornerTicks />}
      {plan.featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-64 rounded-full bg-brand/20 blur-3xl"
        />
      )}

      <div className="relative">
        <p
          className={`text-xs uppercase tracking-[0.3em] ${
            plan.featured ? 'text-glow' : 'text-fg-3'
          }`}
        >
          {plan.name}
        </p>

        <p
          className={`mt-5 font-display text-5xl font-bold leading-none tracking-tight md:text-6xl ${
            plan.featured ? 'text-gradient-brand drop-shadow-[0_0_28px_rgba(213,108,255,0.35)]' : ''
          }`}
        >
          {plan.price}
        </p>

        <p className="mt-5 inline-block rounded-lg border border-dashed border-line px-3.5 py-2 text-xs leading-relaxed text-fg-3">
          Payment: {plan.payment}
        </p>
      </div>

      <ul className="relative mt-8 flex-1 space-y-3 border-t border-line-2 pt-7">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-fg-2">
            <Check className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-glow' : 'text-brand'}`} />
            {f}
          </li>
        ))}

        {plan.guarantees && (
          <li className="pt-3" aria-hidden="true">
            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-glow">
              <span className="h-px flex-1 bg-gradient-to-r from-glow/50 to-transparent" />
              Guarantees
            </span>
          </li>
        )}
        {plan.guarantees?.map((g) => (
          <li key={g} className="flex items-start gap-3 text-sm font-medium text-fg">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-glow" />
            {g}
          </li>
        ))}
      </ul>

      <div className="relative mt-9 flex justify-center">
        <Button href="/contact" variant={plan.featured ? 'primary' : 'ghost'}>
          Book a Free Consultation
        </Button>
      </div>
    </div>
  )

  if (plan.featured) {
    return (
      <div className="plan-card relative md:-my-6">
        {/* most-popular seal */}
        <span className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-glow/40 bg-ink px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-glow shadow-[0_0_24px_-4px_rgba(255,141,235,0.5)]">
          <Sparkles className="size-3" />
          Most Popular
        </span>
        <div className="h-full rounded-3xl bg-gradient-to-b from-brand/70 via-glow/35 to-deep/70 p-px shadow-[0_30px_90px_-20px_rgba(177,78,255,0.45)]">
          {inner}
        </div>
      </div>
    )
  }

  return <div className="plan-card h-full">{inner}</div>
}

export function PlanTiers() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.plan-card').forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          autoAlpha: 0,
          duration: 1.1,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
      {/* ambient stage light behind the featured tier */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55rem 30rem at 50% 30%, rgb(177 78 255 / 0.10), transparent 65%)',
        }}
      />

      <div className="relative mx-auto w-[min(94%,80rem)]">
        <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-5 md:py-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="mt-14 text-center text-xs leading-relaxed text-fg-3">
          All prices in USD. Payment structure and full terms are confirmed
          in writing before you enroll — complete transparency is the rule.
        </p>
      </div>
    </section>
  )
}
