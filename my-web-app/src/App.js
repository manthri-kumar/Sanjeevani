import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/home';
import Ambulance from './components/Ambulance/Ambulance';
import Healthmonitor from './components/Healthmonitor/healthmonitor';
import Medicines from './components/Medicines/Medicines';   // ✅ Corrected
import DoctorAppointment from './components/Doctors/DoctorAppointment';
import BloodBank from './components/BloodBank/blood_bank';

import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />   {/* ✅ renders full Medicines page */}
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/healthmonitor" element={<Healthmonitor />} />
        <Route path="/bloodbank" element={<BloodBank />} />
        <Route path="/doctorappointment" element={<DoctorAppointment />} />
        <Route path="/Profile" element={<Profile />} />
         <Route path="/doctor" element={<DoctorAppointment />} />
          <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
