import { site } from "@/data/site";

const menu = [
  ["#mission", "Mission"],
  ["#pillars", "Craft"],
  ["#story", "Story"],
  ["#work", "Work"],
  ["#contact", "Contact"],
];

// Fixed, always-on UI: preloader, grain, progress line, cursor, top bar and menu.
export default function Chrome() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="loader" aria-hidden="true">
        <div className="loader__inner">
          <p className="loader__name"><span>{site.first}</span> <em>{site.last}</em></p>
          <p className="loader__count"><span className="loader__num">000</span></p>
          <div className="loader__bar"><i /></div>
        </div>
      </div>

      <div className="grain" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><i /></div>
      <div className="cursor is-hidden" aria-hidden="true">
        <span className="cursor__dot" />
        <span className="cursor__ring"><b className="cursor__label" /></span>
      </div>

      <header className="bar">
        <a href="#top" className="bar__logo" data-cursor="Top" aria-label="Back to top">
          <span className="mono-mark">AK</span>
          <span className="bar__name">{site.name}</span>
        </a>
        <p className="bar__status"><span className="pulse" />{site.status}</p>
        <button className="bar__menu" aria-expanded="false" aria-controls="menu" data-cursor="Menu">
          <span className="bar__menu-label">Menu</span>
          <span className="burger"><i /><i /></span>
        </button>
      </header>

      <nav className="menu" id="menu" aria-label="Main" aria-hidden="true">
        <ol className="menu__list">
          {menu.map(([href, label], i) => (
            <li key={href}><a href={href}><small>0{i + 1}</small>{label}</a></li>
          ))}
        </ol>
        <div className="menu__foot">
          <a href={site.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href={site.links.github} target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </nav>
    </>
  );
}
