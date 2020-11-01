const { Todo } = require("../models")

class TodoController {
  static async todoAdd(req,res,next){
    const userId = req.loggedInUser.id
    try{
      const data = {
        title:req.body.title,
        description:req.body.description,
        due_date:req.body.due_date,
        UserId:userId
      }
      const todo = await Todo.create(data,{returning:true})
      console.log(data)
      res.status(201).json(todo)
    }
    catch(error){
      next(error)
    }
  }

  static async todoShow(req,res,next){
    try {
      const userId = req.loggedInUser.id
      const todo = await Todo.findAll({
        where:{UserId:userId},
        order:[["status","ASC"]]
      })

      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }

  static async todoShowById(req,res,next){
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)

      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }
  
  static async todoUpdate(req,res,next){
    try {
      const id = +req.params.id
      const data = {
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        due_date:req.body.due_date
      }
      const todo = await Todo.update(
        data, 
        {
          where:{id},
          returning:true
        })

      res.status(200).json(todo[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async todoUpdateStatus(req,res,next){
    try{
      const id = +req.params.id
      const data = {
        status: req.body.status
      }
      const todo = await Todo.update(
        data,
        {
          where:{id},
          returning:true
        })
      res.status(200).json(todo[1][0])
    }
    catch(error){
      next(error)
    }
  }

  static async todoDelete(req,res,next){
    try {
      const id = +req.params.id
      const todo = await Todo.destroy({where:{id}})
      res.status(200).json({msg:"success delete todo"})
    } catch (error) {
      next(error)
    }
  }
    
}

module.exports = TodoController 