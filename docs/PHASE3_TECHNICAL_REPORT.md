# InfoTech Placement — Phase 3 Technical Report

**Sessions covered:** Phase 3 full-completion sprint + color-correction continuation + employer-removal/backgrounds continuation (July 11–12, 2026).
**Verification:** `tsc --noEmit` clean · `next build` clean (18 routes incl. 5 SSG blog posts, sitemap.xml, robots.txt) · rendered-HTML sweep: content checklist, blue-hex sweep, PII/typo sweep, unique titles/descriptions, blog H1/H2 + internal links, sitemap/robots/pricing rules, alt text — **all pass**.

---

## 1. Client-directed overrides — formally logged

1. **Purple is the brand color.** The client's official **Brand Color System PDF** (purple system: #B14EFF / #D56CFF / #FF8DEB / #6F28B9 on #09060F / #120A1A / #1A1027) is the authoritative brand document and **supersedes the SRS v1.1 §3.1 note** that recorded blue (#2F6BFF) as a client-directed override. All code and all generated imagery now use purple exclusively.
2. **Testimonials may show candidate names and positions** (overrides SRS §8.1 / B-1 for candidate names). All 7 client-pack testimonials are live with names (Apoorva K., Akhila G., Nishitha, Namrtha B., Pratham Patel, Raghu P., Krutheek Reddy) and positions. Staff names remain removed ("Paresh" → "my consultant").
3. **Referral bonus "up to $300" is published** (overrides SRS §5.6.2 non-disclosure) on Refer & Earn, with a USD-equivalent footnote and matching Terms of Service clause. ⚠️ Pack wording is a flat "$300"; "up to $300" implemented per relayed instruction — reconcile if needed.
4. **All employer-facing content removed site-wide** (this session, per client direction): details in §5.

## 2. Files created in Phase 3

| File | Purpose |
|---|---|
| `content/blog.ts` | 5 SEO articles (structured data, ≥3 internal links each via in-body resource block + closing CTA + related rail) |
| `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` | Blog index + article template (Article JSON-LD, related articles, CTA) |
| `components/sections/home/BlogPreview.tsx` | Home "Insights & Resources" 3-card section |
| `components/sections/ServiceTracks.tsx` | Services deep-dive (horizontal cards; employer track removed this session) |
| `components/sections/ProcessTracks.tsx` | Full journey cascade (employer toggle removed this session) |
| `components/sections/ContactMap.tsx` | Half-screen map section (address-pending placeholder, one-line iframe swap) |
| `app/privacy-policy/page.tsx` (+ `/privacy` redirect) | Privacy Policy at the §4.10 URL |
| `app/sitemap.ts`, `app/robots.ts` | Sitemap (pricing excluded) + robots (pricing disallowed) |
| `docs/IMAGE_GENERATION_PROMPTS.md` | Purple prompt library + workflow for remaining assets |

**Files substantially modified:** `content/site.ts` (placement-first rebalance, 7-step method, named testimonials, categorized FAQ set (16 after the employer FAQ's removal), detailed service data), `FAQSection` (two-column redesign: sticky category nav + stat block), `HeroSection`, `StatementSection` (bg image in clip-path sweep), `ProcessHorizontal` (7 steps), `TestimonialsMarquee`, `CTASection`, `ContactForm` (candidate-scoped per SRS §5.5.2), `MatchGraph` (purple + label fix), `app/icon.svg` (purple favicon), all page files, `Footer`, `Navbar`, `app/terms/page.tsx` (+ referral clause; + syntax repair of two apostrophe-broken strings from an external formatting pass), `app/not-found.tsx` (Contact button).

## 3. Content rebalance (placement > interview)

Placement/career outcome now leads: hero "Don't just get interviews. Get placed.", tagline "From resume to offer letter.", statement ends "Placement is the destination.", method step 7 = Placement & Career Success, post-placement support present in every major section. The Interview Guarantee remains strong and specific in its sanctioned spots (hero-adjacent method step 4, Benefits card, FAQ #1, Talent card) and is framed as proof of process confidence — a milestone, not the destination. The "90% of candidates" statistic in the suggested blog-4 title was **removed** (unverifiable; no-fabricated-stats rule); "2025" titles updated to 2026.

## 4. Color correction log (blue → purple)

The design system (`styles/globals.css` @theme) was already the official purple system — no token changes needed. Hardcoded blue findings and fixes:

| Location | Was | Now |
|---|---|---|
| `components/illustrations/MatchGraph.tsx` | #5A82FF strokes, #1E4FFF gradients, #121722 fills, #263149 rings, #7F8CA3/#C5CDD9 text | #D56CFF, #B14EFF, #1A1027, #37204D, #8C859C/#CFC8DD (+ leftover "40+ SIGNALS" label → "24/7 TRACKED") |
| `app/icon.svg` (favicon) | #1E4FFF dot, #263149 border, #090B10/#FFFFFF | #B14EFF→#FF8DEB gradient dot, #37204D border, #09060F/#F8F7FB |
| Generated images (6 in use) | blue palette (first generation) | **regenerated in purple** and pixel-hue-verified (avg hue 271–284° = purple band) |

Rendered-HTML sweep across all pages: zero blue hexes. No Tailwind blue-* classes anywhere.

## 5. Employer-facing content removal (this session)

Removed: home hero "For Employers" ghost CTA · ServiceTracks employer tab/toggle + 5 employer service cards (IT & Non-IT Recruitment, Permanent/Contract Staffing, Executive Search, RPO) · ProcessTracks "I'm an Employer" toggle + 8-step client engagement render · contact-form employer email line · `/employers` page (now redirects to `/services`) · footer "For Employers" link · employer FAQ ("Do you work with employers…") + employer halves of the services/what-is answers · `employerServices` + `clientProcess` data arrays · dual-audience headings rewritten candidate-only (services hero, bento heading, process hero) · home bento card 5 "Employer Hiring Solutions" → "Placement & Onboarding Support" · `/employers` removed from sitemap.

Kept (candidate-facing context, per instruction): "our employer network", "marketed to employers", the employer placement logo scroller (social proof; still flagged B-5).

## 6. Images — final state

All generated via **ChatGPT Desktop** (only sanctioned tool), purple palette, saved directly into the project via the Save-As-full-path workflow. Format is PNG (ChatGPT's output format); the task sheet's `.webp` names would mislabel the bytes — convert to WebP at deploy for §6.6 targets.

| File | Placement |
|---|---|
| `/public/images/blog/<slug>.png` ×5 | Blog featured images (home preview, index, article header) — purple-verified |
| `/public/images/sections/philosophy-bg.png` | Statement/Philosophy section, inside the existing clip-path sweep layer at 18% opacity (scroll-reveal inherited; Section B satisfied) |
| `/public/images/sections/bg-hero-home.png` | Home hero backdrop (dark overlay for legibility) |
| `/public/images/sections/bg-method.png` | 7-step method section backdrop (cards/scroll untouched) |
| `/public/images/sections/bg-hero-about.png` | About PageHero backdrop (via new optional `bgImage` prop) |
| `/public/images/sections/bg-hero-contact.png` | Contact PageHero backdrop |

Remaining optional assets (7 inner-page heroes, 7 step icons, FAQ visual, process-bg alt) have ready purple prompts in `docs/IMAGE_GENERATION_PROMPTS.md`.

## 7. Quality-loop scores (Phase 3 items)

All shipped items pass the gate (every dimension ≥8, avg ≥8.5, compliance 10): content rebalance 8.7 · named testimonials 8.6 · FAQ redesign 8.7 · ServiceTracks 8.6 · ProcessTracks 8.6 · 7-step method 8.7 · ContactMap 8.5 · blog system 8.6 (articles 8.5–8.7) · refer page 8.6 · legal pages 8.6 · employer removal & rewrites 8.6 · backgrounds integration 8.5. Nothing hit the iteration cap.

## 8. Not completed / needs human attention

1. **Breakpoint screenshots**: no browser exists in the verification sandbox and the user's terminal can't be driven — visual QA was done via production build + rendered-HTML assertions + generated-image pixel-hue checks. **Recommend one manual `npm run dev` pass** (home hero overlay legibility, method cards over the new background, mobile).
2. **WhatsApp floating icon** — blocked on number (B-7). **Google Maps embed** — blocked on address (B-7). Structure ready in `ContactMap`.
3. **Form backend** (email + Google Sheets + CAPTCHA, §6.3) — blocked on business email (B-7).
4. **16 optional images** — prompts ready.
5. **Employer logo image assets** — text wordmarks until B-5 assets/verification arrive.
6. **`_temp_fix_*.mjs` / `_temp_scan.mjs`** leftover scripts in project root: deleted this session (see §9); if any reappear from sync, safe to delete.
7. **GA4/GTM/GSC wiring, WebP conversion, deployment** — deploy-phase items.

## 9. Housekeeping

Deleted leftover one-off scripts from the project root: `_temp_fix_terms.mjs`, `_temp_scan.mjs`, `_temp_fix_remaining.mjs`, `_temp_fix_all.mjs` (intermediate punctuation-fix scripts, not part of the app; no imports referenced them). Stale `.next` dev artifacts still contain old blue chunks — cleared by the next local build.

## 10. Pending client inputs

See `docs/PENDING_CLIENT_INPUTS.md` (10 numbered items).
