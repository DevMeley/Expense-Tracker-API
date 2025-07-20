const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')
const Category = require('./category')
const { FOREIGNKEYS } = require('sequelize/lib/query-types')


const Expense = sequelize.define('Expense', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    amount:{
        type: DataTypes.DECIMAL,
        allowNul: false,
    },
    naration:{
        type: DataTypes.STRING,
        allowNul: false,
    },
}, {
    timestamps: true,
    tableName: 'Expense',  // Explicitly specify the table name
    freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
})

Expense.belongsTo(Category, {foreignKey:{catName:"name"}})
Expense.belongsTo(User)

module.exports = Expense