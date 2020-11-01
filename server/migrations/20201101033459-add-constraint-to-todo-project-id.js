'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Todos', {
      fields : ['ProjectId'],
      type : 'foreign key',
      name : 'fkey_to_Projects',
      references : {
        table : 'Projects',
        field : 'id'
      },
      onDelete : 'cascade',
      onUpdate : 'cascade'

    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Todos', 'fkey_to_Projects')
  }
};
