import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Ambulance from './components/Ambulance/Ambulance';
import Healthmonitor from './components/Healthmonitor/healthmonitor';
import Medicines from './components/Medicines/Medicines';
import { AuthProvider } from './components/AuthContext';// Import AuthProvider
import BloodBank from './components/BloodBank/blood_bank';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/healthmonitor" element={<Healthmonitor />} />
            <Route path="/bloodbank" element={<BloodBank />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;