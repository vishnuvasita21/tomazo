import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import image from "../../assets/dine-1.png";
import axios from "axios";
import Form from "./Form";

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


// #REFERENCE: Code and logic modified from:
// https://herotofu.com/solutions/guides/react-post-form-data-to-api

function DeleteReservationRestaurant() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getAllRestaurants');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //ends here
  
  const navigateToMenu = (RestaurantID) => {
    navigate('/menu', { state: { RestaurantID: RestaurantID } }); 
  };

  const navigateToTestUpdateTimes = (RestaurantID) => {
    navigate('/updateRestaurantInfo', { state: { RestaurantID: RestaurantID } }); 
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
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error!</p>;

// #REFERENCE: https://herotofu.com/solutions/guides/react-post-form-data-to-api

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
        <h1>Delete Reservation</h1>

        <Form />
        
      </div>
    </div>
  );
}

export default DeleteReservationRestaurant;
