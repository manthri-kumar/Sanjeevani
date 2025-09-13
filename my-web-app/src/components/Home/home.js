import React from "react";
import "./home.css";
import {
  offerimg, sanjeevaniImg, bannerimg, medicineimg, Docimg, doctorimg,
  labimg, monitorimg, painimg, proteinimg, babyimg,
  ayurvedicimg, skincareimg, vitaminimg, Nutritiousimg, ambulance
} from "../../assets";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

function Home() {
  const images = [offerimg, bannerimg, sanjeevaniImg];

  return (
    <>
      {/* Image Slider */}
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt={`Slide ${idx + 1}`} style={{ width: "100%" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services row */}
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
        <div className="service-card light-pink">
          <img src={labimg} className="service-icon" alt="" />
          <div>
            <div className="service-title">Lab Tests</div>
            <div className="service-subtitle">AT HOME</div>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
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
      <h3 className="h3">Shop By Category</h3>
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

      {/* Health Banner */}
      <div className="health-banner">
        <div className="banner-content">
          <h2>Stay informed about your health at any time..</h2>
          <p>Get trusted answers directly from Sanjeevani.</p>
          <button className="book-btn">Book</button>
        </div>
        <img src={Docimg} alt="Doctor Illustration" className="banner-illustration" />
      </div>
    </>
  );
}

export default Home;
