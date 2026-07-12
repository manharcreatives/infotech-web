'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'sending' | 'sent'

/**
 * Candidate lead-capture form per SRS §5.5.2:
 * Full Name, Email Address, Phone Number, Target Job Title,
 * Brief Description, Submit.
 *
 * Editorial "form ledger" styling: numbered rows, micro-labels, and a
 * gradient underline that sweeps in on focus — same blueprint language
 * (corner ticks, keyline, ambient orb) as the rest of the site.
 *
 * Employers are routed via the direct-email line below the form
 * (deliberately not a second full form; see docs/SITE_COMPLETION_REPORT.md).
 *
 * TODO (integration, SRS §6.3): POST to /api/contact → business email
 * notification + Google Sheets row + anti-spam. Blocked on client's
 * business email (SRS B-7).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 900))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="glass flex min-h-80 flex-col items-center justify-center rounded-2xl p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-success/15 text-2xl">
          ✓
        </span>
        <p className="mt-6 font-display text-2xl font-semibold tracking-tight">
          Message received.
        </p>
        <p className="mt-2 max-w-xs text-sm text-fg-3">
          We operate 24/7. A consultant will get back to you shortly,
          whatever the hour.
        </p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/30 p-8 backdrop-blur-sm md:p-12">
      {/* blueprint corner ticks + gradient keyline + ambient orb */}
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} font-mono text-[10px] leading-none text-line select-none`}
        >
          +
        </span>
      ))}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-fg-3">
            Start the conversation
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[10px] uppercase tracking-[0.25em] text-fg-3">
            <span className="inline-block size-1.5 rounded-full bg-success shadow-[0_0_10px_2px_rgba(34,197,94,0.5)]" />
            24/7
          </span>
        </div>

        <form onSubmit={onSubmit} className="space-y-9">
          <Field index="01" label="Full name" name="name" type="text" required />
          <div className="grid gap-9 sm:grid-cols-2">
            <Field index="02" label="Email address" name="email" type="email" required />
            <Field index="03" label="Phone number" name="phone" type="tel" required />
          </div>
          <Field index="04" label="Target job title" name="targetRole" type="text" />

          <div className="group relative grid grid-cols-[2.75rem_1fr] items-start gap-3">
            <span className="text-stroke pt-5 font-display text-lg font-bold">05</span>
            <div className="relative">
              <label
                htmlFor="message"
                className="block text-[10px] uppercase tracking-[0.25em] text-fg-3 transition-colors duration-300 group-focus-within:text-glow"
              >
                Briefly describe what you&rsquo;re looking for *
              </label>
              <textarea
                name="message"
                id="message"
                rows={3}
                required
                className="w-full resize-none border-b border-line bg-transparent pt-2 pb-3 text-base text-fg outline-none md:text-lg"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-glow to-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit">
              {status === 'sending' ? 'Sending…' : 'Start your journey'}
            </Button>
          </div>
        </form>

        <p className="mt-10 border-t border-line-2 pt-6 text-sm leading-relaxed text-fg-3">
          Prefer email? Write to us directly at{' '}
          <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
            {site.email}
          </a>
          {' '}— we answer around the clock.
        </p>
      </div>
    </div>
  )
}

function Field({
  index,
  label,
  name,
  type,
  required,
}: {
  index: string
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="group relative grid grid-cols-[2.75rem_1fr] items-start gap-3">
      <span className="text-stroke pt-5 font-display text-lg font-bold">{index}</span>
      <div className="relative">
        <label
          htmlFor={name}
          className="block text-[10px] uppercase tracking-[0.25em] text-fg-3 transition-colors duration-300 group-focus-within:text-glow"
        >
          {label}
          {required ? ' *' : ''}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          className="w-full border-b border-line bg-transparent pt-2 pb-3 text-base text-fg outline-none md:text-lg"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-glow to-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100"
        />
      </div>
    </div>
  )
}
