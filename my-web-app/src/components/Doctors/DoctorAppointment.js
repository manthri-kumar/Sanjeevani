// src/pages/DoctorAppointment.jsx
import React, { useState, useEffect } from "react";
import "./DoctorAppointment.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppointmentModal from "./AppointmentModal";

function DoctorAppointment() {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState([]);

  // Load doctors from backend (with availability)
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

  const handleBook = (doc) => {
    if (!isLoggedIn) {
      alert("Please log in to book an appointment!");
      sessionStorage.setItem("triggerLogin", "true");
      window.dispatchEvent(new Event("openLoginModal"));
      return;
    }

    // Open modal with selected doctor
    setSelectedDoctor(doc);
  };

  return (
    <div className="appointment-page">
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

                {/* Availability section */}
                {doc.available_date ? (
                  <div className="availability-box">
                    <p>
                      <strong>Available:</strong> {doc.available_date} <br />
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