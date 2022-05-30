const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require('express-validator')

router.post(
  '/login',
  check('login','Login should be not empty').notEmpty(),
  check('password', 'Password should be not empty').notEmpty(),
  UserController.login
)
router.get(
  '/auth',
  authMiddleware,
  UserController.check
)

module.exports = router