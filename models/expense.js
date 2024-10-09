const {Datatypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')
const Category = require('./category')


const Expense = sequelize.define('Expense', {
    id:{
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey:true,
    },
    amount:{
        type: Datatypes.DECIMAL,
        allowNul: false,
    },
    naration:{
        type: Datatypes.STRING,
        allowNul: false,
    },
    UserId:{
        type: Datatypes.UUID,
        references:{
            model: User,
            key: 'id'
        }
    },
    CategoryId:{
        type: Datatypes.UUID,
        references:{
            model: Category,
            key: 'id'
        }
    }
}, {
    timestamps: true
})

module.exports = Expense