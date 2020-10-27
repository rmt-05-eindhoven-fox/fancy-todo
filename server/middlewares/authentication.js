const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

function authentication (req, res, next) {
    const { token } = req.headers
    let decoded = verifyToken(token)
     User.findOne({
      where: {
        email:decoded.email
      }
    })
.then(user => {
  if(!user) throw {
    msg:'Authentication Failed!'
  }

  req.userData = decoded
  next()

})
  .catch(err => {
    next(err)
  })
}

module.exports = authentication