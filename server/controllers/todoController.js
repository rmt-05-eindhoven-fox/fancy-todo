const model = require("../models/index").todo
const project_member = require("../models/index").project_member
const response = require("../helpers/response")

class TodoController{


    static Create(req, res, next){
        try {
            const data = req.body;
            const userId = req.loggedInUser.id
            const todo = {
                title : data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
                project_id: data.project_id,
                creator_id: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            model.create(todo)
              .then(data=>{
                  res.status(201).json(response.onSuccess("success save todo",data))
              })
              .catch(err=>{
                  next(err)
              });
         } catch (err) {
           next(err)
         }        
    }
    
    static GetTodo(req, res, next){
        try {      
            const userId = req.loggedInUser.id
            model.findAll({where : {creator_id: userId}})
              .then(data=>{
                  res.status(200).json(response.onSuccess("success get todo",data))
              })
              .catch(err=>{
                  next(err)
              })   
         } catch (err) {
           next(err)
         }        
    }

    static GetTodoByProjectId(req, res, next){
        try {      
            const userId = req.loggedInUser.id
            project_member.findOne({where : 
            {
                project_id: req.params.project_id,
                user_id:userId
            }
            })
            .then(data=>{
                if(!data)
                  return res.status(400).json(response.onSuccess("not authorized",data))
                
                model.findAll({
                  where:{
                      project_id: data.project_id
                  }
                })
                .then(data=>{
                    res.status(200).json(response.onSuccess("success get todo",data))
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

    static GetTodoById(req, res, next){
        try {      
            model.findOne({
              where:{
                id:req.params.id
              }
            })
              .then(data=>{
                    if(!data){
                        return res.status(400).json(response.onFailed("todo not found"))                        
                    }              
                    res.status(200).json(response.onSuccess("success get todo",data))                        
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
            const todo = {
                title : data.title,
                description: data.description,
                status:  data.status,
                due_date:  data.due_date,
                updatedAt: new Date()
            }

            model.findByPk(req.params.id)
              .then(data=>{
                  if(!data){
                      return res.status(400).json(response.onFailed("todo not found"))
                  }
                  data.update(todo)
                  .then(data=>{
                      res.status(200).json(response.onSuccess("success update todo",data))
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
            model.findByPk(req.params.id)
              .then(data=>{
                if(!data){
                  return  res.status(400).json(response.onFailed("todo not found"))            
                }
                data.destroy()
                  .then(data=>{
                    res.status(200).json(response.onSuccess("success delete todo",data))  
                })
              })
              .catch(err=>
                next(err)
              )
         } catch (err) {
           next(err)
         }        
    }

    static UpdateStatus(req, res, next){
        try {
            const data = req.body;
            const todo = {
                status:  data.status,
                updatedAt: new Date()
            }

            model.findByPk(req.params.id)
              .then(data=>{
                if(!data){
                  return res.status(400).json(response.onFailed("todo not found"))            
                }
                data.update(todo)
                  .then(data=>{
                    res.status(200).json(response.onSuccess("success update status todo",data))  
                  })
              })
              .catch(err=>
                next(err)
              )
         } catch (err) {
           next(err)
         }        
    }
}

module.exports = TodoController;