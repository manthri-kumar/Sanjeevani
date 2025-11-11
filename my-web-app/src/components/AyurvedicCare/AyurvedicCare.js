import React, { useState } from "react";
import "./AyurvedicCare.css";

const products = [
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
];

export default function AyurvedicCare() {
  return (
    <div className="ayurvedic-page">
      <h2 className="ayur-title">Ayurvedic Medicines</h2>
      <p className="ayur-subtext">
        Trusted classical Ayurvedic products for wellness, immunity, hair care, pain relief, and more.
      </p>

      <div className="ayur-grid">
        {products.map((item) => (
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

            <button className="ayur-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
