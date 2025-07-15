const express = require('express')
const validateToken = require('../../middleware/auth')
const {getNotificationHandler} = require('../../controllers/v1/notificationController')
const authenticateToken = require('../../middleware/Oauth')

const router = express.Router()

router.get('/user', authenticateToken, getNotificationHandler)

module.exports = router