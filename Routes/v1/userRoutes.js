const express = require('express')
const {createUserHandler, getUserHandler, loginUSerHandler} = require('../../controllers/v1/userController')
const authenticateToken = require('../../middleware/Oauth')
const router = express.Router()


router.post('', createUserHandler)
router.get('/:id', authenticateToken, getUserHandler)
router.post('/login', loginUSerHandler)



module.exports = router