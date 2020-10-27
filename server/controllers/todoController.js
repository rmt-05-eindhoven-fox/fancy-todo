const { Todo } = require("../models");
const todo = require("../models/todo");

class TodoController {
	static async showTodo(req, res) {
		try {
			const todos = await Todo.findAll();
			res.status(200).json(todos);
		} catch (error) {
			res.status(500).json.error;
		}
	}

	static detailTodo(req, res) {
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

	static addTodo(req, res) {
		const newTodo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};

		Todo.create(newTodo)
			.then((data) => {
				res.status(201).json({ data });
			})
			.catch((err) => {
				res.status(500).json.error;
			});
	}

	static update(req, res) {
		let params = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};

		Cast.update(params, { 
			where: 
			{ id: req.params.id } 
		})
			.then((data) => {
				res.status(200).json
			})
			.catch((err) => {
				res.status(500);
			});
	}

	static status(req,res) {
		let params = {
			status: req.body.status,
		};

		Todo.update(params, {
			where: {
				status = req.params.status
			}
		})

	}

	static delete(req, res) {
		Todo.destroy({
			where: {id: req.params.id },
		})
			.then((data) => {
				res.status(200).json;
			})
			.catch((err) => {
				res.status(500).json;
			});
	}

	static register(req, res) {}

	static login(req, res) {}
}

module.exports = TodoController;
