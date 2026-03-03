import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginRegister.scss";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    const isEmail = identifier.includes("@");

    const loginData = {
      password,
      ...(isEmail ? { email: identifier } : { username: identifier }),
    };

    try {
      await handleLogin(loginData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // We move the loading check inside the button/UI
  // so the whole page doesn't flicker/disappear on click.
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login with your name or email</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
              type="text" // Keep as text to allow both email and name
              name="identifier"
              placeholder="e.g. johndoe or john@example.com"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
