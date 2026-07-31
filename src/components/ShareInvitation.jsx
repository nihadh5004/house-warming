function createMessage(invitation) {
  const names = invitation.hosts.join(" and ");
  const lines = [
    "Assalamu Alaikum,",
    "",
    `With gratitude and happiness, we invite you to the housewarming of ${names}.`,
    "",
    "Our dreams and memories have a new address, and we would be delighted to have you with us as we begin this beautiful new chapter.",
    "",
    `Date: ${invitation.displayDate}`,
    `Time: ${invitation.displayTime}`,
    `Location: ${invitation.mapsUrl}`
  ];

  if (invitation.websiteUrl) {
    lines.push("", "View the invitation:", invitation.websiteUrl);
  }

  lines.push("", "With love,", `${invitation.hosts.join(", ")} and family`);
  return lines.join("\n");
}

export default function ShareInvitation({ invitation }) {
  const handleShare = async () => {
    const message = createMessage(invitation);
    const shareData = {
      title: `Housewarming of ${invitation.hosts.join(" & ")}`,
      text: message
    };

    if (invitation.websiteUrl) shareData.url = invitation.websiteUrl;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="section share-section reveal" aria-labelledby="share-title">
      <span className="share-ornament" aria-hidden="true">✦</span>
      <h2 id="share-title">Share the joy</h2>
      <p>We would be delighted to celebrate this special evening with you.</p>
      <button className="button button--share" type="button" onClick={handleShare}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.7 12.9 15.4 9m-6.7 2.1 6.7 3.9" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="17.5" cy="7.5" r="2.5" />
          <circle cx="17.5" cy="16.5" r="2.5" />
        </svg>
        Share invitation
      </button>
    </section>
  );
}
