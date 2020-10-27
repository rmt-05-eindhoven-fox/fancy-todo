const { match } = require('../helper/bycript');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {

  static register(req, res) {
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

  static login(req, res) {
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
            const { id, username, email } = user;
            const jwt = generateToken({
              id, username, email
            });
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