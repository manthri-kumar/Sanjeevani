import React from "react";
import "./BabyCare.css";
import { Link } from "react-router-dom";

function BabyCare() {
  const products = [
    {
      name: "Himalaya Baby Lotion 200ml",
      price: "₹175",
      mrp: "₹199",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07838/himalaya-baby-lotion-200ml-2-1669650558.jpg"
    },
    {
      name: "Sebamed Baby Cream Extra Soft 200ml",
      price: "₹575",
      mrp: "₹650",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07222/sebamed-baby-cream-extra-soft-200ml-1-1669650624.jpg"
    },
    {
      name: "Johnson's Baby Soap 100g (Pack of 3)",
      price: "₹155",
      mrp: "₹180",
      discount: "14% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07203/johnsons-baby-soap-100g-pack-of-3-1-1669650623.jpg"
    },
    {
      name: "Pampers Active Baby Diapers Large 64s",
      price: "₹999",
      mrp: "₹1199",
      discount: "17% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07213/pampers-active-baby-diapers-large-64s-2-1669650579.jpg"
    },
    {
      name: "Mother Sparsh Natural Baby Wash 200ml",
      price: "₹240",
      mrp: "₹280",
      discount: "14% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/Q91269/mother-sparsh-plant-powered-natural-baby-wash-200ml-2-1681386360.jpg"
    },
    {
      name: "Sebamed Baby Shampoo 150ml",
      price: "₹400",
      mrp: "₹450",
      discount: "11% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07218/sebamed-baby-shampoo-150ml-1-1669650625.jpg"
    },
    {
      name: "Mee Mee Nourishing Baby Oil 500ml",
      price: "₹360",
      mrp: "₹410",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07212/mee-mee-nourishing-baby-oil-500ml-1-1669650581.jpg"
    },
    {
      name: "Johnson's Baby Powder 200g",
      price: "₹165",
      mrp: "₹190",
      discount: "13% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07207/johnsons-baby-powder-200g-1-1669650620.jpg"
    },
    {
      name: "Cetaphil Baby Daily Lotion 400ml",
      price: "₹825",
      mrp: "₹920",
      discount: "10% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07224/cetaphil-baby-daily-lotion-400ml-2-1669650622.jpg"
    },
    {
      name: "Himalaya Gentle Baby Shampoo 400ml",
      price: "₹255",
      mrp: "₹299",
      discount: "15% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07834/himalaya-gentle-baby-shampoo-400ml-1-1669650560.jpg"
    },
    {
      name: "Sebamed Diaper Rash Cream 100ml",
      price: "₹530",
      mrp: "₹600",
      discount: "12% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07220/sebamed-diaper-rash-cream-100ml-1-1669650626.jpg"
    },
    {
      name: "Pigeon Baby Wipes 80s (Aloe Vera & Chamomile)",
      price: "₹165",
      mrp: "₹190",
      discount: "13% off",
      image: "https://cdn01.pharmeasy.in/dam/products_otc/I07210/pigeon-baby-wipes-80s-1-1669650578.jpg"
    }
  ];

  return (
    <div className="baby-container">
      <header className="baby-header">
        <Link to="/" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>
        <h1>Baby Care Essentials</h1>
      </header>

      <div className="baby-grid">
        {products.map((item, index) => (
          <div key={index} className="baby-card">
            <img src={item.image} alt={item.name} />
            <p className="product-name">{item.name}</p>
            <div className="price-section">
              <span className="current-price">{item.price}</span>
              <span className="mrp">
                <del>{item.mrp}</del>
              </span>
              <span className="discount">{item.discount}</span>
            </div>
            <button className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BabyCare;
