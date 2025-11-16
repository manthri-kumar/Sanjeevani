import React, { useState, useMemo } from "react";
import FilterSidebar from "./FilterSidebar";
import HospitalList from "./HospitalList";
import "./HospitalPage.css";

const SAMPLE_HOSPITALS = [
  {
    id: "h1",
    name: "PRS Hospital Private Limited",
    city: "Trivandrum",
    address: "Karamana, Thiruvanathapuram",
    rating: 4.6,
    distance: 8.5,
    doctors: 19,
    beds: 300,
    specialties: ["Multi-Speciality", "Cardiology"],
    services: ["CT Scan", "X Ray", "Parking"],
    phone: "+91-471-1234567",
    opdhours: "9:00 am - 7:00 pm",
  },
  {
    id: "h2",
    name: "Green Valley Multispeciality",
    city: "Trivandrum",
    address: "Madhapur, Near Hitec City",
    rating: 4.4,
    distance: 6.1,
    doctors: 12,
    beds: 120,
    specialties: ["Orthopaedics"],
    services: ["Parking", "Pharmacy"],
    phone: "+91-471-9876543",
    opdhours: "8:00 am - 6:00 pm",
  },
  {
    id: "h3",
    name: "Sunrise Children's Hospital",
    city: "Trivandrum",
    address: "Vazhuthacaud",
    rating: 4.7,
    distance: 9.0,
    doctors: 8,
    beds: 60,
    specialties: ["Pediatrics"],
    services: ["Pediatrics", "Emergency"],
    phone: "+91-471-1122334",
    opdhours: "9:30 am - 5:30 pm",
  },
];

export default function HospitalPage() {
  const [hospitals] = useState(SAMPLE_HOSPITALS);

  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [maxDistance, setMaxDistance] = useState(25);
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const allSpecialties = useMemo(
    () => Array.from(new Set(hospitals.flatMap((h) => h.specialties || []))),
    [hospitals]
  );
  const allServices = useMemo(
    () => Array.from(new Set(hospitals.flatMap((h) => h.services || []))),
    [hospitals]
  );
  const allCities = useMemo(
    () => Array.from(new Set(hospitals.map((h) => h.city))),
    [hospitals]
  );

  const filtered = useMemo(() => {
    let list = [...hospitals];

    if (selectedCity) list = list.filter((h) => h.city === selectedCity);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q)
      );
    }

    if (selectedSpecialties.length) {
      list = list.filter((h) =>
        selectedSpecialties.every((s) => h.specialties.includes(s))
      );
    }

    if (selectedServices.length) {
      list = list.filter((h) =>
        selectedServices.every((s) => h.services.includes(s))
      );
    }

    if (maxDistance > 0) {
      list = list.filter((h) => h.distance <= maxDistance);
    }

    if (sortBy === "distance") list.sort((a, b) => a.distance - b.distance);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.doctors - a.doctors);

    return list;
  }, [hospitals, query, selectedCity, selectedSpecialties, selectedServices, maxDistance, sortBy]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="hospital-page">

      <div className="hero-band">
        <div className="hero-inner">
          <div className="hero-copy">
            <h2>Find hospitals in your city</h2>
            <p>Search hospitals by city, locality or pincode and book appointments quickly.</p>
          </div>
        </div>
      </div>

      <div className="full-search-row">
        <div className="full-search-inner">
          <div className="search-row-top">
            <div className="search-col">
              <label>City / Location</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All cities</option>
                {allCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="search-col flex-2">
              <label>Search hospitals, locality or pincode</label>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="e.g. Karamana, 695002"
              />
            </div>

            <div className="search-col actions-col">
              <label>&nbsp;</label>
              <div className="actions-row">
                <button className="primary-btn">Search</button>
                <button
                  className="ghost-btn"
                  onClick={() => {
                    setSelectedCity("");
                    setQuery("");
                    setSelectedSpecialties([]);
                    setSelectedServices([]);
                    setMaxDistance(25);
                    setPage(1);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-grid-full">
        <aside className="left-col">
          <div className="filter-block-wrap">
            <FilterSidebar
              cities={allCities}
              selectedCity={selectedCity}
              onCityChange={(c) => {
                setSelectedCity(c);
                setPage(1);
              }}
              specialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              onToggleSpecialty={(s) => {
                setSelectedSpecialties((prev) =>
                  prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                );
                setPage(1);
              }}
              services={allServices}
              selectedServices={selectedServices}
              onToggleService={(s) => {
                setSelectedServices((prev) =>
                  prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                );
                setPage(1);
              }}
              maxDistance={maxDistance}
              setMaxDistance={(d) => {
                setMaxDistance(d);
                setPage(1);
              }}
              onClearAll={() => {
                setSelectedCity("");
                setSelectedSpecialties([]);
                setSelectedServices([]);
                setMaxDistance(25);
                setQuery("");
                setPage(1);
              }}
            />
          </div>
        </aside>

        <main className="right-col">
          <HospitalList
            sortBy={sortBy}
            setSortBy={(s) => {
              setSortBy(s);
              setPage(1);
            }}
            total={total}
            results={paged}
            page={page}
            pages={pages}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}
