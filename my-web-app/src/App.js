import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Ambulance from './components/Ambulance/Ambulance';
import Medicines from './components/Medicines/Medicines';
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';
import Login from './components/Login/login';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import Hospitals from './components/Hospitals/HospitalPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLoginClick = () => setShowLogin(true);
  const handleLogoutClick = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  // Add to Cart: update quantity if exists, else add new
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  // Remove Item
  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Update Quantity
  const handleUpdateQty = (index, newQty) => {
    setCart(prevCart =>
      prevCart.map((item, i) => i === index
        ? { ...item, qty: Math.max(newQty, 1) }
        : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          cartCount={cart.reduce((total, item) => total + (item.qty || 1), 0)}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogoutClick}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route
            path="/medicines"
            element={
              <Medicines
                cart={cart}
                setCart={setCart}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                onRemove={handleRemoveFromCart}
                onUpdateQty={handleUpdateQty}
              />
            }
          />
        </Routes>
        <Footer />
        {showLogin && !isLoggedIn && (
          <Login setShowLogin={setShowLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
