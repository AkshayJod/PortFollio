# Cinematic clips

Drop the Higgsfield Seedance 2.0 clips here (see BUILD-PLAN.md §5–6). The site picks them up automatically —
until then each scene renders its procedural canvas stand-in.

| File | Scene |
|---|---|
| `hero.mp4` / `hero-mobile.mp4` | Scene 1 — The Orbit |
| `builder.mp4` / `builder-mobile.mp4` | Scene 2 — Night Shift |
| `arrival.mp4` / `arrival-mobile.mp4` | Scene 3 — Open Door |

Encode with a short keyframe interval so scroll-scrubbing is smooth:

```bash
ffmpeg -i raw/hero.mp4 -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 23 \
  -x264-params keyint=6:min-keyint=6:scenecut=0 -pix_fmt yuv420p -movflags +faststart -an hero.mp4
```
