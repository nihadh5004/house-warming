export default function Footer({ invitation }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <a className="footer-brand" href="#top" aria-label="White Aura, back to top">{invitation.venueName}.</a>
          <a className="footer-up" href="#top" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-details">
          <p>{invitation.hosts.join(" & ")}</p>
          <time dateTime={invitation.eventDate}>{invitation.displayDate}</time>
        </div>
        <div className="footer-bottom"><p>A new home. A new chapter.</p><span>{invitation.locality}</span></div>
      </div>
    </footer>
  );
}
