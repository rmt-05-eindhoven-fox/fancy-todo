'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ToDos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING, 
        allowNull : false
      },
      description: {
        type: Sequelize.STRING, 
        allowNull : false
      },
      status: {
        type: Sequelize.BOOLEAN, 
        allowNull : false
      },
      due_date: {
        type: Sequelize.DATE, 
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ToDos');
  }
};