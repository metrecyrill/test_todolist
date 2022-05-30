const {Task} = require('../models/')
const {validationResult} = require('express-validator')

class TaskController {
  async create(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(404).json({
          errors: errors.array(),
          message: "Validation error"
        })
      }

      const {name, email, text} = req.body
      const task = await Task.create({name, email, text})
      return res.status(201).json(task)
    } catch (e) {
      return res.status(500).json({message: "Something is going wrong!"})
    }
  }

  async update(req, res) {
    try {
      const {text, completed} = req.body
      const user_id = req.user.user_id
      const task = await Task.findByPk(req.params.id)

      if (!task) {
        return res.status(400).json({message: "Page not found"})
      }

      if (task.text !== text) {
        task.editedBy = user_id
        task.text = text
      }

      task.completed = completed
      await task.save()

      return res.json(task)
    } catch (e) {
      return res.status(500).json({message: "Something is going wrong!"})
    }
  }

  async getAll(req, res) {
    try {
      let {page, limit, sort, order} = req.query
      page = page || 1
      limit = limit || 3
      const offset = page * limit - limit

      sort = sort || 'name'
      order = order || 'asc'
      const tasks = await Task.findAndCountAll({order:[[sort, order]], limit, offset})

      return res.json(tasks)
    } catch (e) {
      return res.status(500).json({message: "Something is going wrong!"})
    }
  }

  async getOne(req, res) {
    try {
      const task = await Task.findByPk(req.params.id)
      return res.json(task)
    } catch (e) {
      return res.status(500).json({message: "Something is going wrong!"})
    }
  }
}

module.exports = new TaskController()