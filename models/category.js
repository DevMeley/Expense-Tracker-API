const {DataTypes} = require('sequelize')
const sequelize = require('../db')


const Category = sequelize.define('Category', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Category