import React, { useState } from "react";
import "./Treatments.css";

const initial = [
  { id: "t1", name: "Scaling", count: 18, today: 3 },
  { id: "t2", name: "Root Canal", count: 9, today: 1 },
  { id: "t3", name: "Whitening", count: 5, today: 0 },
];

export default function Treatments() {
  const [rows, setRows] = useState(initial);

  return (
    <div className="page">
      <h1 className="title">Treatments</h1>

      <div className="card">
        <div className="toolbar">
          <button className="btn">Add Treatment</button>
        </div>

        <table className="table">
          <thead>
            <tr><th>Treatment</th><th>Total</th><th>Today</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.count}</td>
                <td>{r.today}</td>
                <td>
                  <button className="link">Edit</button>
                  <button className="link danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
