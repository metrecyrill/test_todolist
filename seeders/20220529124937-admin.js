'use strict'

const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users', [{
      login: "admin",
      password: bcrypt.hashSync('123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
     }], {})
  },
  async down (queryInterface, Sequelize) {
  }
}
