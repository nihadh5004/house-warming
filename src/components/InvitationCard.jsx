import ArabicHeading from "./ArabicHeading";
import FloralCorner from "./FloralCorner";

export default function InvitationCard({ invitation }) {
  const [firstHost, secondHost] = invitation.hosts;

  return (
    <section className="section invitation-wrap reveal" id="invitation">
      <div className="invitation-card">
        <div className="invitation-border" aria-hidden="true" />
        <FloralCorner position="top-left" />
        <FloralCorner position="bottom-right" />
        <div className="invitation-content">
          <ArabicHeading compact />
          <div className="ornament" aria-hidden="true">
            <span />
            <i>✦</i>
            <span />
          </div>
          <p className="script-line">With gratitude to Allah,</p>
          <p>{firstHost} & {secondHost} warmly invite you to the housewarming of</p>
          <h2>
            Alora
          </h2>
          <p className="card-tagline">
            Alhamdulillah, Our dreams and memories have a new address.
          </p>
          <p>
            Please join us as we begin this beautiful new chapter with our
            family.
          </p>
          <div className="card-date">
            <strong>{invitation.displayDate}</strong>
            <span>{invitation.displayTime}</span>
          </div>
          <a
            className="button button--primary"
            href={invitation.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View location on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
