const {verifyToken} = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next){
  /**TODO
   * check if token is there if not, send error
   * if token is there, we need to check if email is there
   * if email is there, put data inside req
   */
  try {
    const { token } = req.headers

    if(!token){
      next({
        status : 401,
        message : 'Unauthorized Access'
      })

    } else {
      const decoded = verifyToken(token)
      const { id, email, iat } = decoded

      await User
      .findOne({
        where : {
          email
        }
      })
      .then(_=> {
        req.loggedInUser = {
          userId : id,
          userEmail : email
        }

        // SUCCESS AUTHENTICATE //
        next()

      })
      .catch(err => {
        next(err)
      })

    }
    
  } catch (error) {
    next(error)
  }
}

module.exports = authentication