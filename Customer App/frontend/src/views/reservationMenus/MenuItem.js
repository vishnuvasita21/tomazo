import React, { useState, useEffect } from 'react';
import './Menuitem.css'
import axios from 'axios';

const MenuItem = () => {

  const [menuData, setMenuData] = useState([]);
  const [itemCounts, setItemCounts] = useState({});
  const [reservationDocId, setReservationDocId] = useState('w5EDN2NeZol62CPV0tlJ');


  const handleIncrement = (itemName) => {
    setItemCounts({
      ...itemCounts,
      [itemName]: (itemCounts[itemName] || 0) + 1,
    });
  };

  const handleDecrement = (itemName) => {
    if (itemCounts[itemName] > 0) {
      setItemCounts({
        ...itemCounts,
        [itemName]: itemCounts[itemName] - 1,
      });
    }
  };

  const handleClearMenu = () => {
    setItemCounts({});
    fetch(`https://us-central1-serverless-401214.cloudfunctions.net/deleteReservationMenu?docId=${reservationDocId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reservation cleared successfully!');
        } else {
          console.error('Failed to clear the reservation:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error clearing the reservation:', error);
      });
  };


  const handleBookMenu = () => {
    const reservationData = {
      reservationId:1,
      menuItems: Object.keys(itemCounts).map((itemName) => ({
        itemName,
        quantity: itemCounts[itemName],
        price: menuData.find((restaurant) =>
          restaurant.menuItems.some((item) => item.itemName === itemName)
        ).menuItems.find((item) => item.itemName === itemName).price,
      })),
    };

    
    axios
    .post('https://us-central1-serverless-401214.cloudfunctions.net/addReservationMenu', reservationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reservation added successfully!');
          // Optionally clear the menu after booking
          handleClearMenu();
        } else {
          console.error('Failed to add the reservation:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error adding the reservation:', error);
      });
  };

  useEffect(() => {
    fetch('https://us-central1-serverless-401214.cloudfunctions.net/getRestaurantMenu?restaurantId=1')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.error('Invalid menu data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });

      fetch(`https://us-central1-serverless-401214.cloudfunctions.net/getReservationMenu?reservationId=1`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const newCounts = {};
          data[0].menuItems.forEach((item) => {
            newCounts[item.itemName] = item.quantity;
          });
          setItemCounts(newCounts);
        } else {
          console.error('Invalid menu data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching reservation data:', error);
      });
  
  }, []);

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((restaurant) => (
            restaurant.menuItems.map((item, index) => (
              <tr key={item.itemName}>
                <td>{item.itemName}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleDecrement(item.itemName)}>-</button>
                  {itemCounts[item.itemName] || 0}
                  <button onClick={() => handleIncrement(item.itemName)}>+</button>
                </td>
                <td>{item.Available}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <div className="action-buttons">
        <button onClick={handleBookMenu}>Book Menu</button>
        <button onClick={handleClearMenu}>Clear Menu</button>
      </div>
    </div>
  );
}

export default MenuItem;
