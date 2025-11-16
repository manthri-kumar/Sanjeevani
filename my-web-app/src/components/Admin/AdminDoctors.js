import React, { useEffect, useState } from "react";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctors</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Specialist</th><th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.specialist}</td>
              <td>{d.experience_years}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
