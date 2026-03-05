import React from "react";
import { useContext } from "react";
import { SongContextProvider } from "../SongContext";
import { getSong } from "../services/songApi";

const useSong = () => {
  const context = useContext(SongContextProvider);
  const { songData, setsongData, detectedSong, setdetectedSong } = context;

  async function getSongByMood(mood) {
    try {
      const res = await getSong(mood);
      setsongData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { songData, getSongByMood, detectedSong, setdetectedSong };
};

export default useSong;
