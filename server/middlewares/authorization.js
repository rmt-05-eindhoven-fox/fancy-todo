const {Todo} = require('../models/index');

async function authorization(req, res, next) {
    const id = +req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            throw{ msg: `NotFound`, status: 404}
        } else if (todo.UserId === req.loggedInUser.id) {
            next();
        } else {
          throw {msg: `NotAuthorized`, status: 401 }  
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = authorization