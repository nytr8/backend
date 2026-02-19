import React, { useState } from "react";
import "../../styles/auth.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, email, password);
    const res = await axios.post("http://localhost:3000/api/auth/register", {
      userName: username,
      email: email,
      password: password,
    });
    console.log(res.data);
    setEmail("");
    setPassword("");
    setUsername("");
  }
  return (
    <div className="form-container">
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
            setEmail(e.target.value);
          }}
          value={email}
          className="email"
          type="text"
          placeholder="enter email"
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
        <button className="submit-btn">Register</button>
      </form>
      <p>
        already registered ?<Link to="/login"> Login here</Link>
      </p>
    </div>
  );
};

export default Register;
