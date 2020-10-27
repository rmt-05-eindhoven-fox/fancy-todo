'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['password'],
      type: 'unique',
      name: 'custom_unique_constraint_password'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'custom_unique_constraint_password')
  }
};
