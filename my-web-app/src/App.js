import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from "./components/Doctordash/doctordas";

import Home from './components/Home/home';

import Ambulance from './components/Ambulance/Ambulance';
import Healthmonitor from './components/Healthmonitor/healthmonitor';
import BloodBank from './components/BloodBank/blood_bank';
import Medicines from './components/Medicines/Medicines';
import PainRelief from './components/PainRelief/PainRelief';
import BabyCare from './components/BabyCare/BabyCare';
import DoctorAppointment from './components/Doctors/DoctorAppointment';
import AppointmentPage from './components/AppointmentPage/AppointmentPage';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import Ayurvedic from './components/AyurvedicCare/AyurvedicCare';
import SearchResult from './components/Search_Result/SearchResults';
import Login from "./components/Login/login";

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Medicines */}
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/painrelief" element={<PainRelief />} />
        <Route path="/babycare" element={<BabyCare />} />

        {/* Services */}
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/healthmonitor" element={<Healthmonitor />} />
        <Route path="/bloodbank" element={<BloodBank />} />

        {/* Doctors */}
        <Route path="/doctorappointment" element={<DoctorAppointment />} />

        {/* Appointment Page */}
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Profile + Cart */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        {/* Ayurvedic */}
        <Route path="/ayurvediccare" element={<Ayurvedic />} />

        {/* Search */}
        <Route path="/search" element={<SearchResult />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-dashboard" element={<doctordas />} />


      </Routes>
    </Router>
  );
}

export default App;
