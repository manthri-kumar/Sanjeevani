import React, { useEffect, useState } from "react";
import "./ProfileRight.css";

const API = "http://localhost:5000";

const ProfileRight = ({ selected }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  // Load logged user
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("user"));
    if (stored) setUser(stored);
  }, []);

  // Load doctors
  useEffect(() => {
    fetch(`${API}/api/doctors`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setDoctorList(data.doctors);
      });
  }, []);

  // Load appointments
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("user"));
    if (!stored) return;

    fetch(`${API}/api/appointments/${stored.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const enriched = data.appointments.map(app => {
            const doc = doctorList.find(d => d.id === app.doctor_id);

            return {
              ...app,
              doctor_name: doc ? doc.name : "Unknown Doctor",
              specialist: doc ? doc.specialist : "General"
            };
          });

          setAppointments(enriched);
        }
      });
  }, [doctorList]);

  // -------------------- SAFE DATETIME PARSER --------------------
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "--", time: "--" };

    let date = "--", time = "--";

    if (dateTimeString.includes(" ")) {
      const [d, t] = dateTimeString.split(" ");
      date = d;
      time = t?.substring(0, 5) || "--";
    }
    else if (dateTimeString.includes("T")) {
      const [d, t] = dateTimeString.split("T");
      date = d;
      time = t?.substring(0, 5) || "--";
    }

    return { date, time };
  };

  // -------------------- SELECTED: APPOINTMENTS --------------------
  if (selected === "appointments") {
    return (
      <section className="profile-right">
        <h1 className="pr-title">Appointments</h1>

        <div className="pr-card">
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            appointments.map((app, index) => {
              const { date, time } = formatDateTime(app.appointment_time);

              return (
                <div key={index} className="appoint-item">
                  <p><strong>Doctor:</strong> {app.doctor_name}</p>
                  <p><strong>Specialization:</strong> {app.specialist}</p>
                  <p><strong>Date:</strong> {date}</p>
                  <p><strong>Time:</strong> {time}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        app.status === "Accepted"
                          ? "status accepted"
                          : app.status === "Rejected"
                          ? "status rejected"
                          : "status pending"
                      }
                    >
                      {app.status}
                    </span>
                  </p>

                  <hr />
                </div>
              );
            })
          )}
        </div>
      </section>
    );
  }

  // -------------------- SELECTED: PROFILE --------------------
  if (selected === "profile") {
    return (
      <section className="profile-right">
        <h1 className="pr-title">My Profile</h1>

        {user ? (
          <div className="pr-card">
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>

            <button
              className="logout-btn"
              onClick={() => {
                sessionStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="pr-card">
            <p>No user data. Please login.</p>
          </div>
        )}
      </section>
    );
  }

  // -------------------- DEFAULT --------------------
  return (
    <section className="profile-right">
      <h1 className="pr-title">Overview</h1>
      <div className="pr-card">Select something from the left.</div>
    </section>
  );
};

export default ProfileRight;
