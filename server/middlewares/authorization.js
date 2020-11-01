const { Todo } = require('../models')

async function authorization(req,res,next){
  try {
    const {userId} = req.loggedInUser
    const paramId = req.params.id

    console.log(userId)
    
    const todo = await Todo.findByPk(+paramId)

    if(!todo){
      next({
        status : 404,
        message : `Todo not found`
      })
    } else {

      if(todo.UserId === userId){
        // everything is good! //
        next()

      } else {
        next({
          status : 401,
          message : 'Unauthorized'
        })
      }

    }
  
    
  } catch (error) {
    next(error)
  }

}

module.exports = authorization