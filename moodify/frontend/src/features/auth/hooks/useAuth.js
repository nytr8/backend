import React, { useContext, useEffect } from "react";
import { AuthContextProvider } from "../AuthContext";
import {
  getMe,
  login,
  logout,
  register,
} from "../services/auth.api";

const useAuth = () => {
  const context = useContext(AuthContextProvider);
  const { user, setuser, loading, setloading } = context;

  async function handleRegister(formData) {
    setloading(true);
    try {
      const data = await register(
        formData.username,
        formData.email,
        formData.password,
      );
      setuser(data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading(false);
    }
  }
  async function handleLogin(formData) {
    setloading(true);
    try {
      const data = await login(
        formData.username,
        formData.email,
        formData.password,
      );
      setuser(data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading(false);
    }
  }
  async function handleLogout() {
    setloading(true);
    try {
      await logout();
      setuser(null);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading(false);
    }
  }
  async function handleGetMe() {
    try {
      const data = await getMe();
      setuser(data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setloading(false);
    }
  }
 

  useEffect(() => {
    handleGetMe();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
  };
};

export default useAuth;
