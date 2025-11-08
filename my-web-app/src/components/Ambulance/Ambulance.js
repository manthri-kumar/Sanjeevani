import React, { useState } from "react";
import { Truck, Search, MapPin } from "lucide-react";
import {
  FaAmbulance, FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaShoppingCart
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdSupportAgent, MdOutlineChecklist } from "react-icons/md";
import { sanjeevaniImg } from "../../assets";
import "./Ambulance.css";

// Helper functions
const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
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
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Info section
const IntroSection = () => (
  <div className="intro-section">
    <div className="intro-card-container">
      <div className="intro-card">
        <FaAmbulance size={48} color="#82ad54" />
        <h3>Experience</h3>
        <p>
          Asia’s Largest Ambulance Operator with experience in managing large
          fleets of Ambulances.
        </p>
        <p>
          15 years of experience in Emergency Response & Patient Transfer in
          India and UAE.
        </p>
      </div>

      <div className="intro-card">
        <IoIosPeople size={48} color="#82ad54" />
        <h3>Network</h3>
        <p>
          Access to 5,000 Ambulances in 65 cities in India. Best Team including
          Trained Drivers and Paramedics.
        </p>
      </div>

      <div className="intro-card">
        <MdSupportAgent size={48} color="#82ad54" />
        <h3>24/7 Support 365 Days</h3>
        <p>
          24/7 helpdesk assuring timely availability of Ambulances all year
          round.
        </p>
      </div>

      <div className="intro-card">
        <MdOutlineChecklist size={48} color="#82ad54" />
        <h3>Quality Control</h3>
        <p>
          Feedback calls and rating mechanism for continuous quality
          improvement.
        </p>
      </div>
    </div>

    <div className="booking-process">
      <h2>PROCESS TO BOOK AN AMBULANCE</h2>
      <div className="steps-container">
        <div className="step">
          <FaPhoneAlt size={40} color="#82ad54" />
          <p>Step 1</p>
          <p>Call +91 97000 01298 to Book an Ambulance</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaMapMarkerAlt size={40} color="#82ad54" />
          <p>Step 2</p>
          <p>Share details about the Patient and Location</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaAmbulance size={40} color="#82ad54" />
          <p>Step 3</p>
          <p>Dispatching of Ambulance in 5 mins</p>
        </div>
        <div className="arrow"></div>
        <div className="step">
          <FaAmbulance size={40} color="#82ad54" />
          <p>Step 4</p>
          <p>Pick Up the Patient from the Location</p>
        </div>
      </div>
    </div>
  </div>
);

const Ambulance = () => {
  const [status, setStatus] = useState("idle");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [cartCount] = useState(0);

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
        const { lat, lon, display_name, address } = data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        setLocation({
          latitude: parsedLat,
          longitude: parsedLon,
          displayName: display_name,
          district: address.county || address.state_district || "N/A",
          state: address.state || "",
        });

        const ambulances = generateNearbyAmbulances(
          parsedLat,
          parsedLon,
          Math.floor(Math.random() * 3) + 3
        );
        setAmbulanceData(ambulances);
        setStatus("success");
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
    return location
      ? ambulanceData.filter(
          (amb) =>
            getDistanceKm(
              location.latitude,
              location.longitude,
              amb.lat,
              amb.lon
            ) <= 10
        )
      : [];
  };

  const filteredAmbulances = getFilteredAmbulances();

  return (
    <div className="ambulance-page">
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

      {/* Search */}
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

      {/* Results */}
      {status === "idle" && <IntroSection />}
      {status === "loading" && <p>🔄 Finding location...</p>}
      {status === "error" && <p className="error">❌ {message}</p>}

      {status === "success" && location && (
        <>
          <div className="location-card">
            <p>
              <MapPin /> <b>{location.displayName}</b>
            </p>
            <p>
              📍 District: {location.district}, {location.state}
            </p>
            <p>
              🌐 Lat: {location.latitude.toFixed(4)}, Lon:{" "}
              {location.longitude.toFixed(4)}
            </p>
          </div>

          {filteredAmbulances.length > 0 ? (
            filteredAmbulances.map((amb) => (
              <div key={amb.id} className="ambulance-card">
                <div className="ambulance-info">
                  <h2>
                    <Truck /> Ambulance {amb.id}
                  </h2>
                  <p>ETA: {amb.eta}</p>
                  <p>
                    📍 Lat: {amb.lat.toFixed(4)}, Lon: {amb.lon.toFixed(4)}
                  </p>
                </div>
                <button
                  className="book-btn"
                  onClick={() =>
                    alert(`✅ Booking confirmed for Ambulance ${amb.id}`)
                  }
                >
                  Book
                </button>
              </div>
            ))
          ) : (
            <p>🚫 No ambulances available within 10 km.</p>
          )}
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
            </ul>
          </div>
          <div className="footer-section footer-brand">
            <img
              src={sanjeevaniImg}
              alt="Sanjeevani Logo"
              className="footer-logo"
            />
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Ambulance;
