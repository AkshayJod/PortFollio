(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    github: '<svg class="fill" viewBox="0 0 24 24"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg class="fill" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/></svg>',
    external: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
    brain: '<svg viewBox="0 0 24 24"><path d="M12 5a3 3 0 0 0-5.8-1A3 3 0 0 0 3 7a3 3 0 0 0 0 6 3 3 0 0 0 3 4 3 3 0 0 0 6 1V5z"/><path d="M12 5a3 3 0 0 1 5.8-1A3 3 0 0 1 21 7a3 3 0 0 1 0 6 3 3 0 0 1-3 4 3 3 0 0 1-6 1"/></svg>',
    terminal: '<svg viewBox="0 0 24 24"><path d="m4 17 6-5-6-5M12 19h8"/></svg>',
  };
  const CAT_ICON = { web: "code", mobile: "phone", ml: "brain", python: "terminal" };
  const CAT_LABEL = { all: "All", web: "Web", mobile: "Mobile", ml: "AI / ML", python: "Python" };

  // Simple text bindings
  document.querySelectorAll("[data-bind]").forEach((el) => { el.textContent = D[el.dataset.bind] ?? ""; });
  document.title = `${D.name} — Developer`;
  $("#year").textContent = new Date().getFullYear();

  // Avatar
  $("#avatar").innerHTML = D.photo
    ? `<img src="${esc(D.photo)}" alt="${esc(D.name)}" />`
    : `<span class="gradient-text">${esc(D.initials)}</span>`;

  // Resume
  if (D.resume) { const r = $("#resumeBtn"); r.href = D.resume; r.hidden = false; }

  // Socials
  const socialLinks = [
    D.links.github && { href: D.links.github, icon: "github", label: "GitHub" },
    D.links.linkedin && { href: D.links.linkedin, icon: "linkedin", label: "LinkedIn" },
    D.links.email && { href: `mailto:${D.links.email}`, icon: "email", label: "Email" },
  ].filter(Boolean);
  $("#heroSocials").innerHTML = socialLinks
    .map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${s.label}">${ICONS[s.icon]}</a>`)
    .join("");
  $("#contactCta").innerHTML = socialLinks
    .map((s, i) => `<a href="${esc(s.href)}" target="_blank" rel="noopener" class="btn ${i === socialLinks.length - 1 ? "btn-primary" : "btn-ghost"}">${ICONS[s.icon]} ${s.label}</a>`)
    .join("");
  $("#githubMore").href = D.links.github;

  // About + stats
  $("#aboutText").innerHTML = D.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats
    .map((s) => `<div class="card stat"><strong class="gradient-text">${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
    .join("");

  // Skills
  $("#skillsGrid").innerHTML = D.skills
    .map((g) => `<div class="card skill-card reveal"><h3>${esc(g.group)}</h3><div class="chips">${g.items.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}</div></div>`)
    .join("");

  // Projects
  const cats = ["all", ...new Set(D.projects.map((p) => p.category))];
  $("#filters").innerHTML = cats
    .map((c, i) => `<button class="filter${i === 0 ? " active" : ""}" data-cat="${c}" role="tab">${CAT_LABEL[c] || c}</button>`)
    .join("");
  $("#projectsGrid").innerHTML = D.projects
    .map((p) => {
      const links = [
        p.repo && `<a href="${esc(p.repo)}" target="_blank" rel="noopener" aria-label="Source code">${ICONS.github}</a>`,
        p.live && `<a href="${esc(p.live)}" target="_blank" rel="noopener" aria-label="Live demo">${ICONS.external}</a>`,
        p.private && !p.repo && `<span class="badge" title="Private repository">${ICONS.lock} Private</span>`,
      ].filter(Boolean).join("");
      return `<article class="card project reveal" data-cat="${esc(p.category)}">
        <div class="project-top">
          <div class="folder">${ICONS[CAT_ICON[p.category]] || ICONS.code}</div>
          <div class="project-links">${p.featured ? '<span class="badge featured">Featured</span>' : ""}${links}</div>
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </article>`;
    })
    .join("");
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".project").forEach((card) => {
      card.classList.toggle("hide", btn.dataset.cat !== "all" && card.dataset.cat !== btn.dataset.cat);
    });
  });
  // Cursor-follow glow on project cards
  $("#projectsGrid").addEventListener("pointermove", (e) => {
    const card = e.target.closest(".project");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  // Experience
  let sectionNo = 4;
  if (D.experience.length) {
    $("#experience").hidden = false;
    $("#timeline").innerHTML = D.experience
      .map((x) => `<li class="card reveal">
        <div class="tl-head"><h3>${esc(x.role)} <span>@ ${esc(x.company)}</span></h3><span class="tl-meta">${esc(x.period)}${x.location ? " · " + esc(x.location) : ""}</span></div>
        ${x.points?.length ? `<ul>${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
      </li>`)
      .join("");
    sectionNo++;
  } else {
    document.querySelector('[data-section="experience"]').remove();
  }

  // Education + certifications
  if (D.education.length || D.certifications.length) {
    $("#education").hidden = false;
    $("#eduNum").textContent = String(sectionNo).padStart(2, "0");
    $("#eduGrid").innerHTML = [
      ...D.education.map((e) => `<div class="card edu reveal"><span class="tl-meta">${esc(e.period)}</span><h3>${esc(e.degree)}</h3><p>${esc(e.school)}${e.note ? " · " + esc(e.note) : ""}</p></div>`),
      ...D.certifications.map((c) => `<div class="card edu reveal"><span class="tl-meta">Certification · ${esc(c.year)}</span><h3>${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)} ↗</a>` : esc(c.name)}</h3><p>${esc(c.issuer)}</p></div>`),
    ].join("");
  }

  // Typing roles
  const typed = $("#typed");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) typed.textContent = D.roles[0];
  else {
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = D.roles[ri];
      ci += deleting ? -1 : 1;
      typed.textContent = word.slice(0, ci);
      let delay = deleting ? 35 : 75;
      if (!deleting && ci === word.length) { deleting = true; delay = 1800; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % D.roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    tick();
  }

  // Theme toggle
  const root = document.documentElement;
  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Mobile menu
  const menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }
  });

  // Nav background on scroll
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll (staggered)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const siblings = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
      en.target.style.transitionDelay = `${Math.min(siblings.indexOf(en.target), 6) * 70}ms`;
      en.target.classList.add("in");
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Active nav link
  const links = [...document.querySelectorAll(".nav-links a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
})();
