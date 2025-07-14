const express = require('express')
const {
    createCategoryHandler,
    getCategoriesHandler,
    getCategoryHandler,
    updateCategoryHandler,
    deleteCategoryhandler
} = require('../../controllers/v1/categoryController')
const validateToken = require('../../middleware/auth')
const authenticateToken = require("../../middleware/Oauth")
const router = express.Router()

router.post('', validateToken, authenticateToken, createCategoryHandler)
router.get('', getCategoriesHandler)
router.get('/:id', getCategoryHandler)
router.put('/:id', validateToken, updateCategoryHandler)
router.delete('/:id', deleteCategoryhandler)

module.exports = router