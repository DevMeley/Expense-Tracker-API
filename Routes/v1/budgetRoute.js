const express = require('express')
const validateToken = require('../../middleware/auth')
const {setBudgetLimit, checkBudgetLimit, updateLimitHandler, getBudgetLimitHandler} = require('../../controllers/v1/budgetController')
const authenticateToken = require('../../middleware/Oauth')
const router = express.Router()

router.post('', authenticateToken, setBudgetLimit)
router.get('', authenticateToken, checkBudgetLimit)
router.put('/:id', authenticateToken, updateLimitHandler)
router.get('/limit', authenticateToken, getBudgetLimitHandler)

module.exports = router 