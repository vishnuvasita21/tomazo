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

const logoutButtonStyle = {
  background: "#ca3433",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
};

function RestaurantList() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getAllRestaurants"
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToMenu = (RestaurantID) => {
    navigate("/menu", { state: { RestaurantID: RestaurantID } });
  };

  const navigateToBookReservation = (RestaurantID) => {
    navigate("/bookReservation", { state: { RestaurantID: RestaurantID , UserID: 1 } });
  };

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
    border: "1px solid #eee",
    boxShadow: "0 2px 3px #ccc",
    width: "90%",
    margin: "2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
  };

  const imageStyle = {
    maxWidth: "250px",
    maxHeight: "150px",
    marginRight: "1rem",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const titleStyle = {
    margin: 0,
    color: "#333",
  };

  const timingStyle = {
    margin: "0.5rem 0",
    fontSize: "0.9rem",
    color: "#666",
  };

  const cardView = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  };
  if (loading) return <p>Loading...</p>;
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
        <h1>Restaurant List</h1>
        <div style={cardStyle}>
          {data &&
            data.map((item) => (
              <div style={cardView} key={item.RestaurantID}>
                <img
                  src={item.RestaurantImageURL}
                  alt={item.RestaurantName}
                  style={imageStyle}
                />
                <div style={detailsStyle}>
                  <h2 style={titleStyle}>{item.RestaurantName}</h2>
                  <p style={timingStyle}>
                    Open: {item.OpenHour}<br/>
                    Close: {item.CloseHour}
                  </p>

                  <button onClick={() => navigateToMenu(item.RestaurantID)}>
                    Menu
                  </button>

                  <button onClick={() => navigateToBookReservation(item.RestaurantID)}>
                    Book Reservation
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantList;
