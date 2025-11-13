import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

// Correct Imports
import { doctors } from "../Doctors/DoctorAppointment";
import { ceraveProducts, babyCareProducts } from "../Home/home";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read query from URL
  const urlQuery = new URLSearchParams(location.search).get("q") || "";

  const [query, setQuery] = useState(urlQuery.toLowerCase());

  useEffect(() => {
    setQuery(urlQuery.toLowerCase());
  }, [urlQuery]);

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };

  // Universal search pools
  const categories = [
    { name: "Health Monitors", link: "/healthmonitor" },
    { name: "Ayurvedic Diabetes Care", link: "/ayurvediccare" },
    { name: "Pain Relief", link: "/painrelief" },
    { name: "Baby Care", link: "/babycare" },
  ];

  const services = [
    { name: "Doctor Appointment", link: "/doctorappointment" },
    { name: "Buy Medicines", link: "/medicines" },
    { name: "Blood Banks", link: "/bloodbank" },
    { name: "Ambulance", link: "/ambulance" },
  ];

  // Filters
  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query) ||
      d.specialization.toLowerCase().includes(query)
  );

  const filteredProducts = [...ceraveProducts, ...babyCareProducts].filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(query)
  );

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(query)
  );

  const noResults =
    filteredDoctors.length === 0 &&
    filteredProducts.length === 0 &&
    filteredCategories.length === 0 &&
    filteredServices.length === 0;

  return (
    <div className="search-page">
      <h2 className="search-title">Search Results for: "{urlQuery}"</h2>

      {noResults && <p className="no-results">No results found.</p>}

      {/* Doctors */}
      {filteredDoctors.length > 0 && (
        <div className="result-block">
          <h3>Doctors</h3>
          {filteredDoctors.map((doc, i) => (
            <div
              key={i}
              className="result-item"
              onClick={() => navigate("/doctorappointment")}
            >
              <b>{doc.name}</b> • {doc.specialization}
            </div>
          ))}
        </div>
      )}

      {/* Products */}
      {filteredProducts.length > 0 && (
        <div className="result-block">
          <h3>Products</h3>
          {filteredProducts.map((p, i) => (
            <div
              key={i}
              className="result-item"
              onClick={() => navigate("/medicines")}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}

      {/* Categories */}
      {filteredCategories.length > 0 && (
        <div className="result-block">
          <h3>Categories</h3>
          {filteredCategories.map((c, i) => (
            <div
              key={i}
              className="result-item"
              onClick={() => navigate(c.link)}
            >
              {c.name}
            </div>
          ))}
        </div>
      )}

      {/* Services */}
      {filteredServices.length > 0 && (
        <div className="result-block">
          <h3>Services</h3>
          {filteredServices.map((s, i) => (
            <div
              key={i}
              className="result-item"
              onClick={() => navigate(s.link)}
            >
              {s.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
