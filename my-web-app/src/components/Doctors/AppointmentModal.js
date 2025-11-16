// src/components/AppointmentModal.jsx
import React, { useState } from "react";
import "./AppointmentModal.css";

export default function AppointmentModal({ doctor, onClose }) {
  const [selectedTime, setSelectedTime] = useState("");

  const API = "http://localhost:5000";

  // Convert doctor availability into a time slot list
  function generateSlots(start, end) {
    let slots = [];
    let [sh, sm] = start.split(":").map(Number);
    let [eh, em] = end.split(":").map(Number);
    let startMin = sh * 60 + sm;
    let endMin = eh * 60 + em;

    for (let t = startMin; t <= endMin; t += 10) {
      let h = Math.floor(t / 60);
      let m = t % 60;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
    return slots;
  }

  const times = generateSlots(doctor.start_time, doctor.end_time);

  const handleBook = async () => {
    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    const appointment_time = `${doctor.available_date} ${selectedTime}:00`;

    const payload = {
      user_id: user.id,
      doctor_id: doctor.id,
      appointment_time,
    };

    const res = await fetch(`${API}/api/appointments/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Appointment booked!");
      onClose();
      window.dispatchEvent(new Event("appointmentsUpdated"));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>Book Appointment</h2>

        <h3>{doctor.name}</h3>
        <p>{doctor.specialist}</p>

        <p><strong>Date:</strong> {doctor.available_date}</p>

        <div className="time-grid">
          {times.map((t) => (
            <button
              key={t}
              className={`time-btn ${selectedTime === t ? "active" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="modal-footer">
          <button className="continue-btn" onClick={handleBook}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
