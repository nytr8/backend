import React, { useEffect } from "react";
import "../styles/sidebar.scss";
import { Link } from "react-router-dom";
import useFollow from "../hooks/useFollow";
import useAuth from "../../auth/hooks/useAuth";
const Sidebar = () => {
  const { user: currentUser, handleLogout } = useAuth();
  const {
    followers,
    following,
    loading,
    fetchFollowers,
    fetchFollowing,
    handleUnfollow,
    handleFollow,
    getallUsers,
    allusers,
  } = useFollow();
  useEffect(() => {
    getallUsers();
    fetchFollowers();
    fetchFollowing();
  }, []);
  return (
    <div className="sidecontainer">
      <Link to={"/postcreate"} className="createpost-btn btn">
        create post
      </Link>
      <div>
        {/* FOLLOWING */}
        <div className="names-container following-container">
          <h1 className="headings">following</h1>
          <div className="inner-container">
            {loading ? (
              <p>Loading...</p>
            ) : following.length === 0 ? (
              <p>You are not following anyone</p>
            ) : (
              following.map((f) => (
                <div key={f._id}>
                  <p className="name">{f.followee?.userName}</p>
                  <p
                    className="btn follow-btn"
                    onClick={() => handleUnfollow(f.followee?._id)}
                  >
                    unfollow
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FOLLOWERS */}
        <div className="names-container followers-container">
          <h1 className="headings">followers</h1>
          <div className="inner-container">
            {loading ? (
              <p>Loading...</p>
            ) : followers.length === 0 ? (
              <p>You have no followers yet</p>
            ) : (
              followers.map((f) => (
                <div key={f._id}>
                  <p className="name">{f.follower?.userName}</p>
                  {/* remove = you unfollow them back, or block — up to you */}
                  <p className="btn remove-btn">remove</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SUGGESTIONS — static for now, wire to a suggestions API later */}
        <div className="suggestion-container">
          <h1 className="headings">follow suggestion</h1>
          <div className="innner-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              allusers
                .filter(
                  (user) =>
                    user._id !== currentUser?._id &&
                    !following.some((f) => f.followee?._id === user._id),
                )
                .map((user) => (
                  <div key={user._id}>
                    <p className="name">{user.userName}</p>
                    <p
                      className="btn follow-btn"
                      onClick={() => handleFollow(user._id)}
                    >
                      follow
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <button className="btn logout-btn" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Sidebar;
