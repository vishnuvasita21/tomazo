import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left">
        <img src={image} alt="Loading..." />
      </div>
      <div className="right">
        <div className="content">
          <Link to="/signup">
            <button className="red-button">Signup</button>
          </Link>
          <Link to="/login">
            <button className="red-button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        setImageLoaded(true);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              imageLoaded ? (
                <LandingPage />
              ) : (
                <img src={image} alt="Loading..." />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
