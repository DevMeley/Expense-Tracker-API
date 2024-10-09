const express = require('express')
const {serverHealthCheck} = require('../../controllers/v1/sharedController')

const router = express.Router()

router.get('/health', serverHealthCheck)


module.exports = router