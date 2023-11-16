/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const admin = require("firebase-admin");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

admin.initializeApp();
console.log('connected')

const firestore = admin.firestore();

exports.getRestaurantMenu = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const restaurantId = request.query.restaurantId;

    const menuItemsQuery = await firestore
      .collection('restaurantMenu')
      .where('restaurantId', '==', parseInt(restaurantId))
      .get();
    const menuItems = [];
    menuItemsQuery.forEach((doc) => {
      menuItems.push({ id: doc.id, ...doc.data() });
      console.log(doc.id)
    });

    return response.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching restaurant meals:', error);
    return response.status(500).json({ error: 'Failed to fetch restaurant meals.' });
  }
});
});

exports.deleteResertaurantMenu = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const docId = request.query.docId; 
    const docRef = firestore.collection('restaurantMenu').doc(docId).delete();

    return response.status(200).json({ message: 'Restaurant menu deleted' });
  } catch (error) {
    console.error('Error deleting restaurant menu :', error);
    return response.status(500).json({ error: 'Failed to delete restaurant menu.' });
  }
});
});

exports.addRestaurantMenu = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const requestData = request.body; 
    const docRef = await firestore.collection('restaurantMenu').add(requestData);

    return response.status(201).json({ message: 'menu added', id: docRef.id });
  } catch (error) {
    console.error('Error adding menu:', error);
    return response.status(500).json({ error: 'Failed to add menu.' });
  }
});
});

exports.updateRestaurantMenu = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const docId = request.query.docId;
    const updatedData = request.body; 

    const docRef = firestore.collection('restaurantMenu').doc(docId).update(updatedData);

    return response.status(200).json({ message: 'Restaurant menu updated' });
  } catch (error) {
    console.error('Error updating restaurant menu:', error);
    return response.status(500).json({ error: 'Failed to update restaurant menu.' });
  }
});
});

exports.addRestaurantMenuDiscount = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const requestData = request.body; 
    const docRef = await firestore.collection('restaurantMenuDiscounts').add(requestData);

    return response.status(201).json({ message: 'discounts for the menu added', id: docRef.id });
  } catch (error) {
    console.error('Error adding discounts for the menu:', error);
    return response.status(500).json({ error: 'Failed to add discounts for the menu.' });
  }
});
});

exports.getRestaurantMenuDiscounts = onRequest((request, response) => {
  cors(request, response, async () => {
  try {
    const restaurantId = request.query.restaurantId;

    const menuDiscountQuery = await firestore
      .collection('restaurantMenuDiscounts')
      .where('restaurantId', '==', parseInt(restaurantId))
      .get();
    const menuDiscounts = [];
    menuDiscountQuery.forEach((doc) => {
      menuDiscounts.push({ id: doc.id, ...doc.data() });
      console.log(doc.id)
    });

    return response.status(200).json(menuDiscounts);
  } catch (error) {
    console.error('Error fetching restaurant discounts on menu:', error);
    return response.status(500).json({ error: 'Failed to fetch restaurant discounts on menu.' });
  }
});
});




