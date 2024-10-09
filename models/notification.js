const {Datatypes} = require('sequelize')
const sequelize = require('../db')
const User = require('./user')


const Notification = sequelize.define('Notification', {
    id:{
        type: Datatypes.UUID,
        defaultValue: Datatypes.UUIDV4,
        primaryKey: true
    },
    UserId:{
        type: Datatypes.UUID,
        references:{
            model: User,
            key: 'id'
        }
    },
    description:{
        type: Datatypes.STRING
    }
}, {
    timestamps: true
})


module.exports = Notification