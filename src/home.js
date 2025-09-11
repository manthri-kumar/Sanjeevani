import React from "react";
import "./home.css";
import { offerimg, sanjeevaniImg,bannerimg,medicineimg,doctorimg,labimg,healthimg,monitorimg,painimg,proteinimg,babyimg,ayurvedicimg,skincareimg,vitaminimg,Nutritiousimg} from "./assets";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";  

function Home() {
  const images = [offerimg, bannerimg, sanjeevaniImg];

  return (
    <>
      <div>
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

          <div className="menu-icon">
            <i className="fas fa-bars"></i>
          </div>
        </header>

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
      </div>

      {/* services row */}
      <div className="service-row">
        <div className="service-card light-green">
          <img src={medicineimg} className="service-icon" alt="" />
          <div>
            <div className="service-title">Buy Medicines & Essentials</div>
            <div className="service-subtitle">2HRS DELIVERY</div>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

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

        <div className="service-card light-salmon">
          <img src={healthimg} className="service-icon" alt="" />
          <div>
            <div className="service-title">Health Insurance</div>
            <div className="service-subtitle">EXPLORE PLANS</div>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      {/* categories */}
      <h3 className="h3">Shop By Category </h3>

      <div className="category-grid">
        <div className="category-card">
          <img src={monitorimg} alt="Health Monitors" />
          <p>Health Monitors</p>
        </div>

        <div className="category-card">
          <img src={ayurvedicimg} alt="Ayurvedic Diabetes Care" />
          <p>Ayurvedic Diabetes Care</p>
        </div>

        <div className="category-card">
          <img src={painimg} alt="Pain Relief" />
          <p>Pain Relief</p>
        </div>

        <div className="category-card">
          <img src={babyimg} alt="Baby Care" />
          <p>Baby Care</p>
        </div>
      </div>

      <div className="category-grid">
        <div className="category-card">
          <img src={proteinimg} alt="Health Monitors" />
          <p>protein</p>
        </div>

        <div className="category-card">
          <img src={skincareimg} alt="Ayurvedic Diabetes Care" />
          <p>Skin Care</p>
        </div>

        <div className="category-card">
          <img src={vitaminimg} alt="Pain Relief" />
          <p>vitamin</p>
        </div>

        <div className="category-card">
          <img src={Nutritiousimg} alt="Baby Care" />
          <p>Nutritious Drinks</p>
        </div>
      </div>
    </>
  );
}

export default Home;
