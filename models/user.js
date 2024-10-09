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
    name:{
        type: Datatypes.STRING,
        allowNul: false,
    },
    email:{
        type: Datatypes.STRING,
        allowNul: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: Datatypes.STRING,
        allowNul: false,
    }
}, {
    timestamps: true
})