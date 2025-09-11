import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Ambulance from './components/Ambulance/Ambulance';
import Healthmonitor from './components/Healthmonitor/healthmonitor';
import Medicines from './components/Medicines/Medicines';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/ambulance" element={<Ambulance />} />
          <Route path="/healthmonitor" element={<Healthmonitor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
