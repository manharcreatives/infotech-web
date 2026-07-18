'use client'

import { useRef } from 'react'
import { Check, X, ShieldCheck, Sparkles, MapPin } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'

/**
 * Canada enrollment plans — Professional and Elite tiers.
 *
 * Every card shows the full feature matrix with ✓ (included) / ✗ (not
 * included) per tier, verbatim from the client's Canada Plans sheet
 * (July 2026).
 */

/** Master feature order — shared across both tiers so the ✓/✗ columns
 *  always line up by index. */
const FEATURES = [
  'Resume Preparation',
  'Resume Understanding Session (1:1)',
  'Dedicated Recruiter',
  'Technical Training',
  'TOC Session',
  'JDC Session',
  'LinkedIn Optimization',
  'Resume Promotion Service',
  'Email Correspondence Assistance',
]

const GUARANTEES = [
  'Money-Back Guarantee',
  '120 Working Days Job Guarantee',
  'Flat 60% Refund on Upfront Amount',
]

interface Plan {
  name: string
  price: string
  payment: string
  /** Inclusion flags, index-aligned to FEATURES. */
  features: boolean[]
  /** Inclusion flags, index-aligned to GUARANTEES. */
  guarantees: boolean[]
  featured?: boolean
  badge?: string
}

const T = true
const F = false

const canadaPlans: Plan[] = [
  {
    name: 'Professional',
    price: '$1,499',
    payment: 'Upfront + 11% of annual package (1st year)',
    badge: 'Best for Smart Start',
    features: [T, T, T, T, T, T, T, T, T],
    guarantees: [F, F, F],
  },
  {
    name: 'Elite',
    price: '$2,499',
    payment: 'Upfront + 9% of annual package (1st year)',
    featured: true,
    badge: 'Best for Maximum Results',
    features: [T, T, T, T, T, T, T, T, T],
    guarantees: [T, T, T],
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

/** One feature/guarantee row: ✓ when included, ✗ (dimmed) when not. */
function PlanRow({
  label,
  included,
  featured,
  guarantee,
}: {
  label: string
  included: boolean
  featured?: boolean
  guarantee?: boolean
}) {
  if (!included) {
    return (
      <li className="flex items-start gap-3 text-sm text-fg-3/55">
        <X className="mt-0.5 size-4 shrink-0 text-fg-3/45" aria-hidden="true" />
        <span>{label}</span>
        <span className="sr-only">— not included</span>
      </li>
    )
  }
  const Icon = guarantee ? ShieldCheck : Check
  return (
    <li
      className={`flex items-start gap-3 text-sm ${
        guarantee ? 'font-medium text-fg' : 'text-fg-2'
      }`}
    >
      <Icon
        className={`mt-0.5 size-4 shrink-0 ${
          guarantee || featured ? 'text-glow' : 'text-brand'
        }`}
        aria-hidden="true"
      />
      <span>{label}</span>
      <span className="sr-only">— included</span>
    </li>
  )
}

function CanadaPlanCard({ plan }: { plan: Plan }) {
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
        {plan.badge && (
          <p className={`mb-3 text-xs font-medium uppercase tracking-widest ${
            plan.featured ? 'text-glow' : 'text-brand'
          }`}>
            {plan.badge}
          </p>
        )}
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
        {FEATURES.map((label, i) => (
          <PlanRow key={label} label={label} included={plan.features[i]} featured={plan.featured} />
        ))}

        <li className="pt-3" aria-hidden="true">
          <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-glow">
            <span className="h-px flex-1 bg-gradient-to-r from-glow/50 to-transparent" />
            Guarantees
          </span>
        </li>
        {GUARANTEES.map((label, i) => (
          <PlanRow key={label} label={label} included={plan.guarantees[i]} guarantee />
        ))}
      </ul>

      <div className="relative mt-9 flex justify-center">
        <Button href="/contact" variant={plan.featured ? 'primary' : 'ghost'}>
          Choose {plan.name}
        </Button>
      </div>
    </div>
  )

  if (plan.featured) {
    return (
      <div className="plan-card relative md:-my-6">
        <span className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-glow/40 bg-ink px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-glow shadow-[0_0_24px_-4px_rgba(255,141,235,0.5)]">
          <Sparkles className="size-3" />
          Most Popular
        </span>
        {/* Animated glow ring */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-b from-brand/60 via-glow/40 to-deep/60 opacity-75 blur-sm animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="h-full rounded-3xl bg-gradient-to-b from-brand/70 via-glow/35 to-deep/70 p-px shadow-[0_30px_90px_-20px_rgba(177,78,255,0.45)] hover:shadow-[0_30px_120px_-20px_rgba(255,141,235,0.6)] transition-shadow duration-500">
          {inner}
        </div>
      </div>
    )
  }

  return <div className="plan-card h-full">{inner}</div>
}

export function CanadaPlanTiers() {
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
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 md:py-36">
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
        {/* Gradient divider */}
        <div className="mb-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          <div className="flex items-center gap-3 rounded-full border border-line bg-surface/50 px-5 py-2.5 backdrop-blur-sm">
            <span className="text-2xl">🇨🇦</span>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-fg-2">
              Canada Program
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        </div>

        {/* Summary banner */}
        <div className="mb-14 rounded-2xl border border-line/60 bg-surface/30 p-8 backdrop-blur-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                The Right Connection Changes Everything
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg-2">
                Trusted Placement Partner — 120 Working Days Job Guarantee. Get placed faster with expert recruiter support.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-6">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-glow">60%</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-fg-3">Refund</p>
              </div>
              <div className="h-12 w-px bg-line-2" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-glow">120</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-fg-3">Days</p>
              </div>
              <div className="h-12 w-px bg-line-2" />
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-glow">1:1</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-fg-3">Sessions</p>
              </div>
              <div className="h-12 w-px bg-line-2" />
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <MapPin className="size-4 text-glow" />
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-fg-3">Dedicated</p>
              </div>
            </div>
          </div>

          {/* Feature tags */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-line-2 pt-6">
            {FEATURES.map((f) => (
              <span key={f} className="rounded-full border border-line bg-ink/40 px-3 py-1 text-[11px] text-fg-3">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="mx-auto grid items-stretch gap-6 md:grid-cols-2 md:gap-5 md:py-6 md:max-w-4xl">
          {canadaPlans.map((plan) => (
            <CanadaPlanCard key={plan.name} plan={plan} />
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
