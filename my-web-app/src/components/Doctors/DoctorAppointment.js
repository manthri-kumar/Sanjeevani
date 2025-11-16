// src/pages/DoctorAppointment.jsx
import React, { useState, useEffect } from "react";
import "./DoctorAppointment.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import sanjeevaniImg from "../../assets/sanjeevani.jpg";
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
  { id: 1, name: "Dr. Anil Sharma", specialist: "Cardiologist", experience: "12 years" },
  { id: 2, name: "Dr. Megha Suri", specialist: "Cardiologist", experience: "9 years" },
  { id: 3, name: "Dr. Raghav Prasad", specialist: "Cardiologist", experience: "7 years" },
  { id: 4, name: "Dr. Kavya Menon", specialist: "Cardiologist", experience: "11 years" },
  { id: 5, name: "Dr. S. Venkatesh", specialist: "Cardiologist", experience: "14 years" },
  { id: 6, name: "Dr. Anita Balan", specialist: "Cardiologist", experience: "6 years" },
  { id: 7, name: "Dr. M. Jayaprakash", specialist: "Cardiologist", experience: "8 years" },

  { id: 8, name: "Dr. Meera Patel", specialist: "Dermatologist", experience: "8 years" },
  { id: 9, name: "Dr. Sneha Rao", specialist: "Dermatologist", experience: "5 years" },
  { id: 10, name: "Dr. Tanvi Jain", specialist: "Dermatologist", experience: "9 years" },
  { id: 11, name: "Dr. Nikhil Shah", specialist: "Dermatologist", experience: "7 years" },
  { id: 12, name: "Dr. Priya Nambiar", specialist: "Dermatologist", experience: "10 years" },
  { id: 13, name: "Dr. Rupali Khanna", specialist: "Dermatologist", experience: "6 years" },

  { id: 14, name: "Dr. Rajesh Kumar", specialist: "Orthopedic", experience: "10 years" },
  { id: 15, name: "Dr. Vishal Deshmukh", specialist: "Orthopedic", experience: "7 years" },
  { id: 16, name: "Dr. Harshit Tiwari", specialist: "Orthopedic", experience: "12 years" },
  { id: 17, name: "Dr. Kiran Joseph", specialist: "Orthopedic", experience: "9 years" },
  { id: 18, name: "Dr. Smriti Sen", specialist: "Orthopedic", experience: "6 years" },
  { id: 19, name: "Dr. N. Balaji", specialist: "Orthopedic", experience: "11 years" },

  { id: 20, name: "Dr. Kavita Reddy", specialist: "Neurologist", experience: "9 years" },
  { id: 21, name: "Dr. Ayesha Siddiqui", specialist: "Neurologist", experience: "11 years" },
  { id: 22, name: "Dr. Manoj Shetty", specialist: "Neurologist", experience: "14 years" },
  { id: 23, name: "Dr. Kumaran Rao", specialist: "Neurologist", experience: "6 years" },
  { id: 24, name: "Dr. Alok Agrawal", specialist: "Neurologist", experience: "10 years" },

  { id: 25, name: "Dr. Suresh Verma", specialist: "Pediatrician", experience: "14 years" },
  { id: 26, name: "Dr. Neha Varrier", specialist: "Pediatrician", experience: "8 years" },
  { id: 27, name: "Dr. Ritu Batra", specialist: "Pediatrician", experience: "6 years" },
  { id: 28, name: "Dr. Sanjay Naidu", specialist: "Pediatrician", experience: "11 years" },
  { id: 29, name: "Dr. Surekha Iyer", specialist: "Pediatrician", experience: "9 years" },

  { id: 30, name: "Dr. Anita Joshi", specialist: "ENT Specialist", experience: "7 years" },
  { id: 31, name: "Dr. Srikar Rao", specialist: "ENT Specialist", experience: "9 years" },
  { id: 32, name: "Dr. Deepika Mohan", specialist: "ENT Specialist", experience: "5 years" },
  { id: 33, name: "Dr. Abhijeet Singh", specialist: "ENT Specialist", experience: "12 years" },

  { id: 34, name: "Dr. Pooja Singh", specialist: "Gynecologist", experience: "11 years" },
  { id: 35, name: "Dr. Radhika Prabhu", specialist: "Gynecologist", experience: "8 years" },
  { id: 36, name: "Dr. Ananya Chatterjee", specialist: "Gynecologist", experience: "6 years" },
  { id: 37, name: "Dr. Hemalatha Gowda", specialist: "Gynecologist", experience: "14 years" },

  { id: 38, name: "Dr. Sneha Kapoor", specialist: "Dentist", experience: "6 years" },
  { id: 39, name: "Dr. Rohit Saxena", specialist: "Dentist", experience: "7 years" },
  { id: 40, name: "Dr. Varun Shankar", specialist: "Dentist", experience: "10 years" },
  { id: 41, name: "Dr. Reema Pathak", specialist: "Dentist", experience: "8 years" },
  { id: 42, name: "Dr. Mithilesh Rao", specialist: "Dentist", experience: "5 years" }
];

function DoctorAppointment() {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, []);

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

      {/* Specializations */}
      <div className="appointment-container">
        <h2 className="title">Specializations</h2>

        <div className="specialization-row">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className={`spec-card ${selectedSpec === spec ? "active" : ""}`}
              onClick={() => setSelectedSpec(spec)}
            >
              {spec}
            </div>
          ))}
        </div>

        {/* Doctors */}
        <h2 className="title">Available Doctors</h2>

        <div className="doctor-row">
          {doctors
            .filter((doc) => !selectedSpec || doc.specialist === selectedSpec)
            .map((doc) => (
              <div key={doc.id} className="doctor-card">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-spec">{doc.specialist}</p>
                <span className="exp-chip">{doc.experience}</span>

                <button className="btn-book" onClick={() => handleBook(doc)}>
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
    </div>
  );
}

export { doctors };
export default DoctorAppointment;