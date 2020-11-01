'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('UserProjects', {
      fields : ['ProjectId'],
      type : 'foreign key', 
      name : 'fk-from-conjunction-to-Project',
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
    await queryInterface.removeConstraint('UserProjects', 'fk-from-conjunction-to-Project')
  }
};
