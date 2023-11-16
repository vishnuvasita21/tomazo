import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import LoginPage from "./views/Login/index";
import RegistrationPage from "./views/Registration/index";
import RestaurantList from "./views/RestaurantList/index";
import image from "./assets/tomazo-1.png";
import MenuItem from "./views/reservationMenus/MenuItem";
import UpdateRestaurantInfo from "./views/UpdateRestaurantInfo/index";
import UpdateRestaurantOpen from "./views/UpdateRestaurantOpen/index";
import UpdateRestaurantStatus from "./views/UpdateRestaurantStatus/index";
import AddTable from "./views/AddTable/index";
import ViewReservationsRestaurant from "./views/ViewReservationsRestaurant/index";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/home" element={<RestaurantList />} />
          <Route path="/menu" element={<MenuItem />} />
          <Route path="/updateRestaurantInfo" element={<UpdateRestaurantInfo />} />
          <Route path="/updateRestaurantOpen" element={<UpdateRestaurantOpen />} />
          <Route path="/updateRestaurantStatus" element={<UpdateRestaurantStatus />} />
          <Route path="/addTable" element={<AddTable />} />
          <Route path="/viewReservationsRestaurant" element={<ViewReservationsRestaurant />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
