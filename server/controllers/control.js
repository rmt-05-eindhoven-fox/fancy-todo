const { Todo } = require('../models')

class Controller {
    static landingPage(req, res) {
        res.send('Welcome To Todo App')
    }

    static async showAll(req, res) {
        try {
            const todo = await Todo.findAll()
            res.status(200).json(todo)
        } catch(error) {
            res.status(500).json(error)
        }
    }

    static async create(req, res) {
		const { title, description, status, due_date } = req.body;
		try {
			const Todo = await Todo.create({ title, description, status, due_date })

			const result = {
				"id": Todo.id,
				"title": Todo.title,
				"description": Todo.description,
				"status": Todo.status,
				"due_date": Todo.due_date
			}

			res.status(201).json(result);

		} catch (err) {
			res.status(400).json(err);
		}
	}

	static async showById(req, res) {
		try {
			const id = +req.params.id;
			const todo = await Todo.findByPk(id)

			res.status(200).json(todo);

		} catch (err) {
			res.status(404).json(err);
		}
	}

	static async editTodo(req, res) {
		try {
			const id = +req.params.id;
			const { title, description, status, due_date } = req.body;
			const updateTodo = await Todo.update({
				title,
				description,
				status,
				due_date
			}, { where: { id }, returning: true })

			res.status(200).json(updateTodo[1][0])
		} catch (err) {
			res.status(404).json(err)
		
		}
	}

	static async editStatus(req, res) {
		try {
			const id = +req.params.id;
			const { status } = req.body;
			const updateTodo = await Todo.update({
				status
			}, { where: { id }, returning: true })

			res.status(200).json(updateTodo[1][0])
		} catch (err) {
			res.status(400).json(err)
		
		}
	}

	static async delete(req, res) {
		try {
			const id = +req.params.id;
			const deletedTodo = await Todo.destroy({
				where: { id }, returning: true
			})

			res.status(200).json({msg: "success deleted"})
		} catch (err) {
			res.status(500).json(err)
		}
	}
}

module.exports=Controller