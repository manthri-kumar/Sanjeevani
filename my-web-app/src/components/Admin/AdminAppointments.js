import React, { useEffect, useState } from "react";

export default function AdminAppointments() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/appointments")
      .then(res => res.json())
      .then(data => setList(data.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Appointments</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>User</th><th>Doctor</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.user_name}</td>
              <td>{a.doctor_name}</td>
              <td>{a.appointment_time}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
