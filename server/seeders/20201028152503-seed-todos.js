'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let todos = JSON.parse(fs.readFileSync('./data_for_seed/todos.json')) 
    await queryInterface.bulkInsert('Todos', todos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};