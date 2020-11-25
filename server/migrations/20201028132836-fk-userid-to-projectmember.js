'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('project_members', 'user_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
      }),
      queryInterface.addColumn('project_members', 'project_id', {
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
          queryInterface.removeColumn('project_members', 'user_id'),
          queryInterface.removeColumn('project_members', 'project_id')
      ];
  }
};
