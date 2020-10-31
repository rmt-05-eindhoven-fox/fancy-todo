const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');

class UserController {

  static async register(req, res, next){
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
      next(err)
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

  static googleLogin(req, res, next){
    let { id_token } = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email = ""

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID
    })
      .then(tiket => {
        let payload = tiket.getPayload();
        email = payload.email;
        return User.findOne({where : { email: payload.email}})
      })
      .then(user => {
        if(user){
          return user
        } else {
          let obj = {
            email,
            password: 'randomaja'
          }
          return User.create(obj)
        }
      })
      .then(dataUser => {
        let access_token = signToken({ id: dataUser.id, email: dataUser.email });
        return res.status(200).json({ access_token });
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = UserController;