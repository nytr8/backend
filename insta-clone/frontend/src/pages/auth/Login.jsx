import React, { useState } from "react";
import "../../styles/auth.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/api/auth/login", {
      userName: username,
      password: password,
    });
    console.log(res.data);
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
