'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Tasks', [
      {
        name: "Adam",
        email: "adam@test.test",
        text: "wake up",
        completed: false,
        editedBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kirill",
        email: "kirill@test.test",
        text: "take a breakfast",
        completed: false,
        editedBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Andrew",
        email: "andrew@test.test",
        text: "work out",
        completed: false,
        editedBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sergey",
        email: "sergey@test.test",
        text: "go a walk",
        completed: false,
        editedBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mihail",
        email: "mihail@test.test",
        text: "go sleep",
        completed: false,
        editedBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
  }
}
