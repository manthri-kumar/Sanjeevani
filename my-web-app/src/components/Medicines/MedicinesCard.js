import React from "react";
import "./MedicinesCard.css";

function MedicineCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="product-desc">{product.description}</p>
        <span className="product-category">{product.category}</span>
      </div>
      <div className="price-details">
        <span className="current-price">₹{product.price.toFixed(2)}</span>
        <span className="mrp-price">
          MRP <del>₹{product.mrp.toFixed(2)}</del>
        </span>
        <span className="discount">{product.discount}</span>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        Add
      </button>
    </div>
  );
}

export default MedicineCard;
