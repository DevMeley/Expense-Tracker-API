const admin = require('firebase-admin');
const serviceAccount = require('./expense-tracker-7149f-firebase-adminsdk-fbsvc-ebfa3fb63d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;