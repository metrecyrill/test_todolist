const jwt = require('jsonwebtoken')
const {User} = require('../models/')
const bcrypt = require("bcrypt")
const {validationResult} = require('express-validator')

const generateJwt = (user_id, login) => {
  return jwt.sign(
    {user_id, login},
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  )
}

class UserController {
  async login(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(404).json({
          errors: errors.array(),
          message: "Validation error"
        })
      }
      const {login, password} = req.body
      const user = await User.findOne({where: {login}})

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateJwt(user.id, login)
        return res.json({token});
      }
      return res.status(400).json({message: "Invalid Credentials"})
    } catch (e) {
      return res.status(500).json({message: "Something is going wrong!"})
    }
  }

  async check(req, res) {
    try {
      const token = generateJwt(req.user.id, req.user.login)
      return res.json({token})
    } catch (e) {
    return res.status(500).json({message: "Something is going wrong!"})
    }
  }
}

module.exports = new UserController()