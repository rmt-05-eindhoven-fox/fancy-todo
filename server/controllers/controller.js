const { Todo, User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


class Controller {
    static async register(req, res) {
        try {
            const dataUser = {
                email: req.body.email,
                password: req.body.password
            }

            const newUser = await User.create(dataUser)

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (error) {
            res.status(500).json({
                message: "Server is busy"
            })
        }
    }
    
    static async login(req, res) {
       try {
        const { email, password } = req.body
        
        const user = await User.findOne({where: {email: email}
        })  

        if(!user) {
            res.status(401).json({message: 'Wrong email/password'})
        } else if(!comparePass(password, user.password)) {
            res.status(401).json({message: 'Wrong email/password'})
        } else {
            const access_token = signToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json(access_token)
        }
       } catch (error) {
        res.status(500).json({
            message: "Server is busy"
        })
       }
    }
    static async todoAdd(req, res) {
        try {
            const inputTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const newTodo = await Todo.create(inputTodo)

            res.status(201).json(newTodo)
        } catch (err) {
            res.status(500).json({
                message: "Server is busy"
            })
        }

    }
    static async todoList(req, res) {
        try {
            const todoList = await Todo.findAll()

            res.status(200).json(todoList)
        } catch (error) {
            res.status(500).json({
                message: "Server is busy"
            })
        }
    }
    static async todoId(req, res) {
        try {
            const id = +req.params.id

            const todoId = await Todo.findByPk(id)

            res.status(200).json(todoId)
        } catch (error) {
            res.status(404).json({
                message: "Not Found"
            })
        }
    }
    static async todoPut(req, res) {
        try {
            const id = +req.params.id
            const dataTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }

            const updateTodo = await Todo.update(dataTodo, {where: {id: id}, returning: true} )

            res.status(200).json(updateTodo[1][0])
        } catch (error) {
            res.status(500).json({
                message: "Server is busy"
            }) 
        }
    }
    static async todoPatch(req, res) {
        try {
            const id = +req.params.id
            const dataTodo = {
                status: req.body.status
            }

            const updateTodo = await Todo.update(dataTodo, {where: {id: id}, returning: true} )

            res.status(200).json(updateTodo[1][0])  
        } catch (error) {
            res.status(500).json({
                message: "Server is busy"
            }) 
        }
    }
    static async delete(req, res) {
        try {
            const id = +req.params.id

            const deleteTodo = await Todo.destroy( {where: {id: id}, returning: true} )

            res.status(200).json({ message: 'todo success to delete' }) 
        } catch (error) {
            res.status(500).json({
                message: "Server is busy"
            }) 
        }
    }
}


module.exports = Controller