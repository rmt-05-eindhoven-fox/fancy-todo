const { Todo } = require("../models")

class TodoController {
  static async todoAdd(req,res){
    try{
      const data = {
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        due_date:req.body.due_date
      }
      const todo = await Todo.create(data,{returning:true})

      res.status(201).json(todo)
    }
    catch(error){
      res.status(500).json(error)
    }
  }

  static async todoShow(req,res){
    try {
      const todo = await Todo.findAll()

      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async todoShowById(req,res){
    try {
      const id = +req.params.id
      const todo = await Todo.findByPk(id)

      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  
  static async todoUpdate(req,res){
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
      res.status(500).json(error)
    }
  }

  static async todoUpdateStatus(req,res){
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
      res.status(500).json(error)
    }
  }

  static async todoDelete(req,res){
    try {
      const id = +req.params.id
      const todo = await Todo.destroy({
        where:{id},
        returning:true
      })

      res.status(200).json(todo[1][0])
    } catch (error) {
      res.status(500).json(error)
    }
  }
    
}

module.exports = TodoController 