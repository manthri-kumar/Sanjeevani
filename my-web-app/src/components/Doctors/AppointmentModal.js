import React, { useState } from "react";
import "./AppointmentModal.css";

export default function AppointmentModal({ doctor, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = ["Wed 12 Nov", "Thu 13 Nov", "Fri 14 Nov", "Sat 15 Nov", "Sun 16 Nov", "Mon 17 Nov", "Tue 18 Nov"];
  const times = [
    "09:30 AM", "09:40 AM", "09:50 AM",
    "10:00 AM", "10:10 AM", "10:20 AM",
    "10:30 AM", "10:40 AM", "10:50 AM",
    "12:00 PM", "12:10 PM", "12:20 PM"
  ];

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time!");
      return;
    }
    // Replace with real booking action later
    alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${selectedTime}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Schedule Appointment</h2>

        <div className="doctor-info">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/31/19/14/doctor-1295571_960_720.png"
            alt={doctor.name}
          />
          <div className="doctor-text">
            <h3>{doctor.name}</h3>
            <p>{doctor.experience} • {doctor.specialization}</p>
            <a className="view-profile" href="#">View Profile</a>
          </div>
        </div>

        <div className="date-scroll">
          {dates.map((d, i) => (
            <button
              key={i}
              className={`date-btn ${selectedDate === d ? "active" : ""}`}
              onClick={() => setSelectedDate(d)}
            >
              <div className="date-day">{d.split(" ")[0]}</div>
              <div className="date-num">{d.split(" ")[1]}</div>
              <div className="date-month">{d.split(" ")[2]}</div>
            </button>
          ))}
        </div>

        <h4 className="slot-heading">Morning <span className="slot-count">15 SLOTS</span></h4>

        <div className="time-grid">
          {times.map((t, i) => (
            <button
              key={i}
              className={`time-btn ${selectedTime === t ? "active" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="modal-footer">
          <div className="price">₹760</div>
          <button className="continue-btn" onClick={handleBook}>Continue</button>
        </div>
      </div>
    </div>
  );
}