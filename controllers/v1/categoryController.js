// CRUD
// Create category
// retrieve categories(READ)
// retrieve category(READ)
// Delete category

const Category = require('../../models/category')

// Create Category
// @desc create category
// @route POST v1/categories
// @access private
const createCategoryHandler = async (req, res) => {
    try {
        const {name} = req.body
        if (typeof name !== 'string') {
            return res.status(400).json({
                message: 'name must be a string'
            })
        }

        const category = await Category.create({
            name
        })
        
        res.status(201).json({
            id: category.id,
            name: category.name
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc retrieve categories
// @route GET v1/categories
// @access public
const getCategoriesHandler = async (req, res) => {
    try {
        const categories = await Category.findAll()
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc retrieve a category
// route GET v1/categories/:id
// @access public
const getCategoryHandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }
        const aCategory = await Category.findByPk(id)
        if (!aCategory) {
            return res.status(404).json({
                message: 'Cannot find category'
            })
        }
        return res.status(200).json(aCategory)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc update catogory
// @route PUT v1/catogories/:id
// @access private
const updateCategoryHandler = async (req, res) => {
    try {
        // first get the category
        const {id} = req.params
        const {name} = req.body

        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }

        if (typeof name !== 'string') {
            return res.status(400).json({
                message: 'name must be a string'
            })
        }

        const aCategory = await Category.findByPk(id)
        if (!aCategory) {
            return res.status(404).json({
                message: 'Cannot find category'
            })
        }

        // now that i found the category using it's id and name, i then update
        aCategory.name = name
        await aCategory.save()

        return res.status(200).json(aCategory)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc delete category
// @route delete /v1/categories/:id
// @access private
const deleteCategoryhandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }

        const aCategory = await Category.findByPk(id)
        if (!aCategory) {
            return res.status(404).json({
                message: 'cannot finf category'
            })
        }

        await aCategory.destroy()
        return res.status(204).json({
            message:"Successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createCategoryHandler,
    getCategoriesHandler,
    getCategoryHandler,
    updateCategoryHandler,
    deleteCategoryhandler
}