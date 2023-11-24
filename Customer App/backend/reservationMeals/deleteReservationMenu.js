const admin = require("firebase-admin");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.deleteReservationMenu = onRequest(async (request, response) => {
  cors(request, response, async () => {
  try {
    const docId = request.query.docId; 
    const docRef = firestore.collection('reservationMeals').doc(docId).delete();

    return response.status(200).json({ message: 'Reservation deleted' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return response.status(500).json({ error: 'Failed to delete reservation.' });
  }
})
});