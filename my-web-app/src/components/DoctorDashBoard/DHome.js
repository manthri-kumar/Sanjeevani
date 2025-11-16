import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DHome.css";

// ---------------- HELPER FUNCTIONS ----------------
function toMysqlDate(d) {
  if (!d) return "";
  const parts = d.split("-");
  if (parts.length === 3 && parts[0].length === 4) return d;

  const parsed = new Date(d);
  if (!isNaN(parsed)) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return d;
}

function ensureTimeSeconds(t) {
  if (!t) return "";
  if (/^\d{2}:\d{2}$/.test(t)) return `${t}:00`;
  return t;
}

// =========================================================
//                    DOCTOR DASHBOARD
// =========================================================
export default function DHome() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "Dr. Unknown",
    specialist: "General",
    id: null,
  });

  const [appointments, setAppointments] = useState([]);
  const [availableDate, setAvailableDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ---------------- LOAD DOCTOR ----------------
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("doctor");
      if (!raw) {
        navigate("/");
        return;
      }
      const parsed = JSON.parse(raw);
      const doc = parsed.doctor ?? parsed;

      setDoctor({
        name: doc.name,
        specialist: doc.specialist,
        id: doc.id,
      });
    } catch (err) {
      navigate("/");
    }
  }, [navigate]);

  // ---------------- FETCH APPOINTMENTS ----------------
  const loadAppointments = async () => {
    if (!doctor.id) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/doctor/appointments/${doctor.id}`
      );
      const data = await res.json();
      if (data.success) setAppointments(data.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [doctor.id]);

  // ---------------- FETCH AVAILABILITY ----------------
  useEffect(() => {
    if (!doctor.id) return;

    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/doctor/availability/${doctor.id}`
        );
        const data = await res.json();

        if (data.success && data.availability.length > 0) {
          const a = data.availability[0];
          setAvailableDate(a.available_date);
          setStartTime(a.start_time?.slice(0, 5));
          setEndTime(a.end_time?.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
      }
    })();
  }, [doctor.id]);

  // ---------------- SAVE AVAILABILITY ----------------
  const saveAvailability = async () => {
    const payload = {
      doctor_id: doctor.id,
      available_date: toMysqlDate(availableDate),
      start_time: ensureTimeSeconds(startTime),
      end_time: ensureTimeSeconds(endTime),
    };

    if (!payload.available_date || !payload.start_time || !payload.end_time) {
      alert("Please fill all availability fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/doctor/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert("Availability saved!");
      }
    } catch (err) {
      alert("Error saving availability.");
    }
  };

  // ---------------- UPDATE APPOINTMENT STATUS ----------------
  const updateStatus = async (appointmentId, status) => {
  try {
    if (status === "Accepted") {
      // Update status only
      const res = await fetch("http://localhost:5000/api/appointments/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment_id: appointmentId, status }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Appointment Accepted");
      }
    } 
    
    else if (status === "Rejected") {
      // Delete appointment
      const res = await fetch(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (data.success) {
        alert("Appointment Rejected & Removed");
      }
    }

    // RELOAD UI IMMEDIATELY
    loadAppointments();

  } catch (err) {
    alert("Error updating appointment");
  }
};

  // Show next scheduled appointment
  const nextAppointment = appointments.find((a) => a.status === "Scheduled");

  // ---------------- DASHBOARD STATS ----------------
  const todaysAppointments = appointments.length;
  const pendingRequests = appointments.filter(
    (a) => a.status === "Scheduled"
  ).length;
  const newMessages = 0; // Static for now

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="doctor">
          <div className="doctor-avatar" />
          <div>
            <div className="doctor-name">{doctor.name}</div>
            <div className="doctor-role">{doctor.specialist}</div>
          </div>
        </div>

        <button
          className="btn-secondary"
          onClick={() => {
            sessionStorage.removeItem("doctor");
            navigate("/");
          }}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        
        <div className="page-title">
          Welcome, {doctor.name.split(" ")[0]} 👋
        </div>

        {/* ---------------- DASHBOARD SUMMARY CARDS ---------------- */}
        <div className="dashboard-cards">
          <div className="dash-card">
            <h3>Today's appointments</h3>
            <h1>{todaysAppointments}</h1>
            <p>Updated just now</p>
          </div>

          <div className="dash-card">
            <h3>Patients waiting</h3>
            <h1>{pendingRequests}</h1>
            <p>Updated just now</p>
          </div>

          <div className="dash-card">
            <h3>New messages</h3>
            <h1>{newMessages}</h1>
            <p>Updated just now</p>
          </div>
        </div>

        {/* ---------------- MAIN GRID ---------------- */}
        <div className="grid12">
          
          {/* LEFT SIDE */}
          <div className="col6">
            {/* NEXT PATIENT */}
            <div className="card">
              <div className="card-h">Next Patient</div>
              <div className="card-c">
                {nextAppointment ? (
                  <div className="np">
                    <div className="np-avatar" />
                    <div>
                      <div className="np-name">{nextAppointment.patient_name}</div>
                      <div className="np-addr">{nextAppointment.patient_email}</div>

                      <div className="np-tags">
                        <span className="pill">Status: {nextAppointment.status}</span>
                        <span className="pill-blue">
                          {new Date(nextAppointment.appointment_time).toLocaleString()}
                        </span>
                      </div>

                      <div className="action-row">
                        <button
                          className="btn-accept"
                          onClick={() =>
                            updateStatus(nextAppointment.id, "Accepted")
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="btn-reject"
                          onClick={() =>
                            updateStatus(nextAppointment.id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No upcoming appointments</div>
                )}
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="card mt16">
              <div className="card-h">Availability</div>
              <div className="card-c">
                <div className="tz">
                  <input
                    type="date"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <div className="actions">
                  <button className="btn" onClick={saveAvailability}>
                    Save
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setAvailableDate("");
                      setStartTime("");
                      setEndTime("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - REQUESTS */}
          <div className="col6">
            <div className="card">
              <div className="card-h">Requests</div>
              <div className="card-c requests">
                {appointments.length === 0 ? (
                  <p>No requests available.</p>
                ) : (
                  appointments.map((app) => (
                    <div className="request" key={app.id}>
                      <div>
                        <strong>{app.patient_name}</strong>
                        <div className="muted">{app.patient_email}</div>
                        <div className="muted">
                          {new Date(app.appointment_time).toLocaleString()}
                        </div>
                      </div>

                      <div className="appointment-actions">

  {app.status === "Scheduled" && (
    <>
      <button
        className="btn-accept"
        onClick={() => updateStatus(app.id, "Accepted")}
      >
        Accept
      </button>

      <button
        className="btn-reject"
        onClick={() => updateStatus(app.id, "Rejected")}
      >
        Reject
      </button>
    </>
  )}

  {app.status === "Accepted" && (
    <span className="pill-green">✔ Accepted</span>
  )}

  {app.status === "Rejected" && (
    <span className="pill-red">✖ Rejected</span>
  )}

</div>

                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
