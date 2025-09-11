import React, { useState } from "react";
import { sanjeevaniImg } from "./assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./healthmonitor.css";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);

  // Products array
  const products = [
    { id: 1, price: 719.1, mrp: 799, discount: "10% off" },
    { id: 2, price: 719.1, mrp: 799, discount: "10% off" },
    { id: 3, price: 990.0, mrp: 1100, discount: "10% off" },
    { id: 4, price: 1619.1, mrp: 1799, discount: "10% off" },
  ];

  // Swiper images
  const images = [sanjeevaniImg, sanjeevaniImg, sanjeevaniImg]; // replace with different banner images

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Product has been added to the cart!");
  };

  const cartCount = cart.length;

  return (
    <div className={showLogin ? "blur-bg" : ""}>
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

      {/* Swiper Slider */}
      

      {/* Product Section */}
      <section className="product-display">
        <div className="product-sort-container">
          <span className="sort-label">Sort By:</span>
          <select className="sort-dropdown">
            <option value="relevance">Relevance</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
        

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="price-details">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                <span className="mrp-price">
                  MRP <del>₹{product.mrp.toFixed(2)}</del>
                </span>
                <span className="discount">{product.discount}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add
              </button>
            </div>
            
            
          ))}
        </div>
      </section>
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
            </SwiperSlide>
          ))}
        </Swiper>
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
            <ul>
              <li><a href="#">Book Lab Tests at Home</a></li>
            </ul>
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
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer-logo" />
            <h4>A MANTHRI Enterprise</h4>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
