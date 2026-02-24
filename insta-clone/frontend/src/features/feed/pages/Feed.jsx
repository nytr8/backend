import React from "react";
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";

const Feed = () => {
  const { postData, handleAllPost } = usePost();
  console.log(postData);
  useEffect(() => {
    handleAllPost();
  }, []);

  return (
    <div className="post-container">
      {postData.map((elem) => (
        <Post elem={elem} />
      ))}
    </div>
  );
};

export default Feed;
