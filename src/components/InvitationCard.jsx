import ArabicHeading from "./ArabicHeading";
import EventDetails from "./EventDetails";

export default function InvitationCard({ invitation }) {
  return (
    <section className="invitation-section" id="invitation" aria-labelledby="invitation-title">
      <div className="shell">
        <div className="invitation-content reveal">
          <ArabicHeading />
          <p className="eyebrow">You are cordially invited</p>
          <h2 id="invitation-title">Housewarming<br />Celebration<span className="sage-period">.</span></h2>
          <p className="invitation-message">Join us as we open the doors of our new home and celebrate this special beginning with the people who matter most.</p>
        </div>
        <EventDetails invitation={invitation} />
      </div>
    </section>
  );
}
