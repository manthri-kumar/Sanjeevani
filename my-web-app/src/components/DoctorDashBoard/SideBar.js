import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/schedule", label: "Schedule" },
  { to: "/patients", label: "Patients" },
  { to: "/treatments", label: "Treatments" },
  { to: "/messages", label: "Messages" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="doc-card">
        <div className="doc-avatar" />
        <div>
          <div className="doc-name">Dr. Stranger</div>
          <div className="doc-role">Dentist</div>
        </div>
      </div>

      <nav className="nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              "nav-item" + (isActive ? " active" : "")
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
