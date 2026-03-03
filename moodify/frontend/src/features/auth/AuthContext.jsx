import React, { createContext, useContext, useState } from "react";

export const AuthContextProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  return (
    <AuthContextProvider.Provider
      value={{ user, setuser, loading, setloading }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
