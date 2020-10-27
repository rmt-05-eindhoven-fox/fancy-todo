const {verifyToken} = require('../helper/jwt')
const {User} = require('../database/models')

authentication = async (req, res, next) => {
   const {token} = req.headers
   try {
      if(!token) {
         throw {
            msg: "Authentication failed",
            status: 401
         }
      } else {
         const decoded = verifyToken(token)

         const user = await User.findOne({
            where: {
               email: decoded.email
            }
         })

         if(!user) {
            throw {
               msg: "Authentication failed",
               status: 401
            }
         } else {
            req.loggedInUser = decoded
            next()
         }
      }
   } catch (err) {
      const status = err.status || 500
      const msg = err.msg || 'Internal Server Error'

      res.status(status).json({error: msg})
   }
}

module.exports = authentication