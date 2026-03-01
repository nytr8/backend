import "../styles/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useAuth();
  return (
    <div className="sidecontainer">
      <Link to={"/postcreate"} className="createpost-btn btn">
        create post
      </Link>
      <Link to={`/userprofile/${user._id}`} className="userprofile-btn btn">
        userprofile
      </Link>

      <button
        className="btn logout-btn"
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Sidebar;
