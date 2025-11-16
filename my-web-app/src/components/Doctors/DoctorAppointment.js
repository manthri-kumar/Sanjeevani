// src/pages/DoctorAppointment.jsx
import React, { useState, useEffect } from "react";
import "./DoctorAppointment.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppointmentModal from "./AppointmentModal";
import { Link, useNavigate } from "react-router-dom";
import sanjeevaniImg from "../../assets/sanjeevani.jpg";

function DoctorAppointment() {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const cartCount = sessionStorage.getItem("cartCount") || 0;

  // Load doctors from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Doctors loaded:", data.doctors);
          setDoctors(data.doctors);
        }
      })
      .catch((err) => console.error("Error loading doctors:", err));

    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
    }
  };

  const handleBook = (doc) => {
    if (!isLoggedIn) {
      alert("Please log in to book an appointment!");
      sessionStorage.setItem("triggerLogin", "true");
      window.dispatchEvent(new Event("openLoginModal"));
      return;
    }

    setSelectedDoctor(doc);
  };

  return (
    <div className="appointment-page">

      {/* ---------- HEADER ---------- */}
      <header className="dheader">

        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>

        <nav className="nav-links">
          <Link to="/doctorappointment">DOCTORS</Link>
          <Link to="/hospitals">HOSPITALS</Link>
          <Link to="/Medicines">MEDICINES</Link>
          <Link to="/Profile">PROFILE</Link>
        </nav>

        <div className="search">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <i className="fas fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="cart">
          <button onClick={() => navigate("/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>

      </header>

      {/* ---------- DOCTORS SECTION ---------- */}
      <div className="appointment-container">

        <h2 className="title">Available Doctors</h2>

        <div className="doctor-row">
          {doctors
            .filter((doc) => !selectedSpec || doc.specialist === selectedSpec)
            .map((doc) => (
              <div key={doc.id} className="doctor-card">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-spec">{doc.specialist}</p>
                <span className="exp-chip">{doc.experience_years} years</span>

                {/* Availability */}
                {doc.available_date ? (
                  <div className="availability-box">
                    <p>
                      <strong>Available:</strong> {doc.available_date}<br />
                      {doc.start_time} – {doc.end_time}
                    </p>
                  </div>
                ) : (
                  <p className="no-availability">No availability set</p>
                )}

                <button
                  className="btn-book"
                  disabled={!doc.available_date}
                  onClick={() => handleBook(doc)}
                >
                  {doc.available_date ? "Book Appointment" : "Not Available"}
                </button>
              </div>
            ))}
        </div>
      </div>

      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

    </div>
  );
}

export default DoctorAppointment;
