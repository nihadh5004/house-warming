import { useEffect, useMemo, useState } from "react";

function getRemaining(target) {
  const distance = target.getTime() - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export default function Countdown({ invitation }) {
  const target = useMemo(
    () => new Date(`${invitation.eventDate}T${invitation.eventTime}:00`),
    [invitation.eventDate, invitation.eventTime]
  );
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <section className="section countdown-section reveal" aria-labelledby="countdown-title">
      <div className="crescent-mark" aria-hidden="true"><span>✦</span></div>
      <p className="section-kicker">Until we welcome you</p>
      <h2 id="countdown-title">Our new chapter begins in</h2>
      {remaining ? (
        <div className="countdown-grid" aria-live="polite">
          {Object.entries(remaining).map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="countdown-complete">
          Alhamdulillah, our new chapter has begun.
        </p>
      )}
    </section>
  );
}
