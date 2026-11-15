import { useEffect, useState } from "react";
import InvitationHome from "./components/InvitationHome";
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

function InvitationPage() {
  useEffect(() => {
    if (window.location.hash === "#top") {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("hero-title")?.focus({ preventScroll: true });
    }
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

export default function App() {
  const [opened, setOpened] = useState(() => Boolean(window.location.hash && window.location.hash !== "#home"));

  useEffect(() => {
    const updatePage = () => {
      const showInvitation = Boolean(window.location.hash && window.location.hash !== "#home");
      setOpened(showInvitation);
      if (!showInvitation) window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  return (
    <>
      <BackgroundAudio />
      {opened ? <InvitationPage /> : <InvitationHome invitation={invitation} />}
    </>
  );
}
