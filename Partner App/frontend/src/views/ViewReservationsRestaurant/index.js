import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import image from "../../assets/tomazo-1.png";
import axios from "axios";

const redStripStyle = {
  backgroundColor: "#ca3433",
  padding: "10px 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const imageStyle = {
  marginLeft: "20px",
  height: "70px",
  width: "auto",
};

const logoutButtonStyle = {
  background: "#ca3433",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
};



function ViewReservationsRestaurant() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-csci5410-14dd5.cloudfunctions.net/viewReservationsRestaurant?restaurantID=1');
        // console.log(JSON.stringify(response.data));
        setData(Object.values(response.data));
      } catch (err) {
        setError(err);
      } //finally {
        //setLoading(false);
      //}
    };

    fetchData();
  }, []);
  //ends here
  
  const navigateToManageReservations = (RestaurantID) => {
    navigate('/manageReservations', { state: { RestaurantID: RestaurantID } }); 
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("userEmail", user.email);
      } else {
        setUser(null);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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

  const cardStyle = {
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    width: '90%',
    margin: '2rem auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem'
  };

  const imageStyle = {
    maxWidth: '250px',
    maxHeight: '150px',
    marginRight: '1rem'
  };

  const detailsStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  };

  const titleStyle = {
    margin: 0,
    color: '#333'
  };

  const timingStyle = {
    margin: '0.5rem 0',
    fontSize: '0.9rem',
    color: '#666'
  };

  const cardView = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  }
  //if (loading) return <p>Loading..</p>;
  if (error) return <p>Error!</p>;
  
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

      <div>
        <h1>Reservations List</h1>
        <div style={cardStyle}>
        {data.map(item => (
          <div style={cardView} key={item.id}>
            <div style={detailsStyle}>
              <h2 style={titleStyle}>{item.RestaurantName}</h2>
              <p style={timingStyle}>TableID: {item.TableID}</p>
              <p style={timingStyle}>BookingDate: {item.BookingDate}</p>
              <p style={timingStyle}>BookingStart: {item.BookingStart}</p>
              <p style={timingStyle}>BookingEnd: {item.BookingEnd}</p>
              <p style={timingStyle}>UserID: {item.UserID}</p>
              <p style={timingStyle}>RestaurantID: {item.RestaurantID}</p>
              <p style={timingStyle}>BookingStatus : {item.BookingStatus}</p>
            
              <button onClick={() => navigateToManageReservations(item.RestaurantID)}>
                Manage Reservations
              </button>

            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ViewReservationsRestaurant;
