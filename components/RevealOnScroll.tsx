"use client";

import { useEffect } from "react";

// Fades `.reveal` elements in as they scroll into view, staggered among siblings.
export default function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 70}ms`;
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
