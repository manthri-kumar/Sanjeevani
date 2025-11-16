import React, { useState } from "react";
import "./HospitalPage.css";
import { sanjeevaniImg } from "../../assets";

const API_BASE_URL = "http://localhost:5000/api"; 
const cartCount = 0;

export default function HospitalPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const cities = ["Trivandrum", "Kochi", "Kollam"];

  // ------------------- SEARCH BY FILTERS (API) ------------------
  const handleSearch = async () => {
    if (!selectedCity && !query.trim()) {
      alert("Please enter a city or search query.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/hospitals/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: selectedCity,
          search: query.trim(),
        }),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setSearchResults(
          data.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0))
        );
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("Server error. Try again.");
      setSearchResults([]);
    }

    setIsLoading(false);
  };

  // ------------------- NEAREST HOSPITALS (GPS + API) ------------------
  const searchNearestHospitals = () => {
    if (!navigator.geolocation) {
      alert("Location not supported in your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(`${API_BASE_URL}/hospitals/nearest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (Array.isArray(data)) {
            setSearchResults(
              data.sort((a, b) => a.distance_km - b.distance_km)
            );
          } else {
            setSearchResults([]);
          }
        } catch (err) {
          alert("Failed to fetch nearest hospitals.");
        }

        setIsLocating(false);
      },

      () => {
        alert("Location permission denied.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="hospital-page-container">

      {/* HEADER - SAME AS BLOODBANK */}
      <header className="header">
        <div className="logo">
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>

        <nav className="nav-links">
          <a href="#">DOCTORS</a>
          <a href="#">HOSPITALS</a>
          <a href="#">MEDICINES</a>
          <a href="#">PROFILE</a>
        </nav>

        <div className="search">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>
              <i className="fas fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="cart">
          <button>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hp-hero">
        <h2>Find Nearby Hospitals</h2>
        <p>Search hospitals by location, specialty, or nearest distance.</p>

        <div className="hp-hero-buttons">
          <button
            className="hp-btn hp-btn-primary"
            onClick={searchNearestHospitals}
          >
            Search By Location
          </button>
        </div>
      </section>

      {/* SEARCH FORM */}
      <section className="hp-search-section">
        <h2 className="hp-title">Hospital Search</h2>

        <div className="hp-search-form">
          <select
            className="hp-dropdown"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            className="hp-dropdown"
            value={query}
            placeholder="Search name or address"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="hp-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {(isLoading || isLocating) && (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}

        {/* RESULT LIST */}
        {searchResults.length > 0 && (
          <div className="hp-results-container">

            {searchResults.map((h, i) => (
              <div key={i} className="hp-card">
                <h3>{h.name}</h3>
                <p>{h.address}</p>
                <p><b>City:</b> {h.city}</p>
                <p><b>Rating:</b> {h.rating || "N/A"}</p>
                <p><b>Beds:</b> {h.beds || "N/A"}</p>

                {h.specialties && (
                  <p><b>Specialties:</b> {h.specialties.join(", ")}</p>
                )}

                {h.distance_km !== undefined && (
                  <p><b>Distance:</b> {h.distance_km.toFixed(1)} km</p>
                )}
              </div>
            ))}

          </div>
        )}
      </section>
    </div>
  );
}
