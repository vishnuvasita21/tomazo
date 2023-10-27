const admin = require('firebase-admin');
const { onRequest } = require("firebase-functions/v2/https");

admin.initializeApp();

const firestore = admin.firestore();

exports.updateMenu = onRequest(async (request, response) => {
  try {
    const docId = request.query.docId; 
    const updatedData = request.body; 

    const docRef = firestore.collection('reservationMeals').doc(docId).update(updatedData);

    return response.status(200).json({ message: 'Reservation updated' });
  } catch (error) {
    console.error('Error updating reservation:', error);
    return response.status(500).json({ error: 'Failed to update reservation.' });
  }
});
