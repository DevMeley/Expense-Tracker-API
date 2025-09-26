// create expense
// get all user expenses(filter by category)
// get single expenses by id
// update expense
// delete expense


const Expense = require('../../models/expense')
const Category = require('../../models/category')
const User = require('../../models/user')
const { Op } = require('sequelize')
const {createObjectCsvWriter} = require('csv-writer')
const path = require('path')
const fs = require('fs')
const { title } = require('process')
const { error } = require('console')


// @desc create Expenses
// @route POST v1/expenses
// @access private
const createExpenseHandler = async (req, res) => {
    try {
        const user = req.user.id
        
        const {catName, amount, naration} = req.body
        if (typeof catName !== 'string') {
            return res.status(401).json({
                message:"category id must be a string"
            })
        }
        if (typeof amount !== 'number') {
            return res.status(401).json({
                message:"amount must be a number"
            })
        }
        if (typeof naration !== 'string') {
            return res.status(401).json({
                message:"description must be a string"
            })
        }

        const aCategory = await Category.findOne({ where: { catName: catName} })
        if (!aCategory) {
            return res.status(404).json({
                message:"category not found"
            })
        }

        const expense = await Expense.create({
            amount,
            naration,
            catName
        })

        expense.setUser(user)
        expense.setCategory(aCategory)

        res.status(201).json(expense)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc retrieve user expenses
// @routes GET v1/expenses
// access private
// const getUserExpenseHandler = async (req, res) => {
//     try {
//         const user = req.user
//         let {filter, search ,startDate, endDate, catName, amount} =req.query

//         if (filter) {
//             if (typeof filter !== 'string') {
//                 return res.status(401).json({
//                     message: 'it must be string'
//                 })
//             }
//             const aCategory = await Category.findOne({
//                 where: {
//                     catName: filter
//                 }
//             })
//             if (!aCategory) {
//                 return res.status(404).json({
//                     message:"category not found"
//                 })
//             }
//             const expenses = await Expense.findAll({
//                 where: {
//                     UserId: user.id,
//                     CategoryId: aCategory.id
//                 },
//                 order: [['createdAt', 'DESC']]
//             })

//             res.status(201).json(expenses)

//         }

//         if (search) {
//             if (typeof search !== 'string') {
//                 return res.status(400).json({
//                     message: 'Search keyword must be a string'
//                 })
//             }

//             const expenses = await Expense.findAll({
//                 where:{
//                     naration:{ 
//                         [Op.like]: `%${search}%`
//                     }
//                 }
//             })

//             return res.status(200).json(expenses)
//         }

//         if (startDate && endDate) {
//             startDate = new Date(startDate)
//             endDate = new Date(endDate)

//             const expense  = await Expense.findAll({
//                 where: {
//                     createdAt: {
//                         UserId: user.id,
//                         [Op.between]: [startDate, endDate]
//                     }
//                 }
//             })

//             return res.status(201).json(expense)
//         }

//         if (catName) {
//             if (typeof catName !== 'string') {
//                 return res.status(401).json({
//                     message: 'Name must be a string'
//                 })
//             }
//             if (!catName) {
//                 return res.status(404).json({
//                     message: 'Name Not found'
//                 })
//             }

//             const aCategory = await Category.findOne({
//                 where:{
//                     catName: catName
//                 }
//             })

//             if (!aCategory) {
//                 return res.status(404).json({
//                     message: 'Name Not found'
//                 })
//             }

//             const expenses = await Expense.findAll({
//                 where:{
//                     UserId: user.id,
//                     CategoryId: aCategory.id
//                 }
//             })

//             return res.status(200).json(expenses)
            
//         }

//         if (amount) {
//             if (typeof amount !== 'string') {
//                 return res.status(401).json({
//                     message: 'Amount must be a string'
//                 })
//             }
//             if (!amount) {
//                 return res.status(404).json({
//                     message: 'Amount not found'
//                 })
//             }

//             const expenses = await Expense.findAll({
//                 where:{
//                     amount: amount
//                 }
//             })
//             return res.status(201).json(expenses)
//         }
        
//         const expenses = await Expense.findAll({
//             where: {
//                 UserId: user.id
//             }
//         })
//         return res.status(202).json(expenses)
        
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// }
const getUserExpenseHandler = async (req, res) => {
    try {
        const userId = req.user.id
        const allExpenses = await Expense.findAll({where: {UserId:userId}})
        if (!allExpenses) {
            res.status(400).json({
                message: "You do not have any expenses"
            })
        }
        return res.status(200).json(allExpenses)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @desc retrieve an Expense
// @route GET /v1/expenses/:id
// access private
const getAnExpenseHandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }

        const anExpense = await Expense.findByPk(id)
        if (!anExpense) {
            return res.status(404).json({
                message:'Expense not found'
            })
        }

        return res.status(200).json(anExpense)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc update an Expense
// @route PUT /v1/expenses/:id
// access private
const updateExpensesHandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(401).json({
                message:"id must be a string"
            })
        }
        const {amount, naration, catName} = req.body
        if (typeof catName !== 'string') {
            return res.status(401).json({
                message:"category id must be a string"
            })
        }
        if (typeof amount !== 'number') {
            return res.status(401).json({
                message:"amount must be a number"
            })
        }
        if (typeof naration !== 'string') {
            return res.status(401).json({
                message:"description must be a string"
            })
        }

        const aCategory = await Category.findOne(catName)
        if (!aCategory) {
            return res.status(404).json({
                message:"category not found"
            })
        }

        const anExpense = await Expense.findByPk(id)
        if (!anExpense) {
            return res.status(404).json({
                message:'Expense not found'
            })
        }

        // update
        anExpense.amount = amount,
        anExpense.naration = naration,
        
        await anExpense.save()

        anExpense.setCategory(aCategory)

        res.status(200).json(anExpense)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc get expense summary
// route GET /v1/expenses/summary
// access private
const getAnExpenseSummaryHandler = async (req, res) => {
    try {
        const userId = req.user.id
        let {startDate, endDate} = req.query
        let expenses = []

        if (startDate && endDate) {
            startDate = new Date(startDate)
            endDate = new Date(endDate)
            endDate.setDate(endDate.getDate() + 1)

            expenses  = await Expense.findAll({
                where: {
                    UserId: user.id,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            })
        }else{
            expenses = await Expense.findAll({
                where:{
                    UserId: userId
                }
            })
        }


        let total = 0
        let average = 0
        expenses.forEach(expenses =>{
            total += Number(expenses.amount)
        })
        if (expenses.length > 0) {
            average = total / expenses.length
        }

        res.status(200).json({
            total,
            average
        })

    } 
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc download expense statement
// @route GET v1/expense/statement/download
// @access private
const downloadExpenseStatementHandler = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where:{
                UserId: req.user.id
            }
        })

        console.log('__dirname')
        const filePath = path.join(__dirname, 'expenses.csv')
        
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header:[
                {id: 'id', title: 'title'},
                {id: 'amount',title: 'Amount'},
                {id: 'naration', title: 'Naration'},
                {id: 'createdAt', title:'Created At'}
            ]
        })

        const expensesData = expenses.map(expense =>({
            id: expense.id,
            amount: expense.amount,
            naration: expense.naration,
            catName:expense.catName,
            createdAt: expense.createdAt.toISOString().split('T')[0]
        }))

        await csvWriter.writeRecords(expensesData)

        res.download(filePath, 'expenses.csv', (error) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                })
            }
    
            fs.unlinkSync(filePath)
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @desc delete expense
// route DELETE /v1/expenses/:id
// access private
const deleteExpenseHandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'id must be a string'
            })
        }

        const anExpense = await Expense.findByPk(id)
        if (!anExpense) {
            return res.status(404).json({
                message:'Expense not found'
            })
        }

        anExpense.destroy()
        res.status(200).json({
            message:'expense deleted successfully'
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createExpenseHandler,
    getUserExpenseHandler,
    getAnExpenseHandler,
    updateExpensesHandler,
    getAnExpenseSummaryHandler,
    downloadExpenseStatementHandler,
    deleteExpenseHandler
}