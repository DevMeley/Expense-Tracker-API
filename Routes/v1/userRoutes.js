const express = require('express')
const {createUserHandler, getUserHandler, loginUSerHandler} = require('../../controllers/v1/userController')
const validateToken = require('../../middleware/auth')
const router = express.Router()


router.post('', createUserHandler)
router.get('/:id', validateToken, getUserHandler)
router.post('/login', loginUSerHandler)


module.exports = router