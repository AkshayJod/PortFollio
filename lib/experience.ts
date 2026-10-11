import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { scenes, type SceneKind } from "./scenes";

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

/* ───────── Text splitting ───────── */

// Wrap every word of `el` (recursing into <em> etc.) in a mask + inner span.
function splitWords(el: HTMLElement, mode: "mask" | "plain") {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(" ");
          const word = document.createElement("span");
          if (mode === "mask") {
            word.className = "split-mask";
            const inner = document.createElement("span");
            inner.className = "split-inner";
            inner.textContent = part;
            word.append(inner);
          } else {
            word.className = "split-word";
            word.textContent = part;
          }
          frag.append(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
}

function splitChars(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  const text = el.textContent ?? "";
  el.textContent = "";
  for (const ch of text) {
    const mask = document.createElement("span");
    mask.className = "split-mask";
    const inner = document.createElement("span");
    inner.className = "split-inner";
    inner.textContent = ch;
    mask.append(inner);
    el.append(mask);
  }
}

/* ───────── Scenes: scroll-scrubbed video, or canvas fallback ───────── */

type SceneCtl = { progress: number; visible: boolean; render: (t: number) => void; destroy: () => void };

function createScene(root: HTMLElement): SceneCtl {
  const kind = root.dataset.scene as SceneKind;
  const canvas = $<HTMLCanvasElement>(".scene__canvas", root)!;
  const video = $<HTMLVideoElement>(".scene__video", root)!;
  const ctx = canvas.getContext("2d")!;
  const draw = scenes[kind];
  let w = 0, h = 0, useVideo = false, loaded = false;

  const ctl: SceneCtl = { progress: 0, visible: false, render, destroy };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    w = root.clientWidth; h = root.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(root);

  // Load the clip only when the scene is near the viewport
  const load = () => {
    if (loaded) return;
    loaded = true;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    video.src = (mobile && root.dataset.srcMobile) || root.dataset.src || "";
    video.preload = "auto";
    video.addEventListener("loadeddata", () => { useVideo = true; root.classList.add("has-video"); }, { once: true });
    video.addEventListener("error", () => { useVideo = false; video.removeAttribute("src"); }, { once: true });
    video.load();
  };
  // Visibility by rect, not IntersectionObserver: pinning re-parents the stage, which loses IO updates
  function render(t: number) {
    const r = root.getBoundingClientRect(), vh = window.innerHeight;
    if (r.top < vh * 1.5 && r.bottom > -vh * 0.5) load();
    ctl.visible = r.bottom > 0 && r.top < vh && r.width > 0;
    if (!ctl.visible) return;
    if (useVideo && video.duration) {
      const target = ctl.progress * (video.duration - 0.05);
      if (Math.abs(video.currentTime - target) > 0.03) video.currentTime += (target - video.currentTime) * 0.35;
    } else if (w && h) {
      draw(ctx, w, h, t, ctl.progress);
    }
  }
  function destroy() { ro.disconnect(); }
  return ctl;
}

/* ───────── Main ───────── */

export function initExperience() {
  const html = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ac = new AbortController();
  const on = <K extends keyof WindowEventMap>(t: EventTarget, type: K | string, fn: (e: never) => void, opts: AddEventListenerOptions = {}) =>
    t.addEventListener(type, fn as EventListener, { ...opts, signal: ac.signal });
  const timers: number[] = [];

  // split text up-front (idempotent)
  $$("[data-split='chars']").forEach(splitChars);
  $$("[data-split='lines']").forEach((el) => splitWords(el, "mask"));
  $$("[data-split='words']").forEach((el) => splitWords(el, "plain"));

  // live IST clock
  const clock = $(".js-clock");
  const tickClock = () => {
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());
  };
  tickClock();
  timers.push(window.setInterval(tickClock, 15000));

  // scenes
  const sceneCtls = new Map<HTMLElement, SceneCtl>();
  $$(".scene").forEach((el) => sceneCtls.set(el, createScene(el)));
  const sceneOf = (sel: string) => sceneCtls.get($(`${sel} .scene`)!)!;
  const renderScenes = (time: number) => sceneCtls.forEach((s) => s.render(time));
  gsap.ticker.add(renderScenes);

  // iOS needs a user gesture before a muted video can seek smoothly
  on(window, "touchstart", () => $$<HTMLVideoElement>(".scene__video").forEach((v) => v.src && v.play().then(() => v.pause()).catch(() => {})), { once: true });

  /* ── Reduced motion: static, readable, no pins ── */
  if (reduce) {
    html.classList.add("no-motion", "is-loaded");
    gsap.set(".loader", { display: "none" });
    gsap.set(".split-inner", { y: 0 });
    gsap.set(".hero__cta, .hero__eyebrow, .scroll-cue, .chapter, .cta__title, .cta__line, .cta__lead, .cta__buttons", { opacity: 1, visibility: "visible" });
    sceneCtls.forEach((s) => (s.progress = 0.35));
    return () => { ac.abort(); timers.forEach(clearInterval); gsap.ticker.remove(renderScenes); sceneCtls.forEach((s) => s.destroy()); };
  }

  /* ── Smooth scroll ── */
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis.stop();

  let marquee = () => {};
  let mm: gsap.MatchMedia | undefined;
  const gctx = gsap.context(() => {
    /* ── Preloader → hero intro ── */
    const count = { v: 0 };
    const num = $(".loader__num")!;
    const intro = gsap.timeline({ paused: true });
    intro
      .to(".hero__line .split-inner", { y: 0, duration: 1.4, ease: "expo.out", stagger: 0.035 })
      .to(".hero__lead .split-inner", { y: 0, duration: 1.1, ease: "expo.out", stagger: 0.012 }, 0.35)
      .to(".hero__eyebrow > span, .hero__cta, .scroll-cue > *", { opacity: 1, duration: 1, ease: "power2.out", stagger: 0.1 }, 0.5);

    const loader = gsap.timeline({ paused: true });
    loader
      .to(count, { v: 100, duration: 1.6, ease: "power3.inOut", onUpdate: () => { num.textContent = String(Math.round(count.v)).padStart(3, "0"); } })
      .to(".loader__bar i", { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0)
      .to(".loader__inner", { y: -40, opacity: 0, duration: 0.6, ease: "power2.in" })
      .to(".loader", { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.2")
      .add(() => { html.classList.add("is-loaded"); lenis.start(); intro.play(); ScrollTrigger.refresh(); }, "-=0.55")
      .set(".loader", { display: "none" });
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]).then(() => loader.play());

    /* ── Progress line + top bar ── */
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => gsap.set(".progress i", { scaleX: s.progress }) });
    const bar = $(".bar")!;
    lenis.on("scroll", (l: Lenis) => {
      if (!html.classList.contains("menu-open")) bar.classList.toggle("is-hidden", l.direction === 1 && l.scroll > 240);
    });

    /* ── Hero: scrubbed orbit + kinetic type ── */
    const hero = sceneOf(".hero");
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero", start: "top top", end: "+=150%", pin: true, scrub: 0.8,
        onUpdate: (s) => (hero.progress = s.progress),
      },
    })
      .to(".hero__line:first-child", { xPercent: -18, opacity: 0, ease: "none", duration: 0.45 }, 0)
      .to(".hero__line--italic", { xPercent: 18, opacity: 0, ease: "none", duration: 0.45 }, 0)
      .to(".hero__foot, .hero__eyebrow, .scroll-cue", { y: -60, opacity: 0, ease: "none", duration: 0.3 }, 0)
      .fromTo(".hero__kinetic", { opacity: 0, scale: 0.7, letterSpacing: "0.1em" }, { opacity: 1, scale: 1, letterSpacing: "-0.03em", ease: "power2.out", duration: 0.4 }, 0.3)
      .fromTo(".hero__kinetic em", { yPercent: 60 }, { yPercent: 0, ease: "power2.out", duration: 0.4 }, 0.3)
      .to(".hero__stage", { scale: 0.92, borderRadius: 40, ease: "power1.in", duration: 0.3 }, 0.7);

    /* ── Stats: counters + velocity marquee ── */
    $$(".count").forEach((el) => {
      const from = Number(el.dataset.from ?? 0), to = Number(el.dataset.to ?? 0), o = { v: from };
      el.textContent = String(from);
      gsap.to(o, {
        v: to, duration: 2.2, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => { el.textContent = String(Math.round(o.v)); },
      });
    });
    const track = $(".marquee__track")!;
    let mx = 0, dir = -1;
    marquee = () => {
      const half = track.scrollWidth / 2;
      const v = Math.min(Math.abs(lenis.velocity), 40);
      if (lenis.direction) dir = lenis.direction === 1 ? -1 : 1;
      mx += dir * (0.6 + v * 0.25);
      if (mx <= -half) mx += half;
      if (mx > 0) mx -= half;
      track.style.transform = `translate3d(${mx}px,0,0)`;
    };
    gsap.ticker.add(marquee);

    /* ── Section heading reveals ── */
    $$("[data-split='lines']").forEach((el) => {
      if (el.closest(".hero")) return;
      gsap.to($$(".split-inner", el), {
        y: 0, yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    });
    $$(".eyebrow, .chips, .cap, .toolkit__group, .index__list li, .mission__sign").forEach((el) => {
      if (el.closest(".hero, .story, .cta")) return;
      gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    /* ── Mission: words ignite ── */
    gsap.fromTo(".mission__text .split-word", { opacity: 0.14 }, {
      opacity: 1, ease: "none", stagger: 0.1,
      scrollTrigger: { trigger: ".mission__text", start: "top 78%", end: "bottom 42%", scrub: 0.6 },
    });

    /* ── Pillars: horizontal pin on desktop ── */
    mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const trackEl = $(".pillars__track")!;
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
      gsap.to(trackEl, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: ".pillars__pin", start: "center center", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true, id: "pillars" },
      });
      gsap.fromTo(".pillar__glyph", { rotate: -12 }, { rotate: 12, ease: "none", scrollTrigger: { trigger: ".pillars__pin", start: "top bottom", end: () => `+=${distance() + window.innerHeight}`, scrub: true } });
    });
    mm.add("(max-width: 900px)", () => {
      $$(".pillar").forEach((el) => gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
    });

    /* ── Story: pinned chapters over the builder scene ── */
    const story = sceneOf(".story");
    const chapters = $$(".chapter");
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: ".story", start: "top top", end: `+=${chapters.length * 90}%`, pin: true, scrub: 0.8, id: "story",
        onUpdate: (s) => (story.progress = s.progress),
      },
    });
    st.to(".story__rail i", { scaleY: 1, ease: "none", duration: chapters.length }, 0);
    gsap.set(chapters[0], { opacity: 1, visibility: "visible" });
    chapters.forEach((ch, i) => {
      if (i > 0) st.fromTo(ch, { opacity: 0, y: 60, visibility: "hidden" }, { opacity: 1, y: 0, visibility: "visible", duration: 0.35, ease: "power2.out" }, i);
      if (i < chapters.length - 1) st.to(ch, { opacity: 0, y: -60, duration: 0.3, ease: "power2.in", immediateRender: false }, i + 0.7).set(ch, { visibility: "hidden" }, i + 1);
    });

    /* ── Featured cases: stacking cards ── */
    const cases = $$(".case");
    cases.forEach((c, i) => {
      const next = cases[i + 1];
      if (!next) return;
      gsap.to($(".case__inner", c), {
        scale: 0.9, opacity: 0.45, ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
      });
    });
    $$(".case__art").forEach((art) => {
      gsap.fromTo(art, { y: 60 }, { y: -40, ease: "none", scrollTrigger: { trigger: art, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* ── Final CTA: corridor + headline rising from depth ── */
    const cta = sceneOf(".cta");
    gsap.timeline({
      scrollTrigger: {
        trigger: ".cta", start: "top top", end: "+=150%", pin: true, scrub: 0.8, id: "contact",
        onUpdate: (s) => (cta.progress = s.progress),
      },
    })
      .fromTo(".cta__line", { scale: 0.35, opacity: 0, filter: "blur(12px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", stagger: 0.15, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(".cta__content .eyebrow, .cta__lead, .cta__buttons", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.3 }, 0.45)
      .to({}, { duration: 0.25 });

    /* ── Footer wordmark ── */
    gsap.from(".footer__word", { yPercent: 40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true } });
  });

  /* ── Anchor links via Lenis (pinned sections jump to their "settled" state) ── */
  on(document, "click", (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!id && a.getAttribute("href") !== "#") return;
    e.preventDefault();
    closeMenu();
    const pinned = ScrollTrigger.getById(id);
    if (id === "top" || !target) lenis.scrollTo(0, { duration: 1.8 });
    else if (pinned && id === "contact") lenis.scrollTo(pinned.end - 2, { duration: 2 }); // land on the revealed headline
    else lenis.scrollTo(target, { duration: 1.8 });
  });

  /* ── Menu ── */
  const menuBtn = $(".bar__menu")!, menu = $(".menu")!;
  function openMenu() {
    html.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.querySelector(".bar__menu-label")!.textContent = "Close";
    menu.setAttribute("aria-hidden", "false");
    $(".bar")!.classList.remove("is-hidden");
    lenis.stop();
    gsap.fromTo(".menu__list a", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.25 });
  }
  function closeMenu() {
    if (!html.classList.contains("menu-open")) return;
    html.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.querySelector(".bar__menu-label")!.textContent = "Menu";
    menu.setAttribute("aria-hidden", "true");
    lenis.start();
  }
  on(menuBtn, "click", () => (html.classList.contains("menu-open") ? closeMenu() : openMenu()));
  on(window, "keydown", (e: KeyboardEvent) => e.key === "Escape" && closeMenu());

  /* ── Cursor, magnetic buttons, project preview (fine pointers only) ── */
  if (finePointer) {
    const cursor = $(".cursor")!, label = $(".cursor__label")!;
    const dotX = gsap.quickTo(".cursor__dot", "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(".cursor__dot", "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(".cursor__ring", "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(".cursor__ring", "y", { duration: 0.5, ease: "power3" });
    on(window, "pointermove", (e: PointerEvent) => {
      dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY);
      cursor.classList.remove("is-hidden");
    });
    on(document, "pointerleave", () => cursor.classList.add("is-hidden"));
    on(document, "pointerover", (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-active", !!t);
      label.textContent = t?.dataset.cursor ?? "";
    });

    $$("[data-magnetic]").forEach((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      on(el, "pointermove", (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.35);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      });
      on(el, "pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)" }));
    });

    const preview = $(".index__preview")!, pTitle = $(".index__preview-title")!;
    const tones = [
      "linear-gradient(140deg, #2a4bc4 0%, #0b1633 80%)",
      "linear-gradient(140deg, #8a6a35 0%, #13224a 75%)",
      "linear-gradient(140deg, #5a3f6e 0%, #0b1633 80%)",
    ];
    const px = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
    const py = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
    const list = $(".index__list")!;
    on(list, "pointermove", (e: PointerEvent) => { px(e.clientX + 30); py(e.clientY - 20); });
    $$(".index__list a").forEach((a) => {
      on(a, "pointerenter", () => {
        pTitle.textContent = $(".index__title", a)?.textContent ?? "";
        preview.style.setProperty("--tone", tones[Number(a.dataset.tone ?? 0)]);
        gsap.to(preview, { opacity: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: 0.5, ease: "expo.out" });
      });
    });
    on(list, "pointerleave", () => gsap.to(preview, { opacity: 0, scale: 0.6, duration: 0.4, ease: "power3.in" }));
  }

  // fonts can shift layout; refresh pins once they're in
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return () => {
    ac.abort();
    timers.forEach(clearInterval);
    gctx.revert();
    mm?.revert();
    gsap.ticker.remove(marquee);
    gsap.ticker.remove(raf);
    gsap.ticker.remove(renderScenes);
    lenis.destroy();
    sceneCtls.forEach((s) => s.destroy());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
