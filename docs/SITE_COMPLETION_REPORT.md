# InfoTech Placement — Site Completion Report (Phase 2 run)

**Run date:** July 11, 2026
**Scope:** Gap closure against SRS v1.1 + client Basic Info content pack, specific client-directed corrections, two new legal pages, hidden pricing page, employer scroller, full client content integration, client-ready verification.
**Verification:** `tsc --noEmit` clean · `next build` clean (13 routes prerender) · rendered-HTML sweep of all 11 public+hidden pages: content presence, PII/typo/stale-claim sweep, internal-link resolution, pricing noindex — **all pass**.

---

## 1. Gap Report (Phase 0–1 findings)

Source documents located and used as ground truth: `InfoTech_Placement_SRS_v1.1.md` and `Client side_Website Requirement_Basic info.md` (project knowledge), plus the official **Brand Color System PDF** — see §6, finding 1.

| Item | Status found | Action |
|---|---|---|
| Privacy Policy page + footer link (SRS §8.1/§4.2) | **Missing** | Built `/privacy`, linked in footer |
| Terms of Service page + footer link (§4.2) | **Missing** | Built `/terms`, linked in footer |
| Hidden Pricing page, noindex/nofollow (§4.5/§5.7) | **Missing** | Built `/pricing` (see §3.6) |
| Employer logo scroller (§4.4, §5.1.2, §5.5.4) | **Missing** | Built `EmployerMarquee` on Home + Contact (see §3.5) |
| Contact form scoped to candidates (§5.5.2) | **Present, wrong** | Rebuilt (see §2a) |
| FAQ countries answer incl. NZ | Present & correct | — |
| Refer & Earn page | Present, needed $300 update | Updated (see §2b) |
| Founding story (Nov 2025, 4 countries) | Partial | About page rebuilt with full story |
| Motto / Mission / Vision | **Missing** | Added to `site.ts` + About page |
| All 8 core values | **Missing** (4 invented values present) | Replaced with the client's 8 |
| "What Drives Us" + Our Promise | **Missing** | Added to About page |
| Full job-seeker + employer services lists | Present | — (verified against pack) |
| 8-step + 11-step processes | Present & correct | — |
| All 15 client FAQs (NZ-corrected) | 6 of 15 present | All 15 now present (+2 program-specific = 17 total, all 40–95 words) |
| LinkedIn company URL wired | **Missing** | Footer, Contact page, About hero CTA, Organization schema `sameAs` |
| Referral messaging | Present, non-disclosure version | Updated per override |
| 404 page | Present & on-brand | — |
| Testimonials | Drafted placeholders (prior run) | **Replaced with the client's real quotes, anonymized** — resolves the B-1 placeholder gap; names and the staff reference ("Paresh") removed |
| Over-cut check | Nothing required was removed by the prior pass; the four invented "values" it added are now superseded by the client's real eight | — |
| WhatsApp floating icon (§4.3) | Missing — **blocked** on number (B-7) | Not built (dead link worse than absence); pending |
| Google Maps on Contact (§6.5) | Missing — **blocked** on address (B-7) | Pending |
| Blog section (§5.1.9/§6.9) | Missing | Separate Manhar Creatives deliverable (5 articles); not in this run |
| Form → email + Google Sheets integration (§6.3) | Missing — **blocked** on business email (B-7) | Form UI complete; integration pending |

## 2. Specific corrections (Phase 2 of the brief)

**a) Contact form — found vs. changed.** Found: a dual-audience form with an intent toggle defaulting to **"I'm hiring"** (employer-first), generic fields (Name, Email, Phone, Company/Role, Message) — SRS-noncompliant. Changed to the SRS §5.5.2 candidate form: Full Name*, Email Address*, Phone Number*, Target Job Title, Brief Description*, submit label "Start your journey" (per §4.6 CTA language). Employers get a lightweight route instead of a second form: a direct-email line under the form ("Looking to hire instead? Reach us directly at…"). Reasoning: candidates are the primary audience and revenue source; employers are a lower-volume, higher-intent audience well served by direct email — this follows the standard two-audience pattern of a primary conversion path plus a secondary escape hatch. WhatsApp link will be added to that line once the number arrives (B-7). Submission backend remains a stub pending the business email (B-7 / §6.3).

**b) Refer & Earn — amount published.** Non-disclosure default overridden by client instruction relayed via Utsav (Manhar Creatives), July 2026. Page now states **"up to $300"** in hero, step card and closing line. ⚠️ **Wording discrepancy flagged:** the client's content pack says a flat **"$300 Referral Bonus"**; the relayed instruction says **"up to $300."** "Up to" is implemented; the client should confirm which is contractually intended (this also touches Terms of Service wording if made flat). Page retains: how to refer, what happens after successful placement, terms-in-writing note, CTA.

**c) Interview Guarantee repetition — reduced, not weakened.** Literal phrase now kept in exactly the sanctioned high-impact spots: home hero H1 ("It's guaranteed."), the Benefits commitment card ("Guaranteed interviews"), FAQ #1 (full guarantee statement with money-back terms), the Talent-page perk card, and the brand tagline. Varied replacements elsewhere: hero subheadline → "we don't stop until you're in the room"; statement → "walk you into the room where careers actually change"; process heading → "Built to get you interviewed, not just submitted."; VideoPin overlay → "Careers / Built Here"; services-page closer → "structured toward getting you interviewed"; talent lede → "a seat secured across from an employer"; journey step 8 → "The part we stake our name on."; site meta description → "from resume to the interview room"; mobile-menu microcopy → "We get you in the room." The substantive promise is unchanged everywhere; FAQ #1 and Terms state it fully.

**d) Geography wording.** No "Nationwide" or two-country framing found anywhere (sweep confirmed). Stats remain `[STAT]`-flagged; 4th counter stays the verified "4 Countries served."

## 3. New pages and sections (with rationale)

1. **`/privacy` — Privacy Policy.** Plain-English: data collected (lead-form fields, candidate profile data, GA4/GTM analytics), purpose, third parties (Google Sheets, Google Analytics, employer sharing as part of the service), retention, cookies, user rights incl. UK GDPR/ICO mention (§8.1 [v1.1]), contact. **Legal-review disclaimer visible at top.** Footer-linked. *Rationale: SRS-binding; trust; UK GDPR exposure.*
2. **`/terms` — Terms of Service.** Acceptance, service description, guarantees section that states the Interview Guarantee and conditional money-back guarantee **and** defers to written enrollment terms as binding — carefully framed so no-outcome-guarantee language doesn't contradict them; user responsibilities, IP, limitation of liability, **governing law flagged "[Jurisdiction to be confirmed]"**, changes/contact. Same disclaimer. Footer-linked. *Rationale: SRS-binding; protects the guarantee from over-reading.*
3. **About page rebuilt** with the full client content: founding story (Nov 2025), Mission & Vision cards, all 8 core values, "What Drives Us" list, "Our Promise" pull-quote, and the SRS §5.2.1 hero CTAs ("Join us on LinkedIn" — external-safe anchor, not TransitionLink — and "Explore our services"). *Rationale: client-supplied content was entirely absent.*
4. **All 15 client FAQs** integrated (condensed to length discipline, NZ-corrected, W2 wording country-aware) + the guarantee and transparency FAQs retained = 17 accordion items; FAQPage JSON-LD auto-generates from the same data.
5. **`EmployerMarquee`** (Home after Stats; Contact bottom). Text wordmarks of the client's employer list, spelling-corrected (Oracle, JPMorgan Chase, UnitedHealth Group, CVS Health, Elevance Health, McKesson, Toyota Motor, Wells Fargo, FedEx, Red Bull) and de-duplicated (single "The Walt Disney Company"). ⚠️ Deviations logged: (a) SRS specifies a **vertical crawl** — a horizontal marquee (existing site pattern) is used until logo assets arrive, per the reuse-existing-patterns rule; (b) SRS places it **immediately below the hero** — placed after Stats because the hero already ends in the roles ticker (two stacked tickers would collide visually). ⚠️ **B-5 remains open:** placement claims require written client substantiation; caption presents the client's claim as supplied.
6. **`/pricing` (hidden).** `robots: noindex, nofollow`; linked from no nav, footer, or sitemap (none exists — see §5); reachable only by direct URL. Interim content: 3-step "how pricing works" + consultation CTA, because **no old plans exist to carry over** (the old website has no pricing page — verified live; the referenced PDF turned out to be the brand color system, not plans). Final tiers pending (B-6).
7. **Not built, deliberately:** WhatsApp icon, Google Maps, Instagram links (all blocked on B-7 assets); blog section (separate deliverable); no employer logo *images* (assets pending).

## 4. Quality-loop scorecard (new/corrected items)

Dimensions: Hook / Clarity / Trust / Emotional / Benefit / Voice / SEO / Conversion / Uniqueness / Compliance. Exit: all ≥ 8, avg ≥ 8.5, Compliance 10.

| Item | Iterations | Min | Avg | Compliance |
|---|---|---|---|---|
| Contact form + employer route | 1 | 8 | 8.7 | 10 |
| Refer & Earn ($300 version) | 1 | 8 | 8.6 | 10 |
| IG-variation rewrites (9 locations) | 2 (VideoPin v1 too cute → "Careers/Built Here") | 8 | 8.6 | 10 |
| About: story/mission/vision/values/promise | 2 (values one-liners tightened from client's wording) | 8 | 8.6 | 10 |
| 11 new FAQ answers | 2 (all brought into 40–95-word band, verified programmatically) | 8 | 8.6 | 10 |
| Anonymized real testimonials | 1 | 8 | 8.5 | 10 (PII stripped; B-1 note below) |
| Employer marquee | 1 | 8 | 8.5 | 10* (*B-5 open) |
| Privacy Policy | 1 | 8 | 8.6 | 10 (disclaimer present; no invented legal claims) |
| Terms of Service | 2 (guarantee section rewritten to defer to enrollment terms) | 8 | 8.6 | 10 (disclaimer present; consistent with IG + money-back) |
| Hidden pricing interim | 1 | 8 | 8.5 | 10 |

Nothing hit the 5-iteration cap.

## 5. Handoff verification results

- **Build:** `next build` clean; 13 routes prerender statically (/, about, contact, employers, pricing, privacy, process, refer, services, talent, terms, 404, icon).
- **Placeholder/PII sweep (rendered HTML, all pages):** zero lorem ipsum, zero candidate names (incl. all 7 from the pack + "Paresh"), zero supplied typos ("Orcle", "Unitedhelath"…), zero "Nationwide", zero stale claims from the pre-overhaul build.
- **Links:** every internal href across all pages resolves 200; `/pricing` linked from nowhere; LinkedIn wired as external link (footer, contact, about).
- **Pricing page:** `noindex, nofollow` present in rendered HTML; absent from nav/footer; **no sitemap file exists in the project** — when one is added at deployment (§6.1), pricing must be excluded (noted for the deploy checklist).
- **Forms:** candidate form renders and validates required fields; **submission is still a front-end stub** — email + Google Sheets + CAPTCHA integration is blocked on the business email (B-7) and is a launch prerequisite, not a content task.
- **Responsive:** this environment has no browser, so breakpoint screenshots could not be captured (build host limitation, same as prior run). Mitigations: all new sections reuse existing responsive patterns (SpotlightCard grids collapse to 1-col; legal pages are single-column prose ≤48rem; marquee is width-independent), and copy-length discipline was enforced programmatically. **A quick local `npm run dev` pass on About (8-value grid), Home (employer marquee) and the two legal pages at mobile width is recommended before hand-to-client.**

## 6. Pending client verification / decisions (consolidated)

1. **Brand palette discrepancy (new finding).** The run brief lists blue (#2F6BFF) tokens as locked, but the client's own **Brand Color System PDF** (in project files) defines the **purple system (#B14EFF/#D56CFF/#FF8DEB/#6F28B9 on #09060F)** as the official palette for website, logo and marketing — and the built site implements exactly that purple system. No colors were touched (also per the do-not list). **Utsav should reconcile which document is current**; if blue is truly final, a dedicated retheme pass is needed.
2. **Referral wording:** "up to $300" (implemented, per relayed instruction) vs. flat "$300" (content pack) — B-2.
3. **Employer list substantiation + logo assets** — B-5 (names live as text wordmarks; vertical-crawl treatment awaits logos).
4. **Statistics 50+/120+/89%** — B-4 (flagged in code comments; phrased to survive small changes).
5. **Pricing tiers** — B-6 (interim consultation-based page live at hidden URL).
6. **Contact assets** — B-7: business email (currently `info@infotechplacement.com` placeholder — also blocks form integration), office address (Maps), WhatsApp number (floating icon + employer line), Instagram URL. Phone in footer is still the inherited +91 placeholder.
7. **Governing-law jurisdiction** for Terms of Service.
8. **Legal review** of Privacy Policy + Terms (client responsibility per SRS §11; visible disclaimers on both pages until then).
9. **Testimonials (B-1):** real client-supplied quotes are now live in anonymized form (default resolution per SRS §5.1.6). If the client prefers named testimonials, they must supply signed consent and amend §8.1.
10. **W2 wording (B-3):** country-aware phrasing live in FAQ; client to approve final USP wording.
11. **Intro word set (B-8):** hero rotating words "Prepared. / Marketed. / Interviewed." still awaiting formal approval; alternatives in the prior report.

## 7. Unchanged, deliberately

Design tokens/theme/motion/fonts (locked; see §6.1 for the palette question) · five-link navigation (new pages surfaced via footer only) · Process/Employers/Talent/Services page structures from the prior pass (re-verified against the pack — content matches) · statement/hero/CTA copy from the prior pass except IG-variation edits · `HeroSplitCards.tsx` dead code (still unused; still recommend deletion at deploy) · ContactForm backend stub (blocked, B-7).
