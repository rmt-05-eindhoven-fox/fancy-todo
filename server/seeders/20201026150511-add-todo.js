'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../seed.json")
    data.forEach(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Todos',data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
