const {DataTypes, Model} = require('sequelize')
const sequelize = require('../db')


const Category = sequelize.define('Category', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    catName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    }
}, {
    timestamps: true,
    tableName: 'Category',  // Explicitly specify the table name
    freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
})

Category.associate = (models) =>{
    Category.hasMany(models.Expense)
}

module.exports = Category