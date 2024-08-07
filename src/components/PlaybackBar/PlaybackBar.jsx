import { useState, useContext, useEffect, useRef } from "react";
import { MediaContext } from "../../context/MediaContext";
import Cookies from "js-cookie";
import "./PlaybackBar.css"; // Importar el archivo CSS

const PlaybackBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const { mediaFile, title, duration } = useContext(MediaContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (mediaFile && audioRef.current) {
      audioRef.current.src = mediaFile;
      audioRef.current.load();
      if (!isPlaying) {
        togglePlayPause();
        audioRef.current.play();
      }
    }
  }, [mediaFile]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (audioRef.current.duration * e.target.value) / 100;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const token = Cookies.get("authToken");

  return (
    <div
      className="playback-bar"
      style={{
        display: `${token ? "flex" : "none"}`,
        alignItems: "center",
        justifyContent: "space-around",
        bottom: "0",
        background: "hsl(220deg 13.04% 9.02%)",
        boxShadow: "0px -1px 5px 0px rgba(0,0,0,0.75)",
        minWidth: "-webkit-fill-available",
      }}
    >
      <h1>{title}</h1>
      <audio ref={audioRef} />
      <div className="playback-controls">
        <div className="control-buttons">
          <button onClick={() => console.log("Previous")}>⏮️</button>
          <button onClick={togglePlayPause} style={{ fontSize: "2rem" }}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button onClick={() => console.log("Next")}>⏭️</button>
        </div>
        <div className="progress-bar">
          <div className="progress-times">
            <span>
              {formatTime(
                (audioRef.current && audioRef.current.currentTime) || 0
              )}
              --
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleProgressChange}
              style={{ width: "30rem" }}
            />
            <span>-- {formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="volume-control">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default PlaybackBar;
