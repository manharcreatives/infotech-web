# InfoTech Placement — Content Overhaul Report

**Run date:** July 10, 2026
**Scope:** Full-site content replacement (copy, SEO metadata, structured data). No design tokens, motion, or component architecture changed beyond what content placement required.
**Verification:** `tsc --noEmit` clean · `next build` clean (all 9 routes prerender) · rendered-HTML sweep of every page for stale claims, PII, banned phrases and the referral figure — all clean.

---

## 0. Headline finding

The build contained copy from an **entirely different placeholder brand**: "Infotech Placements" (plural), India-market positioning (₹/CTC references, IST hours, +91 phone), fully fabricated statistics (4,800+ placements, 320+ partner companies, 93% acceptance, "a decade of trust"), named fictional testimonials, and a "candidates pay nothing / employers pay our fees" model that **contradicts the actual business** (paid enrollment with interview + conditional money-back guarantee). Every user-facing string was replaced against the Ground Truth sheet. The Interview Guarantee now functions as the persuasion spine of the entire site.

---

## 1. Before / after content inventory

### Global (content/site.ts — single source of truth, existing convention preserved)

| Item | Before | After |
|---|---|---|
| Company name | Infotech Placements | InfoTech Placement |
| Tagline | "Careers, engineered." | "Your interview, guaranteed." |
| Site description | Generic "precision hiring" | 4 countries + interview guarantee (140 ch, meta-safe) |
| Nav links | About, Services, For Employers, For Talent, Process | **Locked 5-link spec:** Home (wordmark), About Us, Process, Services, Contact Us + CTA |
| Nav CTA | "Start hiring" (employer-only, wrong primary audience) | "Book a Consultation" |
| Hero rotating words | Placed. / Hired. / Promoted. / Unstoppable. | Prepared. / Marketed. / Interviewed. (each a true program-level claim; "Placed." removed — the guarantee covers the interview, not the offer) |
| Roles ticker | 10 IT-only roles | 12 roles spanning IT + Non-IT (finance, healthcare, HR, sales…) |
| Statement | "…built on a decade of trust" (false — founded Nov 2025) | "Most agencies send your resume into the void and call it marketing…" — program + guarantee + 4 countries |
| Services (5 bento cards) | IT staffing / exec search / campus / contract / interview engineering | Resume Marketing & Placement (featured), Resume & LinkedIn Branding, Interview Preparation, Career Counseling, Employer Hiring Solutions |
| Process steps (home) | Discover / Match / Prepare / Place (agency-side) | Consult / Prepare / Market / Place — 4 phases condensing the 11-step candidate journey |
| Stats | 4,800+ / 320+ / 93% / 12 days — **all fabricated** | 50+ placements, 120+ profiles marketed, 89% client satisfaction (all `[STAT]`-flagged), 4 countries served (verified fact) |
| Testimonials | 5 fictional named people (Priya Sharma etc.), India-market | 5 anonymized role+country archetypes across all 4 countries + 1 employer voice — **drafts pending client's real testimonial text** (see §3) |
| FAQs | 5 answers incl. "candidates pay nothing" (wrong business model) | 6 answers: guarantee, countries (incl. NZ, country-aware W2 wording), IT+Non-IT, transparency/24-7, 11-step journey, honest pricing non-disclosure |
| Footer links | 6 links, no Refer & Earn | Company + Services columns, Refer & Earn added, 24/7 + countries line added |

### Page-level

| Page | Before → After (key items) |
|---|---|
| **Home hero** | "Your next role, precisely engineered." → **"The interview isn't luck. It's guaranteed."** · eyebrow "Placement partners to 320+ companies" → "Serving the US · Canada · UK · New Zealand" · sub now 18 words on guarantee + IT/Non-IT · CTAs: "Book a Free Consultation" / "For Employers" · "4,800+ PROFESSIONALS" → "EVERY CANDIDATE {Prepared./Marketed./Interviewed.}" |
| **Benefits blocks** | 93% offer acceptance / 72-hour shortlists / data-scored matching / 90-day guarantee (all invented) → the four real USPs: Guaranteed interviews / 24/7 availability / Full transparency / Money-back guarantee, intro "Enrollment comes with four commitments.", outro "All terms in writing before you enroll." |
| **Video overlay** | "Precision Hiring · AI-driven tech recruitment · 3× faster" (unverifiable) → "Guaranteed Interviews · IT & Non-IT placement · four countries"; circle SVG → "INFOTECH PLACEMENT ● GUARANTEED INTERVIEWS ●" |
| **Testimonials section** | "What's Everyone Talking" (broken English) → **"Proof, Not Promises."**, sub-line turns anonymization into a trust signal; dead "Read all stories" button → working "Book a Free Consultation" link |
| **Process section (home)** | "Four steps. Zero guesswork." → "The process behind the guarantee." (iterated: v1 "A process, not a promise" rejected — undercut the guarantee positioning) |
| **Services bento heading** | "Five ways we move careers and companies forward." (swap-test fail) → "For candidates — and the employers who hire them." |
| **About** | "The people behind 4,800 careers" + "a decade in…" → "Built around one promise: the interview." + honest founded-2025 narrative ("We'd rather earn trust through process than claim it through history") + 4 rewritten values |
| **Process page** | Hero + reused 4-step section only → hero "Eleven steps for you. Eight for employers." + **new full 11-step candidate journey + 8-step client engagement** (see §2) |
| **Services page** | Generic lede → dual-audience lede + **new "Industries we place into" section** (see §2) |
| **Employers** | "Stop screening. Start interviewing." + fabricated 72-hour/40-signal/replacement claims → "Candidates we prepare interview differently." + the four real employer services (Permanent, Contract, Executive Search, RPO) + link to the 8-step process |
| **Talent** | "Zero cost, always / Employers pay our fees" (**contradicted business model**) → "Every enrollment ends in an interview." + four real perks (guarantee, 24/7, transparency, prep) |
| **Contact** | "One conversation changes everything." + "Mon–Sat 9:30–7 IST" → "Whatever the hour, we're working." + 24/7 hours line; form success message now 24/7-consistent |
| **Preloader** | "Infotech Placements" → "InfoTech Placement" |
| **MatchGraph labels** | Stack/Projects/Culture/Salary → Resume/LinkedIn/Marketing/Interview (journey funnel) |
| **404** | Kept — "This page got placed somewhere else." still on-brand |

### SEO / technical content

- Unique `<title>` (all ≤ 60 ch) + meta description (all ≤ 155 ch) + canonical on every page.
- Root layout: Open Graph + Twitter card metadata added.
- **Organization** JSON-LD (layout) with foundingDate 2025-11 and areaServed = 4 countries; **FAQPage** JSON-LD (home) generated from `content/site.ts` so it can never drift from visible FAQs.

---

## 2. New sections / pages added (with rationale)

1. **/refer — Refer & Earn page** (new). Ground truth defines binding content rules for this page but it didn't exist in the build. Reuses PageHero + SpotlightCard + CTASection. **No dollar figure anywhere** (B-2 rule enforced in a code comment on the page). Surfaced via footer only — primary nav untouched. *Rationale: conversion (referral channel) without nav change.*
2. **Process page: full 11-step candidate journey + 8-step client engagement** (new `StepList` sections, data in `site.ts`). *Rationale: the structured process is USP #7 and the strongest trust artifact the firm has; it existed nowhere on the site.*
3. **Services page: "Industries we place into"** — IT vs Non-IT tag grids. *Rationale: Non-IT breadth was completely uncommunicated; also SEO surface for non-IT queries.*
4. **Nav restructure to the locked 5-link spec** — For Employers / For Talent demoted from nav to footer + contextual links (hero ghost CTA → /employers; testimonial CTA → /contact). *Rationale: compliance with locked decision; pages retained and improved.*

## 3. Verification flags (pending client confirmation)

| Flag | SRS ref | Where | Status |
|---|---|---|---|
| Testimonial quotes | **B-1** | `site.ts` testimonials | Anonymized **drafts** written to the correct format (role + country, 25–45 words, zero PII). Must be replaced with the client's real testimonial text, anonymized. Marked `[PLACEHOLDER — SRS B-1]` in code. |
| Referral amount | **B-2** | /refer | Compliant: no figure published; page directs to contact. Do not add "$300". |
| Stats 50+ / 120+ / 89% | **B-4** | `site.ts` stats, hero-adjacent copy | Marked `[STAT — pending client verification]`; copy phrased to survive number changes. "4 countries" is verified fact. |
| Employer logos | **B-5** | — | **Not published.** No logo wall exists in the build; recommend keeping it that way until placements are verifiable (legal exposure). Spelling fixes (Oracle, JPMorgan Chase, Disney dedupe) apply whenever the client supplies a verified list. |
| Intro word set | **B-8** | hero rotating words | Shipped: "Prepared. / Marketed. / Interviewed." Candidates for client approval: (A) Enroll. Prepare. Interview. (B) Consult. Brand. Market. Place. (C) Your interview. Guaranteed. (D) current set. All built on guarantee/process, not generic aspiration. |
| Contact details | — | `site.ts` | Domain `infotechplacements.com`, email, +91 phone are inherited placeholders — need real details (a +91 number conflicts with 4-country positioning). |

## 4. Loop Engineer scorecard

Dimensions: Hook / Clarity / Trust / Emotional / Benefit / Voice / SEO / Conversion / Uniqueness / Compliance. Exit: all ≥ 8, avg ≥ 8.5, Compliance = 10.

| Section | Iterations | Min | Avg | Compliance | Verdict |
|---|---|---|---|---|---|
| Home hero | 1 | 8 | 8.8 | 10 | Pass |
| Statement | 1 | 8 | 8.5 | 10 | Pass |
| Services bento | 2 (heading swap-test fail → rewritten) | 8 | 8.6 | 10 | Pass |
| Process (home) | 2 ("not a promise" contradicted guarantee → rewritten) | 8 | 8.6 | 10 | Pass |
| Benefits + video | 1 | 8 | 8.6 | 10 | Pass |
| Testimonials | 1 | 8 | 8.5 | 10* | Pass (*pending B-1 real quotes) |
| Stats | 1 | 8 | 8.5 | 10* | Pass (*B-4 flags) |
| FAQ | 2 (one answer under 40-word floor → extended) | 8 | 8.7 | 10 | Pass |
| CTA | 1 | 8 | 8.8 | 10 | Pass |
| About | 1 | 8 | 8.6 | 10 | Pass |
| Process page | 1 | 8 | 8.7 | 10 | Pass |
| Employers | 1 | 8 | 8.6 | 10 | Pass |
| Talent | 1 | 8 | 8.7 | 10 | Pass |
| Contact | 1 | 8 | 8.6 | 10 | Pass |
| Refer | 1 | 8 | 8.5 | 10 | Pass |

No section hit the 5-iteration cap. Banned-phrase sweep, PII sweep, fabricated-number sweep and referral-figure sweep all ran against **rendered HTML** of every route: clean.

## 5. Visual QA — status and limitation

- `next build` (production) passes; all 9 routes prerender statically.
- Every page's **server-rendered HTML** was fetched and verified for correct new copy, titles, descriptions, JSON-LD, and absence of stale content.
- **Breakpoint screenshots could not be captured in this environment** (the sandboxed build host has no browser; the site's SWC binary cannot run against the mounted project directory, so builds ran on a synced copy). Copy-length discipline was enforced programmatically instead (hero ≤ 8 words, cards ≤ 140 ch, testimonials 25–45 words, FAQ 40–90 words, metas ≤ 60/155 ch — all pass). **Recommended:** run `npm run dev` locally and eyeball Home, Process (new step lists) and Services (new industries section) at mobile width; the new sections use existing patterns so risk is low. The rotating hero word slot was widened (`min-w-[7ch]` → `min-w-[12ch]`) to fit "Interviewed." without layout shift.

## 6. Reviewed and deliberately left unchanged

- **Purple color system vs. locked Brand Blue (#2F6BFF) — top open conflict.** `globals.css` ships a "Purple Brand System" (#B14EFF et al.) and ~10 components hardcode purple/pink hexes. The locked decision says blue. Retheming is a design pass, not a content pass, and a partial swap would break visual coherence — **flagged for a dedicated retheme run.** Same for corner radius (build uses `rounded-full`/`rounded-2xl` vs. locked 0–4 px spec).
- **Pricing page:** does not exist in this build; per ground truth it must stay hidden/noindex — deliberately **not created**.
- **Employer logo wall:** deliberately not added (B-5 legal exposure).
- **404 page copy:** already on-brand.
- **`components/motion/HeroSplitCards.tsx`:** dead code (imported nowhere) still holding old fabricated stats — left untouched; recommend deletion.
- **ContactForm submission:** still a stub (`TODO: POST to /api/contact`) — pre-existing engineering task, out of content scope.
- **Motion, easing, fonts, nav mechanics, preloader mechanic:** untouched per locked decisions (mobile menu de-duplicated Contact link only).
- **`site.url/email/phone`:** kept as flagged placeholders rather than inventing contact details.

## 7. Conflict log

1. **Purple vs. blue tokens** (above) — most recently dated instruction (this run's ground truth) says blue; build says purple; resolved by flagging, not silently repainting.
2. **Old copy's "candidates pay nothing" vs. money-back-guarantee model** — resolved in favor of ground truth: all zero-cost claims removed; pricing handled with honest non-disclosure (FAQ) consistent with the hidden pricing page.
3. **Nav structure in build (6 destinations) vs. locked 5-link spec** — resolved to the locked spec.
