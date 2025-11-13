import React, { useState, useMemo } from "react";
import "./BabyCare.css";
import { sanjeevaniImg, offerimg ,b1, b2, b3, b4, b5, b6, b7, b8, b9, b10} from "../../assets"; // ✅ add your logo and banner images

function BabyCare() {
  const [cart, setCart] = useState([]);
  const [currentSort, setCurrentSort] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products =  [
  { id: 1, name: "Himalaya Baby Lotion 200ml", price: "₹175", mrp: "₹199", discount: "12% off", image: b1 },
  { id: 2, name: "Sebamed Baby Cream Extra Soft 200ml", price: "₹575", mrp: "₹650", discount: "12% off", image: b2 },
  { id: 3, name: "Johnson's Baby Soap 100g (Pack of 3)", price: "₹155", mrp: "₹180", discount: "14% off", image: b3 },
  { id: 4, name: "Pampers Active Baby Diapers Large 64s", price: "₹999", mrp: "₹1199", discount: "17% off", image: b4 },
  { id: 5, name: "Mother Sparsh Natural Baby Wash 200ml", price: "₹240", mrp: "₹280", discount: "14% off", image: b5 },
  { id: 6, name: "Sebamed Baby Shampoo 150ml", price: "₹400", mrp: "₹450", discount: "11% off", image: b6 },
  { id: 7, name: "Mee Mee Nourishing Baby Oil 500ml", price: "₹360", mrp: "₹410", discount: "12% off", image: b7 },
  { id: 8, name: "Johnson's Baby Powder 200g", price: "₹165", mrp: "₹190", discount: "13% off", image: b8 },
  { id: 9, name: "Cetaphil Baby Daily Lotion 400ml", price: "₹825", mrp: "₹920", discount: "10% off", image: b9 },
  { id: 10, name: "Himalaya Gentle Baby Shampoo 400ml", price: "₹255", mrp: "₹299", discount: "15% off", image: b10 },
];


  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    alert(`${item.name} added to cart!`);
  };

  const handleSortChange = (value) => {
    setCurrentSort(value);
    setIsDropdownOpen(false);
  };

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (currentSort) {
      case "price-low-to-high": sorted.sort((a, b) => a.price - b.price); break;
      case "price-high-to-low": sorted.sort((a, b) => b.price - a.price); break;
      case "better-discount": sorted.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)); break;
      default: break;
    }
    return sorted;
  }, [currentSort]);

  return (
    <div className="baby-container">
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
        <img src={offerimg} alt="Baby Care Offers" className="full-banner-image" />
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

      {/* Product Grid (your original styling) */}
      <h1 className="baby-header-title">Baby Care Essentials ({sortedProducts.length} Items)</h1>
      <div className="baby-grid">
        {sortedProducts.map((item, index) => (
          <div key={index} className="baby-card">
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

export default BabyCare;
