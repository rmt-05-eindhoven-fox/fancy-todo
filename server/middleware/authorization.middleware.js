const { ToDo } = require("../models/")

async function authorization(req, res, next) {
    try {
        let  {id}  = req.params;
        console.log(id, "<<<< ini id");
        console.log(req.loggedInUser.id, "<<< ini console log loggedInUserId");
        const todo = await ToDo.findByPk(id)
        console.log(todo.id, "<<<< ini todo dot id");
        console.log(todo, "<<< ini todo");
        if (!todo) {
            throw { name: "NotFound"}
        } else if (todo.UserId == req.loggedInUser.id) {
            next()
        } else {
            throw { name: "Notauthorized" }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization