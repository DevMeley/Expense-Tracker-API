const Budget = require("../../models/budget");
const Expenses = require("../../models/expense");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const { Op } = require("sequelize");

// @desc Set Budget limit
// route POST /v1/budget
// @access private
const setBudgetLimit = async (req, res) => {
  try {
    const { limit } = req.body;
    const userId = req.user.id;

    if (typeof limit !== "number") {
      return res.status(400).json({
        message: "Limit must be a number",
      });
    }
    if (limit === null || limit === undefined) {
      return res.status(400).json({
        message: "Budget limit is required",
      });
    }

    let budgetLimit = await Budget.findOne({ where: { userId } });

    if (budgetLimit) {
      return res.status(400).json({
        message: "You already have a budget limit set",
        budgetLimit,
      });
    }

    budgetLimit = await Budget.create({
      limit,
      userId,
    });

    res.status(201).json({
      message: "Budget limit set successfully",
      budgetLimit,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// retrieve budgetLimit
const getBudgetLimitHandler = async (req, res) => {
  const userId = req.user.id
  try {
    const budget = await Budget.findAll({where: {userId}});
    return res.status(200).json(budget);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc change/update limit
// @route PUT limit
// @access private
const updateLimitHandler = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params;
    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Id must be a string",
      });
    }
    const { limit } = req.body;
    if (typeof limit !== "number") {
      return res.status(400).json({
        message: "Limit must be in number",
      });
    }

    const budgetLimit = await Budget.findOne({where: {userId}});
    if (!budgetLimit) {
      return res.status(404).json({
        message: "Cannot find limit",
      });
    }

    // change/Update limit
    budgetLimit.limit = limit;

    await budgetLimit.save();

    // budgetLimit .setLimit(id)

    return res.status(200).json(budgetLimit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// check for budget limit
// @desc get budget limit
// @route GET v1/budgetlimit
// @access private
const checkBudgetLimit = async (req, res) => {
  try {
    const userId = req.user.id;
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Start date and end date are required",
      });
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const totalExpenses =
      (await Expenses.sum("amount", {
        where: {
          userId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      })) || 0;

    const budgetLimit = await Budget.findOne({
      where: { userId },
    });

    if (!budgetLimit) {
      return res.status(404).json({
        message: "Budget limit not set for this user",
      });
    }

    const overBudget = totalExpenses > budgetLimit.limit;

    const statusMessage = overBudget
      ? "You have exceeded your budget"
      : "You are within budget";

    // Fetch last notification
    const lastNotification = await Notification.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    // create a new notification if status changed
    if (!lastNotification || lastNotification.description !== statusMessage) {
      await Notification.create({
        description: statusMessage,
        userId,
      });
    }

    return res.status(200).json({
      message: statusMessage,
      totalExpenses,
      budgetLimit: budgetLimit.limit,
      overBudgetAmount: overBudget ? totalExpenses - budgetLimit.limit : 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  setBudgetLimit,
  checkBudgetLimit,
  updateLimitHandler,
  getBudgetLimitHandler,
};
