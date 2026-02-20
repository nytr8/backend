import { createContext, useState } from "react";
import { login, register } from "../features/services/api.js";

export const AuthContextProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);
      console.log(res.user);
      setUser(res.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await register(username, email, password);
      setUser(res.user);
      console.log(res.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContextProvider.Provider
      value={{ handleLogin, handleRegister, user, loading }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
