import { useState } from "react";
import { createContext } from "react";

export const SongContextProvider = createContext();
const SongContext = ({ children }) => {
  const [songData, setsongData] = useState(null);
  const [detectedSong, setdetectedSong] = useState(true);
  const [loading, setLoading] = useState(false);
  const [songList, setSongList] = useState([]);
  return (
    <SongContextProvider.Provider
      value={{
        songData,
        setsongData,
        detectedSong,
        setdetectedSong,
        songList,
        setSongList,
        loading,
        setLoading,
      }}
    >
      {children}
    </SongContextProvider.Provider>
  );
};

export default SongContext;
