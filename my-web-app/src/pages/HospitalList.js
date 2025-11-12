// src/pages/HospitalList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import INDIA_BLOOD_BANKS from "../data/indiabloodbanks";
import "./hospital.css"; // optional styling

function HospitalList() {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/register/${id}`);
  };

  return (
    <div className="hl-container">
      <h2 className="hl-title">🏥 List of Blood Banks / Hospitals</h2>
      <ul className="hl-list">
        {INDIA_BLOOD_BANKS.map((bank, index) => (
          <li
            key={index}
            className="hl-item"
            onClick={() => handleSelect(index)}
          >
            <div className="hl-name">{bank.name}</div>
            <div className="hl-address">{bank.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalList;
