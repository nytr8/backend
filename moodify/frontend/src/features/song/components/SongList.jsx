import React from "react";
import useSong from "../hooks/useSong";
import "../styles/songlist.scss";
const SongList = () => {
  const { songList, detectedSong, setdetectedSong, setsongData } = useSong();

  return (
    <div className="song-list">
      <h1 className="song-list__title">{detectedSong || "..."} songs list</h1>

      <div className="song-list__container">
        {songList?.map((song) => (
          <div
            onClick={() => {
              setdetectedSong(song.mood);
              setsongData(song);
            }}
            className="song-card"
            key={song._id}
          >
            <img
              src={song?.image}
              alt={song?.title}
              className="song-card__image"
            />

            <div className="song-card__info">
              <h3>{song?.title?.replace(/\.[^/.]+$/, '')}</h3>
              <p>{song?.artist}</p>
            </div>

            <button className="song-card__play">▶</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
