import { useState } from "react";
import { createContext } from "react";

export const PostContextProvider = createContext();
const FeedContext = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [postData, setpostData] = useState([]);
  return (
    <PostContextProvider.Provider
      value={{
        setpostData,
        postData,
        loading,
        setloading,
      }}
    >
      {children}
    </PostContextProvider.Provider>
  );
};

export default FeedContext;
