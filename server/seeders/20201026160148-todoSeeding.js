"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        title: "Tamatin Suikoden 2",
        description: "Tanpa pake true runes dan hero OP",
        status: "not completed",
        due_date: "2020-05-05",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Bayar cicilan hp adek",
        description: "transfer via bank sudoku",
        status: "not completed",
        due_date: "2020-11-09",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("Todos", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
