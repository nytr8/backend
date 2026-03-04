import { useState } from "react";
import "../../song/styles/song.scss";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"; // Using lucide for clean icons
import useSong from "../hooks/useSong";

const Songs = () => {
  //   const { songData } = useSong();
  const songData = {
    image: "https://i.scdn.co/image/ab67616d0000b273e1c8a9f1b2c3d4e5f6g7h8i",
    title: "Sample Song",
    url: "https://example.com/sample-song.mp3",
  };
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback in case songData is empty/loading
  if (!songData) return <div className="loader">Loading tracks...</div>;

  return (
    <div className="player-container">
      <div className="player-card">
        <div className="album-art">
          <img
            src={songData.image}
            alt={songData.title}
            className={isPlaying ? "spinning" : ""}
          />
        </div>

        <div className="song-details">
          <h2 className="song-title">{songData.title}</h2>
          <p className="artist-name">Featured Artist</p>
        </div>

        <div className="progress-area">
          <input
            type="range"
            className="progress-bar"
            min="0"
            max="100"
            value="30"
            readOnly
          />
          <div className="time-stamps">
            <span>1:20</span>
            <span>3:45</span>
          </div>
        </div>

        <div className="controls">
          <button className="btn-secondary">
            <SkipBack size={24} />
          </button>
          <button className="btn-main" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={30} fill="currentColor" />
            ) : (
              <Play size={30} fill="currentColor" />
            )}
          </button>
          <button className="btn-secondary">
            <SkipForward size={24} />
          </button>
        </div>

        <div className="volume-control">
          <Volume2 size={18} />
          <input type="range" className="volume-slider" />
        </div>
      </div>
    </div>
  );
};

export default Songs;
