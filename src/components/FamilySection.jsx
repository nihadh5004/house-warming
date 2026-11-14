export default function FamilySection({ invitation }) {
  return (
    <section className="family-section shell section grid-12" id="family" aria-labelledby="family-title">
      <div className="family-heading reveal">
        <p className="eyebrow">The people</p>
        <h2 id="family-title">The hearts<br />behind our home.</h2>
        <p className="body-copy">A home is made special by the people who fill it with love.</p>
      </div>
      <ul className="family-names">
        {invitation.familyMembers.map(member => (
          <li className="family-name reveal" key={member}><span>{member}</span></li>
        ))}
      </ul>
    </section>
  );
}
