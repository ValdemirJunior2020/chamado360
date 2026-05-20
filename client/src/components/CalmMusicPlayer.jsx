// client/src/components/CalmMusicPlayer.jsx
import { useEffect, useRef, useState } from "react";
import { translations } from "../data/translations";

export default function CalmMusicPlayer({ language }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const t = translations[language] || translations.pt;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    const playPromise = audio.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.25;
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-card card-premium">
      <audio ref={audioRef} src="/calm-music.mp3" loop onError={() => setIsPlaying(false)} />
      <div>
        <strong>♪ {t.musicTitle}</strong>
        <p>{t.musicDescription}</p>
      </div>
      <button type="button" className="btn btn-outline-light btn-sm" onClick={toggleMusic}>
        {isPlaying ? t.pauseMusic : t.playMusic}
      </button>
    </div>
  );
}
