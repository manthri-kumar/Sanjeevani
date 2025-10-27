import React, { useState, useMemo } from "react";
// Assuming you have a default image for placeholders
import { offerimg, sanjeevaniImg, healthimg } from "../../assets"; 
import { Swiper } from "swiper/react"; // Swiper is not used for the banner anymore, but kept here
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./healthmonitor.css";

// --- DUMMY PRODUCT DATA (16 products total - Syntax Corrected) ---
const initialProducts = [
  // Row 1 & 2 (Original 8 products)
  { id: 1, name: "Digital Blood Pressure Monitor", price: 1899.00, mrp: 2500, discount: "24% off", image: sanjeevaniImg, rating: 4.5 },
  { id: 2, name: "Smart Wi-Fi Body Weighing Scale", price: 1249.50, mrp: 2499, discount: "50% off", image: sanjeevaniImg, rating: 4.2 },
  { id: 3, name: "Infrared Thermometer Gun", price: 850.00, mrp: 1000, discount: "15% off", image: sanjeevaniImg, rating: 4.7 },
  { id: 4, name: "Pulse Oximeter Fingertip", price: 699.00, mrp: 999, discount: "30% off", image: sanjeevaniImg, rating: 4.3 },
  { id: 5, name: "Accurate Blood Glucose Meter Kit", price: 1450.00, mrp: 1800, discount: "19% off", image: sanjeevaniImg, rating: 4.6 },
  { id: 6, name: "Activity & Sleep Tracker Watch", price: 2999.00, mrp: 3500, discount: "14% off", image: sanjeevaniImg, rating: 4.0 },
  { id: 7, name: "Nebulizer Machine for Home Use", price: 1120.00, mrp: 1400, discount: "20% off", image: sanjeevaniImg, rating: 4.1 },
  { id: 8, name: "Digital Body Fat Caliper", price: 499.00, mrp: 750, discount: "33% off", image: sanjeevaniImg, rating: 3.9 },
  // New Products (Rows 3 & 4)
  { id: 9, name: "Smart Watch with ECG Monitor", price: 4999.00, mrp: 6500, discount: "23% off", image: sanjeevaniImg, rating: 4.4 },
  { id: 10, name: "Hearing Aid Amplifier Digital", price: 3200.00, mrp: 4000, discount: "20% off", image: sanjeevaniImg, rating: 4.1 },
  { id: 11, name: "Cervical Traction Device", price: 1950.00, mrp: 2250, discount: "13% off", image: sanjeevaniImg, rating: 4.0 },
  { id: 12, name: "Hot & Cold Gel Pack", price: 250.00, mrp: 350, discount: "28% off", image: sanjeevaniImg, rating: 4.8 },
  { id: 13, name: "Electric Heating Pad", price: 799.00, mrp: 999, discount: "20% off", image: sanjeevaniImg, rating: 4.3 },
  { id: 14, name: "Foot Massager Machine", price: 6500.00, mrp: 7500, discount: "13% off", image: sanjeevaniImg, rating: 4.5 },
  { id: 15, name: "Portable Oxygen Can", price: 550.00, mrp: 699, discount: "21% off", image: sanjeevaniImg, rating: 3.7 },
  { id: 16, name: "UV Sterilizer Box", price: 1599.00, mrp: 1999, discount: "20% off", image: sanjeevaniImg, rating: 4.6 },
];

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to the cart!`);
  };

  const handleSortChange = (value) => {
    setCurrentSort(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const cartCount = cart.length;

  const sortedProducts = useMemo(() => {
    let sorted = [...initialProducts];

    switch (currentSort) {
      case 'price-low-to-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'better-discount':
        sorted.sort((a, b) => {
          const parseDiscount = (d) => parseFloat(d.replace('% off', '')) || 0;
          return parseDiscount(b.discount) - parseDiscount(a.discount);
        });
        break;
      case 'relevance':
      default:
        sorted.sort((a, b) => a.id - b.id);
        break;
    }
    return sorted;
  }, [currentSort]);
    
    const formatSortLabel = (sortValue) => {
        return sortValue
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

  return (
    <div className={showLogin ? "blur-bg" : ""}>
      {/* --------------------------------- Header --------------------------------- */}
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

      
      {/* --------------------------------- PROMOTION BANNER (Placed AFTER Grid) --------------------------------- */}
      <div className="sticky-banner-wrapper"> 
        <div className="sticky-banner">
            <img src={offerimg} alt="Promotional Banner" className="full-banner-image"/>
        </div>
      </div>

      
      {/* --------------------------------- Product Section --------------------------------- */}
      <section className="product-page-content full-width">
        
        {/* Dropdown Sort Control */}
        <div className="sort-dropdown-wrapper">
            <div 
                className={`sort-header-dropdown ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                Sort By: {formatSortLabel(currentSort)}
                <i className={`fa-solid ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
          
            {isDropdownOpen && (
                <div className="sort-options-dropdown">
                    <label className="radio-option-dropdown">
                        <input 
                            type="radio" 
                            name="sort" 
                            value="relevance" 
                            checked={currentSort === 'relevance'}
                            onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Relevance</span>
                    </label>
                    <label className="radio-option-dropdown">
                        <input 
                            type="radio" 
                            name="sort" 
                            value="price-low-to-high" 
                            checked={currentSort === 'price-low-to-high'}
                            onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Price: Low to high</span>
                    </label>
                    <label className="radio-option-dropdown">
                        <input 
                            type="radio" 
                            name="sort" 
                            value="price-high-to-low" 
                            checked={currentSort === 'price-high-to-low'}
                            onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Price: High to Low</span>
                    </label>
                    <label className="radio-option-dropdown">
                        <input 
                            type="radio" 
                            name="sort" 
                            value="better-discount" 
                            checked={currentSort === 'better-discount'}
                            onChange={(e) => handleSortChange(e.target.value)}
                        />
                        <span>Better Discount</span>
                    </label>
                </div>
            )}
        </div>
        

        {/* Product Grid */}
        <div className="product-grid-container full-width">
          <h2 className="product-category-title">Health Monitors ({sortedProducts.length} Items)</h2>
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-box">
                    <img src={product.image} alt={product.name} /> 
                </div>
                <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    {product.id === 2 && <span className="offer-badge">Buy 1 Get 1</span>}
                    
                    <div className="price-info">
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                        <span className="mrp-price">
                            MRP <del>₹{product.mrp.toFixed(2)}</del>
                        </span>
                    </div>
                    <span className="discount">{product.discount}</span>
                </div>
                
                <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------- Footer --------------------------------- */}
      <footer className="footer">
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

export default Home;