import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./views/login/AdminLogin";
import AdminDashboard from './views/dashboard/dashboard';




function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
