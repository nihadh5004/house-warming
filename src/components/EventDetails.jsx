const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v3m10-3v3M4.5 9h15M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /></svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8M5.5 9.5V21h13V9.5M9.5 21v-7h5v7" /></svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

export default function EventDetails({ invitation }) {
  const details = [
    { label: "Date", value: invitation.displayDate, icon: <CalendarIcon /> },
    { label: "Time", value: invitation.displayTime, icon: <ClockIcon /> },
    { label: "Venue", value: invitation.venueName, icon: <HomeIcon /> },
    {
      label: "Location",
      value: "View on Google Maps",
      href: invitation.mapsUrl,
      icon: <PinIcon />
    }
  ];

  return (
    <section className="section details-section reveal" aria-labelledby="details-title">
      <p className="section-kicker">Save the date</p>
      <h2 id="details-title">Celebration details</h2>
      <div className="details-grid">
        {details.map((detail) => (
          <article className="detail-card" key={detail.label}>
            <div className="detail-icon">{detail.icon}</div>
            <h3>{detail.label}</h3>
            {detail.href ? (
              <a href={detail.href} target="_blank" rel="noopener noreferrer">
                {detail.value}
              </a>
            ) : (
              <p>{detail.value}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
