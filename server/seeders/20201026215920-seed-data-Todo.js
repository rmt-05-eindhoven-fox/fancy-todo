'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Todos', [
     {
      "title" : "API Todo Documentation",
      "description" : "API Todo Documentation",
      "status" : "On Proggress",
      "due_date" : "2020-10-28",
      "createdAt": new Date(),
      "updatedAt": new Date()
     }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Todos', null, {})
  }
};
