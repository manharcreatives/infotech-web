import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How InfoTech Placement collects, uses and protects your information: lead form data, analytics, retention, third parties, cookies and your rights.',
  alternates: { canonical: '/privacy-policy' },
}

/**
 * Plain-English privacy policy per SRS §8.1.
 * LEGAL-REVIEW DISCLAIMER IS MANDATORY: do not remove (project scope
 * excludes formal legal review; client responsibility per SRS §11).
 */
const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: 'What we collect',
    body: (
      <>
        <p>
          When you contact us or enroll, we collect the information you give us
          directly: your full name, email address, phone number, target job
          title, and anything you write in the description field. If you enroll
          as a candidate, we additionally collect the professional information
          needed to market your profile: your resume, work history, skills and
          career preferences.
        </p>
        <p>
          When you browse this site, we collect standard analytics data through
          Google Analytics 4 and Google Tag Manager: pages visited, approximate
          location, device and browser type, and how you interact with the site
          (for example, form submissions and button clicks). This data is
          aggregated and does not identify you personally.
        </p>
      </>
    ),
  },
  {
    heading: 'Why we collect it',
    body: (
      <p>
        We use your contact details to respond to your inquiry and provide the
        services you ask for. We use candidate profile information to deliver
        the placement program you enroll in: resume optimization, profile
        marketing to employers, interview coordination. We use analytics data
        to understand how the site is used and to improve it. We do not sell
        your information, and we do not use it for third-party advertising.
      </p>
    ),
  },
  {
    heading: 'Who else is involved',
    body: (
      <p>
        Form submissions are delivered to our team by email and recorded in
        Google Sheets (Google Workspace). Site analytics are processed by
        Google Analytics. If you enroll as a candidate, your professional
        profile is shared with prospective employers as part of the placement
        service: that is the point of the program, and it happens with your
        knowledge. We do not disclose your information to any other third
        party unless required by law.
      </p>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <p>
        Inquiry data is retained for as long as needed to handle your request
        and for a reasonable follow-up period. Candidate profile data is
        retained for the duration of your enrollment and afterwards only as
        long as needed for post-placement support and legal record-keeping.
        You can ask us to delete your data at any time (see &ldquo;Your
        rights&rdquo; below).
      </p>
    ),
  },
  {
    heading: 'Cookies',
    body: (
      <p>
        This site uses cookies and similar technologies for analytics (Google
        Analytics 4 via Google Tag Manager) and for basic site functionality,
        such as remembering that you have already seen the intro animation.
        Analytics cookies help us understand aggregate usage; they are not
        used to identify you personally. You can block or delete cookies in
        your browser settings. The site will continue to work.
      </p>
    ),
  },
  {
    heading: 'Your rights',
    body: (
      <p>
        You can ask us to access, correct, update or delete the personal
        information we hold about you, or to stop contacting you, at any time.
        If you are in the United Kingdom, these rights are backed by UK GDPR,
        including the right to withdraw consent and to complain to the ICO.
        To exercise any of these rights, write to us at the address below. We
        respond to every request.
      </p>
    ),
  },
  {
    heading: 'Contact',
    body: (
      <p>
        Questions about this policy or your data: email us at{' '}
        <a href={`mailto:${site.email}`} className="link-sweep text-fg-2 hover:text-fg">
          {site.email}
        </a>
        . We operate 24/7 and answer whenever you write.
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content">
      <PageHero
        index="08"
        eyebrow="Privacy Policy"
        title={
          <>
            Your data, handled
            <br />
            like it matters.
          </>
        }
        lede="What we collect, why we collect it, who else touches it, and the rights you keep, in plain English."
      />

      <section className="bg-ink-2 py-20 md:py-28">
        <div className="mx-auto w-[min(94%,48rem)]">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-fg-3">
            Last updated: July 2026
          </p>
          {/* MANDATORY legal-review disclaimer: do not remove */}
          <p className="mb-14 border-l-2 border-warning/60 pl-5 text-sm leading-relaxed text-fg-3">
            This policy is provided for general informational purposes and
            should be reviewed by a qualified legal professional before being
            treated as final and binding. It is not a substitute for legal
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
            We may update this policy from time to time; changes will be posted
            on this page with an updated date. © {site.name}.
          </p>
        </div>
      </section>
    </main>
  )
}
