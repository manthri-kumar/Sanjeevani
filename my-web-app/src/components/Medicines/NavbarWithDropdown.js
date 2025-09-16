import React, { useState } from "react";
import "./NavbarWithDropdown.css";

const menuItems = [
  {
    title: "Health Resource Center",
    subItems: [],
  },
  {
    title: "Hair Care",
    subItems: [],
  },
  {
    title: "Fitness & Health",
    subItems: [
      "Pre/Post Workout",
      "Mass Gainers",
      "Plant Protein",
      "Creatine",
      "Glutamine",
      "Protein Supplements",
      "Knee Support",
      "Smart Watches & Rings",
    ],
  },
  {
    title: "Sexual Wellness",
    subItems: [],
  },
  {
    title: "Vitamins & Nutrition",
    subItems: [
      "Arm & Elbow Support",
      "Weighing Scales",
      "Fat Burners",
      "Hand & Wrist Support",
      "Neck & Shoulder Support",
      "Oats",
      "Muesli & Cereals",
      "Quinoa",
      "Sports",
      "Carnitine",
    ],
  },
  {
    title: "Supports & Braces",
    subItems: [],
  },
  {
    title: "Immunity Boosters",
    subItems: [],
  },
  {
    title: "Homeopathy",
    subItems: [],
  },
  {
    title: "First Aid",
    subItems: [],
  },
];

function NavbarWithDropdown() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {menuItems.map((menu, idx) => (
          <li
            key={menu.title}
            className="navbar-item"
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span className="navbar-link">
              {menu.title}
              {menu.subItems.length > 0 && <span className="arrow">&#9662;</span>}
            </span>
            {menu.subItems.length > 0 && activeIndex === idx && (
              <ul className="dropdown">
                {menu.subItems.map((sub, i) => (
                  <li key={i} className="dropdown-item">{sub}</li>
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
