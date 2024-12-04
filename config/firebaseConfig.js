// config/firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./event-creator-f599a-firebase-adminsdk-63o5w-22968b8d68.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;