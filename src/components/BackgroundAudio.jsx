import { useEffect, useRef } from "react";
import nasheed from "../Music/ADIL_AMEEN_-_SHUKRAN_LAKA_RABBI_(mp3.pm).mp3";

export default function BackgroundAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.35;

    const startPlayback = () => {
      if (audio.paused) {
        // Browsers may require a user gesture before allowing audible playback.
        audio.play().catch(() => {});
      }
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("pointerdown", startPlayback);
      document.removeEventListener("touchend", startPlayback);
      document.removeEventListener("keydown", startPlayback);
    };

    audio.addEventListener("playing", removeInteractionListeners);
    document.addEventListener("pointerdown", startPlayback, { passive: true });
    document.addEventListener("touchend", startPlayback, { passive: true });
    document.addEventListener("keydown", startPlayback);
    startPlayback();

    return () => {
      removeInteractionListeners();
      audio.removeEventListener("playing", removeInteractionListeners);
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={nasheed} autoPlay loop preload="auto" aria-hidden="true" />;
}
