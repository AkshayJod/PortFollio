"use client";

import { useEffect, useState } from "react";
import { MenuIcon, MoonIcon, SunIcon } from "./Icons";

type NavProps = { name: string; initials: string; links: { href: string; label: string }[] };

export default function Nav({ name, initials, links }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Solid nav background once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(`#${en.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#home" className="logo">
        <span className="logo-mark">{initials}</span>
        <span className="logo-text">{name}</span>
      </a>
      <nav className={`nav-links${open ? " open" : ""}`} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? "active" : undefined}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle colour theme">
          <SunIcon /><MoonIcon />
        </button>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Open menu" aria-expanded={open}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
