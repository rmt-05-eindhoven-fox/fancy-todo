const { Todo } = require("../models");
const todo = require("../models/todo");

class TodoController {
	static async show(req, res) {
		try {
			const todos = await Todo.findAll();
			res.status(200).json(todos);
		} catch (error) {
			res.status(500).json.error;
		}
	}

	static detail(req, res) {
		const id = req.params.id;
		Todo.findAll({
			where: {
				id: id,
			},
		})
			.then((param) => {
				console.log(param);
				res.status(200).json(param);
			})
			.catch((err) => {
				res.status(500).json.error;
			});
	}
	static update(req, res) {}

	static register(req, res) {}

	static login(req, res) {}
}

module.exports = TodoController;
