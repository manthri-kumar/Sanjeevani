import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login"); 
  const [doctorMode, setDoctorMode] = useState(false); // ✔ doctor login/sign up toggle

  // ------------------ LOGIN ------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const api = doctorMode
      ? "http://localhost:5000/api/doctor/login"
      : "http://localhost:5000/api/login";

    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login Successful!");

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("userType", doctorMode ? "doctor" : "patient");

      navigate("/");
    } else {
      alert(data.message);
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async (e) => {
    e.preventDefault();

    if (doctorMode) {
      // Doctor Signup
      const name = e.target.name.value;
      const email = e.target.email.value;
      const specialist = e.target.specialist.value;
      const experience = e.target.experience.value;
      const password = e.target.password.value;

      const res = await fetch("http://localhost:5000/api/doctor/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          specialist,
          experience,
          password,
        }),
      });

      const data = await res.json();
      alert(data.message);
      if (data.success) setActiveTab("login");
      return;
    }

    // Normal Signup
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) setActiveTab("login");
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">

        {/* ---------------- TABS ---------------- */}
        <div className="auth-tabs">
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

        {/* ---------------- LOGIN FORM ---------------- */}
        {activeTab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email</label>
            <div className="input-box">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>

            <label>Password</label>
            <div className="input-box">
              <i className="fa-solid fa-lock"></i>
              <input type="password" name="password" placeholder="Enter your password" required />
            </div>

            <button className="auth-btn">Log In</button>

            <button className="google-btn">
              <i className="fa-brands fa-google"></i> Sign in with Google
            </button>

            {/* NEW FEATURE */}
            <p className="doctor-switch" onClick={() => setDoctorMode(!doctorMode)}>
              {doctorMode ? "Login as Patient?" : "Login as Doctor?"}
            </p>
          </form>
        )}

        {/* ---------------- SIGNUP FORM ---------------- */}
        {activeTab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            {!doctorMode ? (
              <>
                {/* NORMAL SIGNUP */}
                <label>Username</label>
                <div className="input-box">
                  <i className="fa-solid fa-user"></i>
                  <input type="text" name="username" placeholder="Enter username" required />
                </div>

                <label>Email</label>
                <div className="input-box">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="email" name="email" placeholder="Enter email" required />
                </div>

                <label>Password</label>
                <div className="input-box">
                  <i className="fa-solid fa-lock"></i>
                  <input type="password" name="password" placeholder="Enter password" required />
                </div>
              </>
            ) : (
              <>
                {/* DOCTOR SIGNUP */}
                <label>Name</label>
                <div className="input-box">
                  <i className="fa-solid fa-user-doctor"></i>
                  <input type="text" name="name" placeholder="Enter full name" required />
                </div>

                <label>Email</label>
                <div className="input-box">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="email" name="email" placeholder="Enter email" required />
                </div>

                <label>Specialist</label>
                <div className="input-box">
                  <i className="fa-solid fa-stethoscope"></i>
                  <input type="text" name="specialist" placeholder="Ex: Cardiologist" required />
                </div>

                <label>Years of Experience</label>
                <div className="input-box">
                  <i className="fa-solid fa-briefcase-medical"></i>
                  <input type="number" name="experience" placeholder="Ex: 5" required />
                </div>

                <label>Password</label>
                <div className="input-box">
                  <i className="fa-solid fa-lock"></i>
                  <input type="password" name="password" placeholder="Enter password" required />
                </div>
              </>
            )}

            <button className="auth-btn">Create Account</button>

            <p className="doctor-switch" onClick={() => setDoctorMode(!doctorMode)}>
              {doctorMode ? "Signup as Patient?" : "Signup as Doctor?"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
