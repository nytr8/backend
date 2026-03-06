import React from "react";
import { useContext } from "react";
import { SongContextProvider } from "../SongContext";
import { getSong, getSonglist } from "../services/songApi";

const useSong = () => {
  const context = useContext(SongContextProvider);
  const {
    songData,
    setsongData,
    detectedSong,
    setdetectedSong,
    songList,
    setSongList,
  } = context;

  async function getSongByMood(mood) {
    try {
      const res = await getSong(mood);
      setsongData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function getSongListByMood(mood) {
    try {
      const res = await getSonglist(mood);
      setSongList(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    songData,
    setsongData,
    getSongByMood,
    detectedSong,
    setdetectedSong,
    songList,
    getSongListByMood,
  };
};

export default useSong;
