import React, { useState } from "react";
import "./login.css";

function Login({ setShowLogin }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.message === "Login successful") {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: data.user.username, email: data.user.email })
        );
        setTimeout(() => setShowLogin(false), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.message === "User registered successfully!") {
        setActiveTab("login");
      }
    } catch (err) {
      console.error(err);
      setMessage("Signup failed.");
    }
  };

  const googleLogin = () => {
    window.location.href = "/auth/google";
  };

  return (
    <>
      <div className="overlay" onClick={() => setShowLogin(false)}></div>
      <div className="login-card">
        <span className="close-btn" onClick={() => setShowLogin(false)}>
          &times;
        </span>

        <div className="tab-buttons">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="form" onSubmit={handleLogin}>
            <label>Email</label>
            <div className="input-container">
              <i className="fa-solid fa-envelope icon"></i>
              <input
                type="email"
                placeholder="Enter your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <label>Password</label>
            <div className="input-container">
              <i className="fa-solid fa-lock icon"></i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="primary-btn">Log In</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSignUp}>
            <label>Username</label>
            <div className="input-container">
              <i className="fa-solid fa-user icon"></i>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <label>Email</label>
            <div className="input-container">
              <i className="fa-solid fa-envelope icon"></i>
              <input
                type="email"
                placeholder="Enter your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <label>Password</label>
            <div className="input-container">
              <i className="fa-solid fa-lock icon"></i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="primary-btn">Sign Up</button>
          </form>
        )}

        <button className="google-btn" onClick={googleLogin}>
          <i className="fa-brands fa-google"></i> Sign in with Google
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default Login;
