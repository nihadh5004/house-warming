import exteriorAerial from "../images/house_img_1.webp";
import diningInterior from "../images/house_img_2.webp";
import exteriorFront from "../images/house_img_3.webp";

const views = [
  {
    image: exteriorFront,
    alt: "Front exterior view of Alora",
    caption: "A place to call home",
  },
  {
    image: exteriorAerial,
    alt: "Elevated exterior view of Alora",
    caption: "Our new address",
  },
  {
    image: diningInterior,
    alt: "Warm modern dining interior at Alora",
    caption: "Made for togetherness",
  },
];

export default function HomeGallery() {
  return (
    <section className="section home-gallery reveal" aria-labelledby="home-gallery-title">
      <div className="home-gallery-header">
        <div>
          <p className="section-kicker">Our new beginning</p>
          <h2 id="home-gallery-title">A glimpse of Alora</h2>
        </div>
        <p>Thoughtfully made, ready for memories.</p>
      </div>

      <div className="home-gallery-grid">
        {views.map((view, index) => (
          <figure className="home-gallery-card" key={view.image}>
            <div className="home-gallery-image">
              <img
                src={view.image}
                alt={view.alt}
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <figcaption>{view.caption}</figcaption>
          </figure>
        ))}
      </div>

      <p className="home-gallery-swipe" aria-hidden="true">
        Swipe to explore <span>→</span>
      </p>
    </section>
  );
}
