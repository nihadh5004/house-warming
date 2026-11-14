import { createShareMessage } from "../data/eventUtils";

export default function ShareInvitation({ invitation }) {
  const message = createShareMessage(invitation, window.location.href.split("#")[0]);

  return (
    <section className="share-section" aria-labelledby="share-title">
      <div className="shell grid-12 section">
        <h2 className="reveal" id="share-title">Good moments are<br />meant to be shared.</h2>
        <div className="share-copy reveal">
          <p className="body-copy">A celebration is more beautiful together. Share this invitation with your family and friends.</p>
          <a className="button button--share" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Share on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
