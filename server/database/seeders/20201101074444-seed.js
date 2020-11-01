'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
      const url = require('../urls.json')

      url.forEach(el => {
         el.createdAt = new Date()
         el.updatedAt = new Date()
      })

      return queryInterface.bulkInsert('Photos', url, {})
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {})
   }
};