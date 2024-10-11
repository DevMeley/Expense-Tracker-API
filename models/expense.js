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
    UserId:{
        type: DataTypes.UUID,
        references:{
            model: User,
            key: 'id'
        }
    },
    CategoryId:{
        type: DataTypes.UUID,
        references:{
            model: Category,
            key: 'id'
        }
    }
}, {
    timestamps: true
})

module.exports = Expense