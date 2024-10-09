'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createDatabase('Notification', {
      id:{
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },
      UserId:{
          type: Sequelize.UUID,
          references:{
              model: 'User',
              key: 'id'
          }
      },
      description:{
          type: Sequelize.STRING
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
    await queryInterface.dropTable('Notification')
  }
};
