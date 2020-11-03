const { User } = require('../models');
const { comparePassword } = require('../helpers/hash');
const { loginToken } = require('../helpers/token');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);


class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({
        name,
        email,
        password
      });

      const createEmail = await axios({
        url: `https://api.mailslurp.com/createInbox?apiKey=${process.env.MAILSLURPKEY}`,
        method: 'post'
      });

      const sendEmailDeveloper = await axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${process.env.MAILSLURPKEY}`,
        data: {
          senderId: createEmail.id,
          to: 'gerrysimangunsong@gmail.com',
          subject: "Fancy Todo App Feedback",
          body: `User ${user.name} is registered on your Web App with email ${user.email}`
        }
      });

      const sendEmailUser = await axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${process.env.MAILSLURPKEY}`,
        data: {
          senderId: createEmail.id,
          to: `${user.email}`,
          subject: "Fancy Todo App",
          body: `Thanks ${user.name} for registering on Fancy Todo App. Contact gerrysimangunsong@gmail.com for more information.`
        }
      });

      if(sendEmailDeveloper || sendEmailUser) {
        res.status(201).json({
          id: user.id,
          email: user.email
        });
      } else {
        throw {
          name: 'Internal Server Error'
        }
      }
    } catch (error) {
      next(error);
    }

  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
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
        res.status(200).json({ accessToken, name: user.name });
      }
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    const { google_access_token } = req.headers;

    try {
      
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: CLIENT_ID
      })
  
      const payload = ticket.getPayload();
      const email = payload.email
      const name = payload.name
  
      const user = await User.findOne({
        where: {
          email
        }
      });
  
      if(user) {
        const accessToken = loginToken({
          id: user.id,
          email: user.email
        });
        res.status(200).json({
          accessToken, name: user.name
        })
      } else {
        res.status(200).json({
          message: 'createPassword',
          email,
          name 
        });
      }
    } catch (error) {
      next(error);      
    }

  }


}

module.exports = UserController;