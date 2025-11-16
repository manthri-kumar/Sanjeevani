import React, { useEffect, useState } from "react";
import "./blood_bank.css";
import INDIA_DISTRICTS from "../../data/indiaDistricts";
import MOCK_BLOOD_BANKS from "../../data/indiabloodbanks";
import { useNavigate } from "react-router-dom";
import { sanjeevaniImg } from "../../assets";

const API_BASE_URL = "http://localhost:5000/api";
const cartCount = 0;

const bloodGroups = [
  "All Blood Groups",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const components = ["Select Type", "Whole Blood", "Platelets", "Plasma"];

const INDIAN_STATES = ["Andhra Pradesh", "Telangana", "Karnataka", "Kerala"];

const toStateObjects = (arr) =>
  arr.map((s, i) => ({
    state_id: String(i + 1),
    state_name: s,
  }));

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

function mockSearchByStateDistrict(stateName, districtName) {
  const list = MOCK_BLOOD_BANKS.filter((b) => {
    const sOk =
      stateName && b.state_name.toLowerCase() === stateName.toLowerCase();
    const dOk =
      districtName &&
      b.district_name.toLowerCase() === districtName.toLowerCase();
    return sOk && dOk;
  });

  if (list.length) return list;

  if (stateName)
    return MOCK_BLOOD_BANKS.filter(
      (b) => b.state_name.toLowerCase() === stateName.toLowerCase()
    );

  return MOCK_BLOOD_BANKS.slice(0, 3);
}

function mockNearest(lat, lng) {
  const here = { lat, lng };
  return [...MOCK_BLOOD_BANKS]
    .map((b) => ({
      ...b,
      distance_km: distanceKm(here, { lat: b.lat, lng: b.lng }),
    }))
    .sort((a, b) => a.distance_km - b.distance_km)
    .slice(0, 5);
}

function BloodBank() {
  const [stateOptions] = useState(toStateObjects(INDIAN_STATES));
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(bloodGroups[0]);
  const [selectedComponent, setSelectedComponent] = useState(components[0]);

  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("Govt");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict("");
      return;
    }

    const stateName = stateOptions.find(
      (s) => s.state_id === selectedState
    )?.state_name;

    if (stateName && INDIA_DISTRICTS[stateName]) {
      const list = INDIA_DISTRICTS[stateName].map((d, i) => ({
        district_id: String(i + 1),
        district_name: d,
      }));
      setDistricts(list);
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (!selectedState || !selectedDistrict) {
      alert("Please select both State and District");
      return;
    }

    setIsLoading(true);

    const stateName = stateOptions.find(
      (s) => s.state_id === selectedState
    )?.state_name;

    const districtName = districts.find(
      (d) => d.district_id === selectedDistrict
    )?.district_name;

    fetch(`${API_BASE_URL}/blood-banks/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ districtId: selectedDistrict }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSearchResults(data);
        } else {
          setSearchResults(mockSearchByStateDistrict(stateName, districtName));
        }
      })
      .catch(() => {
        setSearchResults(mockSearchByStateDistrict(stateName, districtName));
      })
      .finally(() => setIsLoading(false));
  };

  const searchNearestBloodBank = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(`${API_BASE_URL}/blood-banks/nearest`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (Array.isArray(data) && data.length > 0) {
            setSearchResults(data);
          } else {
            setSearchResults(mockNearest(latitude, longitude));
          }
        } catch {
          setSearchResults(mockNearest(latitude, longitude));
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("Location permission denied.");
        setIsLocating(false);
      }
    );
  };

  const filteredResults = searchResults.filter((bank) =>
    activeTab === "Govt"
      ? bank.category?.toLowerCase() === "govt"
      : bank.category?.toLowerCase() !== "govt"
  );

  const renderTableBody = () => {
    if (isLoading || isLocating)
      return (
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              Loading...
            </td>
          </tr>
        </tbody>
      );

    if (searchResults.length === 0)
      return (
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
              No blood banks found.
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {filteredResults.map((bank, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <p className="bb-bank-name">{bank.name}</p>
              <p className="bb-bank-address">{bank.address}</p>
            </td>
            <td>{bank.category}</td>
            <td>
              {bank.availability?.replace(/,/g, "\n")}
              {bank.distance_km
                ? `\n(Dist: ${bank.distance_km.toFixed(1)} km)`
                : ""}
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

      {/* ⭐ FULL HEADER ADDED HERE ⭐ */}
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
      {/* ⭐ END HEADER ⭐ */}

      {/* HERO SECTION */}
      <section className="bb-hero">
        <h2>Donate Blood, Save Lives</h2>
        <p>Search blood stock or find nearby blood banks.</p>

        <div className="bb-hero-buttons">
          <button
            className="bb-btn bb-btn-primary"
            onClick={searchNearestBloodBank}
          >
            Search By Location
          </button>

          <button
            className="bb-btn bb-btn-primary"
            onClick={() => navigate("/HospitalRegister")}
          >
            Donate Blood
          </button>
        </div>
      </section>

      {/* SEARCH FORM */}
      <section className="bb-stock-section">
        <h2 className="bb-stock-title">Blood Stock Availability</h2>

        <div className="bb-stock-form">
          <div className="bb-dropdowns">
            <select
              className="bb-dropdown"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State</option>
              {stateOptions.map((s) => (
                <option key={s.state_id} value={s.state_id}>
                  {s.state_name}
                </option>
              ))}
            </select>

            <select
              className="bb-dropdown"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!districts.length}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.district_id} value={d.district_id}>
                  {d.district_name}
                </option>
              ))}
            </select>

            <select
              className="bb-dropdown"
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
            >
              {bloodGroups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <select
              className="bb-dropdown"
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
            >
              {components.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <button className="bb-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {(searchResults.length > 0 || isLoading || isLocating) && (
          <div className="bb-results-container">
            <div className="bb-tabs">
              <button
                className={`bb-tab-btn ${
                  activeTab === "Govt" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Govt")}
              >
                Government Blood Banks
              </button>

              <button
                className={`bb-tab-btn ${
                  activeTab === "Other" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Other")}
              >
                Other Blood Banks
              </button>
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

    </div>
  );
}

export default BloodBank;
