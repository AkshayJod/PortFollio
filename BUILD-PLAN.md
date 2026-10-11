# MASTER BUILD PLAN — Akshay Khobragade · Developer Portfolio

> Creative brief + implementation spec for Claude Code.
> Version 1.1 · Status: **Built** · Output: Next.js 16 app (App Router, TypeScript) exported as a static site

---

## PART ONE — CREATIVE BRIEF

### 1. Website overview

| | |
|---|---|
| **Client** | Akshay Khobragade |
| **Type** | Personal developer portfolio |
| **Primary goal** | Land a full-time developer role. Every section moves a recruiter or hiring manager one step closer to "let's talk". |
| **Audience** | Recruiters (30-second skim), engineering managers (want proof of craft), founders hiring early engineers (want range and ownership). |
| **One-liner** | I build fast, polished web and mobile apps. |
| **Primary CTA** | **Hire me** → LinkedIn (where recruiters already are). Secondary: GitHub. Email and résumé switch on automatically once added to `data/site.ts`. |
| **Success metric** | Visitors reach the final CTA; LinkedIn and GitHub clicks. |

The site should feel like the opening titles of a film about a builder — then get out of the way and let the work speak.

### 2. Core positioning

**Positioning statement**
For teams who care how software *feels*, Akshay is a full-stack developer who ships web and mobile products end to end — from React interfaces and React Native apps to Django back ends, real-time systems and ML prototypes. Unlike developers who stop at "it works", he sweats the last 10%: speed, motion, polish.

**Headline system**

- Hero: **Akshay Khobragade** — *I build fast, polished web & mobile apps.*
- Kinetic line: **Code with taste.**
- Mission: *I'm looking for a team that cares about craft — and I'll bring software that feels as good as it works.*
- Close: **Let's build what's next.**

**Proof points (from real work only)**
- Shipped a learning-management **mobile app** and **web platform** used by students, parents and schools.
- Built **real-time** products: FusionMeet (browser video meetings) and a Django + WebSockets chat app.
- Trained an **ML model** that classifies tumours as benign or malignant.
- 25+ public repositories, building since 2022.

### 3. Brand personality

| Trait | Means | Never |
|---|---|---|
| **Luxury** | Restraint, space, gold used like jewellery — sparingly | Bling, gradients everywhere |
| **Premium** | Every pixel and easing curve considered | Template-y sections, stock icons |
| **Cinematic** | Scenes, pacing, light, scroll as a camera | Gimmicks that delay content |
| **Playful** | Soft-serif wobble, cursor that talks back, a wink at the end | Memes, emoji, clutter |

Voice: confident, warm, concise. First person. Short sentences. No buzzword soup.

### 4. Visual direction

**Midnight luxury.** A deep navy void lit by champagne gold, like a private screening room. Ivory type. One section flips to ivory paper with navy ink for contrast — the "daylight" moment in the film. Sapphire glows add depth; a single rosé accent appears only in playful micro-moments (cursor label, availability pulse).

References in spirit: luxury watch launches, A24 title cards, Apple product films, Awwwards SOTD portfolios.

### 5. Higgsfield Seedance 2.0 — asset generation

**Identity reference:** use the reference photo in the project's **`Media/`** folder (e.g. `Media/akshay-reference.jpg` — use whatever file is there) as the **character/identity reference for every generation**, so Akshay's face, build, hair and skin tone stay consistent across all three scenes.

**Global settings (all clips)**

| Setting | Value |
|---|---|
| Model | Higgsfield **Seedance 2.0** |
| Resolution | **1080p** (1920×1080) desktop · plus a **1080×1920** vertical cut for mobile |
| Duration | **10 s** (allowed range 8–12 s) |
| Frame rate | 24 fps |
| Camera | Smooth, motivated, no handheld shake, no fast cuts |
| Grade | Deep navy shadows (#060B1A), champagne-gold highlights (#D9B77E), soft sapphire fill, filmic contrast, light grain |
| Wardrobe | Black or deep-navy fitted crew-neck / overshirt, minimal, no logos |
| Negative prompt | cartoon, plastic skin, extra fingers, distorted face, text, watermark, logos, lens flare spam, neon cyberpunk, cheesy motivational pose, fast camera shake |

**Style**: three **separate** shots (not one continuous take) — each one shows a different side of Akshay: *who he is*, *how he works*, *where he's going*.

### 6. Three cinematic scenes

#### Scene 1 — "THE ORBIT" (Hero) → `public/assets/video/hero.mp4`, `public/assets/video/hero-mobile.mp4`
> Akshay stands calm and confident in a black-navy void studio. A champagne-gold rim light traces his silhouette; a soft sapphire glow fills from below. Tiny luminous particles — like floating code glyphs — drift slowly around him. The camera performs one slow, perfectly smooth 360° orbit at chest height. He holds a relaxed, self-assured expression and, near the end, a subtle half-smile. Premium, cinematic, quiet confidence. Not a motivational-speaker pose.

Scroll role: scrubbed by scroll — the visitor *drives* the orbit.

#### Scene 2 — "NIGHT SHIFT" (Story) → `public/assets/video/builder.mp4`, `public/assets/video/builder-mobile.mp4`
> Night. Akshay sits at a minimal dark walnut desk in a navy-black room. Floating translucent holographic panels arc around him: a mobile app screen, a React component tree, a terminal with scrolling logs, a grid of video-call tiles, a softly glowing ML chart. He gestures and a panel slides forward. Champagne-gold key light on his face, sapphire light from the panels. Slow cinematic push-in from wide to medium close-up. Focused, creative, in flow.

Scroll role: scrubbed behind the Story chapters.

#### Scene 3 — "OPEN DOOR" (Final CTA) → `public/assets/video/arrival.mp4`, `public/assets/video/arrival-mobile.mp4`
> Akshay walks slowly toward camera down a long, dark gallery corridor lined on both sides with glowing framed screens showing his projects — app interfaces, dashboards, video calls. Gold light pools on the polished floor. He stops in a relaxed hero stance, looks into the lens, and gives a small, playful nod and smile — an invitation. Camera dollies back as he approaches. Warm, welcoming, premium.

Scroll role: scrubbed under the final "Let's build what's next." CTA.

**Post-processing (required for smooth scroll-scrubbing)**

```bash
# Re-encode with a short keyframe interval so seeking is instant, strip audio, web-optimise
ffmpeg -i raw/hero.mp4 -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 23 \
  -x264-params keyint=6:min-keyint=6:scenecut=0 -pix_fmt yuv420p -movflags +faststart -an public/assets/video/hero.mp4
ffmpeg -i raw/hero-vertical.mp4 -vf "scale=1080:-2" -c:v libx264 -preset slow -crf 25 \
  -x264-params keyint=6:min-keyint=6:scenecut=0 -pix_fmt yuv420p -movflags +faststart -an public/assets/video/hero-mobile.mp4
# Poster frame (shown instantly, before video loads)
ffmpeg -i public/assets/video/hero.mp4 -frames:v 1 -q:v 3 public/assets/img/hero-poster.jpg
```
Repeat for `builder` and `arrival`. Target ≤ 6 MB per desktop clip, ≤ 3 MB per mobile clip.

*Optional image-sequence variant* (smoothest on iOS): `ffmpeg -i public/assets/video/hero.mp4 -vf fps=24,scale=1600:-2 -q:v 70 public/assets/frames/hero/%04d.webp`.

**Until the videos exist**, every scene renders a **procedural canvas stand-in** in the same palette (orbiting particle field, floating holographic panels, glowing corridor) driven by the same scroll progress — so the site is complete and cinematic on day one, and simply upgrades itself when the `.mp4` files are dropped into `public/assets/video/`.

---

## PART TWO — EXPERIENCE DESIGN

### 7. Website structure

```
00  Preloader          — counter 000→100, name reveal, curtain lift
01  Hero               — pinned, Scene 1 scrubbed, kinetic name
02  Stats strip        — animated counters + infinite tech marquee
03  Mission            — ivory "daylight" section, words ignite on scroll
04  Three pillars      — pinned horizontal scroll: Interfaces · Mobile · Systems & AI
05  Story              — pinned, Scene 2 scrubbed, four chapters
06  What I bring       — capabilities list with hover reveals + toolkit
07  Featured work      — 3 stacking case-study cards + full project index
08  Final CTA          — pinned, Scene 3 scrubbed, "Let's build what's next."
09  Footer             — giant wordmark, live IST clock, links
```

Persistent UI: top bar (monogram, availability pill, menu), fullscreen menu, custom cursor, scroll progress line, film grain.

### 8. Hero section

- **Layout**: full-viewport stage, pinned for ~1.5 screens. Video/canvas fills the frame, vignette + navy gradient at the bottom for legibility.
- **Eyebrow** (mono, gold): `PORTFOLIO — ${year} · FULL-STACK DEVELOPER`
- **Name**: `AKSHAY` / `KHOBRAGADE` in Fraunces, ~16–19vw, letters rise from a mask with stagger on load.
- **Sub**: *I build fast, polished web & mobile apps — from real-time video platforms to learning systems used by schools.*
- **CTAs**: `Hire me ↗` (gold, magnetic, → LinkedIn) · `See the work` (ghost, → #work)
- **On scroll**: orbit scrubs; the name tracks apart and fades up; a second line, **"Code with taste."**, slides in; the frame scales from 1 → 0.92 with rounded corners as the section hands off.
- Scroll cue: "Scroll to begin" with a gold line that drips.

### 9. Animated stats strip

- Four counters count up when visible: **25+ Repositories · 10+ Projects shipped · 4 Disciplines · 2022 Building since**.
- Below: an infinite, scroll-velocity-reactive marquee of the stack — React · Next.js · TypeScript · React Native · Expo · Python · Django · Node.js · WebSockets · WebRTC · Machine Learning — separated by gold ✦.
- Marquee direction flips with scroll direction (playful).

### 10. Mission section

- Background flips to **ivory** (#F5F0E6) with navy ink — the "daylight" beat.
- Label: `01 — Mission`
- Statement, ~6vw Fraunces: *"I'm looking for a team that cares about craft — and I'll bring software that feels as good as it works."*
- Each word starts at 15% opacity and ignites to 100% as it's scrolled past (scrubbed). "craft" and "feels" in italic gold.

### 11. Three pillars section

Pinned horizontal track on desktop (vertical stack on mobile). Each panel: giant numeral, title, one-line promise, stack chips, abstract glyph.

| # | Pillar | Promise | Stack |
|---|---|---|---|
| 01 | **Interfaces** | Web that feels instant. | React · Next.js · TypeScript · Vite |
| 02 | **Mobile** | Apps people keep. | React Native · Expo · TypeScript |
| 03 | **Systems & AI** | Back ends that hold up. Models that learn. | Python · Django · Node.js · WebSockets · ML |

### 12. Story section

Pinned stage with Scene 2 scrubbed behind; four chapters cross-fade as you scroll, with a gold progress rail.

1. **Chapter 01 — The first commit.** I learned by rebuilding the sites I admired — Netflix, Nike — pixel by pixel, until polish became a habit.
2. **Chapter 02 — Going real-time.** Then I wanted things to *move*: a Django + WebSockets chat app, FusionMeet for live video calls, a Discord bot people actually used.
3. **Chapter 03 — Teaching machines.** Curiosity pulled me into ML — I trained a model that helps classify tumours as benign or malignant.
4. **Chapter 04 — Shipping for real users.** Today I build a learning platform end to end: a React Native app and web frontends for students, parents and schools.

*(No invented dates or employers — chapters are labelled, not dated. Add years once confirmed.)*

### 13. Product / Service / Community → "What I bring"

For a job-seeking developer this becomes the **capabilities** section. Large hover rows (title grows, gold arrow slides in, short description reveals):

- **Product engineering** — From idea to shipped, owning the whole stack.
- **Mobile apps** — Cross-platform React Native and Expo apps with native feel.
- **Real-time systems** — WebSockets, WebRTC, live data that never lags.
- **APIs & back ends** — Django and Node services that are clean and boring in the best way.
- **ML prototypes** — From notebook to a model that answers a real question.

Followed by a **toolkit** grid of chips grouped Frontend / Mobile / Backend / Data & ML / Tools.

### 14. Featured work section

- **Three stacking case cards** (sticky; each new card slides over and the previous scales back): ABL LMS Mobile App, LMS Web Platform, FusionMeet. Each card has a CSS-built device mockup (phone / browser / video grid), title, summary, tags and links. Private repos show a "Private · NDA" badge.
- **Project index** below: big Fraunces rows — Real-time Chat App, Breast Cancer Detection, FinTejo, Recipe Finder, Discord Bot, Netflix Clone, Nike Landing Page. Hovering a row shows a cursor-following preview tile; clicking opens the repo.
- Closing link: "More on GitHub ↗".

### 15. Final CTA section

- Pinned; Scene 3 scrubbed full-bleed.
- Kinetic headline: **Let's build** / **what's next.** — words scale up from the depth of the corridor as you scroll.
- Copy: *Open to full-time roles. I reply within a day.*
- Buttons: `Hire me on LinkedIn ↗` (gold, magnetic) · `GitHub ↗` · `Email` / `Résumé` (auto-appear when set in `data/site.ts`).

### 16. Footer

- Giant outlined wordmark **AKSHAY** that fills with gold on hover.
- Live clock: `India · 21:04 IST`.
- Links: LinkedIn · GitHub · (Email). "Designed & built by Akshay Khobragade." · "Back to top ↑" (smooth scroll).

---

## PART THREE — DESIGN SYSTEM

### 17. Complete visual style guide

**Colour tokens**

| Token | Hex | Use |
|---|---|---|
| `--midnight` | `#060B1A` | Page background |
| `--navy` | `#0B1633` | Cards, panels |
| `--navy-2` | `#13224A` | Raised surfaces, borders |
| `--sapphire` | `#3A5BD9` | Glows, depth, focus rings |
| `--gold` | `#D9B77E` | Primary accent, CTAs, numerals |
| `--gold-soft` | `#F1DDB0` | Gold highlights, hover |
| `--ivory` | `#F5F0E6` | Primary text; Mission background |
| `--mist` | `#8C96B3` | Secondary text |
| `--rose` | `#F0A6A0` | Playful micro-accents only |

Rules: gold ≤ 10% of any screen. Never gold on ivory for body text. Body text contrast ≥ 4.5:1.

**Texture**: global film grain (SVG noise, 6–8% opacity, stepped animation). Soft radial sapphire glows behind key sections. Thin 1px hairlines in `rgba(241,221,176,.14)`.

**Shape**: radii 4px (chips) / 24px (cards) / 40px (stage frames). Buttons are full pills.

### 18. Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Fraunces** (variable, opsz 9–144, 300–800, italic) | Soft, slightly wonky serif — luxury with a wink. Tight tracking (−0.04em) at huge sizes. |
| Body / UI | **Inter Tight** 400/500/600 | Clean, compact, modern. |
| Labels | **JetBrains Mono** 400/500 | Uppercase, +0.14em tracking, for eyebrows, numbers, meta. |

Scale (fluid `clamp`): Hero 16–19vw · H1 7vw · H2 4.5vw · Lead 1.25rem · Body 1rem · Label .75rem.

### 19. Animation direction

- **Easing**: `expo.out` for reveals, `power3.inOut` for transitions, `none` for scroll-scrubs. Durations 0.9–1.4s for reveals; nothing under 0.25s except hovers.
- **Text**: line/word/char mask reveals (`yPercent: 110 → 0`, stagger 0.02–0.06).
- **Scrubs**: video/canvas progress, mission word ignition, hero name tracking, CTA headline depth — all tied to scroll with `scrub: 0.6–1`.
- **Ambient**: grain, slow glow drift, marquee. Nothing loops faster than 6s except the marquee.
- **Reduced motion**: all scrubs/pins disabled, content shown statically, videos show poster frames.

### 20. Interaction design

- **Custom cursor**: 8px ivory dot + 40px ring that lags; ring grows and shows a label (`View`, `Open`, `Hire`) over interactive targets; blends with `difference`. Disabled on touch.
- **Magnetic buttons**: CTAs pull toward the pointer (strength 0.35) and spring back.
- **Hover states**: links underline from left in gold; capability rows expand; project rows show a following preview.
- **Menu**: fullscreen navy overlay, giant Fraunces links that stagger in; `Esc` closes.
- **Focus**: visible 2px sapphire ring for keyboard users.

### 21. Scroll behavior

- **Lenis** smooth scroll (`lerp 0.1`), synced to GSAP's ticker; ScrollTrigger updates on every Lenis scroll.
- Anchor links route through `lenis.scrollTo` with offset.
- Pinned sections: Hero (+150%), Pillars (+track width), Story (+300%), Final CTA (+150%).
- Scroll progress hairline at the top in gold.
- Velocity feeds the marquee speed and skews project rows very slightly (max 3°).

### 22. Mobile behavior

- Breakpoints: ≤ 900px tablet, ≤ 600px phone.
- Vertical `-mobile.mp4` sources are used automatically under 768px.
- Pillars stack vertically (no horizontal pin). Story chapters stack beneath a shorter pinned stage.
- Lenis keeps native touch scrolling (`syncTouch: false`) for natural momentum.
- Custom cursor and magnetic effects off; tap targets ≥ 44px; menu becomes the primary nav.
- No horizontal page scroll at 360px width; 16px side gutters.

### 23. Technical implementation

**Stack** — **Next.js 16** (App Router) · **React 19** · **TypeScript** · **GSAP 3 + ScrollTrigger** · **Lenis**, all from npm.
`output: "export"` turns the build into plain static files in `out/` — no server needed.
*(v1.0 of this plan specified plain HTML/CSS/JS with CDN scripts; changed to Next.js at the client's request.)*

```
app/
  layout.tsx        fonts via next/font (Fraunces, Inter Tight, JetBrains Mono), metadata, `js` boot class
  page.tsx          section order
  globals.css       the whole design system (tokens, type, sections, responsive, reduced motion)
  icon.svg          favicon
components/
  Chrome.tsx        preloader, grain, progress line, cursor, top bar, fullscreen menu
  Sections.tsx      Hero, Stats, Mission, Pillars, Story, Bring, Work, Contact, Footer (server-rendered)
  Scene.tsx         video + canvas layer for each cinematic scene
  Mockups.tsx       CSS device mockups for the case cards
  Experience.tsx    client component that boots the motion engine
lib/
  experience.ts     Lenis + ScrollTrigger: preloader, split text, pins, scrubs, cursor, magnetic, menu, clock
  scenes.ts         procedural canvas stand-ins (orbit, builder, corridor)
  asset.ts          base-path helper for GitHub Pages
data/
  site.ts           ALL copy, links, stats, projects — the only file to edit for content
public/assets/
  video/            hero.mp4, hero-mobile.mp4, builder.mp4, builder-mobile.mp4, arrival.mp4, arrival-mobile.mp4
  img/              posters, og image
  files/            resume.pdf (optional)
```

**Rendering model** — every section is a server component, so all text ships as real HTML (SEO, no-JS readable).
One client component (`Experience`) runs `initExperience()` after hydration and returns a full cleanup
(ScrollTriggers, Lenis, tickers, listeners), so it is safe under React Strict Mode and hot reload.

**Content config** — `data/site.ts`:
```ts
links: {
  linkedin: "https://www.linkedin.com/in/akshay-khobragade-4a281a263/",
  github: "https://github.com/AkshayJod",
  email: "",   // set to show Email buttons
  resume: "",  // e.g. "assets/files/resume.pdf"
}
```

**Scroll-scrubbed media** — each `.scene` holds a muted `playsInline` `<video>` and a `<canvas>`.
1. When the scene comes within 1.5 screens, the right source (`-mobile.mp4` under 768px) is loaded.
2. `loadeddata` → video mode: the section's ScrollTrigger progress drives `video.currentTime` (eased each frame). iOS is unlocked with a muted `play().then(pause)` on first touch.
3. Missing file / `error` → canvas mode: the procedural scene renders from the same progress value.
4. Scenes only render while on screen (checked by rect each frame — pinning re-parents the stage, which breaks IntersectionObserver); canvas DPR capped at 1.75.

**Performance budget**
- Fonts self-hosted and subset by `next/font`; only `transform` / `opacity` / `filter` animated.
- Videos load lazily per scene; posters/canvas show instantly.
- `prefers-reduced-motion`: no Lenis, no pins, no loader; all content static and visible.

**Accessibility & SEO** — semantic landmarks, one `<h1>` (with `aria-label`, split letters `aria-hidden`), skip link,
visible focus rings, `Esc` closes the menu, metadata + Open Graph from `layout.tsx`.

**Run & deploy**
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```
- **Vercel**: import the repo — zero config.
- **GitHub Pages**: Settings → Pages → Source: **GitHub Actions**; `.github/workflows/deploy.yml` builds with the repo base path and deploys `out/`.

**Build checklist for Claude Code**
1. Content in `data/site.ts`; markup in `components/Sections.tsx`; styles in `app/globals.css`.
2. Motion in `lib/experience.ts`; scenes in `lib/scenes.ts`.
3. Test in Chromium at 1440×900 and 390×844: no console errors (missing-video 404s excepted), no horizontal overflow, reduced-motion works.
4. When Seedance clips arrive: encode per §5, drop into `public/assets/video/`, rebuild — no code changes.
