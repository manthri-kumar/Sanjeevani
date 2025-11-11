import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Check login state first
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // ✅ Load user-specific cart only if logged in
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(savedCart);
    } else {
      // ✅ Empty cart if user not logged in
      setCartItems([]);
    }

    // ✅ Sync across tabs
    const handleStorage = () => {
      const loggedInNow = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInNow);

      if (loggedInNow) {
        const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(updatedCart);
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateCart = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
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

  return (
    <div className="cart-main-container">
      <section className="cart-items-section">
        <h3>
          My Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
        </h3>

        {!isLoggedIn ? (
          <div className="cart-empty-message">
            Please log in to view your cart.
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty-message">Your cart is empty.</div>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item-card" key={index}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
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
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                ₹
                {item.price && item.qty
                  ? (item.price * item.qty).toFixed(2)
                  : "0.00"}
              </div>
            </div>
          ))
        )}
      </section>

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
        <div className="cart-summary-total">
          Total Amount: ₹{totalPrice.toFixed(2)}
        </div>
        <button
          className="cart-summary-btn"
          disabled={!isLoggedIn || cartItems.length === 0}
        >
          {isLoggedIn ? "Place Order" : "Login to Order"}
        </button>
      </aside>
    </div>
  );
}

export default Cart;
