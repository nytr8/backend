import React, { useState } from "react";
import Songs from "../../song/components/Songs";
import "../styles/home.scss";
import EmotionDetector from "../components/EmotionDetector";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SongList from "../../song/components/SongList";
import CreateForm from "../components/CreateForm";
const Home = () => {
  const { handleLogout } = useAuth();
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  function handleSetForm(val) {
    setForm(val);
  }
  console.log(form);
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
      <div className="logoutbtn createbtn">
        <button
          onClick={() => {
            setForm(true);
          }}
        >
          upload song
        </button>
      </div>
      {form ? <CreateForm handleSetForm={handleSetForm} /> : ""}
    </div>
  );
};

export default Home;
