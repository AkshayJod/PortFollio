# Akshay Khobragade — Portfolio

A cinematic, scroll-driven developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**,
**GSAP + ScrollTrigger** and **Lenis** smooth scrolling. Midnight-navy and champagne-gold design, huge kinetic
typography, pinned scroll scenes, film grain, custom cursor and magnetic buttons.

The full creative brief and spec is in **[BUILD-PLAN.md](BUILD-PLAN.md)**.

## Edit your content

Everything — copy, links, stats, projects — lives in [`data/site.ts`](data/site.ts).
Set `links.email` or `links.resume` there and the Email / Résumé buttons appear automatically.

## Cinematic videos

The hero, story and contact sections are built for three AI-generated clips (Higgsfield Seedance 2.0).
Until they exist, each section renders a procedural canvas scene. Drop the clips into
[`public/assets/video/`](public/assets/video/README.md) (`hero.mp4`, `builder.mp4`, `arrival.mp4` + `-mobile` versions)
and they're scrubbed by scroll automatically.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy

- **Vercel** (easiest): import the repo at vercel.com — no configuration needed.
- **GitHub Pages**: repo **Settings → Pages → Source: GitHub Actions**. The workflow in
  `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
