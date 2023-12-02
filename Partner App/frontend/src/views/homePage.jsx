import Holistic from './Holistic/Holistic';
import { Link } from "react-router-dom";
import '../../src/homePage.css'; 
const HomePage = () => {

    return (
        <div>
            <h1>Welcome to Dine !</h1>
        <div className="landing-page">
          <div className="navigation-section" style={{ paddingTop:120}}>
            <div className="button-card">
              <Link to="/menu" className="red-button">Menu</Link>
            </div>
            <div className="button-card">
              <Link to="/updateRestaurantInfo" className="red-button">Update Restaurant Information</Link>
            </div>
            <div className="button-card">
              <Link to="/addTable" className="red-button">Add Tables</Link>
            </div>
            <div className="button-card">
              <Link to="/viewReservationsRestaurant" className="red-button">Edit Reservations</Link>
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
