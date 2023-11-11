const admin = require('firebase-admin');
const {onRequest} = require("firebase-functions/v2/https");

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.getMenuItems = onRequest(async (request, response) => {
  try {
    const reservationId = request.query.reservationId;

    // Query Firestore for menu items based on the reservation ID
    const menuItemsQuery = await firestore
      .collection('reservationMeals')
      .where('reservationId', '==', parseInt(reservationId))
      .get();
    const menuItems = [];
    menuItemsQuery.forEach((doc) => {
      menuItems.push({ id: doc.id, ...doc.data() });
      console.log(doc.id)
    });

    return response.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching reservation meals:', error);
    return response.status(500).json({ error: 'Failed to fetch reservation meals.' });
  }
});
