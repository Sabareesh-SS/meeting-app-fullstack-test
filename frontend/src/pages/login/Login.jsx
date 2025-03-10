import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.get("http://localhost:8000/api/login", {
        params: { email: username, password },
      });

      const userRole = response.data.role;

      if (userRole) {
        localStorage.setItem("userRole", userRole);
        if (userRole === "admin") {
          navigate("/adminhome");
        } else {
          navigate("/home");
        }
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-box">
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
