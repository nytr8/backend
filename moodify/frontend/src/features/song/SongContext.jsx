import { useState } from "react";
import { createContext } from "react";

export const SongContextProvider = createContext();
const SongContext = ({ children }) => {
  const [songData, setsongData] = useState(null);
  const [detectedSong, setdetectedSong] = useState(true);
  return (
    <SongContextProvider.Provider
      value={{ songData, setsongData, detectedSong, setdetectedSong }}
    >
      {children}
    </SongContextProvider.Provider>
  );
};

export default SongContext;
