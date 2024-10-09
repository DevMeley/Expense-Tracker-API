'use strict';

// const sequelize = require('../db');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true,
      },
    name:{
        type: Sequelize.STRING,
        allowNul: false,
      },
    email:{
        type: Sequelize.STRING,
        allowNul: false,
        unique: true,
        validate:{
            isEmail: true
        }
      },
    password:{
        type: Sequelize.STRING,
        allowNul: false,
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
    await queryInterface.dropTable('User')
  }
};
