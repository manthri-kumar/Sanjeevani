import React, { useState, useEffect } from "react";
import "./home.css";
import {
  offerimg, sanjeevaniImg, bannerimg, medicineimg, Docimg, doctorimg,
  labimg, healthimg, monitorimg, painimg, proteinimg, babyimg,
  ayurvedicimg, skincareimg, vitaminimg, Nutritiousimg, ambulance
} from "../../assets"; // Corrected import path
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Login from "../Login/login"; // Import Login component


function Home() {
  const images = [offerimg, bannerimg, sanjeevaniImg];

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(60);
  const [cartCount, setCartCount] = useState(0);

  // ✅ Fix 1: Ensure login state is reset properly on first load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      localStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    }
  }, []);

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
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, email })
      });
      const data = await response.json();
      if (data.success) {
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
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }) 
      });
      const data = await response.json();
      if (data.success) {
        alert("✅ " + data.message);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setShowLogin(false);
        setLoginStep(1);
        setPhoneNumber("");
        setEmail("");
        setOtp("");
      } else {
        alert("❌ " + data.message);
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
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* ✅ Fix 2: Blur only background, keep login modal outside */}
      <div className={showLogin ? "blur-bg" : ""}>
        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
          </div>
          <nav className="nav-links">
            <a href="#">DOCTORS</a>
            <a href="#">HOSPITALS</a>
            <a href="#">MEDICINES</a>
            <a href="#">PROFILE</a>
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
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>

          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Image Slider */}
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Services row */}
        <div className="service-row">
          <Link to="/medicines" className="service-card light-green">
            <img src={medicineimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Buy Medicines & Essentials</div>
              <div className="service-subtitle">2HRS DELIVERY</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <div className="service-card light-yellow">
            <img src={doctorimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Doctor Appointment</div>
              <div className="service-subtitle">BOOK NOW</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="service-card light-pink">
            <img src={labimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Lab Tests</div>
            <div className="service-subtitle">AT HOME</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
         <Link to="/ambulance" className="service-card light-salmon">
            <img src={ambulance} className="service-icon" alt="" />
            <div>
              <div className="service-title">Book Ambulance</div>
              <div className="service-subtitle">Nearest to your location</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>

        {/* Categories */}
        <h3 className="h3">Shop By Category </h3>
        <div className="category-grid">
          <Link to="/healthmonitor" className="category-card service-card light-green">
            <img src={monitorimg} alt="Health Monitors" />
            <p>Health Monitors</p>
          </Link>
          <div className="category-card"><img src={ayurvedicimg} alt="Ayurvedic Diabetes Care" /><p>Ayurvedic Diabetes Care</p></div>
          <div className="category-card"><img src={painimg} alt="Pain Relief" /><p>Pain Relief</p></div>
          <div className="category-card"><img src={babyimg} alt="Baby Care" /><p>Baby Care</p></div>
        </div>
        <div className="category-grid">
          <div className="category-card"><img src={proteinimg} alt="Protein" /><p>Protein</p></div>
          <div className="category-card"><img src={skincareimg} alt="Skin Care" /><p>Skin Care</p></div>
          <div className="category-card"><img src={vitaminimg} alt="Vitamin" /><p>Vitamin</p></div>
          <div className="category-card"><img src={Nutritiousimg} alt="Nutritious Drinks" /><p>Nutritious Drinks</p></div>
        </div>

        {/* Health Banner */}
        <div className="health-banner">
          <div className="banner-content">
            <h2>Stay informed about your health at any time..</h2>
            <p>Get trusted answers directly from Sanjeevani.</p>
            <button className="book-btn">Book</button>
          </div>
          <img src={Docimg} alt="Doctor Illustration" className="banner-illustration" />
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <h4>About Sanjeevani</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Corporate</h4>
              <ul>
                <li><a href="#">Corporate Disclosures</a></li>
                <li><a href="#">Corporate Partnerships</a></li>
                <li><a href="#">Sanjeevani Sitemap</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Online Doctor Consultation</a></li>
                <li><a href="#">Online Medicines</a></li>
                <li><a href="#">Health Programs</a></li>
                <li><a href="#">Doctors by Specialty</a></li>
                <li><a href="#">Doctors by City</a></li>
                <li><a href="#">All Doctors List</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Lab Tests</h4>
              <ul><li><a href="#">Book Lab Tests at Home</a></li></ul>
            </div>
            <div className="footer-section">
              <h4>Product Categories</h4>
              <ul>
                <li><a href="#">Health Care</a></li>
                <li><a href="#">Personal Care</a></li>
                <li><a href="#">Baby Care</a></li>
                <li><a href="#">Nutrition</a></li>
                <li><a href="#">Healthcare Devices</a></li>
                <li><a href="#">Beauty & Skin Care</a></li>
                <li><a href="#">Immunity Boosters</a></li>
                <li><a href="#">Diabetes Care</a></li>
              </ul>
            </div>
            <div className="footer-section footer-brand">
              <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer logo"/>
              <h4>A MANTHRI Enterprise</h4>
            </div>
          </div>
        </footer>
      </div>

      {/* ✅ Login/Signup Slider kept outside blur */}
      {showLogin && !isLoggedIn && (
        <>
          <div className="overlay" onClick={() => setShowLogin(false)}></div>
          <div className={`slider ${showLogin ? "active" : ""}`}>
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

              {/* Step 1 */}
              {loginStep === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendOtp();
                    setLoginStep(2);
                  }}
                >
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

                  <p className="otp-info">
                    OTP will be sent to your email. Phone number will be saved.
                  </p>
                  <button type="submit" className="slider-btn">
                    Continue
                  </button>
                </form>
              )}

              {/* Step 2 */}
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

              {/* Step 3 */}
              {loginStep === 3 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyOtp();
                  }}
                >
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
                      {timer > 0
                        ? `00:${timer < 10 ? `0${timer}` : timer} Secs`
                        : ""}
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
                  <button type="submit" className="slider-btn">
                    Verify
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
