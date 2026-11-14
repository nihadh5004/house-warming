import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import InvitationCard from "./components/InvitationCard";
import HomeGallery from "./components/HomeGallery";
import Countdown from "./components/Countdown";
import FamilySection from "./components/FamilySection";
import LocationSection from "./components/LocationSection";
import ShareInvitation from "./components/ShareInvitation";
import Footer from "./components/Footer";
import BackgroundAudio from "./components/BackgroundAudio";
import { invitation } from "./data/invitation";

export default function App() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#invitation">Skip to invitation</a>
      <Navigation invitation={invitation} />
      <BackgroundAudio />
      <main>
        <Hero invitation={invitation} />
        <Introduction invitation={invitation} />
        <InvitationCard invitation={invitation} />
        <Countdown invitation={invitation} />
        <FamilySection invitation={invitation} />
        <HomeGallery invitation={invitation} />
        <LocationSection invitation={invitation} />
        <ShareInvitation invitation={invitation} />
      </main>
      <Footer invitation={invitation} />
    </>
  );
}
