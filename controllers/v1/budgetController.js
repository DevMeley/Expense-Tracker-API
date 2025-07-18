const Budget = require('../../models/budget')
const Expenses = require('../../models/expense')
const User = require('../../models/user')
const Notification = require('../../models/notification')
const {Op} = require('sequelize')

// @desc Set Budget limit
// route POST /v1/budget
// @access private
const setBudgetLimit = async (req, res) => {
    try {
        const {limit} = req.body
        const user = req.user

        if (typeof limit !== 'number') {
            return res.status(400).json({
                message: 'Limit must be in number'
            })
        }
        if (limit === null) {
            return res.status(400).json({ 
                message: 'Budget limit is required' 
            });
        }

        const budgetLimit = await Budget.create({
            limit: limit
        })
        budgetLimit.setUser(user)

        res.status(201).json(budgetLimit)

    } catch (error) {
        return  res.status(500).json({
            message: error.message
        })
    }
}

// retrieve budgetLimit
const getBudgetLimitHandler = async (req, res) => {
    try {
        const budget = await Budget.findAll()
        return res.status(200).json(budget)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// @desc change/update limit
// @route PUT limit
// @access private
const updateLimitHandler = async (req, res) => {
    try {
        const {id} = req.params
        if (typeof id !== 'string') {
            return res.status(400).json({
                message: 'Id must be a string'
            })
        }
        const {limit} = req.body
        if (typeof limit !== 'number') {
            return res.status(400).json({
                message: 'Limit must be in number'
            })
        }
        
        const budgetLimit = await Budget.findByPk(id)
        if (!budgetLimit) {
            return res.status(404).json({
                message: 'Cannot find limit'
            })
        }

        // change/Update limit
        budgetLimit.limit = limit

        await budgetLimit .save()

        // budgetLimit .setLimit(id)

        return res.status(200).json(budgetLimit)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// check for budget limit
// @desc get budget limit
// @route GET v1/budgetlimit
// @access private
const checkBudgetLimit = async (req, res) => {
    try {
        const user = req.user;
        let { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ 
                message: 'Start date and end date are required' 
            })
        }

        startDate = new Date(startDate)
        endDate = new Date(endDate)

        const totalExpenses = await Expenses.sum('amount', {
            where: {
                UserId: user.id,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })

        const budgetLimit = await Budget.findOne({
            where: { 
                UserId: user.id 
            }
        })
        console.log(budgetLimit)
        if (!budgetLimit) {
            return res.status(404).json({ 
                message: 'Budget limit not set for this user' 
            })
        }

        const overBudget = totalExpenses > budgetLimit.limit;
        if (overBudget) {
            await Notification.create({
                description: 'You have exceeded your budget',
                UserId: user.id
            })
            res.status(200).json({
                message: 'You have exceeded your budget',
                totalExpenses: totalExpenses,
                budgetLimit: budgetLimit.limit,
                overBudgetAmount: totalExpenses - budgetLimit.limit
            })
        } else{
            await Notification.create({
                description: 'You are within Budget',
                UserId: user.id
            })
            res.status(200).json({
                message: 'You are within Budget',
                totalExpenses: totalExpenses,
                budgetLimit: budgetLimit.limit,
                overBudgetAmount: totalExpenses - budgetLimit.limit
            })
        }

        // res.status(200).json({
        //     message: overBudget ? 'You have exceeded your budget' : 'You are within budget',
        //     totalExpenses: totalExpenses,
        //     budgetLimit: budgetLimit.limit,
        //     overBudgetAmount: overBudget ? totalExpenses - budgetLimit.limit : 0
        // })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    setBudgetLimit,
    checkBudgetLimit,
    updateLimitHandler,
    getBudgetLimitHandler
}