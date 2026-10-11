import { portfolio as D } from "@/data/portfolio";
import { asset } from "@/lib/asset";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import RevealOnScroll from "@/components/RevealOnScroll";
import TypedRoles from "@/components/TypedRoles";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

const socials = [
  D.links.github && { href: D.links.github, label: "GitHub", Icon: GitHubIcon },
  D.links.linkedin && { href: D.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  D.links.email && { href: `mailto:${D.links.email}`, label: "Email", Icon: MailIcon },
].filter((s) => !!s);

const hasExperience = D.experience.length > 0;
const hasEducation = D.education.length + D.certifications.length > 0;

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  ...(hasExperience ? [{ href: "#experience", label: "Experience" }] : []),
  { href: "#contact", label: "Contact" },
];

function SectionHead({ num, title }: { num: number; title: string }) {
  return (
    <div className="section-head reveal">
      <span className="num">{String(num).padStart(2, "0")}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="grid-overlay" />
      </div>

      <Nav name={D.name} initials={D.initials} links={navLinks} />

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow reveal"><span className="pulse" />{D.availability} · {D.location}</p>
              <h1 className="reveal">Hi, I&apos;m <span className="gradient-text">{D.name}</span></h1>
              <TypedRoles roles={D.roles} />
              <p className="lead reveal">{D.tagline}</p>
              <div className="cta reveal">
                <a href="#projects" className="btn btn-primary">View my work <ArrowRightIcon /></a>
                <a href="#contact" className="btn btn-ghost">Get in touch</a>
                {D.resume && <a href={asset(D.resume)} className="btn btn-ghost" target="_blank" rel="noopener">Résumé</a>}
              </div>
              <div className="socials reveal">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}><Icon /></a>
                ))}
              </div>
            </div>
            <div className="hero-visual reveal">
              <div className="avatar-ring">
                <div className="avatar">
                  {D.photo
                    ? <img src={asset(D.photo)} alt={D.name} />
                    : <span className="gradient-text">{D.initials}</span>}
                </div>
              </div>
              <div className="code-card" aria-hidden="true">
                <div className="code-dots"><i /><i /><i /></div>
                <pre><code>
                  <span className="k">const</span> <span className="v">akshay</span> = {"{\n"}
                  {"  "}<span className="p">stack</span>: [<span className="s">&quot;Next.js&quot;</span>, <span className="s">&quot;RN&quot;</span>, <span className="s">&quot;Django&quot;</span>],{"\n"}
                  {"  "}<span className="p">ships</span>: <span className="k">true</span>,{"\n"}
                  {"  "}<span className="p">coffee</span>: <span className="n">Infinity</span>,{"\n"}
                  {"};"}
                </code></pre>
              </div>
            </div>
          </div>
          <a href="#about" className="scroll-hint" aria-label="Scroll to about"><span /></a>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container">
            <SectionHead num={1} title="About me" />
            <div className="about-grid">
              <div className="about-text reveal">{D.about.map((p) => <p key={p}>{p}</p>)}</div>
              <div className="stats reveal">
                {D.stats.map((s) => (
                  <div key={s.label} className="card stat"><strong className="gradient-text">{s.value}</strong><span>{s.label}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <div className="container">
            <SectionHead num={2} title="Skills & tools" />
            <div className="skills-grid">
              {D.skills.map((g) => (
                <div key={g.group} className="card skill-card reveal">
                  <h3>{g.group}</h3>
                  <div className="chips">{g.items.map((i) => <span key={i} className="chip">{i}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="container">
            <SectionHead num={3} title="Selected projects" />
            <Projects projects={D.projects} />
            <div className="more reveal">
              <a className="btn btn-ghost" href={D.links.github} target="_blank" rel="noopener">More on GitHub <ArrowUpRightIcon /></a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        {hasExperience && (
          <section className="section" id="experience">
            <div className="container">
              <SectionHead num={4} title="Experience" />
              <ol className="timeline">
                {D.experience.map((x) => (
                  <li key={`${x.company}-${x.period}`} className="card reveal">
                    <div className="tl-head">
                      <h3>{x.role} <span>@ {x.company}</span></h3>
                      <span className="tl-meta">{x.period}{x.location && ` · ${x.location}`}</span>
                    </div>
                    {!!x.points?.length && <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* EDUCATION + CERTS */}
        {hasEducation && (
          <section className="section" id="education">
            <div className="container">
              <SectionHead num={hasExperience ? 5 : 4} title="Education & certifications" />
              <div className="edu-grid">
                {D.education.map((e) => (
                  <div key={e.degree} className="card edu reveal">
                    <span className="tl-meta">{e.period}</span>
                    <h3>{e.degree}</h3>
                    <p>{e.school}{e.note && ` · ${e.note}`}</p>
                  </div>
                ))}
                {D.certifications.map((c) => (
                  <div key={c.name} className="card edu reveal">
                    <span className="tl-meta">Certification · {c.year}</span>
                    <h3>{c.url ? <a href={c.url} target="_blank" rel="noopener">{c.name} ↗</a> : c.name}</h3>
                    <p>{c.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact-card reveal">
              <p className="eyebrow">What&apos;s next?</p>
              <h2>Let&apos;s build something <span className="gradient-text">great</span> together.</h2>
              <p className="lead">Whether it&apos;s a role, a freelance project or just a hello — my inbox is open.</p>
              <div className="cta center">
                {socials.map(({ href, label, Icon }, i) => (
                  <a key={label} href={href} target="_blank" rel="noopener" className={`btn ${i === socials.length - 1 ? "btn-primary" : "btn-ghost"}`}>
                    <Icon /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {D.name}. Designed &amp; built with Next.js.</p>
          <a href="#home" className="to-top">Back to top ↑</a>
        </div>
      </footer>

      <RevealOnScroll />
    </>
  );
}
