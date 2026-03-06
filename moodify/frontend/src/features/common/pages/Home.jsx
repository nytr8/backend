import React from "react";
import Songs from "../../song/components/Songs";
import "../styles/home.scss";
import EmotionDetector from "../components/EmotionDetector";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SongList from "../../song/components/SongList";
const Home = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-container">
        <EmotionDetector />
        <Songs />
        <SongList />
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
