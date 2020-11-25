'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return [
        queryInterface.addColumn('todos', 'creator_id', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }),
        queryInterface.addColumn('todos', 'project_id', {
            type: Sequelize.INTEGER,
            references: {
              model: 'projects',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        })
      ];
  },

  down: async (queryInterface, Sequelize) => {
      return [
          queryInterface.removeColumn('todos', 'creator_id'),
          queryInterface.removeColumn('todos', 'project_id')
      ];
  }
};
