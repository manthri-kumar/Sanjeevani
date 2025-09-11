import React, { useState, useEffect } from "react";
import "./login.css";

function Login({ setShowLogin }) {
  const [loginStep, setLoginStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(60);

  const sendOtp = async () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      // In a real application, replace this with a real API call.
      // For this example, we'll simulate the process.
      const response = { success: true };

      if (response.success) {
        setLoginStep(2);
        setTimer(60);
        setShowResend(false);
      } else {
        alert("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP.");
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      // In a real application, replace this with a real API call.
      // For this example, we'll simulate the process.
      const response = { success: true, message: "Login successful." };

      if (response.success) {
        alert("✅ " + response.message);
        localStorage.setItem("isLoggedIn", "true");
        setShowLogin(false);
        // Reset form state
        setLoginStep(1);
        setPhoneNumber("");
        setEmail("");
        setOtp("");
      } else {
        alert("❌ " + response.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP.");
    }
  };

  useEffect(() => {
    let interval = null;
    if (loginStep === 2 && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setShowResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loginStep, timer]);

  const handleResendOtp = () => {
    sendOtp();
  };

  return (
    <>
      <div className="overlay" onClick={() => setShowLogin(false)}></div>
      <div className="slider active">
        <div className="slider-content">
          <div className="slider-header">
            {loginStep === 2 && (
              <i
                className="fa-solid fa-arrow-left back-btn"
                onClick={() => setLoginStep(1)}
              ></i>
            )}
            <h2>{loginStep === 1 ? "Sign In" : loginStep === 2 ? "OTP Sent" : "Enter OTP"}</h2>
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </span>
          </div>

          {/* Step 1: Phone and Email Input */}
          {loginStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
              <label>Phone Number</label>
              <div className="phone-input-container">
                <span>+91 |</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="254567891"
                  required
                  maxLength="10"
                />
              </div>
              <label>Email</label>
              <div className="email-input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <p className="otp-info">OTP will be sent to your email. Phone number will be saved.</p>
              <button type="submit" className="slider-btn">Continue</button>
            </form>
          )}

          {/* Step 2: OTP Sent Confirmation */}
          {loginStep === 2 && (
            <div className="otp-alert-box">
              <p>✅ OTP has been sent to <strong>{email}</strong></p>
              <button
                className="slider-btn"
                onClick={() => setLoginStep(3)}
              >
                Enter OTP
              </button>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {loginStep === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }}>
              <p className="otp-message">Please enter the OTP sent to {email}</p>
              <div className="otp-input-container">
                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                />
                <span className="timer">
                  {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer} Secs` : ""}
                </span>
              </div>
              {showResend && (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResendOtp}
                >
                  RESEND OTP
                </button>
              )}
              <button type="submit" className="slider-btn">Verify</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;