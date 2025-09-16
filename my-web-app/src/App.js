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

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLoginClick = () => setShowLogin(true);
  const handleLogoutClick = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          cartCount={cartCount}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogoutClick}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/profile" element={<Profile />} />
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
