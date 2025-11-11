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
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

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

      const savedAddresses =
        JSON.parse(localStorage.getItem(`addresses_${email}`)) || [];
      setAddresses(savedAddresses);
    } else {
      setUserEmail("");
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartData();
    window.addEventListener("cartUpdated", loadCartData);
    return () => {
      window.removeEventListener("cartUpdated", loadCartData);
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

  // Trigger login modal
  const triggerLoginModal = () => {
    sessionStorage.setItem("triggerLogin", "true");
    window.dispatchEvent(new Event("openLoginModal"));
    setTimeout(() => navigate("/"), 100);
  };

  // 🟢 Use Current Location → Reverse Geocode
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("❌ Geolocation not supported by this browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data?.display_name) {
            setCurrentAddress(data.display_name);
            alert("📍 Location selected successfully!");
          } else {
            alert("⚠️ Unable to get address details.");
          }
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          alert("❌ Unable to fetch address details.");
        }
        setLoadingLocation(false);
      },
      () => {
        alert("❌ Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleAddNewAddress = () => {
    if (newAddress.trim() === "") return alert("Enter address first!");
    const updated = [...addresses, { label: "Home", address: newAddress }];
    setAddresses(updated);
    localStorage.setItem(`addresses_${userEmail}`, JSON.stringify(updated));
    setNewAddress("");
    setCurrentAddress(newAddress);
    alert("✅ Address added successfully!");
  };

  const handleConfirmOrder = () => {
    if (!currentAddress) {
      alert("⚠️ Please select or add an address first!");
      return;
    }

    if (!/^\d{10}$/.test(receiverNumber)) {
      alert("⚠️ Please enter a valid 10-digit receiver phone number!");
      return;
    }

    alert(
      `✅ Order placed successfully!\n\nDelivering to:\n${currentAddress}\nReceiver Phone: ${receiverNumber}`
    );

    setCartItems([]);
    localStorage.removeItem(`cartItems_${userEmail}`);
    setShowAddressModal(false);
    setReceiverNumber("");
    window.dispatchEvent(new Event("cartUpdated"));
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
                    Price per item: ₹{item.price.toFixed(2)}
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
                  ₹{(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Summary */}
        {isLoggedIn && cartItems.length > 0 && (
          <aside className="cart-summary-section">
            <div className="cart-summary-title">Price Details</div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
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
              onClick={() => setShowAddressModal(true)}
            >
              Place Order
            </button>
          </aside>
        )}
      </div>

      {/* 🟢 Address Selection Modal */}
      {showAddressModal && (
        <div className="address-modal">
          <div className="address-modal-content">
            <h3>Deliver To</h3>

            <div className="address-section">
              <p className="choose-text">Choose from Saved Address</p>
              {addresses.length > 0 ? (
                addresses.map((addr, i) => (
                  <div
                    key={i}
                    className={`address-card ${
                      currentAddress === addr.address ? "selected" : ""
                    }`}
                    onClick={() => setCurrentAddress(addr.address)}
                  >
                    <i className="fa-solid fa-house"></i>
                    <div className="address-info">
                      <strong>{addr.label}</strong>
                      <p>{addr.address}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No saved addresses found.</p>
              )}
            </div>

            <div className="or-line">OR</div>

            <button
              className="current-location-btn"
              onClick={fetchCurrentLocation}
              disabled={loadingLocation}
            >
              {loadingLocation ? (
                "Fetching your location..."
              ) : (
                <>
                  <i className="fa-solid fa-location-crosshairs"></i> Use Current
                  Location
                </>
              )}
            </button>

            {currentAddress && (
              <div className="current-address-display">
                <i className="fa-solid fa-location-dot"></i>
                <p>{currentAddress}</p>
              </div>
            )}

            <div className="or-line">OR</div>

            <div className="add-address">
              <textarea
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Add New Address"
              ></textarea>
              <button className="add-btn" onClick={handleAddNewAddress}>
                + Add Address
              </button>
            </div>

            <label className="receiver-label">Receiver Phone Number:</label>
            <input
              type="tel"
              className="receiver-input"
              value={receiverNumber}
              onChange={(e) => setReceiverNumber(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />

            <div className="confirm-actions">
              <button className="confirm-btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
