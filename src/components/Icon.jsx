export default function Icon({ name, ...props }) {
  const paths = {
    home: <><path d="m3 10 9-8 9 8M5 9v12h14V9M10 21v-7h4v7" /><path d="M16 3h3v5" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 2v6m8-6v6M4 10h16M8 14h1m3 0h1m3 0h1M8 17h1m3 0h1m3 0h1" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 3" /></>,
    pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    people: <><circle cx="12" cy="7" r="3" /><path d="M7 21v-3a5 5 0 0 1 10 0v3M3 18v-2a4 4 0 0 1 3-4m15 6v-2a4 4 0 0 0-3-4" /><path d="M5 4a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6" /></>,
    share: <><circle cx="5" cy="12" r="3" /><circle cx="18" cy="5" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8 10 7-4M8 14l7 4" /></>,
    whatsapp: <><path d="m3 21 1.5-5A9 9 0 1 1 8 20Z" /><path d="M8 7c-2 3 3 8 6 8l2-2-3-2-1 1c-1-1-2-1-2-3l1-1-2-2Z" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    music: <><path d="M9 18V5l11-2v13M9 8l11-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="17" cy="16" rx="3" ry="2" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
