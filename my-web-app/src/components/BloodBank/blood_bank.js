import React, { useEffect, useState } from "react";
import "./blood_bank.css";
import INDIA_DISTRICTS from "../../data/indiaDistricts";
import MOCK_BLOOD_BANKS from "../../data/indiabloodbanks";

import { sanjeevaniImg } from "../../assets";

const API_BASE_URL = "http://localhost:5000/api";
const cartCount = 0;



const bloodGroups = ["All Blood Groups", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const components = ["Whole Blood", "Platelets", "Plasma"];

// Static fallback list
const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal"
];

// Normalize states: strings -> {state_id, state_name}
const toStateObjects = (arr) =>
  arr.map((s, i) =>
    typeof s === "string"
      ? { state_id: String(i + 1), state_name: s }
      : s
  );

function distanceKm(a, b) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Search fallback by state/district
function mockSearchByStateDistrict(stateName, districtName) {
  const list = MOCK_BLOOD_BANKS.filter((b) => {
    const sOk = stateName ? b.state_name === stateName : true;
    const dOk = districtName ? b.district_name === districtName : true;
    return sOk && dOk;
  });
  if (list.length) return list;
  if (stateName) return MOCK_BLOOD_BANKS.filter((b) => b.state_name === stateName);
  return MOCK_BLOOD_BANKS.slice(0, 3);
}

// Fallback for nearest search
function mockNearest(lat, lng) {
  const here = { lat, lng };
  return [...MOCK_BLOOD_BANKS]
    .map((b) => ({ ...b, distance_km: distanceKm(here, { lat: b.lat, lng: b.lng }) }))
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, 5);
}


function BloodBank() {
  // ✅ Use these names consistently
  const [stateOptions, setStateOptions] = useState(toStateObjects(INDIAN_STATES));
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(bloodGroups[0]);
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("Govt");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // --- State/District API Logic ---
useEffect(() => {
  if (!selectedState) {
    setDistricts([]);
    setSelectedDistrict("");
    return;
  }

  const selectedStateObj = stateOptions.find(
    (s) => String(s.state_id) === String(selectedState)
  );
  const stateName = selectedStateObj?.state_name;

  if (stateName && INDIA_DISTRICTS[stateName]) {
    // ✅ Use local JSON data
    const districtsList = INDIA_DISTRICTS[stateName].map((d, i) => ({
      district_id: String(i + 1),
      district_name: d,
    }));
    setDistricts(districtsList);
  } else {
    // 🚨 Fallback: if missing, call API
    setIsLoading(true);
    fetch(`${API_BASE_URL}/districts/${selectedState}`)
      .then((res) => res.json())
      .then((data) => setDistricts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching districts:", err))
      .finally(() => setIsLoading(false));
  }
}, [selectedState, stateOptions]);


  // --- Search Handlers ---
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSearchResults([]);
  };
  const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);

  // 1. State/District Search
  const handleSearch = () => {
  if (!selectedState || !selectedDistrict) {
    alert("Please select both State and District.");
    return;
  }
  setIsLoading(true);

  const stateName =
    stateOptions.find((s) => String(s.state_id) === String(selectedState))?.state_name;
  const districtName =
    districts.find((d) => String(d.district_id) === String(selectedDistrict))?.district_name;

  const searchParams = { districtId: selectedDistrict };

  fetch(`${API_BASE_URL}/blood-banks/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchParams),
  })
    .then((res) => res.ok ? res.json() : Promise.reject(res))
    .then((data) => {
      const list = Array.isArray(data) ? data : [];
      if (list.length === 0) {
        // Fallback to mock
        const mock = mockSearchByStateDistrict(stateName, districtName);
        setSearchResults(mock);
      } else {
        setSearchResults(list);
      }
      setActiveTab("Govt");
    })
    .catch((err) => {
      console.error("Search failed, using mock:", err);
      const mock = mockSearchByStateDistrict(stateName, districtName);
      setSearchResults(mock);
      setActiveTab("Govt");
    })
    .finally(() => setIsLoading(false));
};


  // 2. Geolocation Search
  const searchNearestBloodBank = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }
  setIsLocating(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const el = document.getElementById("bb-results-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });

      try {
        const response = await fetch(`${API_BASE_URL}/blood-banks/nearest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        const list = Array.isArray(data) ? data : [];
        if (list.length === 0) {
          const mock = mockNearest(latitude, longitude);
          setSearchResults(mock);
        } else {
          setSearchResults(list);
        }
        setActiveTab("Govt");
      } catch (error) {
        console.error("Nearest search failed, using mock:", error);
        const mock = mockNearest(latitude, longitude);
        setSearchResults(mock);
        setActiveTab("Govt");
      } finally {
        setIsLocating(false);
      }
    },
    () => {
      setIsLocating(false);
      alert("Location access denied or unavailable. Please enable location permissions.");
    }
  );
};


  // --- Filtering & Table ---
  const filteredResults = searchResults.filter((bank) => {
    const isGovt = bank.category && bank.category.toLowerCase() === "govt";
    if (activeTab === "Govt") return isGovt;
    if (activeTab === "Other") return !isGovt;
    return true;
  });

  const renderTableBody = () => {
    if (isLoading || isLocating) {
      return (
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
              Loading blood banks...
            </td>
          </tr>
        </tbody>
      );
    }
    if (searchResults.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
              Search to view blood bank stock and location.
            </td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {filteredResults.map((bank, index) => (
          <tr key={bank.id || index}>
            <td>{index + 1}</td>
            <td className="bb-bank-details">
              <p className="bb-bank-name">{bank.name}</p>
              <p className="bb-bank-address">{bank.address}</p>
            </td>
            <td>{bank.category}</td>
            <td>
              {bank.availability ? bank.availability.replace(/,/g, "\n") : "N/A"}
              {bank.distance_km ? `\n(Dist: ${bank.distance_km.toFixed(1)} km)` : ""}
            </td>
            <td>{bank.updated}</td>
            <td>{bank.type}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="bb-page">
      {/* Header */}
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

      {/* Hero */}
      <section className="bb-hero">
        <h2>Donate Blood, Save Lives</h2>
        <p>Search for available blood units or find nearby blood centers in your area.</p>

        <div className="bb-hero-buttons">
          <button className="bb-btn bb-btn-primary">Search By Location</button>
          <button
            className="bb-btn bb-btn-secondary"
            onClick={searchNearestBloodBank}
            disabled={isLocating}
          >
            {isLocating ? "Locating..." : "Search Blood Bank Near Me"}
          </button>
        </div>
      </section>

      {/* Stock Section */}
      <section className="bb-stock-section" id="bb-results-section">
        <h2 className="bb-stock-title">Blood Stock Availability</h2>

        <div className="bb-stock-form">
          <h3 className="bb-stock-header">Search Blood Stock</h3>

          <div className="bb-dropdowns">
            {/* ✅ State Dropdown uses stateOptions (NOT `states`) */}
            <select
              className="bb-dropdown"
              onChange={handleStateChange}
              value={selectedState}
              disabled={isLoading}
            >
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              className="bb-dropdown"
              onChange={handleDistrictChange}
              value={selectedDistrict}
              disabled={!selectedState || districts.length === 0 || isLoading}
            >
              <option value="">
                {selectedState
                  ? isLoading
                    ? "Loading Districts..."
                    : "Select District"
                  : "Select State First"}
              </option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>

            {/* Blood Group */}
            <select
              className="bb-dropdown"
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              value={selectedBloodGroup}
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            {/* Component */}
            <select
              className="bb-dropdown"
              onChange={(e) => setSelectedComponent(e.target.value)}
              value={selectedComponent}
            >
              {components.map((component) => (
                <option key={component} value={component}>
                  {component}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bb-search-btn"
            onClick={handleSearch}
            disabled={isLoading || !selectedDistrict}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {(searchResults.length > 0 || isLoading) && (
          <div className="bb-results-container">
            <div className="bb-tabs">
              <button
                className={`bb-tab-btn ${activeTab === "Govt" ? "active" : ""}`}
                onClick={() => setActiveTab("Govt")}
              >
                Government Blood Banks
              </button>
              <button
                className={`bb-tab-btn ${activeTab === "Other" ? "active" : ""}`}
                onClick={() => setActiveTab("Other")}
              >
                Other Blood Banks
              </button>
              <div className="bb-search-bar">
                <label>Show 10 entries</label>
                <input type="text" placeholder="Search:" />
              </div>
            </div>

            <div className="bb-table-wrapper">
              <table className="bb-blood-table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Blood Bank</th>
                    <th>Category</th>
                    <th>Availability</th>
                    <th>Last Updated</th>
                    <th>Type</th>
                  </tr>
                </thead>
                {renderTableBody()}
              </table>
            </div>
          </div>
        )}
      </section>

        <footer className="footer">
          {/* ... existing footer markup ... */}
          <div className="footer-container">
            <div className="footer-section">
              <h4>About Sanjeevani</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Corporate</h4>
              <ul>
                <li><a href="#">Corporate Disclosures</a></li>
                <li><a href="#">Corporate Partnerships</a></li>
                <li><a href="#">Sanjeevani Sitemap</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Online Doctor Consultation</a></li>
                <li><a href="#">Online Medicines</a></li>
                <li><a href="#">Health Programs</a></li>
                <li><a href="#">Doctors by Specialty</a></li>
                <li><a href="#">Doctors by City</a></li>
                <li><a href="#">All Doctors List</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Lab Tests</h4>
              <ul><li><a href="#">Book Lab Tests at Home</a></li></ul>
            </div>
            <div className="footer-section">
              <h4>Product Categories</h4>
              <ul>
                <li><a href="#">Health Care</a></li>
                <li><a href="#">Personal Care</a></li>
                <li><a href="#">Baby Care</a></li>
                <li><a href="#">Nutrition</a></li>
                <li><a href="#">Healthcare Devices</a></li>
                <li><a href="#">Beauty & Skin Care</a></li>
                <li><a href="#">Immunity Boosters</a></li>
                <li><a href="#">Diabetes Care</a></li>
              </ul>
            </div>
            <div className="footer-section footer-brand">
              <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer logo" />
              <h4>A MANTHRI Enterprise</h4>
            </div>
          </div>
        </footer>
      </div>
    );
}

export default BloodBank;
