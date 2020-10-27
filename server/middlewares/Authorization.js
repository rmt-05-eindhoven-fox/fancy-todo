const { User, Todo } = require('../models/index');

async function authorization (req, res, next){
    try {
        const { id } = req.params;
        let todo = await Todo.findByPk(id);
        if(!todo){
            throw { message: "Post Not found", status: 404 }
        } else if (todo.UserId === req.loggedIn.id){
            next();
        } else {
            throw { message: "Not Authorized", status: 401 }
        }
    } catch (error){
        let status = error.status || 500;
        let message = error.message || "Internal Server Error"
        next({message, status: 404});
    }
}

module.exports = authorization;