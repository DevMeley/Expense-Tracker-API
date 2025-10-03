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
    const { catName } = req.body;
    const userId = req.user.id; 

    if (typeof catName !== "string") {
      return res.status(400).json({
        message: "Category name must be a string",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }

    const category = await Category.create({
      catName,
      userId, 
    });

    res.status(201).json({
      id: category.id,
      catName: category.catName,
      userId: category.userId,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// @desc retrieve categories
// @route GET v1/categories
// @access public
const getCategoriesHandler = async (req, res) => {
    const userId = req.user.id
    try {
        const categories = await Category.findAll({where: {userId}})
        if (!categories) {
            res.status(404).json({
                message:"No catgories"
            })
        }
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
        const {catName} = req.body

        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }

        if (typeof catName !== 'string') {
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
        aCategory.catName = catName
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