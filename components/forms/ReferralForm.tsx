'use client'

import { useState, useRef } from 'react'
import { site } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { cleanPhoneNumber } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_REFERRAL_APPS_SCRIPT_URL ?? ''

export function ReferralForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!APPS_SCRIPT_URL) {
      setErrorMsg('Form service not configured. Please try again later.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    const referrerName = (formData.get('referrerName') as string).trim()
    const referrerEmail = (formData.get('referrerEmail') as string).trim()
    const candidateName = (formData.get('candidateName') as string).trim()
    const candidateEmail = (formData.get('candidateEmail') as string).trim()
    const candidatePhone = cleanPhoneNumber((formData.get('candidatePhone') as string).trim())
    const candidateRole = (formData.get('candidateRole') as string).trim()
    const notes = (formData.get('notes') as string).trim()

    const payload = {
      type: 'referral',
      referrerName,
      referrerEmail,
      candidateName,
      candidateEmail,
      candidatePhone,
      candidateRole,
      notes,
    }

    try {
      const startedAt = Date.now()
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const result = (await res.json()) as { success: boolean; error?: string }
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, 1500 - elapsed)

      if (result.success) {
        await new Promise((r) => setTimeout(r, remaining))
        setStatus('sent')
        formRef.current?.reset()
      } else {
        await new Promise((r) => setTimeout(r, remaining))
        setErrorMsg(result.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      await new Promise((r) => setTimeout(r, 1500))
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-line bg-surface/30 p-10 text-center backdrop-blur-sm">
        <span className="success-check grid size-16 place-items-center rounded-full bg-success shadow-[0_0_48px_8px_rgba(34,197,94,0.45)]">
          <svg className="size-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg">
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
    <div className="relative">
      {status === 'sending' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-ink/80 backdrop-blur-sm">
          <div className="spinner-loader">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
          <p className="mt-6 text-sm tracking-[0.2em] text-fg-3 uppercase">Sending…</p>
        </div>
      )}
      {status === 'error' && errorMsg && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit} className="space-y-9">
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
            Submit referral
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
