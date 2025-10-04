'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Category', {
      fields: ['userId', 'catName'],
      type: 'unique',
      name: 'unique_user_category_constraint', 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Category', 'unique_user_category_constraint');
  },
};
