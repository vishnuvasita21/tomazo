import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [docId, setDocId] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const restaurantId = 2;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const [menuExist, setMenuExist]=useState('no');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-serverless-401214.cloudfunctions.net/getRestaurantMenu?restaurantId=${restaurantId}&name=${name}`
        );

        setMenuData(response.data);
        if (response.data.length > 0) {
          setDocId(response.data[0].id);
          setMenuExist('yes');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [restaurantId, name]);


const handleCheckboxChange = (restaurantIndex, itemIndex) => {
  const isSelected = selectedRows.find(
    (row) => row.restaurantIndex === restaurantIndex && row.itemIndex === itemIndex
  );

  if (isSelected) {
    const updatedSelectedRows = selectedRows.filter(
      (row) => !(row.restaurantIndex === restaurantIndex && row.itemIndex === itemIndex)
    );
    setSelectedRows(updatedSelectedRows);
  } else {
    setSelectedRows([...selectedRows, { restaurantIndex, itemIndex }]);
  }
};

const handleRemoveItems = () => {
    const updatedMenu = menuData.map((restaurant) => {
        const updatedItems = restaurant.menuItems.filter(
          (_, itemIndex) =>
            !selectedRows.some(
              (row) => row.restaurantIndex === menuData.indexOf(restaurant) && row.itemIndex === itemIndex
            )
        );
        return { ...restaurant, menuItems: updatedItems };
      });
    setMenuData(updatedMenu);
    setSelectedRows([]);
  };

  const handleEdit = (restaurantIndex, itemIndex, field, value) => {
    const updatedMenuData = [...menuData];
    if (field === 'discount' && (value < 0 || value > 100 || isNaN(value))) {
      return;
    }
    if (field === 'available' && value !== 'true' && value !== 'false') {
      return;
    }
    updatedMenuData[restaurantIndex].menuItems[itemIndex][field] = value;
    setMenuData(updatedMenuData);
  };

  const handleSave = async () => {
    try {
        if (menuExist === 'yes') {
      await axios.put(
        `https://us-central1-serverless-401214.cloudfunctions.net/updateRestaurantMenu?docId=${docId}`,
        menuData[0],
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Menu updated successfully!');
    }
    else{
        const newMenu = {
            restaurantId,
            type: name,
            menuItems: menuData.map((restaurant) => restaurant.menuItems).flat(),
          };
        await axios.post(
            `https://us-central1-serverless-401214.cloudfunctions.net/addRestaurantMenu`,
            newMenu,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          alert('Menu updated successfully!');
    }
    } catch (error) {
      console.error('Error updating menu:', error);
      alert('Failed to update menu.');
    }
  };

  const handleApplyDiscount = () => {
    const discount = parseInt(discountValue);
    if (discount >= 0 && discount <= 100) {
      const updatedMenu = menuData.map((restaurant) => {
        const updatedItems = restaurant.menuItems.map((item) => {
          return {
            ...item,
            discount: discount,
          };
        });
        return {
          ...restaurant,
          menuItems: updatedItems,
        };
      });
      setMenuData(updatedMenu);
    } else {
      alert('Please enter a valid discount value between 0 and 100.');
    }
  };
  

  const handleAddMenuItem = () => {
    const newItem = {
      itemName: '',
      price: '',
      description: '',
      available: '',
      discount: '',
    };
    const updatedMenu = [...menuData];
    if (updatedMenu.length > 0) {
      updatedMenu[0].menuItems.push(newItem); 
      setMenuData(updatedMenu);
    }
    else
    setMenuData([{ menuItems: [newItem] }]);
  };

  return (
    <div>
      <h1>Edit Menu</h1>
      <button onClick={handleAddMenuItem}>Add Menu Item</button>
      <input
        type="number"
        value={discountValue}
        onChange={(e) => setDiscountValue(e.target.value)}
        placeholder="Enter discount percentage (0-100)"
      />
      <button onClick={handleApplyDiscount}>Apply Discount</button>
      <button onClick={handleRemoveItems}>Remove Item</button>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Availability</th>
            <th>Discount (%)</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((restaurant, restaurantIndex) =>
            restaurant.menuItems.map((menuItem, itemIndex) => (
      
              <tr key={menuItem.itemName}>
                <td>
                <input
                type="checkbox"
                checked={selectedRows.some(
                    (row) => row.restaurantIndex === restaurantIndex && row.itemIndex === itemIndex
                )}
                onChange={() => handleCheckboxChange(restaurantIndex, itemIndex)}
                />
                </td>
                <td>
                  <input
                    type="text"
                    value={menuItem.itemName}
                    onChange={(e) => handleEdit(restaurantIndex, itemIndex, 'itemName', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={menuItem.price}
                    onChange={(e) => handleEdit(restaurantIndex, itemIndex, 'price', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={menuItem.description}
                    onChange={(e) => handleEdit(restaurantIndex, itemIndex, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={menuItem.available}
                    onChange={(e) => handleEdit(restaurantIndex, itemIndex, 'available', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={menuItem.discount}
                    onChange={(e) => handleEdit(restaurantIndex, itemIndex, 'discount', e.target.value)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};


export default EditMenu;
