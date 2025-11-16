import React, { useEffect, useState } from "react";

export default function AdminHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/hospitals")
      .then(res => res.json())
      .then(data => setHospitals(data.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hospitals</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>City</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(h => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.name}</td>
              <td>{h.city}</td>
              <td>{h.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
