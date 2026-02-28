import React from "react";
import usePost from "../hooks/usePost";
import { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";

const Feed = () => {
  const { postData, handleGetAllPost } = usePost();
  console.log(postData);
  useEffect(() => {
    handleGetAllPost();
  }, []);
  console.log(postData);
  return (
    <div className="post-container">
      {postData.map((elem) => (
        <Post elem={elem} />
      ))}
    </div>
  );
};

export default Feed;
