import React, { useState, useEffect } from "react";
import "./home.css";
import {
  offerimg, sanjeevaniImg, bannerimg, medicineimg, Docimg, doctorimg,
  labimg, healthimg, monitorimg, painimg, proteinimg, babyimg,
  ayurvedicimg, skincareimg, vitaminimg, Nutritiousimg, ambulance,bloodbank
} from "../../assets";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";


// --- NEW CeraVe PRODUCT DATA ---
// NOTE: Using a placeholder image for all CeraVe products since individual images aren't available.
const ceraveProducts = [
    { id: 1, name: "CeraVe Moisturising Lotion 473 ml", price: 1575, mrp: 1750, discount: "10% off", image: skincareimg, isBestseller: false, offer: "Buy 1 Get 1" },
    { id: 2, name: "CeraVe Foaming Cleanser 473 ml | Ceramides &...", price: 1369.50, mrp: 1650, discount: "17% off", image: skincareimg, isBestseller: true, offer: null },
    { id: 3, name: "CeraVe Moisturising Cream 454 gm | Ceramides &...", price: 1710, mrp: 1900, discount: "10% off", image: skincareimg, isBestseller: false, offer: null },
    { id: 4, name: "CeraVe Hydrating Cleanser 236 ml | Ceramides &...", price: 657, mrp: 730, discount: "10% off", image: skincareimg, isBestseller: false, offer: null },
    { id: 5, name: "CeraVe Hydrating Cleanser 473 ml | Ceramides &...", price: 945, mrp: 999, discount: "10% off", image: skincareimg, isBestseller: false, offer: null },
    { id: 6, name: "CeraVe PM Facial Moisturising Lotion 52 ml", price: 1080, mrp: 1350, discount: "20% off", image: skincareimg, isBestseller: false, offer: null },
    { id: 7, name: "CeraVe Resurfacing Retinol Serum", price: 1200, mrp: 1500, discount: "20% off", image: skincareimg, isBestseller: false, offer: "Buy 1 Get 1" },
];

// Baby Care Products (NEW DATA)
const babyCareProducts = [
    { id: 101, name: "Himalaya Gentle Baby Shampoo 200ml", price: 180, mrp: 200, discount: "10% off", image: babyimg, isBestseller: true, offer: null },
    { id: 102, name: "Johnson's Baby Powder 100g", price: 120, mrp: 120, discount: "0% off", image: babyimg, isBestseller: false, offer: null },
    { id: 103, name: "Pampers Active Baby Diapers (M, 56 Pcs)", price: 899, mrp: 999, discount: "10% off", image: babyimg, isBestseller: true, offer: "Buy 2 Save 10%" },
    { id: 104, name: "Mamaearth Moisturizing Baby Bathing Soap", price: 299, mrp: 350, discount: "15% off", image: babyimg, isBestseller: false, offer: null },
    { id: 105, name: "Sebamed Baby Lotion 200ml", price: 540, mrp: 600, discount: "10% off", image: babyimg, isBestseller: false, offer: null },
    { id: 106, name: "Dermadew Baby Soap 75g", price: 150, mrp: 175, discount: "14% off", image: babyimg, isBestseller: false, offer: null },
    { id: 107, name: "Huggies Wonder Pants Diapers (L, 44 Pcs)", price: 580, mrp: 700, discount: "17% off", image: babyimg, isBestseller: true, offer: null },
];

function Home() {
    const images = [offerimg, bannerimg, sanjeevaniImg];

    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginStep, setLoginStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showResend, setShowResend] = useState(false);
    const [timer, setTimer] = useState(60);
    const [cartCount, setCartCount] = useState(0);

    // ... (Your useEffects for login and timer remain here)

    // Fix 1: Ensure login state is reset properly on first load
    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        } else {
            localStorage.setItem("isLoggedIn", "false");
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        let interval = null;
        if (loginStep === 2 || loginStep === 3 && timer > 0) { // Keep timer active for step 3 too
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setShowResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [loginStep, timer]);

    const sendOtp = async () => {
        // ... (Your sendOtp logic remains here)
    };

    const verifyOtp = async () => {
        // ... (Your verifyOtp logic remains here)
    };

    const handleResendOtp = () => {
        sendOtp();
    };
    
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const handleAddToCart = (productName) => {
        // Simple placeholder for cart logic
        console.log(`Added ${productName} to cart`);
        setCartCount(prev => prev + 1);
    }

    // New Swiper Navigation buttons for the carousel
    const swiperNav = {
        nextEl: '.swiper-button-next-cerave',
        prevEl: '.swiper-button-prev-cerave',
    };


    return (
        <>
            <div className={showLogin ? "blur-bg" : ""}>
                {/* Header content ... */}
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

                    {isLoggedIn ? (
                        <button className="login-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className="login-btn" onClick={() => setShowLogin(true)}>
                            Login / Sign Up
                        </button>
                    )}
                </header>

                {/* Image Slider content ... */}
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

                {/* Services row content ... */}
                {/* ... (Your service row JSX remains here) ... */}

                <div className="service-row">
                    <Link to="/medicines" className="service-card light-green">
                        <img src={medicineimg} className="service-icon" alt="" />
                        <div>
                            <div className="service-title">Buy Medicines & Essentials</div>
                            <div className="service-subtitle">2HRS DELIVERY</div>
                        </div>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>

                    
                    <div className="service-card light-yellow">
                        <img src={doctorimg} className="service-icon" alt="" />
                        <div>
                            <div className="service-title">Doctor Appointment</div>
                            <div className="service-subtitle">BOOK NOW</div>
                        </div>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                    
                    <Link to="/bloodbank" className="service-link">
                        <div className="service-card light-pink">
                            <img src={bloodbank} className="service-icon" alt="Blood Bank" />
                        <div>
                        <div className="service-title">Blood Banks</div>
                                <div className="service-subtitle">Search for Blood Banks</div>
                        </div>
                                <i className="fa-solid fa-chevron-right"></i>
                        </div>
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

                {/* Categories content ... */}
                {/* ... (Your category grid JSX remains here) ... */}
                <h2 className="Categories-h3">Shop By Category </h2>
                <div className="category-grid">
                    <Link to="/healthmonitor" className="category-card service-card light-green">
                        <img src={monitorimg} alt="Health Monitors" />
                        <p>Health Monitors</p>
                    </Link>
                    <div className="category-card"><img src={ayurvedicimg} alt="Ayurvedic Diabetes Care" /><p>Ayurvedic Diabetes Care</p></div>
                    <div className="category-card"><img src={painimg} alt="Pain Relief" /><p>Pain Relief</p></div>
                    <div className="category-card"><img src={babyimg} alt="Baby Care" /><p>Baby Care</p></div>
                </div>
                <div className="category-grid">
                    <div className="category-card"><img src={proteinimg} alt="Protein" /><p>Protein</p></div>
                    <div className="category-card"><img src={skincareimg} alt="Skin Care" /><p>Skin Care</p></div>
                    <div className="category-card"><img src={vitaminimg} alt="Vitamin" /><p>Vitamin</p></div>
                    <div className="category-card"><img src={Nutritiousimg} alt="Nutritious Drinks" /><p>Nutritious Drinks</p></div>
                </div>


                {/* Health Banner content ... */}
                <div className="health-banner">
                    <div className="banner-content">
                        <h2>Stay informed about your health at any time..</h2>
                        <p>Get trusted answers directly from Sanjeevani.</p>
                        <button className="booking-btn">Book</button>
                    </div>
                    <img src={Docimg} alt="Doctor Illustration" className="banner-illustration" />
                </div>


                {/* --------------------------------- NEW: CeraVe Product Carousel --------------------------------- */}
                <section className="product-carousel-section">
                    <div className="carousel-header">
                        <h2 className="carousel-title">Best of Skincare</h2>
                        <a href="#" className="view-all-link">View All</a>
                    </div>
                    <div className="carousel-wrapper">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={15}
                            slidesPerView={6} // Show 6 cards at once
                            navigation={swiperNav} // Use custom nav buttons
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
                                        <button className="add-to-cart-btn-carousel" onClick={() => handleAddToCart(product.name)}>
                                            ADD
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Custom Navigation Buttons (Invisible by default, appear on hover/swipe) */}
                        <div className="swiper-button-prev-cerave"><i className="fas fa-chevron-left"></i></div>
                        <div className="swiper-button-next-cerave"><i className="fas fa-chevron-right"></i></div>
                    </div>
                </section>
                {/* --------------------------------- END: CeraVe Product Carousel --------------------------------- */}


                {/* --------------------------------- NEW: Baby Care Product Carousel --------------------------------- */}
<section className="product-carousel-section">
    <div className="carousel-header">
        <h2 className="carousel-title">Best of Baby Care</h2> {/* Updated Title */}
        <a href="#" className="view-all-link">View All</a>
    </div>
    <div className="carousel-wrapper">
        <Swiper
            modules={[Navigation]}
            spaceBetween={15}
            slidesPerView={6} // Show 6 cards at once
            navigation={{
                prevEl: '.swiper-button-prev-babycare', // Custom prev button
                nextEl: '.swiper-button-next-babycare', // Custom next button
            }}
            breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 15 },
                1024: { slidesPerView: 5, spaceBetween: 20 },
                1200: { slidesPerView: 6, spaceBetween: 20 },
            }}
            className="babycare-swiper"
        >
            {/* Using the new babyCareProducts data array */}
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
                        <button className="add-to-cart-btn-carousel" onClick={() => handleAddToCart(product.name)}>
                            ADD
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        {/* Custom Navigation Buttons (Updated class names for baby care) */}
        <div className="swiper-button-prev-babycare"><i className="fas fa-chevron-left"></i></div>
        <div className="swiper-button-next-babycare"><i className="fas fa-chevron-right"></i></div>
    </div>
</section>
{/* --------------------------------- END: Baby Care Product Carousel --------------------------------- */}


                {/* Footer content ... */}
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

            {/* Login/Signup Slider kept outside blur */}
            {/* ... (Your login modal JSX remains here) ... */}
           {showLogin && !isLoggedIn && (
        <>
          <div className="overlay" onClick={() => setShowLogin(false)}></div>
          <div className="login-card">
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              &times;
            </span>

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

            {/* Log In Form */}
            {loginStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Login successful!");
                  localStorage.setItem("isLoggedIn", "true");
                  setIsLoggedIn(true);
                  setShowLogin(false);
                }}
              >
                <label>Email</label>
                <div className="input-container">
                  <i className="fa-solid fa-envelope icon"></i>
                  <input type="email" placeholder="Enter your E-mail" required />
                </div>

                <label>Password</label>
                <div className="input-container">
                  <i className="fa-solid fa-lock icon"></i>
                  <input type="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" className="primary-btn">Log In</button>
              </form>
            )}

            {/* Sign Up Form */}
            {loginStep === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Signup successful!");
                  setLoginStep(1);
                }}
              >
                <label>Username</label>
                <div className="input-container">
                  <i className="fa-solid fa-user icon"></i>
                  <input type="text" placeholder="Enter your username" required />
                </div>

                <label>Email</label>
                <div className="input-container">
                  <i className="fa-solid fa-envelope icon"></i>
                  <input type="email" placeholder="Enter your E-mail" required />
                </div>

                <label>Password</label>
                <div className="input-container">
                  <i className="fa-solid fa-lock icon"></i>
                  <input type="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" className="primary-btn">Sign Up</button>
              </form>
            )}

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