const admin = require('firebase-admin');
const serviceAccount = require('./expense-tracker-7149f-firebase-adminsdk-fbsvc-90dcf648f4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;