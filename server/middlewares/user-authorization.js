const {User} = require('../database/models')

authorization = async (req, res, next) => {
   const {email} = req.params

   try {
      const user = await User.findOne({
         where: {
            email
         }
      })
      
      if(!user) {
         throw {
            msg: "Profile not found",
            status: 404
         }
      } else {
         if(user.id === req.loggedInUser.id) {
            next()
         }
         else {
            throw {
               msg: 'Not authorized',
               status: 401
            }
         }
      }
      console.log(user);
      
   } catch (err) {
      const status = err.status || 500
      const msg = err.msg || 'Internal Server Error'

      res.status(status).json({
         err: msg
      })
   }
}

module.exports = authorization