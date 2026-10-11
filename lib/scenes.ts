// Procedural stand-ins for the three Seedance clips (BUILD-PLAN.md §6).
// Each draws one frame for a scroll progress `p` (0–1) and time `t` (seconds).

export type SceneKind = "orbit" | "builder" | "corridor";
type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: number) => void;

const GOLD = "217,183,126";
const GOLD_SOFT = "241,221,176";
const SAPPHIRE = "58,91,217";
const IVORY = "245,240,230";
const GLYPHS = ["{", "}", "<", "/>", "=>", "( )", "[ ]", ";", "#", "λ", "fn", "01"];

// Deterministic random so every visit looks the same
const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

function backdrop(ctx: CanvasRenderingContext2D, w: number, h: number, cx: number, cy: number, glow = 0.9) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.75);
  g.addColorStop(0, `rgba(19,34,74,${glow})`);
  g.addColorStop(0.55, "rgba(9,16,38,1)");
  g.addColorStop(1, "rgba(6,11,26,1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, Math.min(r, w / 2, h / 2));
}

/* ── Scene 1: THE ORBIT — particles and code glyphs orbiting a glowing figure ── */
const orbitPts = (() => {
  const r = rng(7);
  return Array.from({ length: 520 }, () => {
    const ring = r() < 0.7;
    return {
      a: r() * Math.PI * 2,
      rad: ring ? 0.55 + r() * 0.5 : 0.2 + r() * 1.3,
      y: ring ? (r() - 0.5) * 0.18 : (r() - 0.5) * 1.6,
      s: 0.6 + r() * 1.6,
      gold: r() < 0.35,
      glyph: r() < 0.06 ? GLYPHS[Math.floor(r() * GLYPHS.length)] : "",
      tw: r() * Math.PI * 2,
    };
  });
})();

const orbit: Draw = (ctx, w, h, t, p) => {
  const cx = w / 2, cy = h * 0.5, unit = Math.min(w, h) * 0.62;
  backdrop(ctx, w, h, cx, cy);
  const rot = p * Math.PI * 2 + t * 0.06;
  const tilt = 0.32;

  // central figure: soft sapphire column with a gold rim
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 2.3);
  let g = ctx.createRadialGradient(0, 0, 0, 0, 0, unit * 0.22);
  g.addColorStop(0, "rgba(58,91,217,0.45)");
  g.addColorStop(0.6, "rgba(58,91,217,0.12)");
  g.addColorStop(1, "rgba(58,91,217,0)");
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, unit * 0.22, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = `rgba(${GOLD},0.55)`;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = `rgba(${GOLD},0.9)`;
  ctx.shadowBlur = 18;
  const rim = rot % (Math.PI * 2);
  ctx.beginPath(); ctx.ellipse(0, 0, unit * 0.09, unit * 0.36, 0, rim - 0.9, rim + 0.9); ctx.stroke();
  ctx.restore();

  // orbital rings
  for (const [k, rr] of [[0, 0.62], [1, 0.95]] as const) {
    ctx.strokeStyle = `rgba(${GOLD},${k ? 0.1 : 0.18})`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, unit * rr, unit * rr * tilt, 0, 0, Math.PI * 2); ctx.stroke();
  }

  // particles, depth-sorted back to front
  const proj = orbitPts.map((q) => {
    const a = q.a + rot * (q.rad < 0.8 ? 1 : 0.6);
    const x = Math.cos(a) * q.rad, z = Math.sin(a) * q.rad;
    const sc = 1.6 / (1.6 + z);
    return { q, x: cx + x * unit * sc, y: cy + (q.y + z * tilt) * unit * sc, z, sc };
  }).sort((a, b) => b.z - a.z);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const { q, x, y, z, sc } of proj) {
    const depth = 1 - (z + 1.5) / 3;
    const alpha = Math.max(0.08, Math.min(1, 0.25 + depth * 0.85)) * (0.75 + 0.25 * Math.sin(t * 2 + q.tw));
    const col = q.gold ? GOLD : z < 0 ? IVORY : SAPPHIRE;
    if (q.glyph) {
      ctx.fillStyle = `rgba(${GOLD_SOFT},${alpha * 0.8})`;
      ctx.font = `${Math.round(11 * sc + 4)}px "JetBrains Mono", monospace`;
      ctx.fillText(q.glyph, x, y);
    } else {
      ctx.fillStyle = `rgba(${col},${alpha})`;
      ctx.beginPath(); ctx.arc(x, y, q.s * sc, 0, Math.PI * 2); ctx.fill();
    }
  }

  // floor glow
  g = ctx.createRadialGradient(cx, h * 0.98, 0, cx, h * 0.98, w * 0.5);
  g.addColorStop(0, `rgba(${GOLD},0.12)`);
  g.addColorStop(1, `rgba(${GOLD},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
};

/* ── Scene 2: NIGHT SHIFT — holographic panels, slow push-in ── */
const panels = (() => {
  const r = rng(21);
  const kinds = ["code", "phone", "chart", "grid", "code", "terminal", "code", "chart", "phone", "grid", "code"];
  return kinds.map((kind, i) => {
    const ang = -1.1 + (i / (kinds.length - 1)) * 2.2;
    return {
      kind,
      x: Math.sin(ang) * 900 + (r() - 0.5) * 120,
      y: (r() - 0.5) * 520 - 40,
      z: 900 + Math.cos(ang) * -420 + r() * 500,
      w: kind === "phone" ? 150 : 260 + r() * 140,
      h: kind === "phone" ? 300 : 160 + r() * 90,
      ph: r() * Math.PI * 2,
      lines: Array.from({ length: 9 }, () => 0.25 + r() * 0.7),
    };
  });
})();

const builder: Draw = (ctx, w, h, t, p) => {
  const cx = w * 0.62, cy = h * 0.48;
  backdrop(ctx, w, h, cx, cy, 0.75);
  const f = Math.min(w, h) * 1.1;
  const camZ = p * 520;

  const list = panels.map((pn) => ({ pn, z: pn.z - camZ })).filter((o) => o.z > 120).sort((a, b) => b.z - a.z);
  for (const { pn, z } of list) {
    const sc = f / z;
    const fy = Math.sin(t * 0.6 + pn.ph) * 10;
    const x = cx + pn.x * sc, y = cy + (pn.y + fy) * sc;
    const pw = pn.w * sc, ph = pn.h * sc;
    const a = Math.min(1, 300 / z) * 0.95;

    ctx.save();
    ctx.shadowColor = `rgba(${SAPPHIRE},${0.6 * a})`;
    ctx.shadowBlur = 30 * sc;
    roundRect(ctx, x - pw / 2, y - ph / 2, pw, ph, 14 * sc);
    ctx.fillStyle = `rgba(20,36,84,${0.38 * a})`;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = `rgba(${GOLD},${0.55 * a})`;
    ctx.lineWidth = Math.max(0.6, 1.1 * sc);
    roundRect(ctx, x - pw / 2, y - ph / 2, pw, ph, 14 * sc);
    ctx.stroke();

    const pad = 16 * sc, ix = x - pw / 2 + pad, iy = y - ph / 2 + pad, iw = pw - pad * 2, ih = ph - pad * 2;
    if (pn.kind === "code" || pn.kind === "terminal") {
      const n = pn.kind === "terminal" ? 7 : 6, lh = ih / n;
      const scroll = pn.kind === "terminal" ? Math.floor(t * 2) : 0;
      for (let k = 0; k < n; k++) {
        const len = pn.lines[(k + scroll) % pn.lines.length];
        ctx.fillStyle = k % 3 === 0 ? `rgba(${GOLD},${0.7 * a})` : `rgba(${IVORY},${0.35 * a})`;
        ctx.fillRect(ix + (k % 2) * 14 * sc, iy + k * lh, iw * len * 0.85, Math.max(1, lh * 0.32));
      }
    } else if (pn.kind === "chart") {
      const bars = 8;
      for (let k = 0; k < bars; k++) {
        const v = 0.3 + 0.6 * Math.abs(Math.sin(k * 1.3 + t * 0.8 + pn.ph));
        ctx.fillStyle = k === 5 ? `rgba(${GOLD},${0.85 * a})` : `rgba(${SAPPHIRE},${0.75 * a})`;
        const bw = iw / bars;
        ctx.fillRect(ix + k * bw + bw * 0.2, iy + ih * (1 - v), bw * 0.6, ih * v);
      }
    } else if (pn.kind === "grid") {
      for (let k = 0; k < 4; k++) {
        const gx = ix + (k % 2) * (iw / 2), gy = iy + Math.floor(k / 2) * (ih / 2);
        roundRect(ctx, gx + 3, gy + 3, iw / 2 - 6, ih / 2 - 6, 6 * sc);
        ctx.fillStyle = k === 0 ? `rgba(${GOLD},${0.35 * a})` : `rgba(${SAPPHIRE},${0.4 * a})`;
        ctx.fill();
      }
    } else {
      roundRect(ctx, ix, iy, iw, ih * 0.3, 8 * sc);
      ctx.fillStyle = `rgba(${SAPPHIRE},${0.7 * a})`;
      ctx.fill();
      for (let k = 0; k < 4; k++) {
        ctx.fillStyle = `rgba(${IVORY},${0.3 * a})`;
        ctx.fillRect(ix, iy + ih * (0.42 + k * 0.13), iw * (k === 3 ? 0.6 : 1), Math.max(1, ih * 0.06));
      }
    }
  }

  // desk edge + light
  const deskY = h * 0.86;
  const g = ctx.createLinearGradient(0, deskY, 0, h);
  g.addColorStop(0, `rgba(${GOLD},0.16)`);
  g.addColorStop(1, "rgba(6,11,26,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, deskY, w, h - deskY);
  ctx.fillStyle = `rgba(${GOLD},0.45)`;
  ctx.fillRect(w * 0.25, deskY, w * 0.75, 1);
};

/* ── Scene 3: OPEN DOOR — a gallery corridor of glowing frames, golden light ahead ── */
const corridor: Draw = (ctx, w, h, t, p) => {
  const cx = w / 2, cy = h * 0.46;
  backdrop(ctx, w, h, cx, cy, 0.6);
  const f = Math.min(w, h) * 0.9;
  const W = 420, top = -260, bottom = 300, D = 520, N = 12;
  const travel = p * D * 5 + t * 18;

  // end-of-corridor light
  let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * (0.25 + p * 0.55));
  g.addColorStop(0, `rgba(${GOLD_SOFT},${0.55 + p * 0.35})`);
  g.addColorStop(0.35, `rgba(${GOLD},${0.18 + p * 0.2})`);
  g.addColorStop(1, `rgba(${GOLD},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // floor and ceiling guide lines
  ctx.strokeStyle = `rgba(${GOLD},0.12)`;
  ctx.lineWidth = 1;
  for (const s of [-1, -0.5, 0, 0.5, 1]) {
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + s * w * 1.2, h); ctx.stroke();
  }

  const proj = (x: number, y: number, z: number) => ({ x: cx + (x * f) / z, y: cy + (y * f) / z });
  const frames: { side: number; z: number; k: number }[] = [];
  for (let k = 0; k < N; k++) {
    const z = ((k * D - travel) % (N * D) + N * D) % (N * D) + 60;
    frames.push({ side: -1, z, k }, { side: 1, z: z + D / 2, k: k + 100 });
  }
  frames.sort((a, b) => b.z - a.z);

  for (const { side, z, k } of frames) {
    const len = D * 0.62;
    const a = proj(side * W, top, z), b = proj(side * W, top, z + len);
    const c = proj(side * W, bottom * 0.35, z + len), d = proj(side * W, bottom * 0.35, z);
    const fade = Math.max(0, Math.min(1, 1 - z / (N * D))) * Math.min(1, z / 200);
    const hue = k % 3 === 0 ? GOLD : SAPPHIRE;

    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.closePath();
    g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    g.addColorStop(0, `rgba(${hue},${0.42 * fade})`);
    g.addColorStop(1, `rgba(${hue},${0.12 * fade})`);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = `rgba(${GOLD},${0.6 * fade})`;
    ctx.lineWidth = Math.max(0.5, (f / z) * 2);
    ctx.stroke();

    // floor reflection
    const ra = proj(side * W, bottom, z), rb = proj(side * W, bottom, z + len);
    ctx.strokeStyle = `rgba(${hue},${0.25 * fade})`;
    ctx.beginPath(); ctx.moveTo(ra.x, ra.y); ctx.lineTo(rb.x, rb.y); ctx.stroke();
  }

  // pooled light on the floor
  g = ctx.createRadialGradient(cx, h, 0, cx, h, w * 0.45);
  g.addColorStop(0, `rgba(${GOLD},${0.1 + p * 0.12})`);
  g.addColorStop(1, `rgba(${GOLD},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
};

export const scenes: Record<SceneKind, Draw> = { orbit, builder, corridor };
