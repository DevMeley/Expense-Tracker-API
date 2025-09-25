// middleware/auth.js
const admin = require('../firebase-admin');
const SyncUser = require("../utils/SyncUser");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    // decodedToken has uid, email, name, picture
    const firebaseUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || "",
      photoURL: decodedToken.picture || ""
    };

    // Sync with DB
    const dbUser = await SyncUser(firebaseUser);

    // Attach dbUser to req
    req.user = dbUser;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;