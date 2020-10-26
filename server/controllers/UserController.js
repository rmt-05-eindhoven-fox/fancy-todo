const { match } = require('../helper/bycript');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {

  static signup(req, res) {
    const { username, email, password } = req.body;
    const input = { username, email, password };
    User.create(input)
      .then((user) => {
        res.status(200).json(user);
      }).catch((err) => {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          const errors = err.errors.map(error => {
            return error.message;
          })
          res.status(400).json(errors)
        } else {
          res.status(500).json(err.stack)
        }
      });

  }

  static signin(req, res) {
    const { username, password } = req.body;
    // res.status(200).json({ username, password })
    User.findOne({
      where: { username }
    })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: 'Wrong Username / Password ' })
        } else {
          const status = match(password, user.password);
          if (!status) {
            res.status(401).json({ message: 'Wrong Username / Password ' })
          } else {
            delete user.dataValues.password;
            const jwt = generateToken(user);
            res.status(200).json({ accessToken: jwt });
          }
        }

      }).catch((err) => {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
          const errors = err.errors.map(error => {
            return error.message;
          })
          res.status(400).json(errors)
        } else {
          res.status(500).json(err.stack)
        }
      });
  }
}

module.exports = UserController;