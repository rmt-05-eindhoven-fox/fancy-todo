'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', [{
      title: "api server",
      description: "learn how to do it",
      status: "on progress",
      due_date: "2020-10-27",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "server",
      description: "learn how to do server",
      status: "hasn't started",
      due_date: "2020-10-27",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null)
  }
};
