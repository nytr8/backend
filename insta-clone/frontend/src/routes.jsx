import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/pages/auth/Login";
import Register from "./features/pages/auth/Register";
import Home from "./features/pages/home/Home";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
