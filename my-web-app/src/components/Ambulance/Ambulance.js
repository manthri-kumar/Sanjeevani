import React, { useState, useContext } from "react";
import { Truck, Search, MapPin } from "lucide-react";
import { FaAmbulance, FaUserMd, FaHospital, FaPills, FaUserCircle, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdSupportAgent, MdOutlineChecklist } from "react-icons/md";
import { sanjeevaniImg } from "../../assets";
import { AuthContext } from "../AuthContext"; // Corrected import path

import "./Ambulance.css";

// Helper functions (remain outside the component)
const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  const randomNums = Math.floor(100 + Math.random() * 900);
  return `${randomLetters}${randomNums}`;
};

const generateEta = () => `${Math.floor(Math.random() * 12) + 3} mins`;

const generateNearbyAmbulances = (lat, lon, count = 3) => {
  return Array.from({ length: count }, () => {
    const offsetLat = (Math.random() - 0.5) * 0.1;
    const offsetLon = (Math.random() - 0.5) * 0.1;
    return {
      id: generateId(),
      lat: lat + offsetLat,
      lon: lon + offsetLon,
      eta: generateEta(),
    };
  });
};

const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// This component will contain the content from your 3rd image with icons
const IntroSection = () => (
  <div className="intro-section">
    <div className="intro-card-container">
      <div className="intro-card">
        <FaAmbulance size={48} color="#82ad54" />
        <h3>Experience</h3>
        <p>Asia Largest Ambulance Operator with experience in managing large fleets of Ambulances.</p>
        <p>15 years of experience in Emergency Response & Patient Transfer in India and UAE</p>
      </div>
      <div className="intro-card">
        <IoIosPeople size={48} color="#82ad54" />
        <h3>Network</h3>
        <p>Access to 5,000 Ambulances in 65 cities in India. Best Team including Trained Drivers and Paramedics on Board.</p>
      </div>
      <div className="intro-card">
        <MdSupportAgent size={48} color="#82ad54" />
        <h3>24/7 Support 365 Days</h3>
        <p>24/7 helpdesk for Understanding of your requirement an Assuring timely availability of Ambulance 365 days</p>
      </div>
      <div className="intro-card">
        <MdOutlineChecklist size={48} color="#82ad54" />
        <h3>Quality Control</h3>
        <p>Feedback calls and post-consultation rating. Mechanism for continuous quality assessment.</p>
      </div>
    </div>
    
    <div className="booking-process">
      <h2>PROCESS TO BOOK AN AMBULANCE</h2>
      <div className="steps-container">
        <div className="step">
          <FaPhoneAlt size={40} color="#82ad54" />
          <p>Step 1</p>
          <p>Call +919700001298 to Book an ambulance.</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaMapMarkerAlt size={40} color="#82ad54" />
          <p>Step 2</p>
          <p>Share details about the Patient and Location.</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaAmbulance size={40} color="#82ad54" />
          <p>Step 3</p>
          <p>Dispatching of Ambulance in 5 mins.</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaAmbulance size={40} color="#82ad54" />
          <p>Step 4</p>
          <p>Pick Up a Patient from the Location.</p>
        </div>
      </div>
    </div>
  </div>
);

const Ambulance = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext); // Use context
  const [status, setStatus] = useState("idle");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Login-related states
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim().length < 3) {
      setStatus("error");
      setMessage("Please enter at least 3 characters for a valid search.");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&addressdetails=1&accept-language=en&countrycodes=in`
      );
      const data = await response.json();

      if (data.length > 0) {
        const firstResult = data[0];
        const isMeaningfulResult = firstResult.class && (firstResult.class === "place" || firstResult.class === "highway" || firstResult.class === "boundary");

        if (isMeaningfulResult) {
          const { lat, lon, display_name, address } = firstResult;
          const parsedLat = parseFloat(lat);
          const parsedLon = parseFloat(lon);

          setLocation({
            latitude: parsedLat,
            longitude: parsedLon,
            displayName: display_name,
            district: address.county || address.state_district || "N/A",
            state: address.state || "",
          });
          const ambulances = generateNearbyAmbulances(parsedLat, parsedLon, Math.floor(Math.random() * 3) + 3);
          setAmbulanceData(ambulances);
          setStatus("success");
        } else {
          setStatus("error");
          setMessage("No meaningful places found. Try a more specific search.");
        }
      } else {
        setStatus("error");
        setMessage("Place not found. Try another search.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to fetch location.");
    }
  };

  const getFilteredAmbulances = () => {
    return location && ambulanceData.filter((amb) => getDistanceKm(location.latitude, location.longitude, amb.lat, amb.lon) <= 10);
  };
  
  const sendBookingConfirmation = (ambulance) => {
    const confirmationMessage = {
      userEmail: email,
      subject: 'Sanjeevani Ambulance Booking Confirmation',
      body: `
        Dear User,
        Your ambulance booking has been confirmed.
        Ambulance Number: ${ambulance.id}
        Your Location: ${location.displayName}
        ETA: ${ambulance.eta}
        A confirmation email with more details has been sent to your registered email address.
        Thank you for using Sanjeevani.
      `
    };
    
    console.log('Booking Confirmation Message:', confirmationMessage);
    alert('Booking confirmed! A confirmation email has been sent.');
  };

  const handleBook = (ambulance) => {
    if (!isLoggedIn) {
      alert("Please login to book an ambulance.");
      setShowLogin(true);
      setSelectedAmbulance(ambulance);
    } else {
      sendBookingConfirmation(ambulance);
    }
  };

  const sendOtp = () => {
    console.log(`OTP sent to ${email}`);
    setTimer(60);
    setShowResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp === "123456") { // Example OTP verification
      login(); // Use context login function
      setShowLogin(false);
      setLoginStep(1);
      if (selectedAmbulance) {
        sendBookingConfirmation(selectedAmbulance);
        setSelectedAmbulance(null);
      }
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    sendOtp();
    setShowResend(false);
    setOtp('');
  };

  const filteredAmbulances = getFilteredAmbulances();

  return (
    <div className="ambulance-page">
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
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>
              <FaSearch />
            </button>
          </div>
          <div className="cart">
            <button>
              <FaShoppingCart />
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-banner">
        <div className="search-container">
          <Search />
          <input
            type="text"
            placeholder="Search for nearest ambulance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Conditional rendering based on status */}
      {status === "idle" && <IntroSection />}
      {status === "loading" && <p>🔄 Finding location...</p>}
      {status === "error" && <p className="error">❌ {message}</p>}

      {status === "success" && location && (
        <>
          {/* Location Card */}
          <div className="location-card">
            <p><MapPin /> <b>{location.displayName}</b></p>
            <p>📍 District: {location.district}, {location.state}</p>
            <p>🌐 Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}</p>
          </div>

          {/* Ambulance Cards */}
          {filteredAmbulances.length > 0 ? (
            filteredAmbulances.map((amb) => (
              <div key={amb.id} className="ambulance-card">
                <div className="ambulance-info">
                  <h2><Truck /> Ambulance {amb.id}</h2>
                  <p>ETA: {amb.eta}</p>
                  <p>📍 Lat: {amb.lat.toFixed(4)}, Lon: {amb.lon.toFixed(4)}</p>
                </div>
                <button className="book-btn" onClick={() => handleBook(amb)}>Book</button>
              </div>
            ))
          ) : (
            <p>🚫 No ambulances available within 10 km.</p>
          )}
        </>
      )}

      {/* Login Modal */}
      {showLogin && (
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
                  <button type="submit" className="slider-btn">
                    Verify
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}

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
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer-logo"/>
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Ambulance;