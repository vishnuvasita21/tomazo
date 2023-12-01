import Holistic from './Holistic/Holistic';
import { Link } from "react-router-dom";
import '../../src/homePage.css'; 
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import image from "../assets/dine-1.png";


const HomePage = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Sign out error");
    }
  };
  const redStripStyle = {
    backgroundColor: "#ca3433",
    padding: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoutButtonStyle = {
    background: "#ca3433",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
  };

  const imageStyle = {
    maxWidth: '250px',
    maxHeight: '150px',
    marginRight: '1rem'
  };
    return (
      
        <div>
            <div style={redStripStyle}>
        <img src={image} alt="Logo" style={imageStyle} />
        <Button
          icon={<LogoutOutlined />}
          onClick={handleSignOut}
          style={{ marginRight: "20px", ...logoutButtonStyle }}
        >
          Sign Out
        </Button>
      </div>
            <h1>Welcome to Dine !</h1>
        <div className="landing-page">
          <div className="navigation-section" style={{ paddingTop:120}}>
            <div className="button-card">
              <Link to="/menu" className="red-button">Menu</Link>
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
