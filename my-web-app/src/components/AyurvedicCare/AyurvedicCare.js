import React, { useState, useMemo } from "react";
import "./AyurvedicCare.css";
import { sanjeevaniImg, offerimg } from "../../assets"; // ✅ use your own banner and logo paths

const allProducts = [
  {
    id: 1,
    name: "Dabur Chyawanprash 1kg",
    brand: "Dabur",
    price: 349,
    mrp: 499,
    rating: 4.6,
    img: "https://images.apollo247.com/pub/media/catalog/product/d/a/dabur_chyawanprash_1kg.jpg",
  },
  {
    id: 2,
    name: "Himalaya Ashwagandha (60 Tabs)",
    brand: "Himalaya",
    price: 199,
    mrp: 230,
    rating: 4.5,
    img: "https://images.apollo247.com/pub/media/catalog/product/h/i/himalaya_ashwagandha.jpg",
  },
  {
    id: 3,
    name: "Zandu Balm (25g)",
    brand: "Zandu",
    price: 45,
    mrp: 48,
    rating: 4.4,
    img: "https://images.apollo247.com/pub/media/catalog/product/z/a/zandu_balm_25ml.jpg",
  },
  {
    id: 4,
    name: "Baidyanath Triphala Churna 100g",
    brand: "Baidyanath",
    price: 70,
    mrp: 85,
    rating: 4.3,
    img: "https://images.apollo247.com/pub/media/catalog/product/b/a/baidyanath_triphala_churna_100g.jpg",
  },
  {
    id: 5,
    name: "Patanjali Giloy Ghanvati 40 Tabs",
    brand: "Patanjali",
    price: 95,
    mrp: 120,
    rating: 4.2,
    img: "https://images.apollo247.com/pub/media/catalog/product/p/a/patanjali_giloy_ghanvati.jpg",
  },
  {
    id: 6,
    name: "Zandu Pancharishta 650ml",
    brand: "Zandu",
    price: 160,
    mrp: 195,
    rating: 4.4,
    img: "https://images.apollo247.com/pub/media/catalog/product/z/a/zandu_pancharishta_650ml.jpg",
  },
  {
    id: 7,
    name: "Himalaya Liv.52 Tablets (100 Tabs)",
    brand: "Himalaya",
    price: 155,
    mrp: 180,
    rating: 4.7,
    img: "https://images.apollo247.com/pub/media/catalog/product/h/i/himalaya_liv52_100tabs.jpg",
  },
  {
    id: 8,
    name: "Dabur Honey 500g",
    brand: "Dabur",
    price: 175,
    mrp: 199,
    rating: 4.8,
    img: "https://images.apollo247.com/pub/media/catalog/product/d/a/dabur_honey_500g.jpg",
  },
  {
    id: 9,
    name: "Patanjali Aloe Vera Gel 150ml",
    brand: "Patanjali",
    price: 95,
    mrp: 110,
    rating: 4.3,
    img: "https://images.apollo247.com/pub/media/catalog/product/p/a/patanjali_aloe_vera_gel_150ml.jpg",
  },
  {
    id: 10,
    name: "Baidyanath Kesari Kalp Royal Chyawanprash 1kg",
    brand: "Baidyanath",
    price: 425,
    mrp: 520,
    rating: 4.5,
    img: "https://images.apollo247.com/pub/media/catalog/product/b/a/baidyanath_kesari_kalp_1kg.jpg",
  },
  
];


export default function AyurvedicCare() {
  const [cart, setCart] = useState([]);
  const [currentSort, setCurrentSort] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    alert(`${item.name} added to cart!`);
  };

  const handleSortChange = (value) => {
    setCurrentSort(value);
    setIsDropdownOpen(false);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
    switch (currentSort) {
      case "price-low-to-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "better-discount":
        sorted.sort((a, b) => (b.mrp - b.price) - (a.mrp - a.price));
        break;
      default:
        break;
    }
    return sorted;
  }, [currentSort]);

  return (
    <div className="ayurvedic-page">
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
        <img src={offerimg} alt="Ayurvedic Offers" className="full-banner-image" />
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

      {/* Ayurvedic Section */}
      <h2 className="ayur-title">Ayurvedic Medicines ({sortedProducts.length} Items)</h2>
      <p className="ayur-subtext">
        Trusted classical Ayurvedic products for wellness, immunity, hair care, pain relief, and more.
      </p>

      <div className="ayur-grid">
        {sortedProducts.map((item) => (
          <div className="ayur-card" key={item.id}>
            <img src={item.img} alt={item.name} className="ayur-img" />
            <h3 className="ayur-name">{item.name}</h3>
            <p className="ayur-brand">{item.brand}</p>
            <p className="ayur-price">
              ₹{item.price}{" "}
              <span className="ayur-mrp">
                <del>₹{item.mrp}</del>
              </span>
            </p>
            <p className="ayur-rating">★ {item.rating}</p>
            <button className="ayur-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
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
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Doctor Consultation</a></li>
              <li><a href="#">Health Programs</a></li>
              <li><a href="#">Medicines Online</a></li>
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
