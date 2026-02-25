import React from "react";
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";

const Feed = () => {
  const { postData, handleAllPost, handleLike } = usePost();
  console.log(postData);
  useEffect(() => {
    handleAllPost();
  }, []);
  console.log(postData);
  return (
    <div className="post-container">
      {postData.map((elem) => (
        <Post elem={elem} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default Feed;
