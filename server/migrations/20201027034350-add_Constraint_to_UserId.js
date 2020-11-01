'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addConstraint('Todos', {
      fields : ['UserId'],
      type : 'foreign key',
      name : 'fk_to_user',
      references : {
        table : 'Users',
        field : "id"
      },
      onDelete : 'cascade',
      onUpdate : 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('Todos', 'fk_to_user')
  }
};
