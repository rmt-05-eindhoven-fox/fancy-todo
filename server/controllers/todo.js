const { Todo, User } = require("../models");

class TodoController {
	static async create(req, res, next) {
		const { title, description, status, due_date } = req.body
		const UserId = req.loggedIn
		
		try {
			const newTodo = await Todo.create({
				title, description, status, due_date, UserId
			})
			res.status(201).json(newTodo)
		} catch (err) {
			next(err)
		}
	}

  static async showAll(req, res, next) {
		const UserId = req.loggedIn

		try {
			const todos = await Todo.findAll({ where: { UserId } })
			res.status(200).json(todos)
		} catch (err) {
			next(err)
		}
	}

	static async findById (req, res, next) {
		const id = +req.params.id
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				res.status(200).json(todo)
			} else {
				throw { msg: 'NOT FOUND', status: 404 }
			}
		} catch (err) {
			next(err)
		}
	}

	static async updateOne (req, res, next) {
		const id = +req.params.id
		const { title, description, status, due_date } = req.body
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.update({
					title, description, status, due_date
				}, { where: { id } })
				res.status(200).json(req.body)
			} else {
				throw { msg: 'NOT FOUND', status: 404 }
			}
		} catch (err) {
			next(err)
		}
	}

	static async updateStatus (req, res, next) {
		const id = +req.params.id
		const { status } = req.body
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.update({ status }, { where: { id } })
				res.status(200).json(req.body)
			} else {
				throw { msg: 'NOT FOUND', status: 404 }
			}	
		} catch (err) {
			next(err)
		}
	}

	static async delete (req, res, next) {
		const id = +req.params.id
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.destroy({ where: { id } })
				res.status(200).json({ message: 'todo success to delete'})
			} else {
				throw { msg: 'NOT FOUND', status: 404 }
			}
		} catch (err) {
			next(err)
		}
	}
}

module.exports = TodoController;
