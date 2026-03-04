import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import AuthContext from "./features/auth/AuthContext.jsx";
import SongContext from "./features/song/SongContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <SongContext>
        <App />
      </SongContext>
    </AuthContext>
  </StrictMode>,
);
