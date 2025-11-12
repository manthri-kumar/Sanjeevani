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
import AppointmentPage from "./components/AppointmentPage/AppointmentPage";
import HospitalList from "./pages/HospitalList";
import HospitalRegister from "./pages/HospitalRegister";


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
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/" element={<HospitalList />} />
        <Route path="/register" element={<HospitalRegister />} /> {/*  updated path */}        
        <Route path="/bloodbank" element={<BloodBank />} />
        <Route path="/HospitalRegister" element={<HospitalRegister />} />
        <Route path="/" element={<BloodBank />} />

      </Routes>
    </Router>
  );
}
    
export default App;
