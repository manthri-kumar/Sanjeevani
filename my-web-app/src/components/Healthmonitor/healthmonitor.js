import React, { useState } from "react";
import { sanjeevaniImg } from "../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./healthmonitor.css";

function Healthmonitor() {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, price: 719.1, mrp: 799, discount: "10% off" },
    { id: 2, price: 719.1, mrp: 799, discount: "10% off" },
    { id: 3, price: 990.0, mrp: 1100, discount: "10% off" },
    { id: 4, price: 1619.1, mrp: 1799, discount: "10% off" },
  ];

  const images = [sanjeevaniImg, sanjeevaniImg, sanjeevaniImg];

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert("Product has been added to the cart!");
  };

  const cartCount = cart.length;

  return (
    <div>
      {/* Header and Navigation can be imported or created similar to Navbar */}

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
    </div>
  );
}

export default Healthmonitor;
