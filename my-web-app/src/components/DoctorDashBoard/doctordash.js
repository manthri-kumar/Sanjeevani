import React from "react";

function DoctorDashboard() {
  const doctor = JSON.parse(sessionStorage.getItem("doctor"));

  if (!doctor) {
    return <h2>Please login as Doctor</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Welcome, Dr. {doctor.name}</h1>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Specialist:</strong> {doctor.specialist}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>

      <hr />
      <h2>Your Dashboard Features Coming Soon:</h2>
      <ul>
        <li>View Appointments</li>
        <li>Manage Schedule</li>
        <li>Patient Reports</li>
        <li>Online Consultation</li>
      </ul>
    </div>
  );
}

export default DoctorDashboard;
