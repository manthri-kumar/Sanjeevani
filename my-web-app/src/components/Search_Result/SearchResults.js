import React, { useEffect, useState } from "react";
const API = "http://localhost:5000";

export default function SearchResults({ query }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/doctors`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setDoctorList(data.doctors);
      });
  }, []);

  const filtered = doctorList.filter((doc) =>
    doc.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {filtered.map((doc) => (
        <div key={doc.id}>{doc.name}</div>
      ))}
    </div>
  );
}
