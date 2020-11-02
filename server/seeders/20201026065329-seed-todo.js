'use strict';

const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const dataTodo = JSON.parse(fs.readFileSync("./data/todo.json", "utf8"));
    dataTodo.map(data => {
      data["createdAt"] = new Date();
      data["updatedAt"] = new Date();
    });

    await queryInterface.bulkInsert('Todos', dataTodo, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};