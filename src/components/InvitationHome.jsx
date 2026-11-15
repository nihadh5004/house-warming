export default function InvitationHome({ invitation }) {
  const [year, month, day] = invitation.eventDate.split("-");
  const monthName = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" })
    .format(new Date(`${year}-${month}-${day}T12:00:00Z`));

  return (
    <main className="invitation-home" aria-labelledby="cover-title">
      <div className="invitation-home-layout">
        <div className="invitation-home-copy">
          <div className="invitation-home-blessing">
            <p lang="ar" dir="rtl">بارك الله لكم في منزلكم الجديد</p>
            <p>May Allah bless your new home.</p>
          </div>
          <p className="invitation-home-kicker">Join us for the housewarming of</p>
          <h1 id="cover-title">{invitation.venueName}</h1>
          <p className="invitation-home-hosts">{invitation.hosts.join(" & ")}</p>
          <p className="invitation-home-note">Our dreams and memories have a new address.</p>
          <a className="invitation-home-button" href="#top">
            View invitation
          </a>
          <p className="invitation-home-location">{invitation.locality} · {invitation.region}</p>
        </div>
        <div className="invitation-home-date">
          <time dateTime={invitation.eventDate} aria-label={invitation.displayDate}>
            <span className="invitation-home-day">{day}</span>
            <span className="invitation-home-month">{monthName}</span>
            <span className="invitation-home-year">{year}</span>
          </time>
          <span className="invitation-home-date-rule" aria-hidden="true" />
          <p>{invitation.displayTime}<span>With love, you’re invited</span></p>
        </div>
      </div>
    </main>
  );
}
