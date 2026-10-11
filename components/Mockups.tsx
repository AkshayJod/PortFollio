// CSS-built device mockups for the featured case cards.
export function PhoneArt() {
  return (
    <div className="case__art case__art--phone" aria-hidden="true">
      <div className="phone"><div className="phone__screen">
        <i className="ui-head" /><i className="ui-card" /><i className="ui-row" /><i className="ui-row" /><i className="ui-row short" />
        <i className="ui-tabs" />
      </div></div>
      <div className="phone phone--back"><div className="phone__screen">
        <i className="ui-ring" /><i className="ui-row" /><i className="ui-row short" />
      </div></div>
    </div>
  );
}

export function BrowserArt() {
  return (
    <div className="case__art case__art--browser" aria-hidden="true">
      <div className="browser">
        <div className="browser__bar"><i /><i /><i /><b /></div>
        <div className="browser__body">
          <aside><i /><i /><i /><i /></aside>
          <div className="browser__main">
            <i className="ui-hero" />
            <div className="browser__grid"><i /><i /><i /></div>
            <i className="ui-chart" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MeetArt() {
  return (
    <div className="case__art case__art--meet" aria-hidden="true">
      <div className="meet">
        {["a", "b", "c", "d"].map((t) => <div key={t} className={`meet__tile meet__tile--${t}`}><i /></div>)}
        <div className="meet__dock"><b /><b /><b className="end" /></div>
      </div>
    </div>
  );
}
