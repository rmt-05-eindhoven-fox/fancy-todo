'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkInsert('Todos', [{}], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});   
  }
};
