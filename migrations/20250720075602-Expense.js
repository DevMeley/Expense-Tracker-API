'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Expense', {
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
    }, {
        timestamps: true,
        tableName: 'Expense',  // Explicitly specify the table name
        freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
    })
    
    Expense.belongsTo(Category, {foreignKey:{catName:"name"}})
    Expense.belongsTo(User)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Expense')
  }
};
