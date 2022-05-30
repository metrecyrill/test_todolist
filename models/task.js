'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
  }
  Task.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    text: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    editedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  })
  return Task
}