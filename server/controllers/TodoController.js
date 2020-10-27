const {Todo} = require('../database/models')

class TodoController {
   static async getAllTodos(req, res, next) {
      const UserId = req.loggedInUser.id

      try {
         const todos = await Todo.findAll({
            where: {
               UserId
            }
         })

         res.status(200).json(todos)
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }
   
   static async createTodo(req, res, next) {
      try {
         const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status:req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
         }

         const createTodo = await Todo.create(newTodo)
         
         res.status(201).json(createTodo)
      } catch (err) {
         next(err)
      }
   }

   static async getTodoById(req, res, next) {
      try {
         const id = +req.params.id

         const findTodo = await Todo.findByPk(id)

         if(!findTodo) {
            res.status(404).json({ 
               message: "Todo not found :(" 
            });
         }
         else {
            res.status(200).json(findTodo)
         }
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }

   static async editTodoById(req, res, next) {
      try {
         const id = +req.params.id
         
         const editedTodo = {
            title: req.body.title,
            description: req.body.description,
            status:req.body.status,
            due_date: req.body.due_date
         }

         const editTodo = await Todo.update(editedTodo, {
            where: 
            {
               id: id
            },
            returning: true
         })

         res.status(200).json(editTodo[1][0])
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }

   static async editTodoStatusById(req, res, next) {
      try {
         const id = +req.params.id
         
         const editedStatus = {
            status: 'done'
         }

         const editStatus = await Todo.update(editedStatus, {
            where: 
            {
               id: id
            },
            returning: true
         })

         res.status(200).json(editStatus[1][0])
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }

   static async deleteTodoById(req, res, next) {
      try {
         const id = req.params.id

         const deleteTodo = await Todo.destroy({
            where: {
               id: id
            }
         })

         res.status(200).json({
            message: "todo successfully deleted"
         })
      } catch (err) {
         next(err)
         // res.status(500).json(err)
      }
   }
}

module.exports = TodoController