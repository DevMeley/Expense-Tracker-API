"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Expense", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNul: false,
      },
      naration: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      catName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Category",
          key: "catName",
        },
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Expense")
  },
};
