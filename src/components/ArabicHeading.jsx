export default function ArabicHeading({ compact = false }) {
  return (
    <div className={`arabic-heading${compact ? " arabic-heading--compact" : ""}`}>
      <p className="bismillah" dir="rtl" lang="ar">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
      <p className="translation">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>
    </div>
  );
}
