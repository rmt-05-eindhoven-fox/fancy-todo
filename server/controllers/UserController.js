const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const { loginToken } = require('../helpers/token');

class UserController {
  static async register(req, res, next) {
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
      next(error);
      // res.status(400).json({
      //   error: 'Internal server error'
      // });
      // ??? gimana
    }

  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(email, password);
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      
      if (!user) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else if (!comparePassword(password, user.password)) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else {
        const accessToken = loginToken({
          id: user.id,
          email
        });
        res.status(200).json({ accessToken });
      }
    } catch (error) {
      // console.log(error.message);
      next(error);
    }
  }
}

module.exports = UserController;