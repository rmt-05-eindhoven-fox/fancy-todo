const { Todo } = require('../models/index')

function authorization(req, res, next){
    Todo.findByPk(req.params.id)
    .then((dataTodo) => {
        if(!dataTodo) throw {msg: "todo not found"}
        else{
            if(dataTodo.UserId === req.loggedInUser.id){
                next()
            }
            else throw {msg: "not authorized"}
        }
    })
    .catch((err) => {
        const pesan = err.msg || {msg: "invalid requests"}
        res.status(400).json({error: pesan})
    })
}

module.exports = authorization