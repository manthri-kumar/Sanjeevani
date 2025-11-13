import React, { useState, useMemo } from "react";
import "./PainRelief.css";
import { Link } from "react-router-dom";
import { sanjeevaniImg, offerimg } from "../../assets"; // your existing images

function PainRelief() {
  const [cart, setCart] = useState([]);
  const [currentSort, setCurrentSort] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products = [
  { id: 1, name: "Moov Pain Relief Spray 80g", price: "₹170", mrp: "₹190", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I40846/moov-pain-relief-spray-80g-1-1669627301.jpg" },
  { id: 2, name: "Volini Pain Relief Gel 75g", price: "₹170", mrp: "₹200", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00949/volini-pain-relief-gel-75g-1-1669650639.jpg" },
  { id: 3, name: "Iodex Ultra Gel 30g", price: "₹145", mrp: "₹165", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/V36462/iodex-ultra-gel-30g-1-1671740174.jpg" },
  { id: 4, name: "Himalaya Pain Balm Strong 45g", price: "₹95", mrp: "₹110", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07364/himalaya-pain-balm-strong-45g-1-1669650561.jpg" },
  { id: 5, name: "Zandu Balm Ultra Power 50ml", price: "₹120", mrp: "₹145", discount: "17% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00952/zandu-balm-ultra-power-50ml-1-1669650615.jpg" },
  { id: 6, name: "Omnigel Pain Relief Gel 75g", price: "₹145", mrp: "₹175", discount: "17% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00943/omnigel-pain-relief-gel-75g-1-1669650644.jpg" },
  { id: 7, name: "Dolo 650 Tablet 15s", price: "₹30", mrp: "₹35", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/H33042/dolo-650-tablet-15s-1-1669650519.jpg" },
  { id: 8, name: "Relispray Instant Pain Relief Spray 100g", price: "₹175", mrp: "₹199", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00945/relispray-instant-pain-relief-spray-100g-1-1669650616.jpg" },
  { id: 9, name: "Amrutanjan Pain Balm Extra Power 45ml", price: "₹95", mrp: "₹115", discount: "17% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00951/amrutanjan-pain-balm-extra-power-45ml-1-1669650564.jpg" },
  { id: 10, name: "Biofreeze Pain Relief Gel 110g", price: "₹250", mrp: "₹290", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/D83572/biofreeze-pain-relief-gel-110g-2-1684825323.jpg" },
  
];


  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleSortChange = (value) => {
    setCurrentSort(value);
    setIsDropdownOpen(false);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (currentSort) {
      case "price-low-to-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "better-discount":
        sorted.sort(
          (a, b) =>
            parseFloat(b.discount) - parseFloat(a.discount)
        );
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [currentSort]);

  return (
    <div className="pain-container">
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
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button><i className="fas fa-magnifying-glass"></i></button>
        </div>
        <div className="cart">
          <button>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="sticky-banner-wrapper">
        <div className="sticky-banner">
          <img src={offerimg} alt="Pain Relief Banner" className="full-banner-image" />
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="sort-dropdown-wrapper">
        <div
          className={`sort-header-dropdown ${isDropdownOpen ? "open" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Sort By:{" "}
          {currentSort === "relevance"
            ? "Relevance"
            : currentSort === "price-low-to-high"
            ? "Price: Low to High"
            : currentSort === "price-high-to-low"
            ? "Price: High to Low"
            : "Better Discount"}
          <i
            className={`fa-solid ${isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          ></i>
        </div>

        {isDropdownOpen && (
          <div className="sort-options-dropdown">
            {["relevance", "price-low-to-high", "price-high-to-low", "better-discount"].map((option) => (
              <label key={option} className="radio-option-dropdown">
                <input
                  type="radio"
                  name="sort"
                  value={option}
                  checked={currentSort === option}
                  onChange={(e) => handleSortChange(e.target.value)}
                />
                <span>
                  {option.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid (unchanged layout + CSS) */}
      <h1 className="pain-header-title">Pain Relief Medicines ({sortedProducts.length} Items)</h1>
      <div className="pain-grid">
        {sortedProducts.map((item, index) => (
          <div key={index} className="pain-card">
            <img src={item.image} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <div className="price-section">
              <span className="current-price">₹{item.price}</span>
              <span className="mrp"><del>₹{item.mrp}</del></span>
              <span className="discount">{item.discount}</span>
            </div>
            <button className="add-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Sanjeevani</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Doctor Consultation</a></li>
              <li><a href="#">Order Medicines</a></li>
              <li><a href="#">Health Programs</a></li>
            </ul>
          </div>
          <div className="footer-section footer-brand">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PainRelief;
