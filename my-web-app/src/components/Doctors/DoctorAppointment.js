import React, { useState } from "react";
import "./DoctorAppointment.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import sanjeevaniImg from "../../assets/sanjeevani.jpg";
import { Link } from "react-router-dom";

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
  // Cardiologists
  { name: "Dr. Anil Sharma", specialization: "Cardiologist", experience: "12 years" },
  { name: "Dr. Megha Suri", specialization: "Cardiologist", experience: "9 years" },
  { name: "Dr. Raghav Prasad", specialization: "Cardiologist", experience: "7 years" },
  { name: "Dr. Kavya Menon", specialization: "Cardiologist", experience: "11 years" },
  { name: "Dr. S. Venkatesh", specialization: "Cardiologist", experience: "14 years" },
  { name: "Dr. Anita Balan", specialization: "Cardiologist", experience: "6 years" },
  { name: "Dr. M. Jayaprakash", specialization: "Cardiologist", experience: "8 years" },

  // Dermatologists
  { name: "Dr. Meera Patel", specialization: "Dermatologist", experience: "8 years" },
  { name: "Dr. Sneha Rao", specialization: "Dermatologist", experience: "5 years" },
  { name: "Dr. Tanvi Jain", specialization: "Dermatologist", experience: "9 years" },
  { name: "Dr. Nikhil Shah", specialization: "Dermatologist", experience: "7 years" },
  { name: "Dr. Priya Nambiar", specialization: "Dermatologist", experience: "10 years" },
  { name: "Dr. Rupali Khanna", specialization: "Dermatologist", experience: "6 years" },

  // Orthopedic
  { name: "Dr. Rajesh Kumar", specialization: "Orthopedic", experience: "10 years" },
  { name: "Dr. Vishal Deshmukh", specialization: "Orthopedic", experience: "7 years" },
  { name: "Dr. Harshit Tiwari", specialization: "Orthopedic", experience: "12 years" },
  { name: "Dr. Kiran Joseph", specialization: "Orthopedic", experience: "9 years" },
  { name: "Dr. Smriti Sen", specialization: "Orthopedic", experience: "6 years" },
  { name: "Dr. N. Balaji", specialization: "Orthopedic", experience: "11 years" },

  // Neurologists
  { name: "Dr. Kavita Reddy", specialization: "Neurologist", experience: "9 years" },
  { name: "Dr. Ayesha Siddiqui", specialization: "Neurologist", experience: "11 years" },
  { name: "Dr. Manoj Shetty", specialization: "Neurologist", experience: "14 years" },
  { name: "Dr. Kumaran Rao", specialization: "Neurologist", experience: "6 years" },
  { name: "Dr. Alok Agrawal", specialization: "Neurologist", experience: "10 years" },

  // Pediatricians
  { name: "Dr. Suresh Verma", specialization: "Pediatrician", experience: "14 years" },
  { name: "Dr. Neha Varrier", specialization: "Pediatrician", experience: "8 years" },
  { name: "Dr. Ritu Batra", specialization: "Pediatrician", experience: "6 years" },
  { name: "Dr. Sanjay Naidu", specialization: "Pediatrician", experience: "11 years" },
  { name: "Dr. Surekha Iyer", specialization: "Pediatrician", experience: "9 years" },

  // ENT
  { name: "Dr. Anita Joshi", specialization: "ENT Specialist", experience: "7 years" },
  { name: "Dr. Srikar Rao", specialization: "ENT Specialist", experience: "9 years" },
  { name: "Dr. Deepika Mohan", specialization: "ENT Specialist", experience: "5 years" },
  { name: "Dr. Abhijeet Singh", specialization: "ENT Specialist", experience: "12 years" },

  // Gynecology
  { name: "Dr. Pooja Singh", specialization: "Gynecologist", experience: "11 years" },
  { name: "Dr. Radhika Prabhu", specialization: "Gynecologist", experience: "8 years" },
  { name: "Dr. Ananya Chatterjee", specialization: "Gynecologist", experience: "6 years" },
  { name: "Dr. Hemalatha Gowda", specialization: "Gynecologist", experience: "14 years" },

  // Dentist
  { name: "Dr. Sneha Kapoor", specialization: "Dentist", experience: "6 years" },
  { name: "Dr. Rohit Saxena", specialization: "Dentist", experience: "7 years" },
  { name: "Dr. Varun Shankar", specialization: "Dentist", experience: "10 years" },
  { name: "Dr. Reema Pathak", specialization: "Dentist", experience: "8 years" },
  { name: "Dr. Mithilesh Rao", specialization: "Dentist", experience: "5 years" }
];

function DoctorAppointment() {
  const [selectedSpec, setSelectedSpec] = useState(null);

  const handleBook = (doc) => {
    alert(`Booking appointment with ${doc.name} (${doc.specialization})`);
  };

  return (
    <>
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

      <div className="appointment-container">

        {/* Specializations */}
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

        {/* Doctors */}
        <h2 className="title">Available Doctors</h2>
        <div className="doctor-row">
          {doctors
            .filter(doc => !selectedSpec || doc.specialization === selectedSpec)
            .map((doc, idx) => (
              <div key={idx} className="doctor-card">
                <h3 className="doc-name">{doc.name}</h3>
                <p className="doc-spec">{doc.specialization}</p>
                <span className="exp-chip">{doc.experience}</span>
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
