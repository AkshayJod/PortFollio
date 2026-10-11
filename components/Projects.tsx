"use client";

import { useState, type PointerEvent } from "react";
import type { Category, Project } from "@/data/portfolio";
import { CategoryIcon, ExternalIcon, GitHubIcon, LockIcon } from "./Icons";

const LABEL: Record<"all" | Category, string> = { all: "All", web: "Web", mobile: "Mobile", ml: "AI / ML", python: "Python" };

// Cursor-follow glow on project cards
const glow = (e: PointerEvent<HTMLElement>) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Projects({ projects }: { projects: Project[] }) {
  const cats = ["all", ...new Set(projects.map((p) => p.category))] as ("all" | Category)[];
  const [filter, setFilter] = useState<"all" | Category>("all");

  return (
    <>
      <div className="filters reveal" role="tablist">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={filter === c} className={`filter${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>
            {LABEL[c] ?? c}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {projects.map((p) => (
          // `hidden` (not a class) so React never overwrites the reveal classes added on scroll
          <article key={p.title} className="card project reveal" hidden={filter !== "all" && p.category !== filter} onPointerMove={glow}>
            <div className="project-top">
              <div className="folder"><CategoryIcon category={p.category} /></div>
              <div className="project-links">
                {p.featured && <span className="badge featured">Featured</span>}
                {p.repo && <a href={p.repo} target="_blank" rel="noopener" aria-label={`${p.title} source code`}><GitHubIcon /></a>}
                {p.live && <a href={p.live} target="_blank" rel="noopener" aria-label={`${p.title} live demo`}><ExternalIcon /></a>}
                {p.private && !p.repo && <span className="badge" title="Private repository"><LockIcon /> Private</span>}
              </div>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </>
  );
}
