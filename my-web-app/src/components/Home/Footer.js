import React from "react";
import "./Footer.css";
import { sanjeevaniImg } from "../../assets";

function Footer() {
  return (
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
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" className="footer logo" />
          <h4>A MANTHRI Enterprise</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
