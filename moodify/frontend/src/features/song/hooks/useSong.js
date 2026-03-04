import React from "react";
import { useContext } from "react";
import { SongContextProvider } from "../SongContext";
import { getSong } from "../services/songApi";

const useSong = () => {
  const { songData, setsongData } = useContext(SongContextProvider);

  async function getSongByMood(mood) {
    try {
      const res = await getSong(mood);
      setsongData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { songData, getSongByMood };
};

export default useSong;
