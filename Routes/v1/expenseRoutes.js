const express = require('express')
const {
    createExpenseHandler,
    getUserExpenseHandler,
    getAnExpenseHandler,
    updateExpensesHandler,
    getAnExpenseSummaryHandler,
    downloadExpenseStatementHandler,
    deleteExpenseHandler,
    } = require('../../controllers/v1/expenseController')
const validateToken = require('../../middleware/auth')

const router = express.Router()


router.get('/summary', validateToken, getAnExpenseSummaryHandler)
router.post('', validateToken, createExpenseHandler)
router.get('', validateToken, getUserExpenseHandler)
router.get('/:id', validateToken, getAnExpenseHandler)
router.put('/:id', validateToken, updateExpensesHandler)
router.get('/statement/download', validateToken, downloadExpenseStatementHandler)
router.delete('/:id', validateToken, deleteExpenseHandler)



module.exports = router