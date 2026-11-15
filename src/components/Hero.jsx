export default function Hero({ invitation }) {
  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      <div className="hero-heading">
        <div className="hero-title-group">
          <p className="eyebrow">A new beginning</p>
          <h1 id="hero-title" tabIndex={-1}>
            {invitation.venueName.split(" ").map((word, index, words) => (
              <span className="hero-word" key={`${word}-${index}`}>
                {index > 0 && " "}{word}{index === words.length - 1 && <span className="hero-period">.</span>}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-note">
          <p>A new chapter<br /> begins at home.</p>
          <span className="micro-label">An invitation to belong</span>
        </div>
      </div>
      <figure className="hero-figure">
        <div className="hero-image">
          <img src={invitation.houseImage} alt={`The architecture and landscaped exterior of ${invitation.venueName}`} width="1280" height="720" fetchPriority="high" />
        </div>
        <figcaption>
          <span>{invitation.venueName} — {invitation.locality}</span>
          <a className="scroll-indicator" href="#beginning">Explore the story <span aria-hidden="true">↓</span></a>
        </figcaption>
      </figure>
      <div className="mobile-hero-details">
        <div><span className="micro-label">Save the evening</span><time dateTime={invitation.eventDate}>{invitation.displayDate}</time></div>
        <a className="text-link" href="#invitation">The invitation</a>
      </div>
    </section>
  );
}
