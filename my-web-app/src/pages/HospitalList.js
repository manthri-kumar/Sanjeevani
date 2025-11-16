// src/pages/Hospitals.js
import React from "react";
import { useNavigate } from "react-router-dom";
import INDIA_BLOOD_BANKS from "../data/indiabloodbanks";

export default function Hospitals() {
  const navigate = useNavigate();

  if (!Array.isArray(INDIA_BLOOD_BANKS) || INDIA_BLOOD_BANKS.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
        <h2>Hospitals & Blood Banks</h2>
        <div style={{ padding: 20, background: "#fff", border: "1px solid #eee", borderRadius: 8 }}>
          No hospital data found. Please ensure <code>src/data/indiabloodbanks.js</code> exports an array.
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "36px auto", padding: 20 }}>
      <h1 style={{ color: "#b71c1c" }}>Hospitals & Blood Banks</h1>
      <p>Click any item to register to donate blood.</p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 18 }}>
        {INDIA_BLOOD_BANKS.map((bank, i) => (
          <li
            key={i}
            onClick={() => navigate(`/register/${i}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? navigate(`/register/${i}`) : null)}
            style={{
              cursor: "pointer",
              padding: 14,
              borderRadius: 8,
              border: "1px solid #eaeaea",
              marginBottom: 12,
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{bank.name}</div>
              <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>{bank.address}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>{bank.district_name}, {bank.state_name}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#888" }}>{bank.category || "—"}</div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/register/${i}`); }}
                style={{ marginTop: 8, background: "#b71c1c", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}
              >
                Register
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
