import React from "react";
import "../styles/post.scss";
import {
  RiChat3Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiSendPlaneLine,
} from "@remixicon/react";

const Post = ({ elem }) => {
  console.log(elem);
  return (
    <div key={elem._id} className="post-cards">
      <div className="top">
        <div className="profileimage-container">
          <img
            className="profile-image"
            src={elem.user.profileImage}
            alt="Post media"
          />
        </div>
        <h2 className="username">{elem.user.userName}</h2>
      </div>
      <div className="postimage-container">
        <img className="post-image" src={elem.media} alt="Post media" />
      </div>
      <div className="bot">
        <div className="icons">
          {elem.isLiked ? (
            <RiHeart3Fill
              size={24} // set custom `width` and `height`
              color="red" // set `fill` color
              className="my-icon" // add custom class name
            />
          ) : (
            <RiHeart3Line
              size={24} // set custom `width` and `height`
              color="white" // set `fill` color
              className="my-icon" // add custom class name
            />
          )}

          <RiChat3Line
            size={24} // set custom `width` and `height`
            color="white" // set `fill` color
            className="my-icon"
          />
          <RiSendPlaneLine
            size={24} // set custom `width` and `height`
            color="white"
          />
        </div>
        <p className="caption">{elem.caption}</p>
      </div>
    </div>
  );
};

export default Post;
