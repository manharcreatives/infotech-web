'use client'

import { gsap, useGSAP, SplitText } from '@/lib/gsap'
import { VideoPin } from './VideoPin'

const benefits = [
  { id: '01', title: 'Guaranteed interviews', color: '#F8F7FB', bg: '#6F28B9' },
  { id: '02', title: '24/7 availability', color: '#09060F', bg: '#D56CFF' },
  { id: '03', title: 'Full transparency', color: '#F8F7FB', bg: '#B14EFF' },
  { id: '04', title: 'Money-back guarantee', color: '#09060F', bg: '#FF8DEB' },
]

export function BenefitsSection() {
  useGSAP(() => {
    const para = document.querySelector('.para-animation')
    if (!para) return

    const hParaSplit = SplitText.create('.para-animation', { type: 'words' })

    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: '.benefits-section',
        start: 'top 65%',
        end: 'top -10%',
        scrub: 1.5,
      },
    })

    revealTl
      .from(hParaSplit.words, {
        duration: 1,
        stagger: 0.2,
        opacity: 0,
        rotate: 8,
        yPercent: 30,
        ease: 'power1.inOut',
      })
      .to('.benefits-section .first-title', {
        duration: 1,
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'circ.out',
      })
      .to('.benefits-section .second-title', {
        duration: 1,
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'circ.out',
      })
      .to('.benefits-section .third-title', {
        duration: 1,
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'circ.out',
      })
      .to('.benefits-section .fourth-title', {
        duration: 1,
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'circ.out',
      })
  })

  return (
    <>
      {/*
        ─────────────────────────────────────────────
        Part 1: Text titles — has overflow:hidden so
        clipping works on the reveal titles, but it
        does NOT contain the VideoPin so the pin
        spacer is never trapped inside overflow:hidden.
        ─────────────────────────────────────────────
      */}
      <section className="benefits-section relative overflow-hidden bg-[#09060F]">
        <div className="container mx-auto mb-0 py-0 pt-16">
          <div className="flex flex-col items-center justify-center">
            <p className="para-animation text-center text-lg text-fg-2 md:text-xl">
              Enrollment comes with
              <br />
              four commitments.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:mb-0 md:mt-20 mt-30 mb-30">
            {benefits.map((b, i) => {
              const classes = [
                'first-title rotate-[3deg] relative z-10',
                'second-title rotate-[-1deg] md:-translate-y-3',
                'third-title rotate-[1deg] md:-translate-y-6 relative z-10',
                'fourth-title rotate-[-5deg] md:-translate-y-6',
              ]
              return (
                <ClipPathTitle
                  key={b.id}
                  title={b.title}
                  color={b.color}
                  bg={b.bg}
                  className={classes[i]}
                  borderColor="#09060F"
                />
              )
            })}
          </div>

          <div className="md:mt-0 md:pb-0 pb-20 mt-10">
            <p className="text-center text-sm text-fg-3">All terms in writing before you enroll.</p>
          </div>
        </div>
      </section>

      {/*
        ─────────────────────────────────────────────
        Part 2: VideoPin lives OUTSIDE the benefits
        section so its GSAP pin-spacer is never trapped
        inside an overflow:hidden ancestor. This is
        the #1 cause of everything collapsing.
        ─────────────────────────────────────────────
      */}
      <div className="vd-pin bg-[#09060F]">
        <VideoPin />
      </div>
    </>
  )
}

function ClipPathTitle({
  title,
  color,
  bg,
  className,
  borderColor,
}: {
  title: string
  color?: string
  bg?: string
  className?: string
  borderColor?: string
}) {
  return (
    <div className="2xl:text-[4.5rem] md:text-5xl text-[28px] font-bold uppercase leading-[9vw] tracking-[-.35vw]">
      <div
        style={{
          clipPath: 'polygon(50% 0%, 50% 0, 50% 100%, 50% 100%)',
          borderColor: borderColor,
        }}
        className={`${className} border-[.5vw] text-nowrap opacity-0`}
      >
        <div
          className="pb-5 md:px-14 px-3 md:pt-0 pt-3"
          style={{ backgroundColor: bg }}
        >
          <h2 style={{ color }}>{title}</h2>
        </div>
      </div>
    </div>
  )
}
