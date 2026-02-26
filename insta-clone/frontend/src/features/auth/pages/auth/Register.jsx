import { useState } from "react";
import "../../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleRegister(username, email, password).then((res) => {
      console.log(res);
      navigate("/");
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
        <button onClick={handleGoogleLogin} className="submit-btn goooglelogin">
          google
        </button>
      </form>
      <p>
        already registered ?<Link to="/login"> Login here</Link>
      </p>
    </div>
  );
};

export default Register;
