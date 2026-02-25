import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import AuthContext from "./features/auth/AuthContext.jsx";
import FeedContext from "./features/feed/FeedContext.jsx";
import FollowContext from "./features/feed/FollowContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <FeedContext>
      <FollowContext>
        <App />
      </FollowContext>
    </FeedContext>
  </AuthContext>,
);
