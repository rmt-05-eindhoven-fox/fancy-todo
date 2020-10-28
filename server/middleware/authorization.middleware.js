const { ToDo } = require("../models/")

async function authorization(req, res, next) {
    try {
        let  {id}  = req.params;
        console.log(id, "<<<< ini id");
        const todo = await ToDo.findByPk(id)
        console.log(todo, "<<< ini todo");
        if (!todo) {
            throw { msg: "ToDo Not Found", status: 404 }
        } else if (++todo.UserId === ++req.loggedInUser.id) {
            next()
        } else {
            throw { msg: "Not authorized", status: 401 }
        }
    } catch (err) {
        res.status(500).json(err.msg)
    }
}

module.exports = authorization