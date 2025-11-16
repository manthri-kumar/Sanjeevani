import React, { useState } from "react";
import "./DashBoard.css";

export default function Dashboard() {
  const [counts] = useState({ patients: 666, appointments: 211, treatments: 402 });
  const [today] = useState([
    { id: "a1", name: "Beth Mccoy", reason: "Scaling", time: "09:30", status: "On Going" },
    { id: "a2", name: "Evan Henry", reason: "Medical check-up", time: "12:00", status: "Queued" },
    { id: "a3", name: "Dwight Murphy", reason: "Follow-up", time: "14:00", status: "Queued" },
  ]);

  return (
    <div className="page">
      <h1 className="title">Dashboard</h1>

      <div className="grid3">
        <div className="stat">
          <div className="stat-label">Patients</div>
          <div className="stat-value">{counts.patients}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Appointments</div>
          <div className="stat-value">{counts.appointments}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Treatments</div>
          <div className="stat-value">{counts.treatments}</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-h">Today Appointments</div>
          <div className="list divide">
            {today.map((a) => (
              <div key={a.id} className="row">
                <div className="row-left">
                  <div className="avatar sm" />
                  <div>
                    <div className="row-title">{a.name}</div>
                    <div className="row-sub">{a.reason}</div>
                  </div>
                </div>
                <div className="row-right">
                  <div className="time">{a.time}</div>
                  <span className={"pill " + (a.status === "On Going" ? "pill-green" : "pill-blue")}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-h">Quick Actions</div>
          <div className="actions">
            <button className="btn">New Appointment</button>
            <button className="btn btn-secondary">Add Treatment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
