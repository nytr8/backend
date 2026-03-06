import { useState, useRef, useEffect } from "react";
import "../../song/styles/song.scss";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import useSong from "../hooks/useSong";

const Songs = () => {
  const { songData } = useSong();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songKey, setSongKey] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  // ✅ Single effect when songData changes (removed the duplicate)
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setSongKey((prev) => prev + 1);
  }, [songData]);

  // ✅ Guard added so it doesn't try to play when songData is null
  useEffect(() => {
    if (!audioRef.current || !songData?.url) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, songData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!songData || !songData.url)
    return <div className="loader">Loading tracks...</div>;

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime + seconds,
      );
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-container">
      <div className="player-card">
        <div className="album-art">
          <img
            src={songData?.image}
            alt={songData?.title}
            className={isPlaying ? "spinning" : ""}
          />
        </div>

        <div className="song-details">
          <h2 className="song-title">{songData?.title}</h2>
          <p className="artist-name">Featured Artist</p>
        </div>

        <div className="progress-area">
          <input
            type="range"
            className="progress-bar"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleProgressChange}
          />
          <div className="time-stamps">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="controls">
          <button className="btn-secondary" onClick={() => handleSkip(-5)}>
            <SkipBack size={24} />
          </button>
          <button className="btn-main" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={30} fill="currentColor" />
            ) : (
              <Play size={30} fill="currentColor" />
            )}
          </button>
          <button className="btn-secondary" onClick={() => handleSkip(5)}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className="volume-control">
          <Volume2 size={18} />
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>

        <audio
          key={songKey}
          ref={audioRef}
          src={songData?.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </div>
  );
};

export default Songs;
