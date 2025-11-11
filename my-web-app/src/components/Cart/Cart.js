import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { sanjeevaniImg } from "../../assets";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Load login + cart data
  const loadCartData = () => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const email = user?.email || "";
      setUserEmail(email);

      const savedCart =
        JSON.parse(localStorage.getItem(`cartItems_${email}`)) || [];
      setCartItems(savedCart);
      setCartCount(savedCart.reduce((t, i) => t + i.qty, 0));
    } else {
      setUserEmail("");
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartData();
    window.addEventListener("cartUpdated", loadCartData);
    window.addEventListener("storage", loadCartData);
    return () => {
      window.removeEventListener("cartUpdated", loadCartData);
      window.removeEventListener("storage", loadCartData);
    };
  }, []);

  // Update cart items
  const updateCart = (updated) => {
    setCartItems(updated);
    setCartCount(updated.reduce((t, i) => t + i.qty, 0));
    if (userEmail) {
      localStorage.setItem(`cartItems_${userEmail}`, JSON.stringify(updated));
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateCart(updated);
  };

  const handleUpdateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updated = [...cartItems];
    updated[index].qty = newQty;
    updateCart(updated);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 0),
    0
  );

  // Trigger login modal on Home (with tiny delay so Home catches the event)
  const triggerLoginModal = () => {
    sessionStorage.setItem("triggerLogin", "true");
    window.dispatchEvent(new Event("openLoginModal"));
    setTimeout(() => {
      navigate("/"); // go to Home where the modal lives
    }, 100);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={sanjeevaniImg} alt="Sanjeevani Logo" />
        </div>

        <nav className="nav-links">
          <a href="/doctor">DOCTORS</a>
          <a href="#">HOSPITALS</a>
          <a href="/Medicines">MEDICINES</a>
          <a href="/Profile">PROFILE</a>
        </nav>

        <div className="search">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button>
              <i className="fas fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Cart */}
      <div className="cart-main-container">
        <section className="cart-items-section">
          <h3>
            My Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
          </h3>

          {!isLoggedIn ? (
            <div className="cart-login-message">
              <p>Please log in to view your cart</p>
              <button className="cart-login-btn" onClick={triggerLoginModal}>
                Login / Sign Up
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="cart-empty-message">Your cart is empty.</div>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item-card" key={index}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price-single">
                    Price per item: ₹{item.price ? item.price.toFixed(2) : "0.00"}
                  </div>

                  <div className="cart-item-qty-row">
                    <button
                      className="cart-qty-btn"
                      onClick={() => handleUpdateQty(index, item.qty - 1)}
                      disabled={item.qty <= 1}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => handleUpdateQty(index, item.qty + 1)}
                    >
                      +
                    </button>
                    <button className="cart-item-remove" onClick={() => handleRemove(index)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{item.price && item.qty ? (item.price * item.qty).toFixed(2) : "0.00"}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Summary */}
        <aside className="cart-summary-section">
          <div className="cart-summary-title">Price Details</div>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Discount</span>
            <span style={{ color: "#309650" }}>- ₹0.00</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery Charges</span>
            <span style={{ color: "#29776e" }}>Free</span>
          </div>
          <div className="cart-summary-total">Total Amount: ₹{totalPrice.toFixed(2)}</div>

          {/* IMPORTANT: separate buttons by auth state */}
          {!isLoggedIn ? (
            // When logged out → button must be ENABLED to open modal
            <button className="cart-summary-btn" onClick={triggerLoginModal}>
              Login to Order
            </button>
          ) : (
            // When logged in → enable only if cart has items
            <button
              className="cart-summary-btn"
              disabled={cartItems.length === 0}
              onClick={() => alert("Proceeding to order placement...")}
            >
              Place Order
            </button>
          )}
        </aside>
      </div>
    </>
  );
}

export default Cart;
