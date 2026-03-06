import React from "react";
import { useContext } from "react";
import { SongContextProvider } from "../SongContext";
import { createSong, getSong, getSonglist } from "../services/songApi";

const useSong = () => {
  const context = useContext(SongContextProvider);
  const {
    songData,
    setsongData,
    detectedSong,
    setdetectedSong,
    songList,
    setSongList,
    loading,
    setLoading,
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
  const handleCreateSong = async (songData) => {
    try {
      setLoading(true);
      console.log("Loading started");
      const data = await createSong(songData);
      console.log("Song created:", data);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      console.log("Loading finished");
    }
  };

  return {
    songData,
    setsongData,
    getSongByMood,
    detectedSong,
    setdetectedSong,
    songList,
    loading,
    getSongListByMood,
    handleCreateSong,
  };
};

export default useSong;
