const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')
const Category = require('./category')


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
    catName: {  
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Category,
            key: 'name' 
        }
    }
}, {
    timestamps: true,
    tableName: 'Expense',  
    freezeTableName: true,  
})

Expense.belongsTo(Category, {
    foreignKey: 'catName',
    targetKey: 'name' 
})
Expense.belongsTo(User)

module.exports = Expense