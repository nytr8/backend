import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/auth/Login";
import Register from "./features/auth/pages/auth/Register";
import Home from "./features/auth/pages/home/Home";
import Postcreate from "./features/feed/pages/Postcreate";
import { useEffect, useState } from "react";
const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuth(!!token);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" replace />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/postcreate"
          element={isAuth ? <Postcreate /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
