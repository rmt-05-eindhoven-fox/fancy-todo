'use strict';
const fs = require('fs')
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = JSON.parse(fs.readFileSync('./data_for_seed/users.json')) 
    users.forEach(user => {
      user.password = hashPassword(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
