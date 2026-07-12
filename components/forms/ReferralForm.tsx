'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'sending' | 'sent'

/**
 * Refer & Earn lead-capture form. Mirrors ContactForm's numbered
 * ledger field system so both forms feel like one product.
 *
 * TODO (integration, SRS §6.3): POST to /api/refer → business email
 * notification + Google Sheets row + anti-spam. Blocked on client's
 * business email (SRS B-7) — same integration gap as ContactForm.
 */
export function ReferralForm() {
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
          Referral received.
        </p>
        <p className="mt-2 max-w-xs text-sm text-fg-3">
          We&rsquo;ll reach out to your contact shortly — and keep you
          posted about your reward at every milestone.
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-9">
        <p className="text-xs uppercase tracking-[0.3em] text-glow">Your details</p>
        <div className="grid gap-9 sm:grid-cols-2">
          <Field index="01" label="Your full name" name="referrerName" type="text" required />
          <Field index="02" label="Your email address" name="referrerEmail" type="email" required />
        </div>

        <p className="pt-2 text-xs uppercase tracking-[0.3em] text-glow">
          Who you&rsquo;re referring
        </p>
        <div className="grid gap-9 sm:grid-cols-2">
          <Field index="03" label="Candidate's full name" name="candidateName" type="text" required />
          <Field index="04" label="Candidate's email" name="candidateEmail" type="email" required />
        </div>
        <div className="grid gap-9 sm:grid-cols-2">
          <Field index="05" label="Candidate's phone" name="candidatePhone" type="tel" />
          <Field index="06" label="Target role or field" name="candidateRole" type="text" />
        </div>

        <div className="group relative grid grid-cols-[2.75rem_1fr] items-start gap-3">
          <span className="text-stroke pt-5 font-display text-lg font-bold">07</span>
          <div className="relative">
            <label
              htmlFor="referral-notes"
              className="block text-[10px] uppercase tracking-[0.25em] text-fg-3 transition-colors duration-300 group-focus-within:text-glow"
            >
              Why would they be a great fit? (optional)
            </label>
            <textarea
              name="notes"
              id="referral-notes"
              rows={3}
              className="w-full resize-none border-b border-line bg-transparent pt-2 pb-3 text-base text-fg outline-none md:text-lg"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-glow to-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Button type="submit">
            {status === 'sending' ? 'Sending…' : 'Submit referral'}
          </Button>
          <p className="max-w-xs text-xs leading-relaxed text-fg-3">
            Please make sure you have their permission before sharing
            their details.
          </p>
        </div>
      </form>

      <p className="mt-8 border-t border-line-2 pt-6 text-sm leading-relaxed text-fg-3">
        Prefer email? Send the introduction to{' '}
        <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
          {site.email}
        </a>
        {' '}— we answer around the clock.
      </p>
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
