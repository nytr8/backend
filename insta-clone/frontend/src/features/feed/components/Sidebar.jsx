import React from "react";
import "../styles/sidebar.scss";
const Sidebar = () => {
  return (
    <div className="sidecontainer">
      <h1 className="createpost-btn btn">create post</h1>
      <div>
        <div className="names-container following-container">
          <h1 className="headings">following</h1>
          <div className="inner-container">
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn follow-btn">unfollow</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn follow-btn">unfollow</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn follow-btn">unfollow</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn follow-btn">unfollow</p>
            </div>
          </div>
        </div>
        <div className="names-container followers-container">
          <h1 className="headings">followers</h1>
          <div className="inner-container">
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn remove-btn">remove</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn remove-btn">remove</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn remove-btn">remove</p>
            </div>
            <div>
              <p className="name">jhjhhjhoo</p>
              <p className="btn remove-btn">remove</p>
            </div>
          </div>
        </div>
        <div className="suggestion-container">
          <h1 className="headings">follow suggestion</h1>
          <div className="innner-container">
            <div>
              <p className="name">sdfsdf</p>
              <p className="btn follow-btn">follow</p>
            </div>
            <div>
              <p className="name">sdfsdf</p>
              <p className="btn follow-btn">follow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
