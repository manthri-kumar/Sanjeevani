import React, { useState } from "react";
import "./Patients.css";

const initial = [
  { id: "p1", name: "Beth Mccoy", age: 26, condition: "Asthma" },
  { id: "p2", name: "Evan Henry", age: 34, condition: "Hypertension" },
  { id: "p3", name: "Ricardo Russell", age: 41, condition: "Diabetes" },
];

export default function Patients() {
  const [list, setList] = useState(initial);
  const [q, setQ] = useState("");

  const filtered = list.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.condition.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="page">
      <h1 className="title">Patients</h1>

      <div className="card">
        <div className="toolbar">
          <input className="search" placeholder="Search name or condition…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn">Add Patient</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Age</th><th>Condition</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.condition}</td>
                <td>
                  <button className="link">View</button>
                  <button className="link danger">Remove</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="4" className="muted">No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
