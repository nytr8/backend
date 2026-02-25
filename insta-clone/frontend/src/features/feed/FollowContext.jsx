import { useState } from "react";
import { createContext } from "react";

export const FollowContextProvider = createContext();
const FollowContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [allusers, setallUsers] = useState([]);
  const [error, setError] = useState(null);
  return (
    <FollowContextProvider.Provider
      value={{
        setFollowers,
        followers,
        setFollowing,
        following,
        loading,
        setLoading,
        error,
        setError,
        setallUsers,
        allusers,
      }}
    >
      {children}
    </FollowContextProvider.Provider>
  );
};

export default FollowContext;
