const { Todo } = require('../models')

class TodoController{
    static post(req, res, next){
        const { title, description, due_date } = req.body
        const userId = req.loggedInUser.id
        Todo.create({
            title,
            description,
            status: false,
            due_date,
            UserId: userId
        })
            .then((dataTodo) => {
                res.status(201).json({ dataTodo })
            })
            .catch((err) => {
                next(err)
            })
        }

    static get(req, res, next){
        const userId = req.loggedInUser.id
        Todo.findAll({where : {UserId: userId}})
        .then((dataTodo) => {
            res.status(200).json({ dataTodo })
        })
        .catch((err) => {
            next(err)
        })
    }
    
    static findId(req, res, next){
        const { id } = req.params
        Todo.findByPk(id)
            .then((dataTodo) => {
                if(dataTodo) res.status(200).json({ dataTodo })
                else{
                    throw {msg: "id not found", code: 404}
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static put(req, res, next){
        const { title, description, status, due_date } = req.body
        Todo.update({
            title, description, status, due_date
        }, {
            where: { id: req.params.id}
        })
            .then((dataTodo) => {
                if(dataTodo) res.status(200).json({ dataTodo , msg: "succes update put"})
                else{
                    throw { msg: "id todo not found", code: 404}
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static patch(req, res, next){
        const { status } = req.body
        Todo.update({
            status
        }, {
            where: { id: req.params.id }
        })
            .then((dataTodo) => {
                if(dataTodo) res.status(200).json({ dataTodo, msg: "succes update patch" })
                else{
                    throw { msg: "id todo not found", code: 404}
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static delete(req, res, next){
        Todo.destroy({where: {id: req.params.id}})
        .then((dataTodo) => {
            if(dataTodo) res.status(200).json({msg: "succes delete this todo"})
            else{
                throw { msg: "id todo not found", code: 404}
            }
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = TodoController