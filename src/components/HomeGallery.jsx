export default function HomeGallery({ invitation }) {
  return (
    <section className="home-gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="showcase-heading shell reveal">
        <h2 id="gallery-title">A place to belong.</h2>
        <span className="micro-label">Architecture for a life together</span>
      </div>
      <figure className="home-showcase reveal">
        <div className="home-gallery-image">
          <img src={invitation.houseImage} alt={`A closer view of ${invitation.venueName}, its balconies, rooflines, and garden`} width="1280" height="720" loading="lazy" decoding="async" />
        </div>
        <figcaption className="shell"><span>{invitation.venueName} / A place to belong</span><span>A home, thoughtfully made.</span></figcaption>
      </figure>
    </section>
  );
}
