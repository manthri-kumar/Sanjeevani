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
  { id: 11, name: "Vicks VapoRub 50ml", price: "₹120", mrp: "₹135", discount: "11% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00958/vicks-vaporub-50ml-1-1669650611.jpg" },
  { id: 12, name: "Becosules Capsule (Pain & Fatigue Relief) 20s", price: "₹48", mrp: "₹55", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00950/becosules-capsule-20s-1-1669650609.jpg" },
  { id: 13, name: "Move Fast Spray 50ml", price: "₹95", mrp: "₹110", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07560/move-fast-pain-relief-spray-50ml-1-1671740571.jpg" },
  { id: 14, name: "Volini Maxx Spray 100g", price: "₹240", mrp: "₹275", discount: "13% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00947/volini-maxx-pain-relief-spray-100g-1-1669650638.jpg" },
  { id: 15, name: "Moov 50g Cream Tube", price: "₹135", mrp: "₹150", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00948/moov-cream-50g-1-1669650643.jpg" },
  { id: 16, name: "Amrutanjan Roll-On 10ml", price: "₹75", mrp: "₹85", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00953/amrutanjan-roll-on-10ml-1-1669650565.jpg" },
  { id: 17, name: "Himalaya Rumalaya Gel 30g", price: "₹125", mrp: "₹145", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07208/himalaya-rumalaya-gel-30g-1-1669650619.jpg" },
  { id: 18, name: "Zandu Ortho Vedic Oil 100ml", price: "₹190", mrp: "₹225", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00954/zandu-ortho-vedic-oil-100ml-1-1669650617.jpg" },
  { id: 19, name: "Tiger Balm Red 21ml", price: "₹115", mrp: "₹130", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00955/tiger-balm-red-21ml-1-1669650610.jpg" },
  { id: 20, name: "Iodex Ultra Pain Relief Spray 100g", price: "₹180", mrp: "₹210", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00944/iodex-ultra-pain-relief-spray-100g-1-1669650645.jpg" },
  { id: 21, name: "Volini Gel 30g Tube", price: "₹90", mrp: "₹105", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00946/volini-gel-30g-1-1669650641.jpg" },
  { id: 22, name: "Amrutanjan Back Pain Roll-On 50ml", price: "₹135", mrp: "₹160", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00942/amrutanjan-back-pain-roll-on-50ml-1-1669650646.jpg" },
  { id: 23, name: "Zandu Rhuma Oil 100ml", price: "₹155", mrp: "₹180", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00956/zandu-rhuma-oil-100ml-1-1669650614.jpg" },
  { id: 24, name: "Fast Relief Spray 100g", price: "₹160", mrp: "₹185", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00957/fast-relief-spray-100g-1-1669650613.jpg" },
  { id: 25, name: "Baidyanath Rheumartho Gold 10 Caps", price: "₹210", mrp: "₹240", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07470/baidyanath-rheumartho-gold-10caps-1-1681120352.jpg" },
  { id: 26, name: "Himalaya Shallaki Tablets (60 Tabs)", price: "₹180", mrp: "₹210", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I07472/himalaya-shallaki-tablets-60s-1-1671740590.jpg" },
  { id: 27, name: "Volini Roll On 50ml", price: "₹140", mrp: "₹165", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00941/volini-roll-on-50ml-1-1669650647.jpg" },
  { id: 28, name: "Dabur Rheumatil Gel 30g", price: "₹110", mrp: "₹130", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00959/dabur-rheumatil-gel-30g-1-1669650612.jpg" },
  { id: 29, name: "Zandu Fast Relief Balm 45ml", price: "₹125", mrp: "₹145", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00960/zandu-fast-relief-balm-45ml-1-1669650608.jpg" },
  { id: 30, name: "Vicks Inhaler Twin Pack", price: "₹85", mrp: "₹95", discount: "10% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00961/vicks-inhaler-twin-pack-1-1669650607.jpg" },
  { id: 31, name: "Pain Relief Patch 10s", price: "₹180", mrp: "₹220", discount: "18% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/D12547/pain-relief-patch-10s-1-1671775327.jpg" },
  { id: 32, name: "Zandu Arthrella Oil 100ml", price: "₹155", mrp: "₹180", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00962/zandu-arthrella-oil-100ml-1-1669650606.jpg" },
  { id: 33, name: "Omnigel Spray 100g", price: "₹175", mrp: "₹199", discount: "12% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00963/omnigel-spray-100g-1-1669650605.jpg" },
  { id: 34, name: "Dabur Mahavishgarbha Oil 100ml", price: "₹155", mrp: "₹180", discount: "14% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00964/dabur-mahavishgarbha-oil-100ml-1-1669650604.jpg" },
  { id: 35, name: "Himalaya Rumalaya Forte 30 Tabs", price: "₹140", mrp: "₹165", discount: "15% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00965/himalaya-rumalaya-forte-30tabs-1-1669650603.jpg" },
  { id: 36, name: "Zandu Fast Relief Gel 75g", price: "₹150", mrp: "₹180", discount: "17% off", image: "https://cdn01.pharmeasy.in/dam/products_otc/I00966/zandu-fast-relief-gel-75g-1-1669650602.jpg" },
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
