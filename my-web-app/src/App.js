import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";        // make sure file is named Home.js (capital H)
import Medicines from "./healthmonitor"; // file should be Medicines.js (capital M)
import "./App.css";
import Ambulance from "./Ambulance"; 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
         <Route path="/ambulance" element={<Ambulance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
