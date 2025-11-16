import React from "react";
import "./HospitalCard.css";

export default function HospitalCard({ hospital = {} }) {
  const {
    name = "Unknown Hospital",
    specialties = [],
    beds,
    doctors,
    distance,
    address = "",
    opdhours = "",
  } = hospital;

  return (
    <div className="hospital-card-large no-img-card">
      <div className="card-body">
        <h3 className="hospital-name">{name}</h3>

        <div className="badges-row">
          {specialties.slice(0, 2).map((s) => (
            <span key={s} className="badge">{s}</span>
          ))}

          <span className="badge muted">{beds ? `${beds} Beds` : null}</span>
          <span className="badge muted">{doctors ? `${doctors} Doctors` : null}</span>
        </div>

        <div className="meta-row">
          <div>📍 {typeof distance === "number" ? `${distance} km • ` : ""}{address}</div>
          <div>⏱ OPD {opdhours}</div>
        </div>
      </div>
    </div>
  );
}
