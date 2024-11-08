const express = require('express')
const validateToken = require('../../middleware/auth')
const {getNotificationHandler} = require('../../controllers/v1/notificationController')

const router = express.Router()

router.get('/user', validateToken, getNotificationHandler)

module.exports = router