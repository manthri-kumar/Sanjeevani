import React, { useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./NavbarWithDropdown.css";

const menuItems = [
  {
    title: "Hair Care",
    subItems: [
      { name: "Shampoos", info: "Gentle cleansers for all hair types" },
      { name: "Conditioners", info: "For smooth and hydrated hair" },
      { name: "Hair Oils", info: "Nourishes scalp and promotes growth" },
    ],
  },
  {
    title: "Fitness & Health",
    subItems: [
      { name: "Pre/Post Workout", info: "Boost performance and recovery" },
      { name: "Mass Gainers", info: "Helps in healthy weight gain" },
      { name: "Plant Protein", info: "Protein from natural plant sources" },
      { name: "Creatine", info: "Supports strength and performance" },
      { name: "Glutamine", info: "Amino acid to support recovery" },
      { name: "Protein Supplements", info: "Protein for muscle growth" },
    ],
  },
  {
    title: "Sexual Wellness",
    subItems: [
      { name: "Contraceptives", info: "Safe birth control options" },
      { name: "Lubricants", info: "Personal comfort products" },
    ],
  },
  {
    title: "Vitamins & Nutrition",
    subItems: [
      { name: "Oats", info: "Healthy and energetic breakfast staple" },
      { name: "Quinoa", info: "High protein superfood" },
      { name: "Fat Burners", info: "Boost metabolism" },
      { name: "Carnitine", info: "Energy production support" },
    ],
  },
  {
    title: "Supports & Braces",
    subItems: [
      { name: "Elbow Support", info: "Helps reduce strain" },
      { name: "Wrist Support", info: "Stabilizes wrist joints" },
      { name: "Neck Support", info: "Helps relieve neck tension" },
    ],
  },
  {
    title: "Immunity Boosters",
    subItems: [
      { name: "Vitamin C Tablets", info: "Boosts immune function" },
      { name: "Herbal Tonics", info: "Traditional immunity boosters" },
      { name: "Probiotics", info: "Improves gut and immune health" },
    ],
  },
  {
    title: "Homeopathy",
    subItems: [
      { name: "Mother Tinctures", info: "Homeopathic plant extract" },
      { name: "Dilutions", info: "Widely used homeopathic remedies" },
    ],
  },
  {
    title: "First Aid",
    subItems: [
      { name: "Bandages", info: "Protects wounds" },
      { name: "Antiseptics", info: "Kills germs and prevents infection" },
    ],
  },
];

// convert any title into a clean URL slug
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function NavbarWithDropdown() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState(null);
  const [params] = useSearchParams();
  const currentCat = params.get("cat") || "";

  const navigate = useNavigate();
  const hideTimer = useRef(null);

  const openMenu = (index) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveIndex(index);
  };

  const closeMenu = () => {
    hideTimer.current = setTimeout(() => {
      setActiveIndex(null);
      setHoveredSubIndex(null);
    }, 160); // short delay to prevent flicker
  };

  const goToCategory = (title) => navigate(`/medicines?cat=${slugify(title)}`);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {menuItems.map((menu, index) => {
          const catSlug = slugify(menu.title);
          const isActive = currentCat === catSlug;

          return (
            <li
              key={menu.title}
              className="navbar-item"
              onMouseEnter={() => openMenu(index)}
              onMouseLeave={closeMenu}
            >
              <button
                type="button"
                className={`navbar-link ${isActive ? "is-active" : ""}`}
                onClick={() => goToCategory(menu.title)}
              >
                {menu.title} <span className="arrow">▾</span>
              </button>

              {activeIndex === index && menu.subItems.length > 0 && (
                <ul
                  className="dropdown"
                  onMouseEnter={() => openMenu(index)}
                  onMouseLeave={closeMenu}
                >
                  {menu.subItems.map((sub, i) => (
                    <li
                      key={sub.name}
                      className="dropdown-item"
                      onMouseEnter={() => setHoveredSubIndex(i)}
                      onMouseLeave={() => setHoveredSubIndex(null)}
                    >
                      <Link
                        className="dropdown-link"
                        to={`/medicines?cat=${catSlug}&sub=${slugify(sub.name)}`}
                      >
                        {sub.name}
                      </Link>

                      {hoveredSubIndex === i && (
                        <div className="subcategory-info">{sub.info}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavbarWithDropdown;
