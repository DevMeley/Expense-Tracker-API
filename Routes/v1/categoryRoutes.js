const express = require('express')
const {
    createCategoryHandler,
    getCategoriesHandler,
    getCategoryHandler,
    updateCategoryHandler,
    deleteCategoryhandler
} = require('../../controllers/v1/categoryController')
const authenticateToken = require("../../middleware/Oauth")
const router = express.Router()

router.post('',  authenticateToken, createCategoryHandler)
router.get('', authenticateToken, getCategoriesHandler)
router.get('/:id', getCategoryHandler)
router.put('/:id', authenticateToken, updateCategoryHandler)
router.delete('/:id', deleteCategoryhandler)

module.exports = router