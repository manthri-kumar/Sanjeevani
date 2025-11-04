import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";
import { sanjeevaniImg } from "../../assets";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ isLoggedIn, cartCount, onLoginClick, onLogoutClick }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
      </div>
      <nav className="nav-links">
        <a href="#">DOCTORS</a>
        <a href="#">HOSPITALS</a>
        <Link to="/medicines">MEDICINES</Link>
        <Link to="/profile">PROFILE</Link>
      </nav>
      <div className="search">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button>
            <i className="fas fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <Link to="/cart" className="cart">
        <button>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cartCount}</span>
        </button>
      </Link>
      {isLoggedIn ? (
        <button className="login-btn" onClick={onLogoutClick}>Logout</button>
      ) : (
        <button className="login-btn" onClick={onLoginClick}>Login / Sign Up</button>
      )}
    </header>
  );
}

export default Navbar;
