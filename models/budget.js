const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('../models/user')

const Budget = sequelize.define('Budget', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    limit:{
        type: DataTypes.DECIMAL,
        allowNull: false
    }


},{
    timestamps: true,
    tableName: 'Budget',
    freezeTableName: true
})

Budget.belongsTo(User)

module.exports = Budget