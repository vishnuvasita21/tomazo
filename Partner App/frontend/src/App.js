import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

import LoginPage from "./views/Login/index";
import RestaurantList from "./views/RestaurantList/index";
import MenuItem from "./views/reservationMenus/MenuItem";
import UpdateRestaurantInfo from "./views/UpdateRestaurantInfo/UpdateRestaurantInfo";



import AddTable from "./views/AddTable/AddTable";
import ViewReservationsRestaurant from "./views/ViewReservationsRestaurant/ViewReservationsRestaurant";
import MenuTypes from "./views/Menu/MenuTypes";
import MenuPage from "./views/Menu/MenuPage";
import EditMenu from "./views/Menu/EditMenu";
import Holistic from "./views/Holistic/Holistic";
import HomePage from "./views/homePage";
import RegistrationPage from "../src/views/Registration/index";
import image from "../src/assets/dine-1.png";
import Chatbot from "./Chatbot";
import DeleteReservationRestaurant from "./views/DeleteReservationRestaurant/index"

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left">
        <img
          src={image}
          style={{ width: "80%", maxwidth: "100%", height: "auto" }}
          alt="Loading..."
        />
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
      <Chatbot />
      <Router>
        <Routes>
          <Route path="/partner-home" element={<HomePage />} />

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
          <Route path="/menu" element={<MenuTypes />} />
          <Route
            path="/updateRestaurantInfo"
            element={<UpdateRestaurantInfo />}
          />

          
          <Route path="/addTable" element={<AddTable />} />
          <Route
            path="/viewReservationsRestaurant"
            element={<ViewReservationsRestaurant />}
          />
          <Route path="/menuItems" element={<MenuPage />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/deleteReservationRestaurant" element={<DeleteReservationRestaurant />} />
          <Route path="/holistic" element={<Holistic />} />

          {/* <Route path="/home" element={<RestaurantList />} />
          <Route path="/menu" element={<MenuItem />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
