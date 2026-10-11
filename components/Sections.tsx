import { pad, site } from "@/data/site";
import { asset } from "@/lib/asset";
import Scene from "./Scene";
import { BrowserArt, MeetArt, PhoneArt } from "./Mockups";

const { links } = site;
const ext = { target: "_blank", rel: "noopener" } as const;

/* 01 ─ Hero */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="stage hero__stage">
        <Scene kind="orbit" video="hero" />
        <div className="stage__shade" />
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            <span>Portfolio — {new Date().getFullYear()}</span><span>{site.role}</span>
          </p>
          <h1 className="hero__title" aria-label={site.name}>
            <span className="hero__line" data-split="chars" aria-hidden="true">{site.first}</span>
            <span className="hero__line hero__line--italic" data-split="chars" aria-hidden="true">{site.last}</span>
          </h1>
          <div className="hero__foot">
            <p className="hero__lead" data-split="lines">{site.lead}</p>
            <div className="hero__cta">
              <a className="btn btn--gold" href={links.linkedin} {...ext} data-magnetic data-cursor="Hire">
                Hire me <span className="btn__arrow">↗</span>
              </a>
              <a className="btn btn--ghost" href="#work" data-magnetic data-cursor="View">See the work</a>
            </div>
          </div>
          <p className="hero__kinetic" aria-hidden="true">
            <span>{site.kinetic[0]}</span> <em>{site.kinetic[1]}</em> <span>{site.kinetic[2]}</span>
          </p>
        </div>
        <a href="#stats" className="scroll-cue" aria-label="Scroll down"><span>Scroll to begin</span><i /></a>
      </div>
    </section>
  );
}

/* 02 ─ Stats strip */
export function Stats() {
  return (
    <section className="stats" id="stats" aria-label="At a glance">
      <ul className="stats__grid">
        {site.stats.map((s) => (
          <li key={s.label}>
            <strong>
              <span className="count" data-to={s.to} data-from={s.from ?? 0}>{s.to}</span>
              {s.suffix && <sup>{s.suffix}</sup>}
            </strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => site.stack.map((t) => (
            <span key={`${copy}-${t}`} className="marquee__item"><span>{t}</span><i>✦</i></span>
          )))}
        </div>
      </div>
    </section>
  );
}

/* 03 ─ Mission */
export function Mission() {
  return (
    <section className="mission" id="mission">
      <div className="wrap">
        <p className="eyebrow eyebrow--ink"><span>01 — Mission</span></p>
        <p className="mission__text" data-split="words">
          I’m looking for a team that cares about <em>craft</em> — and I’ll bring software that <em>feels</em> as good as it works.
        </p>
        <p className="mission__sign">— {site.first}</p>
      </div>
    </section>
  );
}

/* 04 ─ Three pillars */
export function Pillars() {
  return (
    <section className="pillars" id="pillars">
      <div className="pillars__head wrap">
        <p className="eyebrow"><span>02 — Craft</span></p>
        <h2 className="h2" data-split="lines">Three things I do <em>really</em> well.</h2>
      </div>
      <div className="pillars__pin">
        <div className="pillars__track">
          {site.pillars.map((p, i) => (
            <article key={p.title} className="pillar">
              <span className="pillar__num">{pad(i + 1)}</span>
              <div className={`pillar__glyph pillar__glyph--${p.glyph}`} aria-hidden="true">
                {Array.from({ length: { web: 3, mobile: 1, sys: 4 }[p.glyph] ?? 0 }, (_, k) => <i key={k} />)}
              </div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__promise">{p.promise}</p>
              <p className="pillar__body">{p.body}</p>
              <ul className="chips">{p.chips.map((c) => <li key={c}>{c}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 05 ─ Story */
export function Story() {
  return (
    <section className="story" id="story">
      <div className="stage story__stage">
        <Scene kind="builder" video="builder" />
        <div className="stage__shade stage__shade--side" />
        <div className="story__content">
          <p className="eyebrow"><span>03 — Story</span></p>
          <div className="story__rail" aria-hidden="true"><i /></div>
          <ol className="story__chapters">
            {site.chapters.map((c, i) => (
              <li key={c.title} className="chapter">
                <span className="chapter__num">Chapter {pad(i + 1)}</span>
                <h3 className="chapter__title">{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* 06 ─ What I bring */
export function Bring() {
  return (
    <section className="bring" id="bring">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><span>What I bring</span></p>
          <h2 className="h2" data-split="lines">Hire one developer. <em>Get the whole stack.</em></h2>
        </div>
        <ul className="caps">
          {site.capabilities.map((c, i) => (
            <li key={c.title} className="cap">
              <span className="cap__num">{pad(i + 1)}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="cap__arrow" aria-hidden="true">→</span>
            </li>
          ))}
        </ul>
        <div className="toolkit">
          {site.toolkit.map((g) => (
            <div key={g.group} className="toolkit__group">
              <h4>{g.group}</h4>
              <ul className="chips">{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 07 ─ Featured work */
const ART = { phone: PhoneArt, browser: BrowserArt, meet: MeetArt };

export function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow"><span>04 — Selected work</span></p>
          <h2 className="h2" data-split="lines">Things I’ve <em>built</em> and shipped.</h2>
        </div>

        <div className="cases">
          {site.cases.map((c, i) => {
            const Art = ART[c.art as keyof typeof ART];
            return (
              <article key={c.title.join(" ")} className="case" style={{ "--i": i } as React.CSSProperties}>
                <div className="case__inner">
                  <div className="case__copy">
                    <p className="case__meta"><span>{pad(i + 1)}</span><span>{c.kind}</span></p>
                    <h3 className="case__title">{c.title[0]}{c.art !== "meet" && <br />}<em>{c.title[1]}</em></h3>
                    <p className="case__body">{c.body}</p>
                    <ul className="chips">{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                    <p className="case__links">
                      {c.repo
                        ? <a className="link" href={c.repo} {...ext} data-cursor="Open">View source ↗</a>
                        : <span className="badge">Private · Client work</span>}
                    </p>
                  </div>
                  <Art />
                </div>
              </article>
            );
          })}
        </div>

        <div className="index">
          <p className="eyebrow"><span>More projects</span></p>
          <ul className="index__list">
            {site.projects.map((p, i) => (
              <li key={p.title}>
                <a href={p.repo} {...ext} data-cursor="Open" data-tone={i % 3}>
                  <span className="index__num">{pad(i + site.cases.length + 1)}</span>
                  <span className="index__title">{p.title}</span>
                  <span className="index__tags">{p.tags}</span>
                  <span className="index__arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="index__preview" aria-hidden="true"><span className="index__preview-title" /></div>
          <p className="index__more"><a className="link" href={links.github} {...ext} data-cursor="Open">More on GitHub ↗</a></p>
        </div>
      </div>
    </section>
  );
}

/* 08 ─ Final CTA */
export function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="stage cta__stage">
        <Scene kind="corridor" video="arrival" />
        <div className="stage__shade stage__shade--center" />
        <div className="cta__content">
          <p className="eyebrow"><span>05 — Contact</span></p>
          <h2 className="cta__title">
            <span className="cta__line">Let’s build</span>
            <span className="cta__line"><em>what’s next.</em></span>
          </h2>
          <p className="cta__lead">Open to full-time roles. I reply within a day.</p>
          <div className="cta__buttons">
            <a className="btn btn--gold btn--lg" href={links.linkedin} {...ext} data-magnetic data-cursor="Hire">
              Hire me on LinkedIn <span className="btn__arrow">↗</span>
            </a>
            <a className="btn btn--ghost" href={links.github} {...ext} data-magnetic data-cursor="Open">GitHub ↗</a>
            {links.email && <a className="btn btn--ghost" href={`mailto:${links.email}`} data-magnetic data-cursor="Write">Email</a>}
            {links.resume && <a className="btn btn--ghost" href={asset(links.resume)} {...ext} data-magnetic data-cursor="Read">Résumé</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 09 ─ Footer */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <p className="footer__clock">India · <span className="js-clock">--:--</span> IST</p>
          <ul className="footer__links">
            <li><a className="link" href={links.linkedin} {...ext}>LinkedIn</a></li>
            <li><a className="link" href={links.github} {...ext}>GitHub</a></li>
            {links.email && <li><a className="link" href={`mailto:${links.email}`}>Email</a></li>}
          </ul>
        </div>
        <p className="footer__word" aria-hidden="true">{site.first}</p>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {site.name}. Designed &amp; built by hand.</p>
          <a href="#top" className="link" data-cursor="Top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
