import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/pages/auth/Login";
import Register from "./features/auth/pages/auth/Register";
import Home from "./features/auth/pages/home/Home";
import Postcreate from "./features/feed/pages/Postcreate";
import RequireAuth from "./features/auth/components/RequireAuth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/postcreate"
          element={
            <RequireAuth>
              <Postcreate />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
