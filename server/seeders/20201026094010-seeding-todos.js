'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        title: "menanam padi",
        description: 'di halaman belakang',
        status: 'not done',
        due_date: '2020-11-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "memasak nasi",
        description: 'nasi merah',
        status: 'done',
        due_date: '2020-10-30',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Todos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
