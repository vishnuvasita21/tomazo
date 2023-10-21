
// #REFERENCE: Code modified from:
// https://firebase.google.com/docs/functions/get-started?gen=2nd
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Take the text parameter passed to this HTTP endpoint and use it to
// query the Firestore database.
exports.viewReservations = onRequest(async (req, res) => {
  // Grab the userID parameter.
  const userID = req.query.userID;
  // Retrieve reservations from Firestore using the Firebase Admin SDK.
  
  // #REFERENCE: Code taken from:
  // https://firebase.google.com/docs/firestore/query-data/queries#node.js
  const reservationListSnapshot = await getFirestore()
      .collection("Reservations")
      .where("userID", "==", userID).get();

  reservationListSnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });

  // Send back the contents of the query.

  res.setHeader('Content-Type', 'application/json');
  res.json({result: `${reservationListSnapshot.Text}`});

});

initializeApp();

