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
    
    // FIX: convert ISO datetime → MySQL compatible date
    const dateOnly = doctor.available_date.split("T")[0]; // from "2025-11-15T18:30:00.000Z" → "2025-11-15"
    const appointment_time = `${dateOnly} ${selectedTime}:00`;

    console.log("Final appointment_time:", appointment_time);

    const payload = {
      user_id: user.id,
      doctor_id: doctor.id,
      appointment_time,
    };

    try {
      const res = await fetch(`${API}/api/appointments/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (data.success) {
        alert("Appointment booked!");
        onClose();
        window.dispatchEvent(new Event("appointmentsUpdated"));
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error. Check backend.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <button className="modal-close-btn" onClick={onClose}>×</button>

        <h2>Book Appointment</h2>

        <h3>{doctor.name}</h3>
        <p>{doctor.specialist}</p>

        {/* BETTER DATE DISPLAY */}
        <p>
          <strong>Date:</strong> {doctor.available_date.split("T")[0]}
        </p>

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
