# Image Generation — Status & Remaining Prompts (PURPLE palette)

**Tool:** ChatGPT Desktop (only sanctioned generator for this project).
**Authoritative palette:** the client's official **Brand Color System PDF** (purple) — supersedes the SRS v1.1 blue note. No blue in any asset.

**Brand color block — paste FIRST in every generation chat:**
> Use the InfoTech Placement brand color system; introduce NO colors outside it. Backgrounds/surfaces (60%): #09060F, #120A1A, #1A1027. Neutrals (30%): #F8F7FB, #CFC8DD, #8C859C. Brand accents (max 10%, focal point only): #B14EFF primary purple, #D56CFF secondary, #FF8DEB pink-purple glow, #6F28B9 deep purple. Gradient: #B14EFF → #D56CFF → #FF8DEB. Premium, minimal, high-end consulting brand. STRICT: no blue of any shade, no green/orange/red/yellow/teal, no pure black or white, no stock-photo look, no text, no logos.

## ✅ Generated in PURPLE & integrated (6 of 22)

| File | Used in | Verified |
|---|---|---|
| `/public/images/blog/how-to-get-a-job-in-usa-international-candidate.png` | Blog 1 featured | purple ✓ (pixel-hue checked) |
| `/public/images/blog/why-your-resume-is-getting-ignored-us-recruiters.png` | Blog 2 featured | purple ✓ |
| `/public/images/blog/it-job-opportunities-canada-skilled-professionals.png` | Blog 3 featured | purple ✓ |
| `/public/images/blog/mock-interviews-preparation-gets-you-hired-faster.png` | Blog 4 featured | purple ✓ |
| `/public/images/blog/recruitment-agency-vs-job-portal-which-gets-you-hired.png` | Blog 5 featured | purple ✓ (visual) |
| `/public/images/sections/philosophy-bg.png` | Home Statement section (18% opacity, revealed by existing clip-path sweep) | purple ✓ |

*Format note: ChatGPT Desktop outputs PNG; the task sheet's `.webp` filenames would mislabel the format. Kept as `.png` (matching code references). Convert to WebP at deploy time for §6.6 performance targets — a one-command batch step.*

## ⏳ Remaining (16) — purple prompts ready

Save to the exact paths; use the color block above first in the chat.

**Page heroes (16:9) — `/public/images/heroes/`** *(integration: add an `image` prop to `PageHero` when the full set is approved, so all pages change together)*
1. `about.png` — figure of flowing geometric light trails ascending upward; #B14EFF trails, #FF8DEB glow highlights.
2. `process.png` — interconnected nodes forming an upward path; #B14EFF nodes, #FF8DEB at the apex.
3. `services.png` — layered semi-transparent geometric planes at depth, lit from upper-left with #B14EFF; #D56CFF→#FF8DEB highlights.
4. `contact.png` — glowing orbs connected by fine lines suggesting a global network; #B14EFF glow, #FF8DEB ambient.
5. `refer.png` — two glowing shapes joined by a luminous bridge; #B14EFF primary, #D56CFF secondary, #6F28B9 shadows.
6. `terms.png` — precise structured grid, soft #B14EFF→#F8F7FB gradient from upper right.
7. `privacy-policy.png` — glowing shield of geometric light particles; #B14EFF light, #FF8DEB outer glow.

**Method step icons (square) — `/public/images/steps/step-1.png … step-7.png`**
1. node-diagram human silhouette (#B14EFF, #D56CFF glow) · 2. glowing document, one highlighted line (#B14EFF vs muted purple-grey) · 3. radiating signal waves from a #B14EFF orb, #FF8DEB outer wave · 4. geometric checkmark/seal (#B14EFF, #FF8DEB glow) · 5. two forms joined by a #B14EFF bridge line · 6. balanced light scales (#B14EFF, #D56CFF) · 7. luminous upward trajectory (#B14EFF rising to #FF8DEB).

**Section backgrounds — `/public/images/sections/`**
- `process-bg.png` — barely-visible grid + soft radial #B14EFF glow at very low saturation, no focal point (10–15% opacity use).
- `faq-visual.png` (≈4:3) — glowing question marks in #D56CFF dissolving into light lines, resolution point in #B14EFF with #FF8DEB ambient. *(Optional — the FAQ left rail currently uses category nav + stat block by design.)*

**Workflow that works:** paste color block → paste image prompt → ~90s → click share icon on image → Download → in Save As, select the filename field and type the full target path → Save (→ Yes on the replace dialog when overwriting).
