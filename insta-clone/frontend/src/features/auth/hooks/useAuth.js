import { useContext } from "react";
import { AuthContextProvider } from "../AuthContext.jsx";
import { login, register, logout } from "../services/api.js";
const useAuth = () => {
  const context = useContext(AuthContextProvider);
  const { setLoading, loading, user, setUser } = context;

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
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, user, handleLogin, handleRegister, handleLogout };
};

export default useAuth;
