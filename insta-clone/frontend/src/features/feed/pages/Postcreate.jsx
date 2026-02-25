import React, { useState } from "react";
import "../styles/create.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import usePost from "../hooks/usePost";

const Postcreate = () => {
  const { handleCreatePost, loading } = usePost();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
//   if (!loading) {
//     return <h1>loading...</h1>;
//   }
  async function handleForm(e) {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    await handleCreatePost(file, caption);
    navigate("/");
  }
  return (
    <div className="form-container">
      <h1>Create a Post</h1>
      <form onSubmit={handleForm}>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          className="file"
          type="file"
        />
        <input
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          className="caption"
          type="text"
          placeholder="enter caption"
        />
        <button className="submit-btn">create post</button>
      </form>
      <p>
        <Link to="/"> go back home</Link>
      </p>
    </div>
  );
};

export default Postcreate;
