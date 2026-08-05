import { useEffect, useRef } from "react";
import nasheed from "../music/ADIL_AMEEN_-_SHUKRAN_LAKA_RABBI_(mp3.pm).mp3";

export default function BackgroundAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return undefined;

    audio.volume = 0.35;

    const startPlayback = () => {
      audio.play().then(removeInteractionListeners).catch(() => {});
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("pointerdown", startPlayback);
      document.removeEventListener("keydown", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
    };

    startPlayback();
    document.addEventListener("pointerdown", startPlayback);
    document.addEventListener("keydown", startPlayback);
    document.addEventListener("touchstart", startPlayback);

    return () => {
      removeInteractionListeners();
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={nasheed} autoPlay loop preload="auto" />;
}
