{/* 🔐 Login/Signup Modal */}
     {showLogin && !isLoggedIn && (
  <>
    {/* Dark overlay behind modal */}
    <div className="overlay" onClick={() => setShowLogin(false)}></div>

    {/* Login / Signup Modal Card */}
    <div className="login-card">
      {/* Close Button */}
      <span className="close-btn" onClick={() => setShowLogin(false)}>&times;</span>

      {/* Tab Buttons */}
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
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Password</label>
          <div className="input-container">
            <i className="fa-solid fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              defaultValue=""
              required
            />
          </div>

          <button type="submit" className="primary-btn">Log In</button>
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
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Email</label>
          <div className="input-container">
            <i className="fa-solid fa-envelope icon"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Password</label>
          <div className="input-container">
            <i className="fa-solid fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              defaultValue=""
              required
            />
          </div>

          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
      )}

      {/* Google Login Button */}
      <button className="google-btn">
        <i className="fa-brands fa-google"></i> Sign in with Google
      </button>
    </div>
  </>
)}
