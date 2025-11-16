import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DHome.css";

function toMysqlDate(d) {
  // if d is already YYYY-MM-DD return it; if it's DD-MM-YYYY or other, try to convert
  if (!d) return "";
  // if contains '-' and first part length == 4 assume YYYY-MM-DD
  const parts = d.split("-");
  if (parts.length === 3 && parts[0].length === 4) return d;
  // try ISO conversion
  const parsed = new Date(d);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  // fallback: return original
  return d;
}

function ensureTimeSeconds(t) {
  if (!t) return "";
  // t may be "19:48" -> convert to "19:48:00"
  if (/^\d{2}:\d{2}$/.test(t)) return `${t}:00`;
  // if already has seconds
  if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t;
  return t;
}

export default function DHome() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({ name: "Dr. Unknown", specialist: "General", id: null });
  const [appointments, setAppointments] = useState([]);
  const [availableDate, setAvailableDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("doctor");
      if (!raw) {
        console.warn("No doctor in sessionStorage -> redirecting");
        navigate("/");
        return;
      }
      const parsed = JSON.parse(raw);
      const doc = parsed && parsed.doctor ? parsed.doctor : parsed;
      console.log("Loaded doctor from sessionStorage:", parsed, "-> using doc:", doc);
      if (!doc || !doc.id) {
        console.error("Doctor object missing id. sessionStorage content:", parsed);
        // still set minimal and redirect
        setDoctor(prev => ({ ...prev, id: null }));
        // optionally navigate("/")
        return;
      }
      setDoctor({ name: doc.name || "Dr. Unknown", specialist: doc.specialist || "General", id: doc.id });
    } catch (err) {
      console.error("Error parsing sessionStorage doctor:", err);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!doctor.id) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctor/appointments/${doctor.id}`);
        const data = await res.json();
        console.log("Doctor appointments fetch:", data);
        if (data.success) setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Error fetching doctor appointments:", err);
      }
    })();
  }, [doctor.id]);

  useEffect(() => {
    if (!doctor.id) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctor/availability/${doctor.id}`);
        const data = await res.json();
        console.log("Fetched availability for doctor:", data);
        if (data.success && data.availability) {
          // server returns available_date in YYYY-MM-DD normally
          setAvailableDate(data.availability.available_date || "");
          setStartTime(data.availability.start_time ? data.availability.start_time.slice(0,5) : "");
          setEndTime(data.availability.end_time ? data.availability.end_time.slice(0,5) : "");
        } else {
          setAvailableDate("");
          setStartTime("");
          setEndTime("");
        }
      } catch (err) {
        console.error("Availability fetch error:", err);
      }
    })();
  }, [doctor.id]);

  const saveAvailability = async () => {
    try {
      const payload = {
        doctor_id: doctor.id,
        available_date: toMysqlDate(availableDate),
        start_time: ensureTimeSeconds(startTime),
        end_time: ensureTimeSeconds(endTime)
      };

      console.log("SAVE CLICKED - sending payload:", payload);

      if (!payload.doctor_id) {
        alert("Doctor id missing. Please re-login.");
        return;
      }
      if (!payload.available_date || !payload.start_time || !payload.end_time) {
        alert("Please fill date, start and end time.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/doctor/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // in case backend expects credentials
        body: JSON.stringify(payload),
      });

      console.log("Network response status:", res.status, res.statusText);
      const data = await res.json().catch(() => {
        throw new Error("Server returned non-JSON response");
      });
      console.log("Server response JSON:", data);

      if (res.ok && data.success) {
        alert("Availability saved!");
        // re-fetch to reflect saved values
        const availRes = await fetch(`http://localhost:5000/api/doctor/availability/${doctor.id}`);
        const availData = await availRes.json();
        console.log("Re-fetch availability after save:", availData);
      } else {
        alert("Save failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("saveAvailability error:", err);
      alert("Save failed. Check server console and network tab.");
    }
  };

  const nextAppointment = appointments.length > 0 ? appointments[0] : null;
  const stats = [{ label: "Today's appointments", value: appointments.length }, { label: "Patients waiting", value: 2 }, { label: "New messages", value: 0 }];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="doctor">
          <div className="doctor-avatar" />
          <div>
            <div className="doctor-name">{doctor.name}</div>
            <div className="doctor-role">{doctor.specialist}</div>
          </div>
        </div>

        <button className="btn-secondary w100" style={{ marginTop: "auto" }} onClick={() => { sessionStorage.removeItem("doctor"); sessionStorage.removeItem("isLoggedIn"); navigate("/"); }}>
          Logout
        </button>
      </aside>

      <main className="main">
        <div className="page-title">Welcome, {doctor.name.split(" ")[0] || "Doctor"} 👋</div>

        <div className="stats">{stats.map((s, idx) => (<div key={idx} className="card stat-card"><div className="card-h">{s.label}</div><div className="card-c"><div className="stat-value">{s.value}</div><div className="stat-label muted">Updated just now</div></div></div>))}</div>

        <div className="grid12">
          <div className="col6">
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
                        <span className="pill-blue">{new Date(nextAppointment.appointment_time).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : <div>No upcoming appointments</div>}
              </div>
            </div>

            <div className="card mt16">
              <div className="card-h">Availability</div>
              <div className="card-c">
                <div className="tz">
                  <input type="date" className="w100" value={availableDate} onChange={e => setAvailableDate(e.target.value)} />
                  <input type="time" className="w100" value={startTime} onChange={e => setStartTime(e.target.value)} />
                  <input type="time" className="w100" value={endTime} onChange={e => setEndTime(e.target.value)} />
                </div>

                <div className="actions">
                  <button className="btn" onClick={saveAvailability}>Save</button>
                  <button className="btn-secondary" onClick={() => { setAvailableDate(""); setStartTime(""); setEndTime(""); }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>

          <div className="col6">
            <div className="card">
              <div className="card-h">Requests</div>
              <div className="card-c requests"><p>No requests available.</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
