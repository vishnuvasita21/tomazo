
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import MenuTypes from "./views/Menu/MenuTypes";
import MenuPage from "./views/Menu/MenuPage";
import EditMenu from "./views/Menu/EditMenu";
import Holistic from "./views/Holistic/Holistic";
import HomePage from "./views/homePage";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left">
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
  

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuTypes />} />
          <Route path="/menuItems" element={<MenuPage />} />
          <Route path="/edit-menu" element={<EditMenu />} />
          <Route path="/holistic" element= {<Holistic/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
