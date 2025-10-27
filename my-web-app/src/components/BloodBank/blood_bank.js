import React, { useEffect, useState } from "react";
import "./blood_bank.css";
// NOTE: Make sure your component file is named BloodBank.js
// If your file includes the full static data, keep it, but I've removed it for brevity here.
import { sanjeevaniImg } from "../../assets";

const API_BASE_URL = "http://localhost:5000/api"; 
const cartCount = 0;
const bloodGroups = ["All Blood Groups", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const components = ["Whole Blood", "Platelets", "Plasma"];


function BloodBank() {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(bloodGroups[0]); 
    const [selectedComponent, setSelectedComponent] = useState(components[0]); 
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState('Govt');
    const [isLoading, setIsLoading] = useState(false); 
    const [isLocating, setIsLocating] = useState(false); // State for the new button

    // --- State/District API Logic (Uses useEffect) ---
    useEffect(() => {
        // Fetch states
        fetch(`${API_BASE_URL}/states`).then(res => res.json()).then(setStates).catch(err => console.error("Error fetching states:", err));
    }, []);

    useEffect(() => {
        if (selectedState) {
            setIsLoading(true);
            fetch(`${API_BASE_URL}/districts/${selectedState}`) 
                .then(res => res.json()).then(setDistricts)
                .catch(err => console.error("Error fetching districts:", err))
                .finally(() => setIsLoading(false));
        } else { setDistricts([]); setSelectedDistrict(""); }
    }, [selectedState]);


    // --- Search Handlers ---
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSearchResults([]); 
    };
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    // 1. State/District Search
    const handleSearch = () => {
        if (!selectedState || !selectedDistrict) { alert("Please select both State and District."); return; }
        setIsLoading(true);
        const searchParams = { districtId: selectedDistrict };

        fetch(`${API_BASE_URL}/blood-banks/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchParams),
        })
        .then(res => res.json())
        .then(data => { setSearchResults(Array.isArray(data) ? data : []); setActiveTab('Govt'); })
        .catch(err => console.error("Search failed:", err))
        .finally(() => setIsLoading(false));
    };

    // 2. Geolocation Search (NEW)
    const searchNearestBloodBank = () => {
        if (!navigator.geolocation) { alert('Geolocation is not supported by your browser.'); return; }
        setIsLocating(true);
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // OPTIONAL: Scroll to the results section after finding the location
                document.getElementById('bb-results-section').scrollIntoView({ behavior: 'smooth' });

                try {
                    const response = await fetch(`${API_BASE_URL}/blood-banks/nearest`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ latitude, longitude }),
                    });

                    const data = await response.json();
                    
                    if (response.ok) {
                        setSearchResults(data); // Populate the main results table
                        setActiveTab('Govt'); 
                    } else {
                        alert(`Search failed: ${data.message || 'Server error'}`);
                    }

                } catch (error) {
                    console.error("Nearest blood bank search failed:", error);
                    alert("Network error occurred during search. Check server console.");
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                setIsLocating(false);
                alert('Location access denied or unavailable. Please enable location permissions.');
            }
        );
    };


    // Filter results and render table logic (remains the same)
    const filteredResults = searchResults.filter(bank => {
        const isGovt = bank.category && bank.category.toLowerCase() === 'govt';
        if (activeTab === 'Govt') return isGovt;
        if (activeTab === 'Other') return !isGovt;
        return true;
    });

    const renderTableBody = () => {
        // ... (Table rendering logic, omitted for brevity)
        if (isLoading || isLocating) return (<tbody><tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading blood banks...</td></tr></tbody>);
        if (searchResults.length === 0) return (<tbody><tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Search to view blood bank stock and location.</td></tr></tbody>);
        
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
                        {/* If distance_km exists from the nearest search, display it */}
                        <td>
                            {bank.availability ? bank.availability.replace(/,/g, '\n') : 'N/A'}
                            {bank.distance_km ? `\n(Dist: ${bank.distance_km.toFixed(1)} km)` : ''}
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
            {/* Header (Placeholder for complex nav) */}
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
            {/* Hero Section */}
            <section className="bb-hero">
                <h2>Donate Blood, Save Lives</h2>
                <p>Search for available blood units or find nearby blood centers in your area.</p>
                
                {/* Button 1: Original Search */}
                <div className="bb-hero-buttons">
                    <button className="bb-btn bb-btn-primary">Search By Location</button> 
                    
                    {/* Button 2: NEW Geolocation Search */}
                    <button 
                        className="bb-btn bb-btn-secondary"
                        onClick={searchNearestBloodBank}
                        disabled={isLocating}
                    >
                        {isLocating ? 'Locating...' : 'Search Blood Bank Near Me'}
                    </button>
                </div>
            </section>

            {/* Blood Stock Availability Section (Search Form) */}
            <section className="bb-stock-section" id="bb-results-section">
                <h2 className="bb-stock-title">Blood Stock Availability</h2>

                <div className="bb-stock-form">
                    <h3 className="bb-stock-header">Search Blood Stock</h3>

                    <div className="bb-dropdowns">
                        {/* State Dropdown */}
                        <select className="bb-dropdown" onChange={handleStateChange} value={selectedState} disabled={isLoading}>
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
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
                                {selectedState ? (isLoading ? "Loading Districts..." : "Select District") : "Select State First"}
                            </option>
                            {districts.map((district) => (
                                <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                            ))}
                        </select>

                        {/* Blood Group Dropdown */}
                        <select className="bb-dropdown" onChange={(e) => setSelectedBloodGroup(e.target.value)} value={selectedBloodGroup}>
                            {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                        </select>

                        {/* Component Dropdown */}
                        <select className="bb-dropdown" onChange={(e) => setSelectedComponent(e.target.value)} value={selectedComponent}>
                            {components.map(component => <option key={component} value={component}>{component}</option>)}
                        </select>
                    </div>

                    <button className="bb-search-btn" onClick={handleSearch} disabled={isLoading || !selectedDistrict}>
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>
                
                {/* --- BLOOD BANK RESULTS TABLE --- */}
                {(searchResults.length > 0 || isLoading) && (
                    <div className="bb-results-container">
                        <div className="bb-tabs">
                            <button className={`bb-tab-btn ${activeTab === 'Govt' ? 'active' : ''}`} onClick={() => setActiveTab('Govt')}>Government Blood Banks</button>
                            <button className={`bb-tab-btn ${activeTab === 'Other' ? 'active' : ''}`} onClick={() => setActiveTab('Other')}>Other Blood Banks</button>
                            <div className="bb-search-bar"><label>Show 10 entries</label><input type="text" placeholder="Search:" /></div>
                        </div>

                        <div className="bb-table-wrapper">
                            <table className="bb-blood-table">
                                <thead>
                                    <tr>
                                        <th>S.No.</th><th>Blood Bank</th><th>Category</th><th>Availability</th><th>Last Updated</th><th>Type</th>
                                    </tr>
                                </thead>
                                {renderTableBody()}
                            </table>
                        </div>
                    </div>
                )}
            </section>
            
           <footer className="footer">
                               {/* ... (Your footer JSX remains here) ... */}
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
                                       <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer logo"/>
                                       <h4>A MANTHRI Enterprise</h4>
                                   </div>
                               </div>
                           </footer>
        </div>
    );
}

export default BloodBank;