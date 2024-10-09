'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createDatabase('Cetegory', {
      id:{
          type: Sequelize.UIUD,
          defaultValue: Sequelize.UIUDV4,
          primaryKey: true
      },
      name:{
          type: Sequelize.STRING,
          allowNull: false
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
    await queryInterface.dropTable('Category')
  }
};