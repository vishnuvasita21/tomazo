
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

  // Retrieve reservations from Firestore using the Firebase Admin SDK.
  // #REFERENCE: Code taken from:
  // https://firebase.google.com/docs/firestore/query-data/queries#node.js
  // #REFERENCE: Code Modified From:
  // https://stackoverflow.com/questions/54328730/how-to-perform-a-firestore-query-inside-a-firebase-function
  // REFERENCE: 
  // https://firebase.google.com/docs/firestore/query-data/get-data#node.js

  const db = getFirestore();

  const query = db.collection("Reservations")
      .where("UserID", "==", parseInt(userID));

  const snapshot = await query.get();

  const jsonReturnVals = {};
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
  // Send back the contents of the query.
  res.setHeader("Content-Type", "application/json");
  res.send(jsonReturnVals);
});

// Take the text parameter passed to this HTTP endpoint and use it to
// query the Firestore database.
exports.bookReservation = onRequest(async (req, res) => {

  // Get various request parameters.
  const userID = req.query.userID;
  const restaurantID = req.query.restaurantID;
  const bookingStart = req.query.bookingStart;
  const bookingEnd = req.query.bookingEnd;

  console.log("userID:", userID);
  console.log("restaurantID:", restaurantID);
  console.log("bookingStart:", bookingStart);
  console.log("bookingEnd", bookingEnd);

  // Retrieve reservations from Firestore using the Firebase Admin SDK.
  // #REFERENCE: Code taken from:
  // https://firebase.google.com/docs/firestore/query-data/queries#node.js
  // #REFERENCE: Code Modified From:
  // https://stackoverflow.com/questions/54328730/how-to-perform-a-firestore-query-inside-a-firebase-function
  const db = getFirestore();

  // Reference: https://firebase.google.com/docs/firestore/query-data/get-data#node.js

  const jsonReturnVals = {};

  // Get restaurant open and close times (based on restaurantID)
  // #REFERENCE: https://builtin.com/software-engineering-perspectives/javascript-api-call
  // #REFERENCE: https://stackoverflow.com/questions/32604460/xmlhttprequest-module-not-defined-found
  var XMLHttpRequest = require('xhr2');
  let request = new XMLHttpRequest();
  let targetURL = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getRestaurantByID?restaurantID=";
  targetURL = targetURL.concat(restaurantID);

  console.log(targetURL);

  request.open("GET", targetURL);
  request.send();

  let responseJSON = {};
  request.onload = () => {

    if(request.status == 200){

      responseJSON = JSON.parse(request.response);

      console.log(responseJSON);

    } else {
      console.log('Error: ${request.status} ${request.statusText}');
    }

  }
  // Ensure that the booking end is after the booking start.
  // Ensure that the booking end is before the resturant closes.
  // Ensure that the booking start is after the restaurant opens.
  // If the three above conditions are satisfied, submit the booking.
  // Otherwise, return an error.
  
  // Send back the contents of the query.

  res.setHeader("Content-Type", "application/json");
  
  res.send(jsonReturnVals);
});
