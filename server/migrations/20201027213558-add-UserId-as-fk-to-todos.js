'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Todos', 
      'UserId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        after: 'status',
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Todos', 'UserId')
  }
};
