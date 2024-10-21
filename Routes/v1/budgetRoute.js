const express = require('express')
const validateToken = require('../../middleware/auth')
const {setBudgetLimit, checkBudgetLimit, updateLimitHandler} = require('../../controllers/v1/budgetController')
const router = express.Router()

router.post('', validateToken, setBudgetLimit)
router.get('', validateToken, checkBudgetLimit)
router.put('/:id', validateToken, updateLimitHandler)

module.exports = router 