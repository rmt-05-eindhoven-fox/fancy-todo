'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      title: "ngopi", description: "budak ngopi istiqomah", status: false, due_date: new Date(), createdAt: new Date(), updatedAt: new Date()
    }, {
      title: "ngobrak", description: "budak ngobrak istiqomah", status: false, due_date: new Date(), createdAt: new Date(), updatedAt: new Date()
    }]
    await queryInterface.bulkInsert("ToDos", data, {})


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ToDos", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
