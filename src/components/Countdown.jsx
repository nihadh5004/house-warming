import { useEffect, useState } from "react";
import { getRemaining } from "../data/eventUtils";

export default function Countdown({ invitation }) {
  const [remaining, setRemaining] = useState(() => getRemaining(invitation.eventStart));

  useEffect(() => {
    const update = () => {
      const next = getRemaining(invitation.eventStart);
      setRemaining(next);
      if (!next) window.clearInterval(timer);
    };
    const timer = window.setInterval(update, 1000);
    update();
    return () => window.clearInterval(timer);
  }, [invitation.eventStart]);

  return (
    <section className="countdown-section shell section reveal" aria-labelledby="countdown-title">
      <h2 className="eyebrow" id="countdown-title">Until we open our doors</h2>
      {remaining ? (
        <div className="countdown-grid" role="timer" aria-label="Time until the housewarming" aria-live="off">
          {Object.entries(remaining).map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="countdown-complete" role="status">Our new chapter has begun.<span>Thank you for being part of our story.</span></p>
      )}
    </section>
  );
}
