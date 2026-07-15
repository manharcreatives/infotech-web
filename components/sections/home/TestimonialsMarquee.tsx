'use client'

import { testimonials } from '@/content/site'
import { gsap, useGSAP } from '@/lib/gsap'
import { TransitionLink } from '@/components/ui/TransitionLink'

/* ─── duplicate list so the row feels full ─── */
const row = [...testimonials, ...testimonials, ...testimonials]

export function TestimonialsMarquee() {
  /* Heading words animate in on scroll — simple, no pin */
  useGSAP(() => {
    gsap.from('.tes-word', {
      yPercent: 110,
      opacity: 0,
      stagger: 0.08,
      ease: 'power3.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 75%',
        once: true,
      },
    })

    gsap.from('.tes-marquee-row', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      ease: 'power3.out',
      duration: 0.9,
      scrollTrigger: {
        trigger: '.tes-marquee-row',
        start: 'top 85%',
        once: true,
      },
    })
  })

  return (
    <section
      className="testimonials-section relative w-full py-24 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #09060F 0%, #0e0817 50%, #09060F 100%)',
      }}
    >
      {/* ── top separator ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      {/* ── heading ── */}
      <div className="relative z-10 mb-16 px-6 text-center overflow-hidden">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-brand font-medium">
          Outcomes
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {['Proof,', 'Not', 'Promises.'].map((word) => (
            <div key={word} className="overflow-hidden">
              <span
                className="tes-word inline-block font-display font-bold uppercase text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight"
                /* "Proof," is a plain solid-color span on purpose: pairing
                   background-clip:text with a solid background + solid fill
                   rendered the word invisible in some browsers. Only the
                   gradient words use the clip technique. */
                style={
                  word === 'Proof,'
                    ? { color: '#F8F7FB' }
                    : {
                        background:
                          word === 'Not'
                            ? 'linear-gradient(135deg,#B14EFF,#D56CFF)'
                            : 'linear-gradient(135deg,#D56CFF,#FF8DEB)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }
                }
              >
                {word}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-md mx-auto text-sm text-fg-3 leading-relaxed">
          Real candidates, real placements, in their own words — from first
          consultation to signed offer and beyond.
        </p>
      </div>

      {/* ── Single row — pauses on hover so a visitor can read a card ── */}
      <div className="tes-marquee-row relative z-10">
        <InfiniteRow items={row} />
      </div>

      {/* ── bottom separator ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      {/* ── CTA ── */}
      <div className="relative z-10 mt-14 flex justify-center">
        <TransitionLink
          href="/contact"
          className="group flex items-center gap-3 rounded-full border border-brand/30 bg-brand/10 px-8 py-3.5 text-sm font-medium text-brand transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand"
        >
          Book a Free Consultation
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </TransitionLink>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────── */
/* Infinite marquee row                        */
/* ─────────────────────────────────────────── */
function InfiniteRow({ items }: { items: typeof testimonials }) {
  return (
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track gap-5">
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────── */
/* Single card                                 */
/* ─────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number]
}) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div
      className="group relative flex-none w-[320px] rounded-2xl border border-white/6 bg-[#120A1A]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand/30 hover:bg-[#1A1027]/90"
      style={{ boxShadow: '0 0 0 0 rgba(177,78,255,0)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 24px 0 rgba(177,78,255,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(177,78,255,0)'
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 text-glow text-sm mb-4">★★★★★</div>

      {/* Quote */}
      <blockquote className="text-[0.9rem] leading-[1.65] text-fg-2 mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3 pt-4 border-t border-white/6">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand/40 to-deep/60 text-xs font-bold text-white font-display">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-fg leading-none mb-0.5">
            {testimonial.name}
          </p>
          <p className="text-xs text-fg-3">{testimonial.role}</p>
        </div>
      </footer>

      {/* Hover glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/0 to-transparent transition-all duration-500 group-hover:via-brand/60 rounded-t-2xl" />
    </div>
  )
}
