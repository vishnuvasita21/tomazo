const admin = require('firebase-admin');
const { onRequest } = require("firebase-functions/v2/https");

const serviceAccount = require("./cred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  
});

const firestore = admin.firestore();

exports.addReservationMenu = onRequest(async (request, response) => {
  try {
    const requestData = request.body; 
    const docRef = await firestore.collection('reservationMeals').add(requestData);

    return response.status(201).json({ message: 'Reservation added', id: docRef.id });
  } catch (error) {
    console.error('Error adding reservation:', error);
    return response.status(500).json({ error: 'Failed to add reservation.' });
  }
});
