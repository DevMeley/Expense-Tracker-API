'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Notification",{
       id:{
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true
          },
          description:{
              type: Sequelize.STRING
          },
     createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Notification")
  }
};
