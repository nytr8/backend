import { useContext } from "react";
import { AuthContextProvider } from "../AuthContext.jsx";

const useAuth = () => {
  const context = useContext(AuthContextProvider);
  return context;
};

export default useAuth;
