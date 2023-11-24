import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import image from "../../assets/dine-1.png";
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
  const restaurantId = parseInt(sessionStorage.getItem('rid'));
  const navigate = useNavigate();
  const [data, setData] = useState([]); //useState(null); 
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //api
  useEffect(() => {
    const fetchData = async () => {
      const restaurantId = parseInt(sessionStorage.getItem('rid'));
      try {
        let API_ENDPOINT = 'https://us-central1-csci5410-14dd5.cloudfunctions.net/viewReservationsRestaurant?restaurantID='
        API_ENDPOINT = API_ENDPOINT.concat(restaurantId);
        console.log("Calling API endpoint: ", API_ENDPOINT);
        const response = await axios.get(API_ENDPOINT);
        console.log(JSON.stringify(response.data));
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
  //if (error) return <p>Error!</p>;

const handleEdit = (tableIndex, field, value) => {

  let updatedData = [...data];
  
  updatedData[tableIndex][field] = value;

  setData(updatedData);
};

const handleSubmit = (e, tableIndex) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    console.log(e);

    const FORM_ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/addTable";

    let dataToSubmit = data[tableIndex]; // Need to update this with index of current item

    dataToSubmit.RestaurantID = parseInt(restaurantId);
    dataToSubmit.TableID = parseInt(dataToSubmit.TableID);
    dataToSubmit.TableCapacity = parseInt(dataToSubmit.TableCapacity);
    console.log("Data submitted with contents: ", dataToSubmit);

    fetch(FORM_ENDPOINT, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => {
        setMessage("Thanks!");
        setStatus('success');
        alert("Table information updated!");
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
        alert("Error updating table information!");
      });

      return { handleSubmit, status, message };
  };
  

const handleDelete = (e, tableIndex) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    console.log(e);

    const FORM_ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/addTable";

    let dataToSubmit = data[tableIndex]; // Need to update this with index of current item

    dataToSubmit.RestaurantID = parseInt(restaurantId);
    dataToSubmit.TableID = parseInt(dataToSubmit.TableID);
    dataToSubmit.TableCapacity = parseInt(dataToSubmit.TableCapacity);
    console.log("Data submitted with contents: ", dataToSubmit);

    fetch(FORM_ENDPOINT, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => {
        setMessage("Thanks!");
        setStatus('success');
        alert("Table information updated!");
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
        alert("Error updating table information!");
      });

      return { handleSubmit, status, message };
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

      <div>
        <h1>Reservations List</h1>
        <table>
          <thead>
            <th>
              <label> Restaurant Name </label>
            </th>
            <th>
              <label> Table Number </label>
            </th>
            <th>
              <label> Booking Date </label>
            </th>
            <th>
              <label> Booking Start Time </label>
            </th>
            <th>
              <label> Booking End Time </label>
            </th>
            <th>
              <label> User ID </label>
            </th>
            <th>
              <label> Booking Status </label>
            </th>        
          </thead>
          <tbody>
              {data.map((item) => (
              <tr>

                    <td>
                      <p style={timingStyle}>{item.RestaurantName}</p>
                    </td>

                    <td>
                      <p style={timingStyle}>{item.TableID}</p>
                    </td>

                    <td>
                      <input
                        type="date"
                        value={item.BookingDate}
                        name="BookingDate"
                        onChange={(e) => handleEdit(item.restaurantID, 'BookingDate', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={item.BookingStart}
                        name="BookingStart"
                        onChange={(e) => handleEdit(item.restaurantID, 'BookingStart', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={item.BookingEnd}
                        name="BookingEnd"
                        onChange={(e) => handleEdit(item.restaurantID, 'BookingEnd', e.target.value)}
                        required
                      />
                    </td>

                    <td>
                      <p style={timingStyle}>{item.UserID}</p>
                    </td>

                    <td>
                      <input
                        type="text"
                        value={item.BookingStatus}
                        name="BookingStatus"
                        onChange={(e) => handleEdit(item.restaurantID, 'BookingStatus', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <button onClick={(e) => handleSubmit(e, item.restaurantID)}>
                        Update
                      </button>
                    </td>

                    <td>
                      <button onClick={(e) => handleDelete(e, item.restaurantID)}>
                        Delete
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
        
  );
}

export default ViewReservationsRestaurant;
