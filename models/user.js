const {DataTypes} = require('sequelize')
const sequelize = require('../db')


const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'User',  // Explicitly specify the table name
    freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
})


User.associate = (models) => {
    User.hasMany(models.Expense)
    User.hasOne(models.Budget)
  }

module.exports = User