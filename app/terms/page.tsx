import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    "The terms that govern your use of InfoTech Placement LLC's website and services: service scope, guarantees, responsibilities and liability, in plain English.",
  alternates: { canonical: '/terms' },
}

/**
 * Plain-English terms per SRS §4.2 footer spec.
 * LEGAL-REVIEW DISCLAIMER IS MANDATORY: do not remove.
 * Governing-law jurisdiction: [PENDING: client to confirm].
 * Guarantee language must stay consistent with the Interview Guarantee
 * and conditional money-back guarantee as defined in enrollment terms.
 */
const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: 'Acceptance of these terms',
    body: (
      <p>
        By using this website or engaging InfoTech Placement LLC&rsquo;s services,
        you agree to these terms. If you enroll in a program, the written
        enrollment agreement you sign takes precedence over this page wherever
        the two differ. These terms govern general use of the site and
        services.
      </p>
    ),
  },
  {
    heading: 'What we provide',
    body: (
      <p>
        InfoTech Placement LLC provides career consulting and placement services
        for candidates: resume optimization, LinkedIn profile enhancement,
        resume marketing to our employer network, interview preparation,
        career counseling, and placement and onboarding support, across the
        United States, Canada, the United Kingdom and New Zealand. Our service
        is recruitment facilitation for the candidate; hiring decisions rest
        with employers.
      </p>
    ),
  },
  {
    heading: "Guarantees: what is and isn't promised",
    body: (
      <>
        <p>
          Enrolled candidates are guaranteed an interview opportunity, and
          enrollments are covered by a conditional money-back guarantee
          (90 to 120 days, depending on the scenario). Both commitments and their exact conditions are stated in the written enrollment terms
          you receive before you commit. Those written terms are the binding
          version of both guarantees.
        </p>
        <p>
          Beyond those written commitments, no specific employment outcome is
          promised. Hiring decisions, offers, compensation and start dates are
          made by employers, not by us. We commit to the process and to the
          interview opportunity. We cannot and do not promise that any
          particular employer will extend an offer.
        </p>
      </>
    ),
  },
  {
    heading: 'Your responsibilities',
    body: (
      <p>
        You agree to provide accurate, current and truthful information. In forms, in your resume, and throughout any program. Misrepresenting
        qualifications, work history or work authorization may result in
        termination of services and voids any guarantee. You are responsible
        for decisions you make about offers, employers and contracts; we
        provide guidance, not legal or financial advice.
      </p>
    ),
  },
  {
    heading: 'Intellectual property',
    body: (
      <p>
        The content, design and branding of this website belong to InfoTech
        Placement LLC and may not be copied or reused without written permission.
        Materials we produce for you during a program, such as your optimized resume and LinkedIn content, are yours to use for your own career.
      </p>
    ),
  },
  {
    heading: 'Limitation of liability',
    body: (
      <p>
        To the maximum extent permitted by law, InfoTech Placement LLC is not
        liable for indirect or consequential losses arising from use of this
        website or our services, including decisions made by employers, or
        outcomes of employment relationships formed through our placements.
        Nothing in these terms limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    heading: 'Referral program',
    body: (
      <p>
        Referral bonuses are paid only after the referred candidate&rsquo;s
        successful placement. The published figure of up to $300 is a maximum;
        the actual amount is determined at the company&rsquo;s discretion and
        paid in USD equivalent. Full referral terms are communicated directly
        and confirmed in writing when a referral is made.
      </p>
    ),
  },
  {
    heading: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of the jurisdiction stated in
        your written enrollment agreement. [Jurisdiction to be confirmed by
        InfoTech Placement LLC prior to launch.]
      </p>
    ),
  },
  {
    heading: 'Changes and contact',
    body: (
      <p>
        We may update these terms from time to time; changes take effect when
        posted on this page. Questions about these terms:{' '}
        <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
          {site.email}
        </a>
        .
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <main id="main-content">
      <PageHero
        index="09"
        eyebrow="Terms of Service"
        title={
          <>
            Clear terms,
            <br />
            in plain English.
          </>
        }
        lede="What you can expect from us, what we expect from you, and exactly what is and isn't promised."
      />

      <section className="bg-ink-2 py-20 md:py-28">
        <div className="mx-auto w-[min(94%,48rem)]">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-fg-3">
            Last updated: July 2026
          </p>
          {/* MANDATORY legal-review disclaimer: do not remove */}
          <p className="mb-14 border-l-2 border-warning/60 pl-5 text-sm leading-relaxed text-fg-3">
            These terms are provided for general informational purposes and
            should be reviewed by a qualified legal professional before being
            treated as final and binding. They are not a substitute for legal
            review.
          </p>

          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight">
                  {s.heading}
                </h2>
                <div className="space-y-4 text-sm leading-relaxed text-fg-2">{s.body}</div>
              </div>
            ))}
          </div>

          <p className="mt-14 border-t border-line-2 pt-6 text-xs leading-relaxed text-fg-3">
            © {site.name}. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  )
}
