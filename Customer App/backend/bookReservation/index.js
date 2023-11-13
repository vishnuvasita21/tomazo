
// #REFERENCE: Code modified from:
// https://firebase.google.com/docs/functions/get-started?gen=2nd
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

//import firebase from "firebase/app" 
//import { doc, addDoc } from "firebase/firestore";

initializeApp();



exports.bookReservation = onRequest(async (req, res) => {

  // Get various request parameters.
  const userID = req.query.userID;
  const restaurantID = req.query.restaurantID;
  const bookingStart = req.query.bookingStart;
  const bookingEnd = req.query.bookingEnd;
  const bookingDate = req.query.bookingDate;

  console.log("userID:", userID);
  console.log("restaurantID:", restaurantID);
  console.log("bookingStart:", bookingStart);
  console.log("bookingEnd", bookingEnd);
  console.log("bookingDate", bookingDate);

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
  // #REFERENCE: https://stackoverflow.com/questions/3038901/how-to-get-the-response-of-xmlhttprequest

  let targetURL = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getRestaurantByID/";
  targetURL = targetURL.concat(restaurantID);

  console.log(targetURL);

  const fetch = require("node-fetch");

  const responseJSON = await fetch(targetURL)
  .then(response => response.json())
  .catch((e)=> {});

  
  let openTime = responseJSON.Open;
  let closeTime = responseJSON.Close;
  let restaurantName = responseJSON.RestaurantName;

  console.log(openTime);
  console.log(closeTime);
  console.log(restaurantName);

  console.log(responseJSON);

  // Ensure that the booking end is after the booking start.
  // Ensure that the booking start is after the restaurant opens.
  // Ensure that the booking end is before the resturant closes.
  // If the three above conditions are satisfied, submit the booking.
  // Otherwise, return an error.

  if((parseInt(bookingEnd) <= parseInt(closeTime)) 
    && (parseInt(bookingStart) >= parseInt(openTime))
    && (parseInt(bookingStart) < parseInt(bookingEnd))){

    console.log("Booking succeeded!");

    // TODO: Write to the reservations database.
    // #REFERENCE:
    // https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
    const dataToWrite = {

        BookingStart: bookingStart,
        BookingEnd: bookingEnd,
        RestaurantID: parseInt(restaurantID),
        RestaurantName: restaurantName,
        UserID: parseInt(userID),
        BookingDate: bookingDate

    };

    const response = await db.collection("Reservations").add(dataToWrite);


  } else{
    console.log("Booking failed");
  }

  // Send back the contents of the query.

  res.setHeader("Content-Type", "application/json");
  
  res.send(jsonReturnVals);
});