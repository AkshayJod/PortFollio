# Akshay Khobragade — Portfolio

A modern, responsive, single-page portfolio built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**,
exported as a fully static site.

**Features:** dark/light theme (no flash on load), animated gradient hero with typing roles, project filters,
cursor-glow cards, scroll-reveal animations, experience timeline, mobile menu, self-hosted fonts via `next/font`,
and `prefers-reduced-motion` support.

## Edit your content

Everything lives in [`data/portfolio.ts`](data/portfolio.ts) — name, roles, about, skills, projects,
experience, education and links. It's typed, so mistakes show up in your editor. Sections with an empty list
are hidden automatically. Drop a photo or résumé into `public/` and set `photo` / `resume` in `portfolio.ts`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Project structure

```
app/          layout (fonts, metadata, theme), page, global styles, favicon
components/   Nav, TypedRoles, Projects, RevealOnScroll, Icons
data/         portfolio.ts — all site content
public/       static files (photo, résumé)
```

## Deploy

- **Vercel** (easiest): import the repo at vercel.com — no configuration needed.
- **GitHub Pages**: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
  The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.
