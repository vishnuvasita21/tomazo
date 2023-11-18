import Holistic from './Holistic/Holistic';
import { Link } from "react-router-dom";
import '../../src/homePage.css'; 
const HomePage = () => {

    return (
        <div>
            <h1>Welcome to dine</h1>
        <div className="landing-page">
          <div className="navigation-section">
            <div className="button-card">
              <Link to="/menu" className="red-button">Menus</Link>
              <Link to="/menuItems" className="red-button">Menu Items</Link>
              <Link to="/edit-menu" className="red-button">Edit Menu</Link>
            </div>
          </div>
          <div className="reservation-section">
            <Holistic />
          </div>
        </div>
        </div>
      );
};

export default HomePage;
