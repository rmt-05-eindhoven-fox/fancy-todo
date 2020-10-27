const model = require("../models/index").Todo

class TodoController{
    static CreateTodo(req, res, next){
        try {
            const data = req.body;
            const userId = req.loggedInUser.id
            const todo = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
                UserId: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const todos = model.create(todo);
            if (todos) {
              res.status(201).json({
                'status': 'OK',
                'messages': 'Success save Todo',
                'data': todo,
              })
            }
         } catch (err) {
          next(err)
        }
      }
    
    static GetTodo(req, res, next){
      const userId = req.loggedInUser.id
      model.findAll({where : {UserId: userId}})
        .then(data=>
            res.status(200).json({
              'status': 'OK',
              'messages': 'Success get Todo',
              'data': data,
            })          
          )
        .catch(err=>{
            next(err)
        })
      }

    static GetTodoById(req, res, next){
      model.findOne({where:{id:req.params.id}})
        .then(data=>{
          if(data)
            res.status(200).json({
            'status': 'OK',
            'messages': 'Success get Todo',
            'data': data,
          })          
        })
        .catch(err=>{
          next(err)
        })
      }

    static UpdateTodoById(req, res, next){
      const data = req.body;
      const todo = {
          title : data.title,
          description: data.description,
          status: data.status,
          due_date: data.due_date,
          updatedAt: new Date()
      }

      model.findByPk(req.params.id)
        .then(data=>{
          if(data)
          data.update(todo)
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'Success update data',
                'data':todo
              })  
            })
          })
        .catch(err=>{
          next(err)
        })
       }

    static DeleteTodoById(req, res, next){
      model.findByPk(req.params.id)
        .then(data=>{
          if(data)
          data.destroy()
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'todo success to delete'               
              })  
            })
          })
        .catch(err=>{
          next(err)
        })
      }

    static PatchTodoById(req, res, next){
      const data = req.body;
      const todo = {
          status:  data.status,
          updatedAt: new Date()
      }

      model.findByPk(req.params.id)
        .then(data=>{
          if(data)
          data.update(todo)
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'Success update data',
                'data':todo
              })  
            })
          })
        .catch(err=>{
          next(err)
        })
       }
      }

module.exports = TodoController;