'use strict';

// const sequelize = require('../db');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Expense', {
      id:{
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey:true,
      },
      amount:{
          type: Sequelize.DECIMAL,
          allowNul: false,
      },
      naration:{
          type: Sequelize.STRING,
          allowNul: false,
      },
      UserId:{
          type: Sequelize.UUID,
          references:{
              model: 'User',
              key: 'id'
          }
      },
      CategoryId:{
          type: Sequelize.UUID,
          references:{
              model: 'Category',
              key: 'id'
          }
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Expense')
  }
};
