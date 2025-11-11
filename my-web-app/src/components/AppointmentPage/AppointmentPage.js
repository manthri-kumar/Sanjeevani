import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleBookAppointment = () => {
    if (!isLoggedIn) {
      alert("Please log in to book an appointment!");
      navigate("/"); // ✅ Redirect to Home page where login modal exists
    } else {
      setShowAppointment(true);
    }
  };

  return (
    <div className="appointment-page p-6 text-center">
      {!showAppointment ? (
        <button
          onClick={handleBookAppointment}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
        >
          Book Appointment
        </button>
      ) : (
        <div className="appointment-form max-w-md mx-auto mt-6 border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Schedule Your Appointment</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Appointment booked successfully!");
              navigate("/Profile"); // ✅ Redirect to Profile or another page
            }}
          >
            <label className="block text-left mb-1 font-medium">Full Name</label>
            <input
              type="text"
              className="border p-2 w-full mb-3 rounded"
              placeholder="Enter your name"
              required
            />

            <label className="block text-left mb-1 font-medium">Date</label>
            <input
              type="date"
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <label className="block text-left mb-1 font-medium">Time</label>
            <input
              type="time"
              className="border p-2 w-full mb-3 rounded"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all"
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
