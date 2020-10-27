const { User } = require('../models/index');
const { comparePassword } = require('../helper/bcrypt.js');
const { signToken } = require('../helper/jwt.js');

class UserController {
  static async register (req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload);

      res.status(201).json({
        id: user.id,
        email: user.email
      });

    } catch (err) {
      next(err);
    }
  }

  static async login (req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }

      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        throw { message: 'wrong email or password', status: 401 }

      } else if (!comparePassword(payload.password, user.password)) {
        
        throw { message: 'wrong email or password', status: 401 }
      }
      else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });

        res.status(200).json({
          access_token
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static logout (req, res) {
    //
  }
}

module.exports = UserController;