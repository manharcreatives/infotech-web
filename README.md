# Infotech Placements — Website

Award-grade marketing site for Infotech Placements. Dark "Sapphire on Rich Black" theme, editorial typography, GSAP scroll choreography.

## Stack

- **Next.js 16** (App Router, all routes static) + TypeScript
- **Tailwind CSS v4** — design tokens live in `styles/globals.css` under `@theme`
- **GSAP 3.15** (ScrollTrigger + SplitText, both free) via `lib/gsap.ts`
- **Lenis** smooth scroll — instance shared through `lib/scroll.ts`
- Fonts: **Clash Display** (display) + **Satoshi** (body), self-hosted variable woff2 in `public/fonts`

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender static)
```

## Where things live

| What | Where |
| --- | --- |
| All copy/data (services, steps, stats, FAQs, testimonials, contact info) | `content/site.ts` — swap client content here, no component edits needed |
| Color tokens (client theme hexes) | `styles/globals.css` `@theme` block |
| Motion primitives (SplitLines, WordScrub, Magnetic, SpotlightCard, Counter) | `components/motion/` |
| Preloader / custom cursor / grain | `components/global/` + `.grain` class on `<body>` |
| Home sections | `components/sections/home/` |
| Pages | `/` `/about` `/services` `/employers` `/talent` `/process` `/contact` |

## Signature moments

- Preloader: 0→100 counter, curtains split (once per session — `sessionStorage['ip-preloaded']`)
- Hero: masked line reveal, rotating word, pinned blur-out on scroll, role ticker
- Statement: word-by-word scroll-scrub reveal
- Services: bento grid, cursor-tracked spotlight + border glow, MatchGraph SVG illustration
- Process: pinned horizontal scroll with parallax outlined numbers + progress rail
- Footer: giant INFOTECH wordmark parallax-rise

## TODO before launch

- [ ] Wire `components/forms/ContactForm.tsx` to a real endpoint (Resend / API route)
- [ ] Replace placeholder copy, phone, email, domain in `content/site.ts` with client-approved content
- [ ] Real testimonials + company logos
- [ ] SEO: per-page OG images, sitemap, robots, JSON-LD
- [ ] Blog (client said 1–2 extra pages may come)
