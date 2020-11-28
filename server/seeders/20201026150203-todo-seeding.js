'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummy = [
      {
        title: "nge gym",
        description: 'sesuatu',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "jalan jalan",
        description: 'ada',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "ketemu dia",
        description: 'disini',
        status: false,
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Todos', dummy)
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
