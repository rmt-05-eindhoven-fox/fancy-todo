const { Project, User } = require('../models/')

async function projectAuthorization(req,res,next){

  try {
    const { userId } = req.loggedInUser
    const projectId = +req.params.id
    
    const project = await Project.findByPk(projectId, {
      include : [ User ]
    })

    if(!project){
      next({
        status : 404,
        message : 'Project not found'
      })
    
    } else {
      // check if user id is inside Users
      const users = project.Users
      let userValidated = false

      users.forEach(user => {
        if(user.id === userId){
          userValidated = true
        }
      })
      
      if(userValidated){
        next()

      } else {
        next({
          status : 401,
          message : 'Unauthorized User'
        })
      }

    }
 
  } catch (error) {

    next(error)
  }

}

module.exports = projectAuthorization