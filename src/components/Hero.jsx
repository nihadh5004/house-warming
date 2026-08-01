export default function Hero({ invitation }) {
  return (
    <header className="hero" id="top">
      <div className="hero-cover">
        <div className="hero-copy">
          <div className="hero-dua hero-fade-up">
            <p className="hero-dua-arabic" dir="rtl" lang="ar">
              بارك الله لكم في منزلكم الجديد
            </p>
            <div className="hero-dua-meaning">
              <span aria-hidden="true" />
              <p>May Allah bless your new home.</p>
            </div>
          </div>

          <p className="hero-kicker hero-fade-up hero-delay-1">
            Join us for our house warming of
          </p>

          <h1 className="hero-title hero-fade-up hero-delay-2">
            <span className="hero-title-house">ALORA</span>
          </h1>

          

          {/* <p className="hero-tagline hero-fade-up hero-delay-4">
            Our dreams and memories have a new address.
          </p> */}

          <div className="hero-actions hero-fade-up hero-delay-5">
            <a className="hero-button hero-button--primary" href="#invitation">
              <span>View Invitation</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14m-5-5 5 5 5-5" />
              </svg>
            </a>
            <a
              className="hero-button hero-button--secondary"
              href={invitation.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get Directions</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </a>
          </div>
        </div>

        <div
          className="hero-date-block hero-fade-up hero-delay-4"
          aria-label="16 August 2026, after 5:00 PM"
        >
          <time dateTime="2026-08-16">
            <span className="hero-day">16</span>
            <span className="hero-month">AUG</span>
            <span className="hero-year">2026</span>
          </time>
          <span className="hero-date-rule" aria-hidden="true" />
          <span className="hero-time">
            <span>After</span>
            <strong>5:00 PM</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
