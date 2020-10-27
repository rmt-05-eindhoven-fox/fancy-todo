const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {

  static async register(req, res){
    try {
      const { email, password } = req.body;
      let payload = {
        email,
        password
      };
      const user = await User.create(payload);

      res.status(200).json({
        id: user.id,
        email: user.email
      })
    } catch (err) {
      const status = err.status || 500;
      const msg = err.msg || `Internal Server Error`;

      res.status(status).json({msg});
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const payload = {
        email,
        password
      };

      const user = await User.findOne({
        where : {
          email: payload.email
        }
      });

      if(!user){
        throw { msg : 'wrong email/password', status : 401 };
      } else if(!comparePassword(payload.password, user.password)){
        throw { msg : 'wrong email/password', status : 401 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ access_token });
      }

    } catch (err) {
      const status = err.status || 500;
      const msg = err.msg || `Internal server error`;

      res.status(status).json({ msg });
    }
  }
}

module.exports = UserController;