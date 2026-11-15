import { useEffect, useState } from "react";

const links = [
  ["The home", "top"],
  ["Invitation", "invitation"],
  ["Family", "family"],
  ["Location", "location"]
];

export default function Navigation({ invitation }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <a className="brand" href="#top">{invitation.venueName}</a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Explore"}<span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav id="main-nav" className={`nav-links${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
