const { Todo } = require("../models");

class TodoController {
	static async create(req, res) {
		const { title, description, status, due_date } = req.body
		try {
			const newTodo = await Todo.create({
				title, description, status, due_date
			})
			res.status(201).json(newTodo)
		} catch (err) {
			res.status(400).json(err.message)
		}
	}

  static async showAll(req, res) {
		try {
			const todos = await Todo.findAll()
			res.status(200).json(todos)
		} catch (err) {
			res.status(500).json(err)
		}
	}

	static async findById (req, res) {
		const id = +req.params.id
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				res.status(200).json(todo)
			} else {
				res.status(404).json({ message: 'ERROR NOT FOUND'})
			}
		} catch (err) {
			res.status(500).json(`err`)
		}
	}

	static async updateOne (req, res) {
		const id = +req.params.id
		const { title, description, status, due_date } = req.body
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.update({
					title, description, status, due_date
				}, { where: { id }})
				res.status(200).json(req.body)
			} else {
				res.status(404).json({ message: 'ERROR NOT FOUND'})
			}
		} catch (err) {
			res.status(400).json(err.message)
		}
	}

	static async updateStatus (req, res) {
		const id = +req.params.id
		const { status } = req.body
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.update({ status }, { where: { id } })
				res.status(200).json(req.body)
			} else {
				res.status(404).json({ message: 'ERROR NOT FOUND'})
			}	
		} catch (err) {
			res.status(500).json(err)
		}
	}

	static async delete (req, res) {
		const id = +req.params.id
		try {
			const todo = await Todo.findByPk(id)
			if (todo) {
				await Todo.destroy({ where: { id } })
				res.status(200).json({ message: 'todo success to delete'})
			} else {
				res.status(404).json({ message: 'ERROR NOT FOUND'})
			}
		} catch (err) {
			res.status(500).json(err)
		}
	}
}

module.exports = TodoController;
