import React, { useState, useEffect } from "react";
import "./home.css";
import {
  offerimg, sanjeevaniImg, bannerimg, medicineimg, Docimg, doctorimg,
  monitorimg, painimg, proteinimg, babyimg,
  ayurvedicimg, skincareimg, vitaminimg, Nutritiousimg, ambulance, bloodbank
} from "../../assets";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom"; // ✅ Keep ONLY this import (Do NOT import DoctorAppointment here)

function Home() {
  const images = [offerimg, bannerimg, sanjeevaniImg];
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleAddToCart = () => setCartCount(prev => prev + 1);

  return (
    <>
      <div className={showLogin ? "blur-bg" : ""}>

        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
          </div>

          {/* ✅ Navbar links changed to Link components */}
          <nav className="nav-links">
            <Link to="/doctorappointment">DOCTORS</Link>
            <Link to="/healthmonitor">HOSPITALS</Link>
            <Link to="/medicines">MEDICINES</Link>
            <Link to="/profile">PROFILE</Link>
          </nav>

          <div className="search">
            <input type="text" placeholder="Search" />
            <button><i className="fas fa-magnifying-glass"></i></button>
          </div>

          <div className="cart">
            <button>
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>

          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login / Sign Up</button>
          )}
        </header>

        {/* Image Slider */}
        <div className="container">
          <Swiper modules={[Navigation, Pagination, Autoplay]} loop autoplay={{ delay: 3000 }} navigation pagination={{ clickable: true }}>
            {images.map((img, index) => (
              <SwiperSlide key={index}><img src={img} className="banner-img" /></SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Service Cards */}
        <div className="service-row">

          <Link to="/medicines" className="service-card light-green">
            <img src={medicineimg} className="service-icon" />
            <div><div className="service-title">Buy Medicines</div><div className="service-subtitle">2HRS DELIVERY</div></div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          {/* ✅ Correct Working Doctor Appointment */}
          <Link to="/doctorappointment" className="service-card light-yellow">
            <img src={doctorimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Doctor Appointment</div>
              <div className="service-subtitle">BOOK NOW</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <Link to="/bloodbank" className="service-card light-pink">
            <img src={bloodbank} className="service-icon" />
            <div><div className="service-title">Blood Banks</div><div className="service-subtitle">Find Near You</div></div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <Link to="/ambulance" className="service-card light-salmon">
            <img src={ambulance} className="service-icon" />
            <div><div className="service-title">Book Ambulance</div><div className="service-subtitle">Emergency Help</div></div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

        </div>

        {/* Categories */}
        <h2 className="Categories-h3">Shop By Category</h2>
        <div className="category-grid">
          <Link to="/healthmonitor" className="category-card"><img src={monitorimg} /><p>Health Monitors</p></Link>
          <div className="category-card"><img src={ayurvedicimg} /><p>Ayurvedic Care</p></div>
          <div className="category-card"><img src={painimg} /><p>Pain Relief</p></div>
          <div className="category-card"><img src={babyimg} /><p>Baby Care</p></div>
        </div>

        {/* Health Banner */}
        <div className="health-banner">
          <div className="banner-content">
            <h2>Stay informed about your health.</h2>
            <p>Consult doctors anytime.</p>
            <button className="book-btn">Book</button>
          </div>
          <img src={Docimg} className="banner-illustration" />
        </div>

        {/* Footer */}
        <footer className="footer">
          <h4>Sanjeevani - A Manthri Enterprise</h4>
        </footer>

      </div>
    </>
  );
}

export default Home;
