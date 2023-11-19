
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

exports.deleteReservationRestaurant = onRequest(async (req, res) => {
  // Get reservation ID
  const documentID = req.query.documentID;

  const jsonReturnVals = {};

  console.log("documentID:", documentID);

  const db = getFirestore();

  const response = await db.collection("Reservations").doc(documentID).delete();

  console.log(response);

  res.setHeader("Content-Type", "application/json");
  res.send(jsonReturnVals);
});

