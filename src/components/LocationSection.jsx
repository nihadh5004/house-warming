export default function LocationSection({ invitation }) {
  return (
    <section className="location-section section shell grid-12" id="location" aria-labelledby="location-title">
      <div className="location-heading reveal">
        <p className="eyebrow">Find us</p>
        <h2 id="location-title">We’ll be waiting<br />for you.</h2>
      </div>
      <div className="location-copy reveal">
        <p className="location-name">{invitation.venueName}</p>
        <address>{invitation.locality}<br />{invitation.region}</address>
        <a className="text-link" href={invitation.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
      </div>
      {invitation.mapsEmbedUrl && (
        <iframe
          className="location-map"
          title={`Map showing ${invitation.venueName}`}
          src={invitation.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </section>
  );
}
