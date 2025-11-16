import React, { useMemo, useState } from "react";
import "./DHome.css";

/* -------- Mock data (swap with your API) -------- */
const mockCounts = { patients: 666, appointments: 211, treatments: 402 };

const todayAppointments = [
  { id: "a1", name: "Beth Mccoy", reason: "Scaling", time: "09:30", status: "ongoing" },
  { id: "a2", name: "Evan Henry", reason: "Medical check-up", time: "12:00", status: "queued" },
  { id: "a3", name: "Dwight Murphy", reason: "Follow-up", time: "14:00", status: "queued" },
  { id: "a4", name: "Bessie Alexander", reason: "Prosthesis consult", time: "16:00", status: "queued" },
];

const incomingRequests = [
  { id: "r1", name: "Devon Cooper", date: "29 Feb", time: "10:00" },
  { id: "r2", name: "Ricardo Russell", date: "29 Feb", time: "11:30" },
  { id: "r3", name: "Priya Singh", date: "29 Feb", time: "13:00" },
];

const nextPatient = {
  name: "Beth Mccoy",
  avatar: "https://api.dicebear.com/8.x/initials/svg?seed=Beth%20Mccoy",
  address: "2235 Avondale Ave, Pasadena, OK 89300",
  sex: "Female",
  weightKg: 56,
  heightCm: 172,
  lastAppointment: "02 Jan 2025",
  registerDate: "19 Dec 2018",
  conditions: ["Asthma", "Hypertension", "Urolithiasis"],
  phone: "+1 (308) 555-0121",
};

const defaultAvailability = {
  timezone: "Asia/Kolkata",
  days: {
    Mon: { active: true, from: "09:00", to: "17:00" },
    Tue: { active: true, from: "09:00", to: "17:00" },
    Wed: { active: true, from: "09:00", to: "17:00" },
    Thu: { active: true, from: "09:00", to: "17:00" },
    Fri: { active: true, from: "09:00", to: "17:00" },
    Sat: { active: false, from: "10:00", to: "14:00" },
    Sun: { active: false, from: "", to: "" },
  },
};

/* -------- Small UI pieces -------- */
function StatCard({ label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    ongoing: { text: "On Going", cls: "pill pill-green" },
    queued: { text: "Queued", cls: "pill pill-blue" },
    done: { text: "Done", cls: "pill" },
  };
  const s = map[status] || map.queued;
  return <span className={s.cls}>{s.text}</span>;
}

function AppointmentRow({ appt, onStart, onDone }) {
  return (
    <div className="row">
      <div className="row-left">
        <div className="avatar" />
        <div>
          <div className="row-title">{appt.name}</div>
          <div className="row-sub">{appt.reason}</div>
        </div>
      </div>
      <div className="row-right">
        <div className="time">{appt.time}</div>
        <StatusPill status={appt.status} />
        {appt.status !== "done" && (
          <button
            className="btn btn-secondary"
            onClick={() =>
              appt.status === "queued" ? onStart(appt.id) : onDone(appt.id)
            }
          >
            {appt.status === "queued" ? "Start" : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}

function AvailabilityEditor({ value, onChange }) {
  const [tz, setTz] = useState(value.timezone);
  const toggle = (d) =>
    onChange({
      ...value,
      days: { ...value.days, [d]: { ...value.days[d], active: !value.days[d].active } },
      timezone: tz,
    });

  const setTime = (d, field, v) =>
    onChange({
      ...value,
      days: { ...value.days, [d]: { ...value.days[d], [field]: v } },
      timezone: tz,
    });

  return (
    <div className="card">
      <div className="card-h">Manage Availability</div>
      <div className="card-c">
        <div className="tz">
          <label>Time zone</label>
          <input
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            onBlur={() => onChange({ ...value, timezone: tz })}
          />
        </div>
        <div className="grid2">
          {Object.entries(value.days).map(([day, cfg]) => (
            <div className="slot" key={day}>
              <div className="slot-left">
                <input
                  type="checkbox"
                  checked={cfg.active}
                  onChange={() => toggle(day)}
                />
                <span className="day">{day}</span>
              </div>
              <div className="slot-times">
                <input
                  type="time"
                  value={cfg.from}
                  disabled={!cfg.active}
                  onChange={(e) => setTime(day, "from", e.target.value)}
                />
                <span className="to">to</span>
                <input
                  type="time"
                  value={cfg.to}
                  disabled={!cfg.active}
                  onChange={(e) => setTime(day, "to", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="btn">Save Availability</button>
          <button className="btn btn-secondary">Sync Calendar</button>
        </div>
      </div>
    </div>
  );
}

/* -------- Main Component -------- */
export default function DHome() {
  const [counts, setCounts] = useState(mockCounts);
  const [appts, setAppts] = useState(todayAppointments);
  const [requests, setRequests] = useState(incomingRequests);
  const [availability, setAvailability] = useState(defaultAvailability);

  const ongoing = useMemo(
    () => appts.find((a) => a.status === "ongoing"),
    [appts]
  );

  const startAppt = (id) =>
    setAppts((list) =>
      list.map((a) =>
        a.id === id
          ? { ...a, status: "ongoing" }
          : { ...a, status: a.status === "ongoing" ? "queued" : a.status }
      )
    );

  const finishAppt = (id) =>
    setAppts((list) => list.map((a) => (a.id === id ? { ...a, status: "done" } : a)));

  const acceptReq = (id) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setRequests((l) => l.filter((r) => r.id !== id));
    const newAppt = {
      id: `a${Date.now()}`,
      name: req.name,
      reason: "Consultation",
      time: req.time,
      status: "queued",
    };
    setAppts((l) => [...l, newAppt]);
    setCounts((c) => ({ ...c, appointments: c.appointments + 1 }));
  };

  const declineReq = (id) => setRequests((l) => l.filter((r) => r.id !== id));

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="doctor">
          <div className="doctor-avatar" />
          <div>
            <div className="doctor-name">Dr. Stranger</div>
            <div className="doctor-role">Dentist</div>
          </div>
        </div>
        <nav className="menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Schedule</button>
          <button className="menu-item">Patients</button>
          <button className="menu-item">Treatments</button>
          <button className="menu-item">Messages</button>
        </nav>
        <button className="btn btn-secondary w100">Logout</button>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="page-title">Dashboard</div>

        {/* Stats */}
        <div className="stats">
          <StatCard label="Patients" value={counts.patients} />
          <StatCard label="Appointments" value={counts.appointments} />
          <StatCard label="Treatments" value={counts.treatments} />
        </div>

        <div className="grid12">
          {/* Today Appointments */}
          <section className="col6">
            <div className="card">
              <div className="card-h">Today Appointments</div>
              <div className="card-c divide">
                {appts.map((a) => (
                  <AppointmentRow
                    key={a.id}
                    appt={a}
                    onStart={startAppt}
                    onDone={finishAppt}
                  />
                ))}
              </div>
            </div>

            {/* Requests */}
            <div className="card mt16">
              <div className="card-h">Appointment Requests</div>
              <div className="card-c requests">
                {requests.length === 0 && (
                  <div className="muted">No pending requests.</div>
                )}
                {requests.map((r) => (
                  <div key={r.id} className="request">
                    <div>
                      <div className="row-title">{r.name}</div>
                      <div className="row-sub">
                        {r.date} • {r.time}
                      </div>
                    </div>
                    <div className="gap8">
                      <button className="btn" onClick={() => acceptReq(r.id)}>
                        Accept
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => declineReq(r.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next patient + Availability */}
          <section className="col6">
            <div className="card">
              <div className="card-h">Next Patient Details</div>
              <div className="card-c">
                <div className="np">
                  <img
                    src={nextPatient.avatar}
                    alt={nextPatient.name}
                    className="np-avatar"
                  />
                  <div className="np-info">
                    <div className="np-name">{nextPatient.name}</div>
                    <div className="np-addr">{nextPatient.address}</div>
                    <div className="np-tags">
                      {nextPatient.conditions.map((c) => (
                        <span className="tag" key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="np-grid">
                  <div>
                    <div className="muted">Sex</div>
                    <div>{nextPatient.sex}</div>
                  </div>
                  <div>
                    <div className="muted">Weight</div>
                    <div>{nextPatient.weightKg} kg</div>
                  </div>
                  <div>
                    <div className="muted">Height</div>
                    <div>{nextPatient.heightCm} cm</div>
                  </div>
                  <div>
                    <div className="muted">Last Visit</div>
                    <div>{nextPatient.lastAppointment}</div>
                  </div>
                  <div>
                    <div className="muted">Registered</div>
                    <div>{nextPatient.registerDate}</div>
                  </div>
                  <div>
                    <div className="muted">Phone</div>
                    <div>{nextPatient.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt16">
              <AvailabilityEditor
                value={availability}
                onChange={setAvailability}
              />
            </div>
          </section>

          {/* Full-width availability (optional): <section className="col12"><AvailabilityEditor .../></section> */}
        </div>
      </main>
    </div>
  );
}
