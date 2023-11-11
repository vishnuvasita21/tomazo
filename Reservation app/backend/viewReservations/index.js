
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