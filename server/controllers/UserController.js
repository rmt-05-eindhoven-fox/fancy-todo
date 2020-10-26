const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const { token } = require('../helpers/token');

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password
      });

      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (error) {
      res.status(400).json({
        error: 'Internal server error'
      });
    }

  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = user.findOne({
        where: {
          email
        }
      });

      if (!user) {
        throw {
          status: 400,
          msg: 'Invalid username or password'
        }
      } else if (!comparePassword(password, user.password)) {
        throw {
          status: 400,
          msg: 'Invalid username or password'
        }
      } else {
        const accessToken = token({
          id: user.id,
          email
        });
        res.status(200).json({ accessToken });
      }
    } catch (error) {
      res.status(error.status || 500).json({
        error: error.msg || 'Internal server error'
      })
    }
  }
}

module.exports = UserController;