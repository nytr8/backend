import { createContext, useState } from "react";


export const AuthContextProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContextProvider.Provider
      value={{ setLoading,setUser, user, loading }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
