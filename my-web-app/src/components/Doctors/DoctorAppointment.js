import React, { useState, useEffect } from "react";
import "./DoctorAppointment.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import sanjeevaniImg from "../../assets/sanjeevani.jpg";
import { Link, useNavigate } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";

const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Neurologist",
  "Pediatrician",
  "ENT Specialist",
  "Gynecologist",
  "Dentist"
];

const doctors = [
  { name: "Dr. Anil Sharma", specialization: "Cardiologist", experience: "12 years" },
  { name: "Dr. Megha Suri", specialization: "Cardiologist", experience: "9 years" },
  { name: "Dr. Raghav Prasad", specialization: "Cardiologist", experience: "7 years" },
  { name: "Dr. Kavya Menon", specialization: "Cardiologist", experience: "11 years" },
  { name: "Dr. S. Venkatesh", specialization: "Cardiologist", experience: "14 years" },
  { name: "Dr. Anita Balan", specialization: "Cardiologist", experience: "6 years" },
  { name: "Dr. M. Jayaprakash", specialization: "Cardiologist", experience: "8 years" },

  { name: "Dr. Meera Patel", specialization: "Dermatologist", experience: "8 years" },
  { name: "Dr. Sneha Rao", specialization: "Dermatologist", experience: "5 years" },
  { name: "Dr. Tanvi Jain", specialization: "Dermatologist", experience: "9 years" },
  { name: "Dr. Nikhil Shah", specialization: "Dermatologist", experience: "7 years" },
  { name: "Dr. Priya Nambiar", specialization: "Dermatologist", experience: "10 years" },
  { name: "Dr. Rupali Khanna", specialization: "Dermatologist", experience: "6 years" },

  { name: "Dr. Rajesh Kumar", specialization: "Orthopedic", experience: "10 years" },
  { name: "Dr. Vishal Deshmukh", specialization: "Orthopedic", experience: "7 years" },
  { name: "Dr. Harshit Tiwari", specialization: "Orthopedic", experience: "12 years" },
  { name: "Dr. Kiran Joseph", specialization: "Orthopedic", experience: "9 years" },
  { name: "Dr. Smriti Sen", specialization: "Orthopedic", experience: "6 years" },
  { name: "Dr. N. Balaji", specialization: "Orthopedic", experience: "11 years" },

  { name: "Dr. Kavita Reddy", specialization: "Neurologist", experience: "9 years" },
  { name: "Dr. Ayesha Siddiqui", specialization: "Neurologist", experience: "11 years" },
  { name: "Dr. Manoj Shetty", specialization: "Neurologist", experience: "14 years" },
  { name: "Dr. Kumaran Rao", specialization: "Neurologist", experience: "6 years" },
  { name: "Dr. Alok Agrawal", specialization: "Neurologist", experience: "10 years" },

  { name: "Dr. Suresh Verma", specialization: "Pediatrician", experience: "14 years" },
  { name: "Dr. Neha Varrier", specialization: "Pediatrician", experience: "8 years" },
  { name: "Dr. Ritu Batra", specialization: "Pediatrician", experience: "6 years" },
  { name: "Dr. Sanjay Naidu", specialization: "Pediatrician", experience: "11 years" },
  { name: "Dr. Surekha Iyer", specialization: "Pediatrician", experience: "9 years" },

  { name: "Dr. Anita Joshi", specialization: "ENT Specialist", experience: "7 years" },
  { name: "Dr. Srikar Rao", specialization: "ENT Specialist", experience: "9 years" },
  { name: "Dr. Deepika Mohan", specialization: "ENT Specialist", experience: "5 years" },
  { name: "Dr. Abhijeet Singh", specialization: "ENT Specialist", experience: "12 years" },

  { name: "Dr. Pooja Singh", specialization: "Gynecologist", experience: "11 years" },
  { name: "Dr. Radhika Prabhu", specialization: "Gynecologist", experience: "8 years" },
  { name: "Dr. Ananya Chatterjee", specialization: "Gynecologist", experience: "6 years" },
  { name: "Dr. Hemalatha Gowda", specialization: "Gynecologist", experience: "14 years" },

  { name: "Dr. Sneha Kapoor", specialization: "Dentist", experience: "6 years" },
  { name: "Dr. Rohit Saxena", specialization: "Dentist", experience: "7 years" },
  { name: "Dr. Varun Shankar", specialization: "Dentist", experience: "10 years" },
  { name: "Dr. Reema Pathak", specialization: "Dentist", experience: "8 years" },
  { name: "Dr. Mithilesh Rao", specialization: "Dentist", experience: "5 years" }
];

function DoctorAppointment() {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Global login popup trigger
  useEffect(() => {
    const handleOpenLogin = () => {
      const shouldOpen = sessionStorage.getItem("triggerLogin") === "true";
      if (shouldOpen) {
        setShowLogin(true);
        sessionStorage.removeItem("triggerLogin");
      }
    };

    window.addEventListener("openLoginModal", handleOpenLogin);
    handleOpenLogin();

    return () => {
      window.removeEventListener("openLoginModal", handleOpenLogin);
    };
  }, []);

  // ✅ BOOK BUTTON LOGIC WITH LOGIN CHECK
  const handleBook = (doc) => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      alert("Please log in to book an appointment!");
      sessionStorage.setItem("triggerLogin", "true");
      window.dispatchEvent(new Event("openLoginModal"));
      return;
    }

    setSelectedDoctor(doc);
  };

  return (
    <div className="appointment-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>

        <nav className="nav-links">
          <Link to="/doctorappointment">DOCTORS</Link>
          <Link to="/medicines">MEDICINES</Link>
          <Link to="/bloodbank">BLOOD BANKS</Link>
          <Link to="/profile">PROFILE</Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="appointment-container">
        <h2 className="title">Specializations</h2>
        <div className="specialization-row">
          {specializations.map((spec, idx) => (
            <div
              key={idx}
              className={`spec-card ${selectedSpec === spec ? "active" : ""}`}
              onClick={() => setSelectedSpec(spec)}
            >
              {spec}
            </div>
          ))}
        </div>

        <h2 className="title">Available Doctors</h2>
        <div className="doctor-row">
          {doctors
            .filter((doc) => !selectedSpec || doc.specialization === selectedSpec)
            .map((doc, idx) => (
              <div key={idx} className="doctor-card">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-spec">{doc.specialization}</p>
                <span className="exp-chip">{doc.experience}</span>

                <button
                  className="btn-book"
                  onClick={() => handleBook(doc)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {/* LOGIN POPUP */}
      {showLogin && !isLoggedIn && (
        <>
          <div className="overlay" onClick={() => setShowLogin(false)}></div>

          <div className="login-card">
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </span>

            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              Login to Continue
            </h2>

            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                fetch("http://localhost:5000/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      alert("Login successful!");
                      sessionStorage.setItem("isLoggedIn", "true");
                      sessionStorage.setItem("user", JSON.stringify(data.user));
                      setIsLoggedIn(true);
                      setShowLogin(false);
                    } else {
                      alert(data.message);
                    }
                  });
              }}
            >
              <label>Email</label>
              <div className="input-container">
                <i className="fa-solid fa-envelope icon"></i>
                <input type="email" name="email" required />
              </div>

              <label>Password</label>
              <div className="input-container">
                <i className="fa-solid fa-lock icon"></i>
                <input type="password" name="password" required />
              </div>

              <button type="submit" className="primary-btn">
                Log In
              </button>
            </form>
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

          <div className="footer-section footer-brand">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer-logo" />
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
  
}
export { doctors };
export default DoctorAppointment;
