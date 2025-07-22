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
const authenticateToken = require('../../middleware/Oauth')

const router = express.Router()


router.get('/summary', authenticateToken, getAnExpenseSummaryHandler)
router.post('', authenticateToken, createExpenseHandler)
router.get('', authenticateToken, getUserExpenseHandler)
router.get('/:id', authenticateToken, getAnExpenseHandler)
router.put('/:id', authenticateToken, updateExpensesHandler)
router.get('/statement/download', authenticateToken, downloadExpenseStatementHandler)
router.delete('/:id', authenticateToken, deleteExpenseHandler)



module.exports = router