
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import MenuTypes from "./views/Menu/MenuTypes";
import MenuPage from "./views/Menu/MenuPage";

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
          
          <Route path="/menu" element={<MenuTypes />} />
          <Route path="/menuItems" element={<MenuPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
