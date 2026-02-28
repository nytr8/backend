import "../styles/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  return (
    <div className="sidecontainer">
      <Link to={"/postcreate"} className="createpost-btn btn">
        create post
      </Link>
      <div></div>
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
