import Hero from "./components/Hero";
import InvitationCard from "./components/InvitationCard";
import EventDetails from "./components/EventDetails";
import HomeGallery from "./components/HomeGallery";
import Countdown from "./components/Countdown";
import FamilySection from "./components/FamilySection";
import LocationSection from "./components/LocationSection";
import ShareInvitation from "./components/ShareInvitation";
import Footer from "./components/Footer";
import BackgroundAudio from "./components/BackgroundAudio";
import { invitation } from "./data/invitation";

export default function App() {
  return (
    <>
      <BackgroundAudio />
      <main>
        <Hero invitation={invitation} />
        <div className="page-shell">
          <InvitationCard invitation={invitation} />
          <EventDetails invitation={invitation} />
          <HomeGallery />
          <Countdown invitation={invitation} />
          <FamilySection invitation={invitation} />
          <LocationSection invitation={invitation} />
          <ShareInvitation invitation={invitation} />
        </div>
        <Footer />
      </main>
    </>
  );
}
