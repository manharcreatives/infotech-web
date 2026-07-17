# Decisions & Conflicts Log

Running record of deliberate deviations from spec, resolved against the codebase
as-found. Newest entries at the top.

---

## 2026-07-17 — Preloader: SVG logo assembly animation (Manhar Creatives / Cowork)

Replaced the placeholder logo-reveal beat of the homepage preloader with an
SVG-driven, per-face "Netflix-style" logo assembly. The following required
judgement calls; none were resolved silently.

### D1 — Scope conflict (SRS §1 vs client instruction)
The SRS said "replace only the logomark-reveal beat and keep the AMBITION →
STRATEGY → ARRIVAL word sequence." Two facts overrode a literal reading:
1. **That word sequence does not exist in the codebase.** The shipped
   `components/global/Preloader.tsx` was a simple PNG logo scale-in + glow
   sweep + zoom-out + curtain-split. There is no "Kinetic Glyph Assembly"
   word phase to preserve.
2. The client explicitly chose *"fresh preloader, logo only"* — remove the
   whole existing preloader body and build a new one (faces converge →
   assemble → zoom → hero).

**Decision:** Rebuilt the preloader body as the logo-assembly sequence. The
hero **handoff was preserved untouched** — `markPreloaderDone()` /
`ip:preloader-done`, the curtain-split panels, and `CinematicMask`'s iris are
reused exactly, so `HeroSection` entrance timing is unchanged.

### D2 — Brand colour fidelity, and a banned colour inside the official asset
§4 lists exact face hexes; §9 bans blue "anywhere." The uploaded/official SVG
(`public/logo.svg`) is the source of truth, so its own per-face gradients were
**preserved** rather than overwritten with the §4 approximations (which are
close but not identical). Two exceptions were unavoidable:
- The official mark contains a **banned blue stop `#14458D`** in one inner
  facet (`paint8_linear`). Per §9 this cannot appear in the animation, so in
  the animated **inline copy only** it was recoloured to `#3D1B63` (brand
  Inner-Face deep). It blends to `#C65CFF` exactly as before.
- Wordmark `fill="white"` was mapped to brand `#F8F7FB` (`--color-fg`) to keep
  strictly on-palette.

`public/logo.svg` (the master asset) was **not** modified. **Flag for Utsav:**
the master logo asset itself still carries the `#14458D` blue — recommend
correcting it at source so every downstream use stays on-brand.

### D3 — Play frequency (SRS §3.6 / §7: "once per session")
§7 asked us to flag if the once-per-session assumption is wrong for the current
codebase. **It is.** The preloader has no persisted flag — `lib/preloader.ts`'s
`isPreloaderDone()` always returns `false` and the component runs on **every
full page load / refresh**, skipped only during in-app route transitions.

**Decision:** Preserved the existing every-full-load behaviour. It matches both
the codebase architecture and the client's literal "Netflix plays on every cold
start" instruction. **No session/local-storage gate was added.** If a
once-per-session gate is desired for conversion reasons, it is a small, separate
change (guard in `useGSAP` on a `sessionStorage` flag) — raised here for review.

### D4 — Skip control (SRS §6 assumed a shared skip already existed)
No skip affordance existed in the codebase. **Decision:** added an accessible
`Skip intro` button (real `<button>`, sharp 2px corners, brand colours, visible
`--color-glow` focus ring) plus an `Escape` shortcut. Both route through a
single shared `buildExit()` timeline — there is **no** second, divergent exit
path. The button sits outside the `aria-hidden` visual layers so it stays in the
accessibility tree and is reachable immediately; focus is never trapped.

### D5 — Easing (avoid a second animation dependency, §9)
The locked curve `cubic-bezier(0.16, 1, 0.3, 1)` was implemented as a tiny
dependency-free easing function (Newton–Raphson solve) passed straight to GSAP,
instead of pulling in GSAP's `CustomEase` plugin. Honours §9's "no unnecessary
bundle additions" and reuses the existing GSAP already in the bundle.
