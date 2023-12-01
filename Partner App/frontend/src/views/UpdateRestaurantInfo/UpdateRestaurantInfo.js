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


// #REFERENCE: Code and logic modified from:
// https://herotofu.com/solutions/guides/react-post-form-data-to-api

function UpdateRestaurantInfo() {
  const restaurantId = parseInt(sessionStorage.getItem('rid'));
  const navigate = useNavigate();
  const [data, setData] = useState([]); //useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  //api
  useEffect(() => {
    const fetchData = async () => {
      try {
        let ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getRestaurantByID/";
        ENDPOINT = ENDPOINT.concat(restaurantId);
        console.log("Getting API Endpoint: ", ENDPOINT)
        const response = await axios.get(ENDPOINT);
        console.log("Response data: ", response.data);
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

const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const finalFormEndpoint = e.target.action;
    let data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});


    console.log("Form data submitted with contents: ", data);

    data.RestaurantID = parseInt(data.RestaurantID);

    fetch(finalFormEndpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
        alert("Restaurant information updated!");
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
        alert("Error updating restaurant information!");
      });

      return { handleSubmit, status, message };
  };

//const FORM_ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/setClose";
const FORM_ENDPOINT = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/updateRestaurantInfo";

const handleEdit = (field, value) => {

  const restaurantID = data.RestaurantID;

  let updatedData = [data];
  
  updatedData[field] = value;

  updatedData["RestaurantID"] = restaurantID;

  console.log("Updated data: ", updatedData);

  setData(updatedData);
};

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

        <h1>Update Restaurant Information</h1>

        <img src={data.RestaurantImageURL}alt="Restaurant Image"/>
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="PUT"
        >
          <table>
            <tbody>
                <tr>
                  <td>
                    <label >Restaurant Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.RestaurantName}
                      name="RestaurantName"
                      onChange={(e) => handleEdit('RestaurantName', e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label >Open Hour:</label>
                  </td>
                  <td>
                    <input 
                      type="time"
                      name="OpenHour"
                      value={data.OpenHour}
                      onChange={(e) => handleEdit('OpenHour', e.target.value)}
                      />
                    </td>
                </tr>
                <tr>
                  <td>
                    <label >Close Hour:</label>
                  </td>
                  <td>
                    <input 
                      type="time"
                      name="CloseHour"
                      value={data.CloseHour}
                      onChange={(e) => handleEdit('CloseHour', e.target.value)}
                      />
                    </td>
                </tr>
                <tr>
                  <td>
                    <label >Currently Closed:</label>
                  </td>
                  <td>
                    <select id="CurrentlyClosed" name="CurrentlyClosed">
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                     <input 
                       type="hidden"  
                       name="RestaurantID" 
                       value={parseInt(data.RestaurantID)}
                     />
                   </td>
                 </tr>
                <tr>
                  <td>
                    <input
                      type="submit"
                      value="submit"
                    />
                  </td>
                </tr>
              
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );

}
export default UpdateRestaurantInfo;
