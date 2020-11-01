const { Todo } = require('../models/index')

async function authorization(req, res, next) {
    const { id } = req.params

    try {
        const todo = await Todo.findByPk(id)
        if (!todo) {
            throw { msg: "Todo is not found", status: 404 }
        } else if (+todo.UserId === +req.loggedInUser.id) {
            next()
        } else {
            throw { msg: "Not Authorized", status: 401 }
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = authorization