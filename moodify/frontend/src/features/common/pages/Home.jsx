import React from "react";
import Songs from "../../song/components/Songs";
import "../styles/home.scss";
import EmotionDetector from "../components/EmotionDetector";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-container">
        <EmotionDetector />
        <Songs />
      </div>
      <div className="logoutbtn">
        <button
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
