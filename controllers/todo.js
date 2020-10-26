const { Todo } = require("../models")

class TodoController {

    static async test (req, res) {
        try {
            res.send(`test`)
        } catch(err) {

        }
    }

    static showAllTodos (req, res) {
        const userId = null
        Todo.findAll({
            where: {
                id: userId
            }
        })
    }

}

module.exports = TodoController