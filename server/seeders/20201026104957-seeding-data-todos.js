'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('Todos', [
      {
      title: "Bangun Pagi",
      description: "Olahraga",
      status: false,
      due_date: null,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      title: "Bangun Malam",
      description: "Tahajud",
      status: false,
      due_date: null,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});   
  }
};
