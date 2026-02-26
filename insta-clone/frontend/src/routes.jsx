import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/auth/Login";
import Register from "./features/auth/pages/auth/Register";
import Home from "./features/auth/pages/home/Home";
import Postcreate from "./features/feed/pages/Postcreate";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/postcreate" element={<Postcreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
