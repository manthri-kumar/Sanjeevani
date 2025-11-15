import React, { useState } from "react";
import "./AppointmentModal.css";

export default function AppointmentModal({ doctor, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dates = [
    "Wed 12 Nov", "Thu 13 Nov", "Fri 14 Nov",
    "Sat 15 Nov", "Sun 16 Nov", "Mon 17 Nov", "Tue 18 Nov"
  ];

  const times = [
    "09:30 AM", "09:40 AM", "09:50 AM",
    "10:00 AM", "10:10 AM", "10:20 AM",
    "10:30 AM", "10:40 AM", "10:50 AM",
    "12:00 PM", "12:10 PM", "12:20 PM"
  ];

  // Convert "Fri 14 Nov" → "2024-11-14"
  function convertToMySQLDate(dateStr) {
    const [_, day, month] = dateStr.split(" ");
    const months = {
      Jan:"01", Feb:"02", Mar:"03", Apr:"04",
      May:"05", Jun:"06", Jul:"07", Aug:"08",
      Sep:"09", Oct:"10", Nov:"11", Dec:"12"
    };
    const year = new Date().getFullYear();
    return `${year}-${months[month]}-${day.padStart(2, "0")}`;
  }

  // Convert "10:20 AM" → "10:20"
  function convertTo24(timeStr) {
    const [time, mer] = timeStr.split(" ");
    let [h, m] = time.split(":");
    h = parseInt(h);

    if (mer === "PM" && h !== 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${m}`;
  }

  // FINAL WORKING BOOKING FUNCTION
  const handleBook = async () => {
  if (!selectedDate || !selectedTime) {
    alert("Please select both date and time!");
    return;
  }

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  if (!storedUser) {
    alert("Please login first!");
    return;
  }

  const finalDate = convertToMySQLDate(selectedDate);
  const finalTime = convertTo24(selectedTime);
  const appointment_time = `${finalDate} ${finalTime}:00`;

  const payload = {
    user_id: storedUser.id,
    doctor_id: doctor.id,   // FIXED
    appointment_time,
  };

  const res = await fetch("http://localhost:5000/api/appointments/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.message);
    return;
  }

  alert("Appointment booked!");
  onClose();
};


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Schedule Appointment</h2>

        <div className="doctor-info">
          <img src="https://cdn.pixabay.com/photo/2016/03/31/19/14/doctor-1295571_960_720.png" />
          <div>
            <h3>{doctor?.name}</h3>
            <p>{doctor?.experience} • {doctor?.specialist}</p>
          </div>
        </div>

        <div className="date-scroll">
          {dates.map((d) => (
            <button
              key={d}
              className={`date-btn ${selectedDate === d ? "active" : ""}`}
              onClick={() => setSelectedDate(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <h4 className="slot-heading">
          Morning <span className="slot-count">15 SLOTS</span>
        </h4>

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
          <div className="price">₹760</div>
          <button className="continue-btn" onClick={handleBook}>
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}
