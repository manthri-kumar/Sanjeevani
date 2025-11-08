import React, { useState, useEffect } from "react";
import ProfileLeft from "./ProfileLeft";
import ProfileRight from "./ProfileRight";
import "./Profile.css";
import sanjeevaniImg from "../../assets/sanjeevani.jpg"; // ✅ logo

const Profile = () => {
  const [selected, setSelected] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState(1);

  // ✅ Check login state from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again later.");
    }
  };

  // ✅ Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.signupUsername.value;
    const email = e.target.signupEmail.value;
    const password = e.target.signupPassword.value;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup successful! Please log in.");
        setLoginStep(1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <>
      {/* ✅ Header */}
      <header className="header">
        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>
        <nav className="nav-links">
          <a href="#">DOCTORS</a>
          <a href="#">HOSPITALS</a>
          <a href="#">MEDICINES</a>
          <a href="/profile" className="active">
            PROFILE
          </a>
        </nav>
        <div className="search">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>
              <i className="fas fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div className="cart">
          <button onClick={() => (window.location.href = "/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </header>

      {/* ✅ Profile Layout */}
      <div className="profile-container">
        <ProfileLeft selected={selected} setSelected={setSelected} />
        <div className="profile-main">
          {isLoggedIn ? (
            <ProfileRight selected={selected} />
          ) : (
            <div className="profile-right">
              <h1 className="pr-title">My Profile</h1>
              <div className="pr-card" style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  Please log in to view your profile
                </p>
                <button
                  className="login-btn"
                  onClick={() => setShowLogin(true)}
                  style={{
                    background: "linear-gradient(to right, #22c55e, #15803d)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Login / Signup Modal */}
      {showLogin && !isLoggedIn && (
        <>
          {/* Overlay */}
          <div className="overlay" onClick={() => setShowLogin(false)}></div>

          {/* Login/Signup Card */}
          <div className="login-card">
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </span>

            {/* Tabs */}
            <div className="tab-buttons">
              <button
                className={loginStep === 1 ? "active" : ""}
                onClick={() => setLoginStep(1)}
              >
                Log In
              </button>
              <button
                className={loginStep === 2 ? "active" : ""}
                onClick={() => setLoginStep(2)}
              >
                Sign Up
              </button>
            </div>

            {/* --- LOGIN FORM --- */}
            {loginStep === 1 && (
              <form autoComplete="off" onSubmit={handleLogin}>
                <label>Email</label>
                <div className="input-container">
                  <i className="fa-solid fa-envelope icon"></i>
                  <input
                    type="email"
                    name="loginEmail"
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                  />
                </div>

                <label>Password</label>
                <div className="input-container">
                  <i className="fa-solid fa-lock icon"></i>
                  <input
                    type="password"
                    name="loginPassword"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button type="submit" className="primary-btn">
                  Log In
                </button>
              </form>
            )}

            {/* --- SIGNUP FORM --- */}
            {loginStep === 2 && (
              <form autoComplete="off" onSubmit={handleSignup}>
                <label>Username</label>
                <div className="input-container">
                  <i className="fa-solid fa-user icon"></i>
                  <input
                    type="text"
                    name="signupUsername"
                    placeholder="Enter your username"
                    autoComplete="off"
                    required
                  />
                </div>

                <label>Email</label>
                <div className="input-container">
                  <i className="fa-solid fa-envelope icon"></i>
                  <input
                    type="email"
                    name="signupEmail"
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                  />
                </div>

                <label>Password</label>
                <div className="input-container">
                  <i className="fa-solid fa-lock icon"></i>
                  <input
                    type="password"
                    name="signupPassword"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button type="submit" className="primary-btn">
                  Sign Up
                </button>
              </form>
            )}

            {/* Google Login Button */}
            <button className="google-btn">
              <i className="fa-brands fa-google"></i> Sign in with Google
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
