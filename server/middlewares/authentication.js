const JWT = require('../helpers/jwt')
const { User } = require('../models')

module.exports = (req, res, next) => {
  let { token } = req.headers
  // console.log('sampai sini\r\n\r\n\r\n');
  let data = JWT.compare(token)
  // console.log(data);
  let { id, email } = data
  User.findOne({ where: { id }})
    .then(data => {
      if(!data) throw new Error('User not found')
      else {
        let { id } = data
        req.login = { id }
        next()
      }
    })
    .catch(err => {
      res.status(404).json('You have to login first')
    })
}