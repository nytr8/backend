import React from "react";
import "../../styles/home.scss";
import Post from "../../../feed/components/Post";
import Feed from "../../../feed/pages/Feed";
const Home = () => {
  return (
    <div className="home">
      <Feed />
    </div>
  );
};

export default Home;
