const { Project, UserProject, User } = require('../models/')

class ProjectController{

  static async getUserProjects(req, res, next) {
    try {
      
      const { userId } = req.loggedInUser

      const userData = await User.findOne({
        where : {
          id : userId
        },
        include : [ Project ]
      })
      
      // console.log(userData.Projects)

      res.status(200).json({
        data : userData.Projects
      })

    } catch (error) {
      next(error)
    }

  }


  static async postAddProject(req, res, next) {
    try {
      const { userId } = req.loggedInUser
      const projectName = req.body.name
  
      const newProject = await Project.create({
        name : projectName,
        createdAt : new Date(),
        updatedAt : new Date()
      })
  
      // console.log(newProject, '<< newProject data <<')
  
      const userProject = await UserProject.create({
        UserId : userId,
        ProjectId : newProject.id
      })
      
      // console.log(userProject, '<< userProject dat <<')
  
  
      res.status(200).json({
        message : `Succesfully created ${projectName} project`
      })
      
    } catch (error) {

      next(error)

    }

  }

  static async patchEditProject(req, res, next) {
    try {
      const projectId = +req.params.id

      const { name } = req.body

      const updated = await Project.update({
        name
      },{
        where : { id : projectId },
        returning : true
      })

      if(updated[0] > 0){
        res.status(200).json({
          message : 'Update Successful'
        })

      } else {
        next({
          status : 400,
          message : `Can't update`
        })
      }

      
    } catch (error) {
      next(error)
    }



  }

  static async deleteProject(req,res,next) {
    
    try {
      
      if(req.params.id === "none"){
        next({
          status : 401,
          message : 'Please select a Project'
        })
      }
      
      const projectId = +req.params.id
      const response = Project.destroy({
        where : {
          id : projectId
        }
      })
  
      res.status(200).json({
        message : `Project id ${projectId} deleted successfully`
      })
      
    } catch (error) {
      next(error)
    }

  }



}

module.exports = ProjectController