'use client'

import { useState } from 'react'
import Image from 'next/image'
import { faqs, faqCategories, type FaqCategory } from '@/content/site'
import { cn } from '@/lib/utils'
import { SplitLines } from '@/components/motion/SplitLines'

/**
 * Two-column FAQ:
 *  Desktop: Left column sticky (heading, category nav, stat block)
 *           Right column groups accordion by category.
 *  Mobile:  Category-level accordion — tap a category header to expand
 *           all Q&As within it. Background image covers the full section.
 */
export function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.question ?? null)
  const [openCategoryMobile, setOpenCategoryMobile] = useState<FaqCategory | null>(null)

  return (
    <section className="relative bg-ink-2 py-28 md:py-40" id="faq">

      {/* ── Mobile full-section background (hidden on desktop) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden md:hidden">
        <Image
          src="/images/sections/faq-bg.webp"
          alt=""
          fill
          unoptimized
          className="size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-2/75 via-ink-2/80 to-ink-2" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT — category accordion
      ══════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-[min(94%,80rem)] md:hidden">
        <p className="sr-fade-up mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
          ( Questions )
        </p>
        <h2 className="sr-fade-up font-display text-3xl font-semibold tracking-tight" style={{ transitionDelay: '60ms' }}>
          Everything people ask before they say yes.
        </h2>

        {/* Stat pills */}
        <div className="sr-fade-up mt-8 flex gap-4" style={{ transitionDelay: '120ms' }}>
          <div className="rounded-xl border border-line-2 bg-surface/50 px-5 py-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-fg">{faqs.length}</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-fg-3">Questions answered</p>
          </div>
          <div className="rounded-xl border border-line-2 bg-surface/50 px-5 py-4">
            <p className="font-display text-2xl font-semibold tracking-tight text-fg">24/7</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.15em] text-fg-3">For everything else</p>
          </div>
        </div>

        {/* Category accordion */}
        <div className="sr-fade-up mt-10 divide-y divide-line-2 border-y border-line-2" style={{ transitionDelay: '180ms' }}>
          {faqCategories.map((cat) => {
            const items = faqs.filter((f) => f.category === cat)
            const isCatOpen = openCategoryMobile === cat
            return (
              <div key={cat}>
                {/* Category header button */}
                <button
                  onClick={() => setOpenCategoryMobile(isCatOpen ? null : cat)}
                  aria-expanded={isCatOpen}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span
                    className={cn(
                      'font-display text-lg font-semibold tracking-tight transition-colors duration-300',
                      isCatOpen ? 'text-glow' : 'text-fg'
                    )}
                  >
                    {cat}
                  </span>
                  <span
                    className={cn(
                      'relative grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300',
                      isCatOpen ? 'border-glow' : 'border-line'
                    )}
                  >
                    <span className="absolute h-px w-3.5 bg-fg-2" />
                    <span
                      className={cn(
                        'absolute h-px w-3.5 bg-fg-2 transition-transform duration-500',
                        isCatOpen ? 'rotate-0' : 'rotate-90'
                      )}
                    />
                  </span>
                </button>

                {/* Category content: all Q&As for this category */}
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                    isCatOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="divide-y divide-line-2/60 pb-4">
                      {items.map((faq) => {
                        const open = openQuestion === faq.question
                        return (
                          <div key={faq.question}>
                            <button
                              onClick={() => setOpenQuestion(open ? null : faq.question)}
                              aria-expanded={open}
                              className="flex w-full items-center justify-between gap-4 py-4 text-left"
                            >
                              <span
                                className={cn(
                                  'text-sm font-medium leading-snug transition-colors duration-300',
                                  open ? 'text-glow' : 'text-fg-2'
                                )}
                              >
                                {faq.question}
                              </span>
                              <span
                                className={cn(
                                  'relative grid size-7 shrink-0 place-items-center rounded-full border border-line/60 transition-colors duration-300',
                                  open && 'border-glow/60'
                                )}
                              >
                                <span className="absolute h-px w-3 bg-fg-3" />
                                <span
                                  className={cn(
                                    'absolute h-px w-3 bg-fg-3 transition-transform duration-500',
                                    open ? 'rotate-0' : 'rotate-90'
                                  )}
                                />
                              </span>
                            </button>
                            <div
                              className={cn(
                                'grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                              )}
                            >
                              <div className="overflow-hidden">
                                <p className="max-w-xl pb-5 text-sm leading-relaxed text-fg-3">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-fg-3">
          Still deciding? Ask us directly. We operate around the clock, so a real person answers whenever you write.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT — two-column (unchanged)
      ══════════════════════════════════════════ */}
      <div className="mx-auto hidden w-[min(94%,80rem)] gap-14 md:grid md:grid-cols-[1fr_1.6fr]">
        {/* ── Left rail (sticky) ── */}
        <div className="relative">
          {/* artistic backdrop for the heading side only (not the Q&A) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-6 overflow-hidden rounded-3xl md:-inset-x-8"
          >
            <Image
              src="/images/sections/faq-bg.webp"
              alt=""
              fill
              unoptimized
              className="size-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-2/70 via-ink-2/80 to-ink-2" />
          </div>
          <div className="relative md:sticky md:top-32">
            <SplitLines as="p" className="mb-4 text-xs uppercase tracking-[0.35em] text-fg-3">
              ( 06 — Questions )
            </SplitLines>
            <SplitLines
              as="h2"
              className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
            >
              Everything people ask before they say yes.
            </SplitLines>

            {/* Category navigation */}
            <nav aria-label="FAQ categories" className="mt-10 space-y-1">
              {faqCategories.map((cat) => (
                <a
                  key={cat}
                  href={`#faq-${cat.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  className="group flex items-center gap-3 py-2 text-sm text-fg-3 transition-colors duration-300 hover:text-fg"
                >
                  <span className="h-px w-6 bg-line transition-all duration-300 group-hover:w-10 group-hover:bg-glow" />
                  {cat}
                </a>
              ))}
            </nav>

            {/* Supporting stat block */}
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-2 bg-line-2">
              <div className="bg-surface/60 p-5">
                <p className="font-display text-2xl font-semibold tracking-tight text-fg">
                  {faqs.length}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-fg-3">
                  Questions answered
                </p>
              </div>
              <div className="bg-surface/60 p-5">
                <p className="font-display text-2xl font-semibold tracking-tight text-fg">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-fg-3">
                  For everything else
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fg-3">
              Still deciding? Ask us directly. We operate around the clock, so
              a real person answers whenever you write.
            </p>
          </div>
        </div>

        {/* ── Right column: grouped accordions ── */}
        <div className="space-y-12">
          {faqCategories.map((cat) => {
            const items = faqs.filter((f) => f.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} id={`faq-${cat.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-brand">
                  {cat}
                </p>
                <div className="divide-y divide-line-2 border-y border-line-2">
                  {items.map((faq) => {
                    const open = openQuestion === faq.question
                    return (
                      <div key={faq.question}>
                        <button
                          onClick={() => setOpenQuestion(open ? null : faq.question)}
                          aria-expanded={open}
                          className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                        >
                          <span
                            className={cn(
                              'font-display text-lg font-medium tracking-tight transition-colors duration-300 md:text-xl',
                              open ? 'text-glow' : 'text-fg group-hover:text-fg-2'
                            )}
                          >
                            {faq.question}
                          </span>
                          <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-glow">
                            <span className="absolute h-px w-3.5 bg-fg-2" />
                            <span
                              className={cn(
                                'absolute h-px w-3.5 bg-fg-2 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                                open ? 'rotate-0' : 'rotate-90'
                              )}
                            />
                          </span>
                        </button>
                        <div
                          className={cn(
                            'grid transition-[grid-template-rows] duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
                            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-xl pb-6 text-sm leading-relaxed text-fg-3">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
