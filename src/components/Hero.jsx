import ArabicHeading from "./ArabicHeading";
import FloralCorner from "./FloralCorner";

export default function Hero({ invitation }) {
  const [firstHost, secondHost] = invitation.hosts;

  return (
    <header className="hero" id="top">
      <div className="hero-pattern" aria-hidden="true" />
      <FloralCorner position="top-left" />
      <FloralCorner position="bottom-right" />
      <div className="hero-card">
        <div className="arch-line" aria-hidden="true" />
        <ArabicHeading />
        <p className="eyebrow">With gratitude and happiness</p>
        <p className="hero-invite">We invite you to the housewarming of</p>
        <h1>
          <span>{firstHost}</span>
          <span className="ampersand">&amp;</span>
          <span>{secondHost}</span>
        </h1>
        <p className="hero-tagline">
          Our dreams and memories have a new address.
        </p>
        <div className="hero-date">
          <span>{invitation.displayDate}</span>
          <i aria-hidden="true" />
          <span>{invitation.displayTime}</span>
        </div>
        <a className="scroll-link" href="#invitation">
          <span>View invitation</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>
    </header>
  );
}
