const express = require('express')
const {createUserHandler} = require('../../controllers/v1/userController')
const router = express.Router()


router.post('', createUserHandler)


module.exports = router