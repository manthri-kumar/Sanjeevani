import React, { useEffect, useState } from "react";
import "./ProfileRight.css";

const sectionContent = {
  health: {
    title: "Health Records",
    content: "Your medical records will appear here.",
  },
  volunteering: {
    title: "Volunteering",
    content: "Details about your volunteering activities.",
  },
};

const ProfileRight = ({ selected }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Load user info
  useEffect(() => {
  const storedUser = sessionStorage.getItem("user");
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    setUser(parsed);

    // Fetch user appointments
    fetch(`http://localhost:5000/api/appointments/${parsed.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setAppointments(data.appointments);
      });
  }
}, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("appointments");
    window.location.href = "/";
  };

  // ==========================================================
  // APPOINTMENTS SECTION
  // ==========================================================
  if (selected === "appointments") {
    return (
      <section className="profile-right">
        <h1 className="pr-title">Appointments</h1>

        <div className="pr-card">
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            appointments.map((app, index) => (
              <div key={index} className="appoint-item">
                <p><strong>Doctor:</strong> {app.doctor}</p>
                <p><strong>Specialization:</strong> {app.specialization}</p>
                <p><strong>Date:</strong> {app.date}</p>
                <p><strong>Time:</strong> {app.time}</p>
                <hr />
              </div>
            ))
          )}
        </div>
      </section>
    );
  }

  // ==========================================================
  // PROFILE SECTION
  // ==========================================================
  if (selected === "profile") {
    return (
      <section className="profile-right">
        <h1 className="pr-title">My Profile</h1>

        {user ? (
          <div className="pr-card">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="pr-card">
            <p>No user data found. Please log in.</p>
          </div>
        )}
      </section>
    );
  }

  // ==========================================================
  // OTHER SECTIONS
  // ==========================================================
  const section = sectionContent[selected];

  return (
    <section className="profile-right">
      {section ? (
        <>
          <h1 className="pr-title">{section.title}</h1>
          <div className="pr-card">{section.content}</div>
        </>
      ) : (
        <>
          <h1 className="pr-title">Overview</h1>
          <div className="pr-card">Pick an item from the left.</div>
        </>
      )}
    </section>
  );
};

export default ProfileRight;
