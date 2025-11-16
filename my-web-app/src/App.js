import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DHome from "./components/DoctorDashBoard/DHome";   // ✅ Correct Import
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

        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/painrelief" element={<PainRelief />} />
        <Route path="/babycare" element={<BabyCare />} />

        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/healthmonitor" element={<Healthmonitor />} />
        <Route path="/bloodbank" element={<BloodBank />} />

        <Route path="/doctorappointment" element={<DoctorAppointment />} />
        <Route path="/appointment" element={<AppointmentPage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/ayurvediccare" element={<Ayurvedic />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />

        {/* ⭐ Doctor Home Route */}
        <Route path="/dhome" element={<DHome />} />   {/* ✅ Correct Route */}

      </Routes>
    </Router>
  );
}

export default App;
