import React from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { sanjeevaniImg } from "../../assets";  // ✅ FIXED path
import { Link } from "react-router-dom";

const doctors = [
  { name: "Dr. Anil Sharma", specialization: "Cardiologist", experience: "12 years" },
  { name: "Dr. Meera Patel", specialization: "Dermatologist", experience: "8 years" },
  { name: "Dr. Rajesh Kumar", specialization: "Orthopedic", experience: "10 years" },
];

function DoctorAppointment() {
  const handleBook = (doc) => {
    alert(`Booking appointment with ${doc.name} (${doc.specialization})`);
  };

  return (
    <>
      {/* Navbar */}
      <header className="header">
        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>

        <nav className="nav-links">
          <Link to="/doctor-appointment">DOCTORS</Link>
          <Link to="/lab-tests">LAB TESTS</Link>
          <Link to="/medicines">MEDICINES</Link>
          <Link to="#">PROFILE</Link>
        </nav>
      </header>

      {/* Doctors List */}
      <div className="appointment-container">
        <h2 className="title">Available Doctors</h2>
        <div className="doctor-row">
          {doctors.map((doc, idx) => (
            <div key={idx} className="doctor-card">
              <div className="doc-head">
                <h3 className="doc-name">{doc.name}</h3>
                <span className="exp-chip">{doc.experience}</span>
              </div>
              <p className="doc-spec">{doc.specialization}</p>
              <button className="btn-book" onClick={() => handleBook(doc)}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorAppointment;
