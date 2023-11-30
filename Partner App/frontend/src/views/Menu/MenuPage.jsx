import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';


const MenuPage = () => {
  const [filteredMenu, setFilteredMenu] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const restaurantId =  parseInt(sessionStorage.getItem('rid'));
  const name = searchParams.get('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-serverless-401214.cloudfunctions.net/getRestaurantMenu?restaurantId=${restaurantId}&name=${name}`
        );

        const data = response.data;
        const modifiedData = applyDiscount(data);
        setFilteredMenu(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [restaurantId, name]);

  const applyDiscount = (menuData) => {
    return menuData.map((restaurant) => {
      const updatedMenuItems = restaurant.menuItems.map((item) => {
        if (item.discount !== 0 && item.discount!="" ) {
          const discountedPrice = item.price - (item.price * item.discount) / 100;
          return {
            ...item,
            price: `<strike>${item.price}</strike>  ${discountedPrice.toFixed(2)} ( ${item.discount}% discount)`,
          };
        }
        return item;
      });

      return {
        ...restaurant,
        menuItems: updatedMenuItems,
      };
    });
  };

  return (
    <div>
      <Link to={{
        pathname: '/edit-menu',
        search: `?name=${encodeURIComponent(name)}`,
      }}>
        <button style={{ backgroundColor: '#ca3433', color: 'white' }}>Edit Menu</button>

      </Link>
      {filteredMenu.length === 0 ? (
        <p>No menu items have been added.</p>
      ) : (
        filteredMenu.map((restaurant) => (
          <div key={restaurant.id}>
            <h1>{name}</h1>
            <br></br>
            <ul>
              {restaurant.menuItems.map((menuItem) => (
                <li
                  key={menuItem.itemName}
                  style={{
                    opacity: menuItem.available === 'false' ? 0.5 : 1,
                  }}
                >
                  <h3>{menuItem.itemName}</h3>
                  <p>
                    <b>Price:</b> $ <span dangerouslySetInnerHTML={{ __html: menuItem.price }}></span>
                  </p>
                  <p>Description: {menuItem.description}</p>
                  <hr></hr>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuPage;
