import React, { useState, useEffect } from "react";
import "./home.css";
import {
  offerimg, sanjeevaniImg, bannerimg, medicineimg, Docimg, doctorimg,
  labimg, healthimg, monitorimg, painimg, proteinimg, babyimg,
  ayurvedicimg, skincareimg, vitaminimg, Nutritiousimg, ambulance, bloodbank,LaShield,Minimalist,Neutrogena,Ordinary,Avene,carave,himalaya,johnson,pampers,
        mamaearth,sebamed,dermadew,huggies
} from "../../assets";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// --- CeraVe Product Data ---
const ceraveProducts = [
  { id: 1, name: "CeraVe Moisturising Lotion 473 ml", price: 1575, mrp: 1750, discount: "10% off", image: carave,stseller: true, offer: "Buy 1 Get 1" },
  { id: 2, name: "Neutrogena Deep Clean Foaming Cleanser 200 ml", price: 599, mrp: 700, discount: "14% off", image: Neutrogena, isBestseller: true, offer: null },
  { id: 3, name: "Cetaphil Moisturising Cream 250 gm", price: 890, mrp: 999, discount: "11% off", image: skincareimg, isBestseller: false, offer: "Flat ₹100 Cashback" },
  { id: 4, name: "La Shield Sunscreen Gel SPF 40, 50 g", price: 730, mrp: 820, discount: "11% off", image: LaShield, isBestseller: true, offer: null },
  { id: 5, name: "Minimalist 10% Niacinamide Serum 30 ml", price: 595, mrp: 650, discount: "8% off", image: Minimalist, isBestseller: true, offer: "Buy 2 Save 10%" },
  { id: 6, name: "The Ordinary Hyaluronic Acid 2% + B5 Serum 30 ml", price: 1200, mrp: 1400, discount: "14% off", image: Ordinary, isBestseller: false, offer: null },
  { id: 7, name: "Avene Cleanance Cleansing Gel 200 ml", price: 1450, mrp: 1600, discount: "9% off", image: Avene, isBestseller: true, offer: "Buy 1 Get 1 Free" }
];

// --- Baby Care Products ---
const babyCareProducts = [
  { id: 101, name: "Himalaya Gentle Baby Shampoo 200ml", price: 180, mrp: 200, discount: "10% off", image: himalaya, isBestseller: true, offer: null },
  { id: 102, name: "Johnson's Baby Powder 100g", price: 120, mrp: 120, discount: "0% off", image: johnson, isBestseller: false, offer: null },
  { id: 103, name: "Pampers Active Baby Diapers (M, 56 Pcs)", price: 899, mrp: 999, discount: "10% off", image: pampers, isBestseller: true, offer: "Buy 2 Save 10%" },
  { id: 104, name: "Mamaearth Moisturizing Baby Bathing Soap", price: 299, mrp: 350, discount: "15% off", image: mamaearth, isBestseller: false, offer: null },
  { id: 105, name: "Sebamed Baby Lotion 200ml", price: 540, mrp: 600, discount: "10% off", image: sebamed, isBestseller: false, offer: null },
  { id: 106, name: "Dermadew Baby Soap 75g", price: 150, mrp: 175, discount: "14% off", image: dermadew, isBestseller: false, offer: null },
  { id: 107, name: "Huggies Wonder Pants Diapers (L, 44 Pcs)", price: 580, mrp: 700, discount: "17% off", image: huggies, isBestseller: true, offer: null },
];

function Home() {
  const images = [offerimg, bannerimg, sanjeevaniImg];
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Force Login Modal on Page Load
  // ✅ Only check login state, don't show modal automatically
 useEffect(() => {
  const loggedIn = sessionStorage.getItem("isLoggedIn");
  setIsLoggedIn(loggedIn === "true");

  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  setCartItems(savedCart);
  setCartCount(savedCart.reduce((total, item) => total + item.qty, 0));

  // ✅ Listen for global cart updates
  const syncCart = () => {
    const updated = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(updated);
    setCartCount(updated.reduce((t, i) => t + i.qty, 0));
  };

  window.addEventListener("cartUpdated", syncCart);
  window.addEventListener("storage", syncCart);

  return () => {
    window.removeEventListener("cartUpdated", syncCart);
    window.removeEventListener("storage", syncCart);
  };
}, []);


  // ✅ Save cart to sessionStorage when updated
  // ✅ Load and keep cart synced even when navigating back
  // ✅ Load and sync cart (only after login)
  useEffect(() => {
  const loadCart = () => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const email = user?.email || "";
      const savedCart = JSON.parse(localStorage.getItem(`cartItems_${email}`)) || [];
      setCartItems(savedCart);
      setCartCount(savedCart.reduce((total, item) => total + item.qty, 0));
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  loadCart();

  window.addEventListener("cartUpdated", loadCart);
  window.addEventListener("storage", loadCart);

  return () => {
    window.removeEventListener("cartUpdated", loadCart);
    window.removeEventListener("storage", loadCart);
  };
}, []);


  // ✅ Logout
const handleLogout = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user?.email || "";
  if (email) localStorage.removeItem(`cartItems_${email}`);

  sessionStorage.clear();
  setIsLoggedIn(false);
  setCartItems([]);
  setCartCount(0);
  window.dispatchEvent(new Event("cartUpdated"));
  setShowLogin(true);
};


  // ✅ Login with backend
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again later.");
    }
  };
  useEffect(() => {
  const handleOpenLogin = () => {
    const shouldOpen = sessionStorage.getItem("triggerLogin") === "true";
    if (shouldOpen) {
      setShowLogin(true);
      sessionStorage.removeItem("triggerLogin");
    }
  };

  window.addEventListener("openLoginModal", handleOpenLogin);
  handleOpenLogin(); // Check immediately on load

  return () => {
    window.removeEventListener("openLoginModal", handleOpenLogin);
  };
}, []);


  // ✅ Signup with backend
  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup successful! Please log in.");
        setLoginStep(1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Try again later.");
    }
  };

  // ✅ Add to Cart
  // ✅ Common Add to Cart Function (works for all product buttons)
// ✅ Add to Cart (Unified with Cart.js)
const handleAddToCart = (product) => {
  if (!isLoggedIn) {
    alert("Please log in to add items to your cart!");
    setShowLogin(true);
    return;
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = user?.email || "";
  const cartKey = `cartItems_${email}`;

  const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const existing = savedCart.find((item) => item.id === product.id);
  let updatedCart;

  if (existing) {
    updatedCart = savedCart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  } else {
    updatedCart = [...savedCart, { ...product, qty: 1 }];
  }

  localStorage.setItem(cartKey, JSON.stringify(updatedCart));

  const newCount = updatedCart.reduce((t, i) => t + i.qty, 0);
  setCartCount(newCount);

  window.dispatchEvent(new Event("cartUpdated"));
  alert(`${product.name} added to cart!`);
};


  const swiperNav = {
    nextEl: ".swiper-button-next-cerave",
    prevEl: ".swiper-button-prev-cerave",
  };


  return (
    <>
      <div className={showLogin ? "blur-bg no-interaction" : ""}>
        {/* Header */}
        <header className="header">
          <div className="logo">
            <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
          </div>
          <nav className="nav-links">
            <a href="/doctor">DOCTORS</a>
            <a href="#">HOSPITALS</a>
            <a href="/Medicines">MEDICINES</a>
            <a href="/Profile">PROFILE</a>
          </nav>
          <div className="search">
            <div className="search-box">
              <input type="text" placeholder="Search" />
              <button><i className="fas fa-magnifying-glass"></i></button>
            </div>
          </div>

         <div className="cart">
  <button onClick={() => navigate("/cart")}>   {/* ✅ navigate to /cart */}
    <i className="fa-solid fa-cart-shopping"></i>
    <span className="cart-count">{cartCount}</span>
  </button>
</div>
          {isLoggedIn ? (
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login / Sign Up</button>
          )}
        </header>

        {/* Image Slider */}
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

        {/* Service Row */}
        <div className="service-row">
          <Link to="/medicines" className="service-card light-green">
            <img src={medicineimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Buy Medicines & Essentials</div>
              <div className="service-subtitle">2HRS DELIVERY</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <Link to="/doctorappointment" className="service-card light-yellow">
            <img src={doctorimg} className="service-icon" alt="" />
            <div>
              <div className="service-title">Doctor Appointment</div>
              <div className="service-subtitle">BOOK NOW</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <Link to="/bloodbank" className="service-card light-pink">
            <img src={bloodbank} className="service-icon" alt="Blood Bank" />
            <div>
              <div className="service-title">Blood Banks</div>
              <div className="service-subtitle">Search for Blood Banks</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <Link to="/ambulance" className="service-card light-salmon">
            <img src={ambulance} className="service-icon" alt="" />
            <div>
              <div className="service-title">Book Ambulance</div>
              <div className="service-subtitle">Nearest to your location</div>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>

        {/* Categories */}
        <h2 className="Categories-h3">Shop By Category</h2>
        <div className="category-grid">
          <Link to="/healthmonitor" className="category-card service-card light-green">
            <img src={monitorimg} alt="Health Monitors" />
            <p>Health Monitors</p>
          </Link>
          <div className="category-card"><img src={ayurvedicimg} alt="Ayurvedic" /><p>Ayurvedic Diabetes Care</p></div>
          <div className="category-card"><img src={painimg} alt="Pain Relief" /><p>Pain Relief</p></div>
          <div className="category-card"><img src={babyimg} alt="Baby Care" /><p>Baby Care</p></div>
        </div>

        {/* Health Banner */}
        <div className="health-banner">
          <div className="banner-content">
            <h2>Stay informed about your health at any time..</h2>
            <p>Get trusted answers directly from Sanjeevani.</p>
            <button className="booking-btn">Book</button>
          </div>
          <img src={Docimg} alt="Doctor Illustration" className="banner-illustration" />
        </div>

        {/* CeraVe Carousel */}
        <section className="product-carousel-section">
          <div className="carousel-header">
            <h2 className="carousel-title">Best of Skincare</h2>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="carousel-wrapper">
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={6}
              navigation={swiperNav}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 15 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1200: { slidesPerView: 6, spaceBetween: 20 },
              }}
              className="cerave-swiper"
            >
              {ceraveProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="carousel-product-card">
                    <div className="card-top-badges">
                      {product.offer && <span className="buy-get-badge">{product.offer}</span>}
                      {product.isBestseller && <span className="bestseller-badge">Bestseller</span>}
                    </div>
                    <div className="product-image-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <p className="carousel-product-name">{product.name}</p>
                    <div className="price-details-row">
                      <span className="current-price">₹{product.price.toFixed(0)}</span>
                      <span className="mrp-price">MRP <del>₹{product.mrp.toFixed(0)}</del></span>
                      <span className="discount-percent">{product.discount}</span>
                    </div>
                    <button className="add-to-cart-btn-carousel" onClick={() => handleAddToCart(product)}
>ADD</button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev-cerave"><i className="fas fa-chevron-left"></i></div>
            <div className="swiper-button-next-cerave"><i className="fas fa-chevron-right"></i></div>
          </div>
        </section>

        {/* Baby Care Carousel */}
        <section className="product-carousel-section">
          <div className="carousel-header">
            <h2 className="carousel-title">Best of Baby Care</h2>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="carousel-wrapper">
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={6}
              navigation={{
                prevEl: ".swiper-button-prev-babycare",
                nextEl: ".swiper-button-next-babycare",
              }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 15 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1200: { slidesPerView: 6, spaceBetween: 20 },
              }}
              className="babycare-swiper"
            >
              {babyCareProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="carousel-product-card">
                    <div className="card-top-badges">
                      {product.offer && <span className="buy-get-badge">{product.offer}</span>}
                      {product.isBestseller && <span className="bestseller-badge">Bestseller</span>}
                    </div>
                    <div className="product-image-box">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <p className="carousel-product-name">{product.name}</p>
                    <div className="price-details-row">
                      <span className="current-price">₹{product.price.toFixed(0)}</span>
                      <span className="mrp-price">MRP <del>₹{product.mrp.toFixed(0)}</del></span>
                      <span className="discount-percent">{product.discount}</span>
                    </div>
                    <button className="add-to-cart-btn-carousel" onClick={() => handleAddToCart(product)}
>ADD</button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev-babycare"><i className="fas fa-chevron-left"></i></div>
            <div className="swiper-button-next-babycare"><i className="fas fa-chevron-right"></i></div>
          </div>
        </section>

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
            <div className="footer-section footer-brand">
              <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer-logo" />
              <h4>A MANTHRI Enterprise</h4>
            </div>
          </div>
        </footer>
      </div>

      {/* 🔐 Login/Signup Modal */}
     {showLogin && !isLoggedIn && (
  <>
    {/* Dark overlay behind modal */}
    <div className="overlay" onClick={() => setShowLogin(false)}></div>

    {/* Login / Signup Modal Card */}
    <div className="login-card">
      {/* Close Button */}
      <span className="close-btn" onClick={() => setShowLogin(false)}>&times;</span>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={loginStep === 1 ? "active" : ""}
          onClick={() => setLoginStep(1)}
        >
          Log In
        </button>
        <button
          className={loginStep === 2 ? "active" : ""}
          onClick={() => setLoginStep(2)}
        >
          Sign Up
        </button>
      </div>

      {/* --- LOGIN FORM --- */}
      {loginStep === 1 && (
        <form autoComplete="off" onSubmit={handleLogin}>
          <label>Email</label>
          <div className="input-container">
            <i className="fa-solid fa-envelope icon"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Password</label>
          <div className="input-container">
            <i className="fa-solid fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              defaultValue=""
              required
            />
          </div>

          <button type="submit" className="primary-btn">Log In</button>
        </form>
      )}

      {/* --- SIGNUP FORM --- */}
      {loginStep === 2 && (
        <form autoComplete="off" onSubmit={handleSignup}>
          <label>Username</label>
          <div className="input-container">
            <i className="fa-solid fa-user icon"></i>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Email</label>
          <div className="input-container">
            <i className="fa-solid fa-envelope icon"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              defaultValue=""
              required
            />
          </div>

          <label>Password</label>
          <div className="input-container">
            <i className="fa-solid fa-lock icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              defaultValue=""
              required
            />
          </div>

          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
      )}

      {/* Google Login Button */}
      <button className="google-btn">
        <i className="fa-brands fa-google"></i> Sign in with Google
      </button>
    </div>
  </>
)}

    </>
  );
}

export default Home;