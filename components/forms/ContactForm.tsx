'use client'

import { useState, useRef } from 'react'
import { site } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { cleanPhoneNumber } from '@/lib/utils'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? ''

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [fileName, setFileName] = useState('')

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

    const name = (formData.get('name') as string).trim()
    const email = (formData.get('email') as string).trim()
    const phone = cleanPhoneNumber((formData.get('phone') as string).trim())
    const targetRole = (formData.get('targetRole') as string).trim()
    const message = (formData.get('message') as string).trim()

    let resumeBase64 = ''
    let resumeMime = ''
    let resumeName = ''

    const resumeFile = formData.get('resume') as File | null
    if (resumeFile && resumeFile.size > 0) {
      try {
        resumeBase64 = await fileToBase64(resumeFile)
        resumeMime = resumeFile.type
        resumeName = resumeFile.name
      } catch {
        setErrorMsg('Failed to process resume file. Please try again.')
        setStatus('error')
        return
      }
    }

    const payload = {
      fullName: name,
      email,
      phone,
      targetRole,
      message,
      resumeBase64,
      resumeMime,
      resumeName,
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
        setFileName('')
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

        {status === 'error' && errorMsg && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        <form ref={formRef} onSubmit={onSubmit} className="space-y-9">
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

          <div className="group relative grid grid-cols-[2.75rem_1fr] items-start gap-3">
            <span className="text-stroke pt-5 font-display text-lg font-bold">06</span>
            <div className="relative">
              <label
                htmlFor="resume"
                className="block text-[10px] uppercase tracking-[0.25em] text-fg-3 transition-colors duration-300 group-focus-within:text-glow"
              >
                Upload resume (optional)
              </label>
              <div className="flex items-center gap-3 pt-2">
                <label
                  htmlFor="resume"
                  className="cursor-pointer whitespace-nowrap rounded-lg border border-line bg-surface/50 px-4 py-2 text-xs uppercase tracking-[0.15em] text-fg-3 transition-colors hover:border-glow/50 hover:text-fg-2"
                >
                  Choose file
                </label>
                <span className="truncate text-sm text-fg-3">
                  {fileName || 'No file chosen'}
                </span>
              </div>
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  setFileName(file ? file.name : '')
                }}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-glow to-brand transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit">
              Start your journey
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
