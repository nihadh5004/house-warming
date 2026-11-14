export default function ArabicHeading({ compact = false }) {
  return <div className={`arabic-heading${compact ? " arabic-heading--compact" : ""}`}><p className="bismillah" dir="rtl" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><span className="sr-only">In the name of Allah, the Most Gracious, the Most Merciful</span></div>;
}
