import React from "react";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import router from "./app.routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
