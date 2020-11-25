const {project,project_member,user} = require("../models/index")
const response = require("../helpers/response")

class ProjectController{
    static Create(req, res, next){
        try {
            const data = req.body
            const userId = req.loggedInUser.id
            const projectData = {
                project_name:data.name,
                project_status:data.status,
                createdAt: new Date(),
                updatedAt: new Date()
            }


            project.create(projectData)
                .then(data=>{   
                    project_member.create({
                        member_status:"author",
                        user_id:userId,
                        project_id:data.id
                    })
                    .then(data_member=>{
                            res.status(201).json(response.onSuccess("success create project",data))
                    })
                    .catch(err=>{
                        next(err)
                    })                    
                })
                .catch(err=>{
                    next(err)
                })
        } catch (err) {
            next(err)
        }
    }

    static Update(req, res, next){
        try {
            const data = req.body;
            const projectData = {
                project_name:data.name,
                project_status:data.status,
                updatedAt: new Date()
            }

            project.findByPk(req.params.id)
              .then(data=>{
                  if(!data){
                      return res.status(404).json(response.onFailed("project not found"))
                  }
                  data.update(projectData)
                  .then(data=>{
                      res.status(200).json(response.onSuccess("success update project",data))
                  })
                  .catch(err=>{
                      next(err)
                  })
              })
              .catch(err=>{
                    next(err)
              })
        } catch (err) {
            next(err)
        }
    }
    
    static Delete(req, res, next){
        try {
            let userId = req.loggedInUser.id
            project.findOne({
                where:{
                    id:req.params.id
                },
                include:[
                        {
                            model:project_member,
                            as:'members',
                            attributes: ['id','member_status','user_id'],
                            where:{ 
                                user_id: userId,
                                member_status:"author" 
                            }
                        }
                ]
            })
            .then(data=>{
                if(!data)
                    return res.status(400).json(response.onFailed("you are not author, please contact author to delete project"))

                data.destroy()
                    .then(data=>{
                        res.status(200).json(response.onSuccess("success delete project",data))  
                    })
                    .catch(err=>{
                        next(err)
                    })
            })
        } catch (err) {
            next(err)
        }
    }

    static GetProject(req, res, next){
        try {
            let userId = req.loggedInUser.id
            project.findAll({
                include:[
                    {
                        model:project_member,
                        as:'members',
                        attributes: ['id','member_status','user_id'],
                        where:{ 
                            user_id: userId 
                        }
                    }
                ]
            })
            .then(data=>{
                if(data.length == 0){
                    return res.status(404).json(response.onFailed("project not found"))                        
                }              
                res.status(200).json(response.onSuccess("success get project",data))                        

            })
            .catch(err=>{
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }

    static GetProjectById(req, res, next){
        try {
            let projectId = req.params.id
            project.findOne({
                where:{
                    id:projectId
                },
                include:[
                    {
                        model:project_member,
                        as:'members',
                        attributes: ['id','member_status','user_id'],
                        include:[
                            {
                                model:user,
                                attributes: ['email'],
                            }
                        ]
                    }
                ]
            })
            .then(data=>{
                if(data.length == 0){
                    return res.status(404).json(response.onFailed("project not found"))                        
                }              
                res.status(200).json(response.onSuccess("success get project",data))                        

            })
            .catch(err=>{
                next(err)
            })
        } catch (err) {
            next(err)
        }
    }
    
}

module.exports = ProjectController