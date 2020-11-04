'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      const todos = require('../todos.json')

      todos.forEach(el => {
         el.createdAt = new Date()
         el.updatedAt = new Date()
      })

      return queryInterface.bulkInsert('Todos', todos, {})
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Todos', null, {})
   }
};