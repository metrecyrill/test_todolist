const Router = require('express')
const router = new Router()
const TaskController = require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require('express-validator')

router.post(
  '/new',
  check('email', 'Email should be not empty and format is example@domain.com').isEmail().notEmpty(),
  check('name', 'Name should be not empty').notEmpty(),
  check('text', 'Text should be not empty').notEmpty(),
  TaskController.create
)

router.post('/edit/:id', authMiddleware, TaskController.update)
router.get('/', TaskController.getAll)
router.get('/:id', TaskController.getOne)

module.exports = router