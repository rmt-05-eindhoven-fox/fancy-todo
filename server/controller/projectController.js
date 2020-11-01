const { Project } = require("../models")

class ProjectController{
  static async addProject(req,res){
    const userId = req.loggedInUser.id
    const name = req.body.project_name
    const project = await Project.create({name})
  }
}

module.exports = ProjectController