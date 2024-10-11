const {DataTypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')


const Notification = sequelize.define('Notification', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true
    },
    UserId:{
        type: DataTypes.UUID,
        references:{
            model: User,
            key: 'id'
        }
    },
    description:{
        type: DataTypes.STRING
    }
}, {
    timestamps: true
})


module.exports = Notification