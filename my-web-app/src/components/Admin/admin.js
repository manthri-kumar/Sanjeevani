import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const admin = JSON.parse(sessionStorage.getItem("admin"));

  // If no admin is logged in → redirect to login
  if (!admin) {
    navigate("/");
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Welcome, {admin.username}</h2>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
          className="admin-logout-btn"
        >
          Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-card" onClick={() => navigate("/admin/users")}>
          <h3>View Users</h3>
          <p>Check registered users</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/doctors")}>
          <h3>View Doctors</h3>
          <p>Manage doctor accounts</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/appointments")}>
          <h3>Appointments</h3>
          <p>View all appointments</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/hospitals")}>
          <h3>Hospitals</h3>
          <p>Manage hospital data</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
