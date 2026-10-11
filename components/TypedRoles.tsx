"use client";

import { useEffect, useState } from "react";

export default function TypedRoles({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0] ?? "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ri = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      setText(word.slice(0, ci));
      let delay = deleting ? 35 : 75;
      if (!deleting && ci === word.length) { deleting = true; delay = 1800; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, [roles]);

  return (
    <h2 className="role reveal" aria-label={roles.join(", ")}>
      <span aria-hidden="true">{text}</span><span className="caret" aria-hidden="true">|</span>
    </h2>
  );
}
