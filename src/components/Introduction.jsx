export default function Introduction({ invitation }) {
  return (
    <section className="introduction section shell grid-12" id="beginning" aria-labelledby="introduction-title">
      <div className="introduction-heading reveal">
        <p className="eyebrow">The beginning</p>
        <h2 id="introduction-title">Every home<br />tells a story.</h2>
      </div>
      <div className="introduction-copy reveal">
        <p>With gratitude in our hearts and joy in every corner, we invite you to celebrate the beginning of a beautiful new chapter at {invitation.venueName}.</p>
        <p className="host-signature">{invitation.hosts.join(" & ")}</p>
        <span className="micro-label">A new address. A new chapter. A place to call home.</span>
      </div>
    </section>
  );
}
