import React, { useState } from "react";
import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await handleLogin(username, password).then((res) => {
      console.log(res);
      navigate("/");
    });
    console.log(res);
    setUsername("");
    setPassword("");
  }
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onInput={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          className="username"
          type="text"
          placeholder="enter username"
        />
        <input
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="password"
          type="password"
          placeholder="enter password"
        />
        <button className="submit-btn">Login</button>
      </form>
      <p>
        havent registered yet ?<Link to="/register"> Register here</Link>
      </p>
    </div>
  );
};

export default Login;
