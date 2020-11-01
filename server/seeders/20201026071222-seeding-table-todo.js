'use strict';
const data = require('../todo.json')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    data.forEach(data => {
      data.createdAt = new Date()
      data.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Todos', data, {})

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {})
  }
};
