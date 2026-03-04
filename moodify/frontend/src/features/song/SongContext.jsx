import { useState } from "react";
import { createContext } from "react";

export const SongContextProvider = createContext();
const SongContext = ({ children }) => {
  const [songData, setsongData] = useState(null);
  return (
    <SongContextProvider.Provider>{children}</SongContextProvider.Provider>
  );
};

export default SongContext;
