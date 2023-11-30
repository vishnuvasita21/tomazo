const admin = require("firebase-admin");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.addReservationMenu = onRequest(async (request, response) => {
  cors(request, response, async () => {
  try {
    const requestData = request.body; 
    const docRef = await firestore.collection('reservationMeals').add(requestData);

    return response.status(201).json({ message: 'Reservation added', id: docRef.id });
  } catch (error) {
    console.error('Error adding reservation:', error);
    return response.status(500).json({ error: 'Failed to add reservation.' });
  }
})
});
