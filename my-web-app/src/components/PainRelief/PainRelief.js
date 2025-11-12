import React from "react";
import "./PainRelief.css";
import { Link } from "react-router-dom";

function PainRelief() {
  const products = [
    {
      name: "Moov Pain Relief Spray 80g",
      price: "₹170",
      mrp: "₹190",
      discount: "10% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I40846/moov-pain-relief-spray-80g-1-1669627301.jpg"
    },
    {
      name: "Volini Pain Relief Gel 75g",
      price: "₹170",
      mrp: "₹200",
      discount: "15% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00949/volini-pain-relief-gel-75g-1-1669650639.jpg"
    },
    {
      name: "Iodex Ultra Gel 30g",
      price: "₹145",
      mrp: "₹165",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/V36462/iodex-ultra-gel-30g-1-1671740174.jpg"
    },
    {
      name: "Himalaya Pain Balm Strong 45g",
      price: "₹95",
      mrp: "₹110",
      discount: "14% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07364/himalaya-pain-balm-strong-45g-1-1669650561.jpg"
    },
    {
      name: "Zandu Balm Ultra Power 50ml",
      price: "₹120",
      mrp: "₹145",
      discount: "17% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00952/zandu-balm-ultra-power-50ml-1-1669650615.jpg"
    },
    {
      name: "Omnigel Pain Relief Gel 75g",
      price: "₹145",
      mrp: "₹175",
      discount: "17% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00943/omnigel-pain-relief-gel-75g-1-1669650644.jpg"
    },
    {
      name: "Dolo 650 Tablet 15s",
      price: "₹30",
      mrp: "₹35",
      discount: "14% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/H33042/dolo-650-tablet-15s-1-1669650519.jpg"
    },
    {
      name: "Relispray Instant Pain Relief Spray 100g",
      price: "₹175",
      mrp: "₹199",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00945/relispray-instant-pain-relief-spray-100g-1-1669650616.jpg"
    },
    {
      name: "Amrutanjan Pain Balm Extra Power 45ml",
      price: "₹95",
      mrp: "₹115",
      discount: "17% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00951/amrutanjan-pain-balm-extra-power-45ml-1-1669650564.jpg"
    },
    {
      name: "Biofreeze Pain Relief Gel 110g",
      price: "₹250",
      mrp: "₹290",
      discount: "14% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/D83572/biofreeze-pain-relief-gel-110g-2-1684825323.jpg"
    },
    {
      name: "Vicks VapoRub 50ml",
      price: "₹120",
      mrp: "₹135",
      discount: "11% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00958/vicks-vaporub-50ml-1-1669650611.jpg"
    },
    {
      name: "Becosules Capsule (Pain & Fatigue Relief) 20s",
      price: "₹48",
      mrp: "₹55",
      discount: "13% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I00950/becosules-capsule-20s-1-1669650609.jpg"
    }
  ];

  return (
    <div className="pain-container">
      <header className="pain-header">
        <Link to="/" className="back-btn"><i className="fa-solid fa-arrow-left"></i> Back</Link>
        <h1>Pain Relief Medicines</h1>
      </header>

      <div className="pain-grid">
        {products.map((item, index) => (
          <div key={index} className="pain-card">
            <img src={item.image} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <div className="price-section">
              <span className="current-price">{item.price}</span>
              <span className="mrp"><del>{item.mrp}</del></span>
              <span className="discount">{item.discount}</span>
            </div>
            <button className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainRelief;
