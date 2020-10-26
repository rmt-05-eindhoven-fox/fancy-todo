const model = require("../models/index").todo
class TodoController{
    static CreateTodo(req, res){
        try {
            const data = req.body;
            const todo = {
                title : data.title,
                description: data.description,
                status:  data.status,
                due_date:  data.due_date,
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
           res.status(500).json({
             'status': 'ERROR',
             'messages': err.message,
             'data': {},
           })
         }        
    }
    
    static GetTodo(req, res){
      model.findAll()
        .then(data=>
            res.status(200).json({
              'status': 'OK',
              'messages': 'Success get Todo',
              'data': data,
            })          
          )
        .catch(err=>
          res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
          })
        )
    }

    static GetTodoById(req, res){
      model.findOne({
        where:{
          id:req.params.id
        }
      })
        .then(data=>{
          if(!data){
            res.status(404).json({
              'status': 'ERROR',
              'messages': 'User Not Found'
            })            
          }
          res.status(200).json({
            'status': 'OK',
            'messages': 'Success get Todo',
            'data': data,
          })          
        }
        )
        .catch(err=>
          res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
          })
        )
    }

    static UpdateTodoById(req, res){
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
            res.status(404).json({
              'status': 'ERROR',
              'messages': 'User Not Found'
            })            
          }
          data.update(todo)
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'Success update data',
                'data':todo
              })  
            })
        }
        )
        .catch(err=>
          res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
          })
        )
    }


    static DeleteTodoById(req, res){
      model.findByPk(req.params.id)
        .then(data=>{
          if(!data){
            res.status(404).json({
              'status': 'ERROR',
              'messages': 'User Not Found'
            })            
          }
          data.destroy()
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'todo success to delete'               
              })  
            })
        }
        )
        .catch(err=>
          res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
          })
        )
    }

    static PatchTodoById(req, res){
      const data = req.body;
      const todo = {
          status:  data.status,
          updatedAt: new Date()
      }

      model.findByPk(req.params.id)
        .then(data=>{
          if(!data){
            res.status(404).json({
              'status': 'ERROR',
              'messages': 'User Not Found'
            })            
          }
          data.update(todo)
            .then(data=>{
              res.status(200).json({
                'status': 'OK',
                'messages': 'Success update data',
                'data':todo
              })  
            })
        }
        )
        .catch(err=>
          res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
          })
        )
    }
}

module.exports = TodoController;