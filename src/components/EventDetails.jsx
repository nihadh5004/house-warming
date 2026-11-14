export default function EventDetails({ invitation }) {
  return (
    <dl className="event-details">
      <div className="reveal">
        <dt className="eyebrow">Date</dt>
        <dd><time dateTime={invitation.eventDate}>{invitation.displayDate}</time></dd>
      </div>
      <div className="reveal">
        <dt className="eyebrow">Time</dt>
        <dd>{invitation.displayTime}<span className="event-note">Indian Standard Time</span></dd>
      </div>
      <div className="reveal">
        <dt className="eyebrow">Location</dt>
        <dd>{invitation.locality}<span className="event-note">{invitation.region}</span></dd>
      </div>
    </dl>
  );
}
