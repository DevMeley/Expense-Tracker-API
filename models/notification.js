const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')


const Notification = sequelize.define('Notification', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'Notification',  // Explicitly specify the table name
    freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
})

Notification.belongsTo(User)


module.exports = Notification