const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const thirdPartyLogin = async (req, res, next) => {
  const { google_access_token } = req.headers;
  const { email, password, thirdPartyLogin } = req.body;
      try {
        if (email && password && thirdPartyLogin) {
          const user = await User.findOne({
            where: {
              email
            }
          });

          if (!user) {
            next();
          } else {
            res.status(200).json({
              message: 'login'
            })
          }
        } else if (google_access_token) {
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
          })

          req.body.email = email;

          if (user) {
            delete req.headers.google_access_token;
            res.status(200).json({ message: 'needPassword' });
          } else {
            delete req.headers.google_access_token;
            res.status(200).json({ message: 'createPassword' });
          }
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
}

module.exports = {
  thirdPartyLogin
};