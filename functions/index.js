
// #REFERENCE: Code modified from:
// https://firebase.google.com/docs/functions/get-started?gen=2nd
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

// Take the text parameter passed to this HTTP endpoint and use it to
// query the Firestore database.
exports.viewReservations = onRequest(async (req, res) => {
  // Get the userID parameter.
  const userID = req.query.userID;
  // console.log(typeof userID);
  // Retrieve reservations from Firestore using the Firebase Admin SDK.
  // #REFERENCE: Code taken from:
  // https://firebase.google.com/docs/firestore/query-data/queries#node.js
  // const reservationListSnapshot = await getFirestore()
  // .collection("Reservations")
  // .where("UserID", "==", userID).get();

  // #REFERENCE: Code Modified From:
  // https://stackoverflow.com/questions/54328730/how-to-perform-a-firestore-query-inside-a-firebase-function
  const db = getFirestore();

  // console.log("DB DETAILS:");
  // console.log(db);

  // Reference: https://firebase.google.com/docs/firestore/query-data/get-data#node.js
  const reservationRef = db.collection("Reservations").doc("ReservationID");
  const doc = await reservationRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", doc.data());
  }

  const query =  db.collection("Reservations")
  // .where("UserID", "==", userID);
  .where("UserID", "==", parseInt(userID));

  const snapshot = await query.get();

  // console.log(query);
  let jsonReturnVals = {};
  if (snapshot.empty) {
    console.log("No documents found.");
  } else {

    // REFERENCE: 
    // https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings
    
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      jsonReturnVals[doc.id] = doc.data();
    });
  }

  // console.log(reservationListSnapshot);
  // reservationListSnapshot.forEach((doc) => {
  // console.log(doc.id, ' => ', doc.data());
  // });

  // Send back the contents of the query.

  res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify(snapshot));
  res.send(jsonReturnVals);
});
