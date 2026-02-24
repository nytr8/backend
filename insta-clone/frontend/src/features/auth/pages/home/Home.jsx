import React from "react";
import "../../styles/home.scss";
import Post from "../../../feed/components/Post";
import Feed from "../../../feed/pages/Feed";
import Sidebar from "../../../feed/components/Sidebar";
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
    </div>
  );
};

export default Home;
