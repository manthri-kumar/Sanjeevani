import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* --- Main Pages --- */
import Home from './components/Home/home';

/* --- Services --- */
import Ambulance from './components/Ambulance/Ambulance';
import Healthmonitor from './components/Healthmonitor/healthmonitor';
import BloodBank from './components/BloodBank/blood_bank';

/* --- Medicines Section --- */
import Medicines from './components/Medicines/Medicines';
import PainRelief from './components/PainRelief/PainRelief';     // ✅ ADDED
import BabyCare from './components/BabyCare/BabyCare';           // ✅ ADDED

/* --- Doctors --- */
import DoctorAppointment from './components/Doctors/DoctorAppointment';

/* --- Appointment Page --- */
import AppointmentPage from './components/AppointmentPage/AppointmentPage';

/* --- Profile & Cart --- */
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';

/* --- Ayurvedic Care --- */
import Ayurvedic from './components/AyurvedicCare/AyurvedicCare';

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Medicines */}
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/painrelief" element={<PainRelief />} />       {/* ✅ NEW */}
        <Route path="/babycare" element={<BabyCare />} />           {/* ✅ NEW */}

        {/* Ambulance */}
        <Route path="/ambulance" element={<Ambulance />} />

        {/* Health Monitor */}
        <Route path="/healthmonitor" element={<Healthmonitor />} />

        {/* Blood Bank */}
        <Route path="/bloodbank" element={<BloodBank />} />

        {/* Doctor Appointment */}
        <Route path="/doctorappointment" element={<DoctorAppointment />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Appointment Page */}
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Ayurvedic Care */}
        <Route path="/ayurvediccare" element={<Ayurvedic />} />

      </Routes>
    </Router>
  );
}

export default App;
