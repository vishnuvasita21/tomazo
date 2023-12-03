
import './App.css';
import AdminDashboard from './views/dashboard/dashboard';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
      
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
  
      </Router>
    </div>
  );
}

export default App;
