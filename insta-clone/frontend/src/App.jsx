import React, { useEffect } from "react";
import AppRoutes from "./routes.jsx";
import axios from "axios";
const App = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Logged in user:", res.data);
      })
      .catch(() => {
        console.log("Not logged in");
      });
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
