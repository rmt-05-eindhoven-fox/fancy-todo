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

    await queryInterface.bulkInsert('Todos', [{
      title: 'task 1',
      description: 'finsih REST API docs',
      status: 'on progess',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'task 12',
      description: 'finsih REST API CRUD',
      status: 'on progess',
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
