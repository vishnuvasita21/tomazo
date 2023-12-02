const admin = require("firebase-admin");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.getMenuItems = onRequest(async (request, response) => {
  cors(request, response, async () => {
  try {
    const reservationId = request.query.reservationId;
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
})
});

