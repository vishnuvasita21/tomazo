import React, { useState, useEffect } from "react";
import './App.css';
import image from "../src/Assets/login-gov-600x314.png";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./views/login/AdminLogin";
import AdminDashboard from './views/dashboard/dashboard';


function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left">
        <img
          src={image}
          style={{ width: "80%", maxWidth: "100%", height: "auto" }}
          alt="Loading..."
        />
      </div>
      <div className="right">
        <div className="content">
          <h1>Admin Panel</h1>
          <Link to="/login">
            <button className="red-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}



function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
