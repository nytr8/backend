import useAuth from "../../hooks/useAuth";
import "../../styles/profile.scss";
const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__image">
          <img
            src={user.profileImage || "https://via.placeholder.com/150"}
            alt="profile"
          />
        </div>

        <div className="profile__info">
          <div className="profile__top">
            <h2>{user.userName}</h2>
            <div className="profile__buttons">
              <button>Edit Profile</button>
              <button>View Archive</button>
            </div>
          </div>

          <div className="profile__stats">
            <p>
              <span>{user.postsCount || 0}</span> posts
            </p>
            <p>
              <span>{user.followersCount || 0}</span> followers
            </p>
            <p>
              <span>{user.followingCount || 0}</span> following
            </p>
          </div>

          <div className="profile__bio">
            <p className="name">{user.fullName || "default"}</p>
            <p className="bio">{user.bio || "No bio yet."}</p>
          </div>
        </div>
      </div>

      <div className="profile__divider">POSTS</div>
      {/* 
      <div className="profile__posts">
        {user.posts?.length > 0 ? (
          user.posts.map((post) => (
            <div key={post._id} className="profile__post">
              <img src={post.image} alt="post" />
            </div>
          ))
        ) : (
          <p className="no-posts">No posts yet</p>
        )}
      </div> */}
    </div>
  );
};

export default UserProfile;
