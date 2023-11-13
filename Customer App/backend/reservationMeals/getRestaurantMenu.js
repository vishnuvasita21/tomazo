const admin = require('firebase-admin');
const {onRequest} = require("firebase-functions/v2/https");

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.getRestaurantMenu = onRequest(async (request, response) => {
  try {
    const restaurantId = request.query.restaurantId;

    const menuItemsQuery = await firestore
      .collection('restaurantMenu')
      .where('restaurantId', '==', parseInt(restaurantId))
      .get();
    const menuItems = [];
    menuItemsQuery.forEach((doc) => {
      menuItems.push({ id: doc.id, ...doc.data() });
      console.log(doc.id)
    });

    return response.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching restaurant meals:', error);
    return response.status(500).json({ error: 'Failed to fetch restaurant meals.' });
  }
});
