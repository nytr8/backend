import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import AuthContext from "./features/auth/AuthContext.jsx";
import FeedContext from "./features/feed/feedContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <FeedContext>
      <App />
    </FeedContext>
  </AuthContext>,
);
