// routes/protected.js
const express = require('express');
const authenticateToken = require('../../middleware/Oauth');
const router = express.Router();

router.get('/user', authenticateToken, (req, res) => {
  res.json({
    message: 'Access granted',
    user: {
      uid: req.user.uid,
      email: req.user.email,
      name: req.user.name,
      profilePhoto: req.user.photoURL
    }
  });
});

module.exports = router;