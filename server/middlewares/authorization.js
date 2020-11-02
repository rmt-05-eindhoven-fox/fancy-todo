const { Todo } = require("../models")

async function authorization (req, res, next) {
    try {
        const { id } = req.params
        const user = req.User
        const todo = await Todo.findByPk(id)
        if (!todo) {
            throw { message: `Todo not found`, status: 404}
        } else if (todo.UserId === user.id) {
            next()
        } else {
            throw { message: `Not Authorized`, status: 401}
        }
    } catch(err) {
        next(err)
    }
}

module.exports = authorization