import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const PostContextProvider = createContext();
const FeedContext = ({ children }) => {
  const [postData, setpostData] = useState([]);
  return (
    <PostContextProvider.Provider value={{ setpostData, postData }}>
      {children}
    </PostContextProvider.Provider>
  );
};

export default FeedContext;
