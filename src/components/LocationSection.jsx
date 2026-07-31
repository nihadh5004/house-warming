export default function LocationSection({ invitation }) {
  return (
    <section className="section location-section reveal" aria-labelledby="location-title">
      <div className="location-arch">
        <div className="door" aria-hidden="true">
          <span className="door-star">✦</span>
          <i />
        </div>
        <div className="location-copy">
          <p className="section-kicker">Come celebrate with us</p>
          <h2 id="location-title">{invitation.venueName}</h2>
          <p>Tap below for directions</p>
          <a
            className="button button--primary"
            href={invitation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
