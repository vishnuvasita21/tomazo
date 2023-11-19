
// #REFERENCE: Code modified from:
// https://firebase.google.com/docs/functions/get-started?gen=2nd
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// import firebase from "firebase/app"
// import { doc, addDoc } from "firebase/firestore";

initializeApp();

exports.bookReservation = onRequest(async (req, res) => {
  // Get various request parameters.
  const userID = req.query.userID;
  const restaurantID = req.query.restaurantID;
  const tableID = req.query.tableID;
  const bookingStart = req.query.bookingStart;
  const bookingEnd = req.query.bookingEnd;
  const bookingDate = req.query.bookingDate;

  console.log("userID:", userID);
  console.log("restaurantID:", restaurantID);
  console.log("tableID:", tableID);
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

  let targetURLRestaurant = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getRestaurantByID/";
  targetURLRestaurant = targetURLRestaurant.concat(restaurantID);

  console.log("TargetURLRestaurant", targetURLRestaurant);

  const fetch = require("node-fetch");

  const responseJSONRestaurant = await fetch(targetURLRestaurant)
    .then(response => response.json())
    .catch((e)=> {});

  const openTime = responseJSONRestaurant.OpenHour;
  const closeTime = responseJSONRestaurant.CloseHour;
  const restaurantName = responseJSONRestaurant.RestaurantName;

  console.log("Open time:", openTime);
  console.log("Close time:", closeTime);
  console.log("Restaurant name:", restaurantName);

  console.log("Response JSON Restaurant:", responseJSONRestaurant);

  let targetURLTable = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getTableStatus";

  console.log("Target Table URL:", targetURLTable);

const requestData = JSON.stringify({
  RestaurantID: parseInt(restaurantID), 
  TableID: parseInt(tableID)});
console.log("Request data: ", requestData);

const responseJSONTable = await fetch(targetURLTable, {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  body: requestData
 })
 .then(response => response.json())
 .catch((e)=> {});

  console.log("Response JSON Table:", responseJSONTable);
  let tableStatus = responseJSONTable.TableStatus;
  
  console.log("Table Status:", tableStatus);

  // Ensure that the booking end is after the booking start.
  // Ensure that the booking start is after the restaurant opens.
  // Ensure that the booking end is before the resturant closes.
  // Ensure that the table is not reserved.
  // TODO: Ensure that there are no existing bookings for this table on
  // this date at this time.
  // If the above conditions are satisfied, submit the booking.
  // Otherwise, return an error.

  const query = db.collection("Reservations")
    .where("BookingStart", "==", bookingStart)
    .where("BookingDate", "==", bookingDate)
    .where("TableID", "==", parseInt(tableID))
    .where("RestaurantID", "==", parseInt(restaurantID))
    .where("BookingStatus", "==", "Approved");

  let bookingExists = true;

  const snapshot = await query.get();
  let jsonReturnValsBooking = {};
  if (snapshot.empty) {
    let message = "Booking success! No existing approved booking found for the specified date, time, table.";
    console.log(message);
    jsonReturnValsBooking = JSON.stringify(message);
    bookingExists = false;
  } else {
    // REFERENCE:
    // https://stackoverflow.com/questions/16507222/create-json-object-dynamically-via-javascript-without-concate-strings
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      jsonReturnValsBooking[doc.id] = doc.data();
    });
  }

  console.log(jsonReturnValsBooking);

  if((parseInt(bookingEnd) <= parseInt(closeTime)) 
    && (parseInt(bookingStart) >= parseInt(openTime))
    && (parseInt(bookingStart) < parseInt(bookingEnd))
    && (!bookingExists)
    && (tableStatus === "Open")){

    console.log("Booking succeeded!");

    // #REFERENCE:
    // https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
    const dataToWrite = {

        BookingStart: bookingStart,
        BookingEnd: bookingEnd,
        RestaurantID: parseInt(restaurantID),
        RestaurantName: restaurantName,
        UserID: parseInt(userID),
        TableID: parseInt(tableID),
        BookingDate: bookingDate,
        BookingStatus: "Pending"

    };

    const response = await db.collection("Reservations").add(dataToWrite);
    
  } else{
    console.log("Booking failed");
  }

  // Send back the contents of the query.

  res.setHeader("Content-Type", "application/json");
  
  res.send(jsonReturnValsBooking);
});
