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
        console.log("RESPONSE DATA:");
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

  console.log(updatedData);
  
  updatedData[tableIndex][field] = value;

  setData(updatedData);
};

const handleSubmit = (e, tableIndex) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    console.log(tableIndex);


    let dataToSubmit = data[tableIndex]; // Need to update this with index of current item

    console.log("TESTING", dataToSubmit);

    const RESTAURANT_ID = restaurantId;
    console.log("RESTAURANT_ID: ", RESTAURANT_ID);

    const TABLE_ID = dataToSubmit.TableID;
    console.log("TABLE_ID: ", TABLE_ID);

    const USER_ID = dataToSubmit.UserID;
    console.log("USER_ID: ", USER_ID);

    const START_TIME = dataToSubmit.BookingStart;
    console.log("START_TIME: ", START_TIME);

    const END_TIME = dataToSubmit.BookingEnd;
    console.log("END_TIME: ", END_TIME);

    const BOOKING_DATE = dataToSubmit.BookingDate;
    console.log("BOOKING_DATE: ", BOOKING_DATE);


    //TODO: Make a separate call to the update booking status endpoint.
    //const BOOKING_STATUS = dataToSubmit.BookingStatus;
    //console.log("BOOKING_STATUS: ", BOOKING_STATUS);

    // TODO: Write a new endpoint to accept and udpate all fields below.
    // The thing that made this endpoint work on the google cloud function side,
    // was including the line res.set('Access-Control-Allow-Origin', "*")
    // as per the SO answer at: https://stackoverflow.com/questions/35693758/google-cloud-functions-enable-cors
    // 

    let FORM_ENDPOINT = 'https://bookreservation-ez3fpdepla-uc.a.run.app/bookReservation?';
    FORM_ENDPOINT = FORM_ENDPOINT.concat('userID=1');//'userID=' + String(USER_ID)+ '&');
    FORM_ENDPOINT = FORM_ENDPOINT.concat('restaurantID=' + String(RESTAURANT_ID)+ '&');
    FORM_ENDPOINT = FORM_ENDPOINT.concat('bookingStart=' + String(START_TIME)+ '&');
    FORM_ENDPOINT = FORM_ENDPOINT.concat('bookingEnd=' + String(END_TIME)+ '&');
    FORM_ENDPOINT = FORM_ENDPOINT.concat('bookingDate=' + String(BOOKING_DATE)+ '&');
    FORM_ENDPOINT = FORM_ENDPOINT.concat('tableID=' + String(TABLE_ID));

    console.log("Submitting data to API endpoint: ", FORM_ENDPOINT);

    fetch(FORM_ENDPOINT, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(dataToSubmit),
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
        alert(err.toString());//alert("Error updating table information!");
      });

      return { handleSubmit, status, message };
  };
  

const handleDelete = (e, tableIndex) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    console.log(e);

    const FORM_ENDPOINT = "https://deletereservation-ez3fpdepla-uc.a.run.app/deleteReservation?documentID=";

    let dataToSubmit = data[tableIndex]; // Need to update this with index of current item

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
              {data.map((reservationRecord, reservationIndex) => (
              <tr>

                    <td>
                      <p style={timingStyle}>{reservationRecord.RestaurantName}</p>
                    </td>

                    <td>
                      <p style={timingStyle}>{reservationRecord.TableID}</p>
                    </td>

                    <td>
                      <input
                        type="date"
                        value={reservationRecord.BookingDate}
                        name="BookingDate"
                        onChange={(e) => handleEdit(reservationIndex, 'BookingDate', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={reservationRecord.BookingStart}
                        name="BookingStart"
                        onChange={(e) => handleEdit(reservationIndex, 'BookingStart', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={reservationRecord.BookingEnd}
                        name="BookingEnd"
                        onChange={(e) => handleEdit(reservationIndex, 'BookingEnd', e.target.value)}
                        required
                      />
                    </td>

                    <td>
                      <p style={timingStyle}>{reservationRecord.UserID}</p>
                    </td>

                    <td>
                      <input
                        type="text"
                        value={reservationRecord.BookingStatus}
                        name="BookingStatus"
                        onChange={(e) => handleEdit(reservationIndex, 'BookingStatus', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <button onClick={(e) => handleSubmit(e, reservationIndex)}>
                        Update
                      </button>
                    </td>

                    <td>
                      <button onClick={(e) => handleDelete(e, reservationIndex)}>
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
