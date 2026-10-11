# Akshay Khobragade — Portfolio

A modern, responsive, single-page portfolio. Plain HTML/CSS/JS — no build step.

**Features:** dark/light theme, animated gradient hero with typing roles, project filters,
cursor-glow cards, scroll-reveal animations, experience timeline, mobile menu,
and `prefers-reduced-motion` support.

## Edit your content

Everything lives in [`js/data.js`](js/data.js) — name, roles, about, skills, projects,
experience, education and links. Sections with an empty list are hidden automatically.
Drop a photo or résumé into `assets/` and set `photo` / `resume` in `data.js`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)

Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick the branch and `/ (root)`.
It also works as-is on Vercel or Netlify.
