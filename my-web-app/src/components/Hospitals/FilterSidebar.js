import React from "react";
import "./FilterSidebar.css";

export default function FilterSidebar({
  cities = [],
  selectedCity = "",
  onCityChange = () => {},
  specialties = [],
  selectedSpecialties = [],
  onToggleSpecialty = () => {},
  services = [],
  selectedServices = [],
  onToggleService = () => {},
  maxDistance = 25,
  setMaxDistance = () => {},
  onClearAll = () => {},
}) {
  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h4>Filters</h4>
        <button className="clear-btn" onClick={onClearAll}>
          Clear all
        </button>
      </div>

      <div className="filter-block">
        <label className="label">City</label>
        <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-block">
        <label className="label">Specialities</label>
        {specialties.length === 0 && <div className="muted">No specialties</div>}
        {specialties.map((s) => (
          <label className="checkbox-row" key={s}>
            <input
              type="checkbox"
              checked={selectedSpecialties.includes(s)}
              onChange={() => onToggleSpecialty(s)}
            />
            <span>{s}</span>
          </label>
        ))}
      </div>

      <div className="filter-block">
        <label className="label">Services</label>
        {services.length === 0 && <div className="muted">No services</div>}
        {services.map((s) => (
          <label className="checkbox-row" key={s}>
            <input
              type="checkbox"
              checked={selectedServices.includes(s)}
              onChange={() => onToggleService(s)}
            />
            <span>{s}</span>
          </label>
        ))}
      </div>

      <div className="filter-block">
        <label className="label">Max distance (km)</label>
        <input
          type="range"
          min="1"
          max="200"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        />
        <div className="distance-val">{maxDistance} km</div>
      </div>
    </div>
  );
}
