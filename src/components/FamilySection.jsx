export default function FamilySection({ invitation }) {
  return (
    <section className="section family-section reveal" aria-labelledby="family-title">
      <p className="welcome-arabic" dir="rtl" lang="ar">أَهْلًا وَسَهْلًا</p>
      <p className="welcome-meaning">Welcome</p>
      <h2 id="family-title">With love from our family</h2>
      <div className="family-names">
        {invitation.familyMembers.map((member, index) => (
          <div className="family-name" key={member}>
            <span className="family-sprig" aria-hidden="true">❧</span>
            <span>{member}</span>
            {index % 2 === 0 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
