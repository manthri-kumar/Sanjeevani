
import React, { useState } from "react";
import "./NavbarWithDropdown.css";

const menuItems = [
  {
    title: "Hair Care",
    subItems: [
      { name: "Shampoos", info: "Gentle cleansers for all hair types" },
      { name: "Conditioners", info: "Moisturizing treatments for smooth hair" },
      { name: "Hair Oils", info: "Natural oils for nourishment and growth" },
    ],
  },
  {
    title: "Fitness & Health",
    subItems: [
      { name: "Pre/Post Workout", info: "Supplements for before and after exercise" },
      { name: "Mass Gainers", info: "High-calorie blends for weight gain" },
      { name: "Plant Protein", info: "Proteins from natural plant sources" },
      { name: "Creatine", info: "Supports strength and performance" },
      { name: "Glutamine", info: "Amino acid for recovery" },
      { name: "Protein Supplements", info: "Various protein powders for health" },
      { name: "Knee Support", info: "Braces and wraps for knees" },
      { name: "Smart Watches & Rings", info: "Wearable health and fitness trackers" },
    ],
  },
  {
    title: "Sexual Wellness",
    subItems: [
      { name: "Contraceptives", info: "Safe methods for birth control" },
      { name: "Lubricants", info: "Personal lubricants for comfort" },
    ],
  },
  {
    title: "Vitamins & Nutrition",
    subItems: [
      { name: "Oats", info: "Healthful whole grains for breakfast" },
      { name: "Muesli & Cereals", info: "Nutritious breakfast options" },
      { name: "Quinoa", info: "Protein-rich superfood" },
      { name: "Fat Burners", info: "Support healthy metabolism" },
      { name: "Sports", info: "Supplements for athletic performance" },
      { name: "Carnitine", info: "Supports energy production" },
      // Add other subcategories as you require
    ],
  },
  {
    title: "Supports & Braces",
    subItems: [
      { name: "Elbow Support", info: "Braces for elbow injuries" },
      { name: "Wrist Support", info: "Stabilizes wrists" },
      { name: "Neck Support", info: "Braces for neck problems" },
      { name: "Shoulder Support", info: "Relieves shoulder discomfort" },
    ],
  },
  {
    title: "Immunity Boosters",
    subItems: [
      { name: "Vitamin C Tablets", info: "Support immune health" },
      { name: "Herbal Tonics", info: "Traditional immunity boosters" },
      { name: "Probiotics", info: "Improves gut health and immunity" },
    ],
  },
  {
    title: "Homeopathy",
    subItems: [
      { name: "Mother Tinctures", info: "Homeopathic plant extracts" },
      { name: "Dilutions", info: "Remedies for various ailments" },
    ],
  },
  {
    title: "First Aid",
    subItems: [
      { name: "Bandages", info: "For minor wounds" },
      { name: "Antiseptics", info: "Prevent infection" },
      { name: "Medical Kits", info: "Complete first aid kits" }
    ],
  },
];


function NavbarWithDropdown() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState(null);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {menuItems.map((menu, idx) => (
          <li
            key={menu.title}
            className="navbar-item"
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => { setActiveIndex(null); setHoveredSubIndex(null); }}
          >
            <span className="navbar-link">
              {menu.title}
              {menu.subItems.length > 0 && <span className="arrow">&#9662;</span>}
            </span>
            {menu.subItems.length > 0 && activeIndex === idx && (
              <ul className="dropdown">
                {menu.subItems.map((sub, i) => (
                  <li
                    key={i}
                    className="dropdown-item"
                    onMouseEnter={() => setHoveredSubIndex(i)}
                    onMouseLeave={() => setHoveredSubIndex(null)}
                  >
                    {sub.name}
                    {hoveredSubIndex === i && (
                      <div className="subcategory-info">
                        {sub.info}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarWithDropdown;
