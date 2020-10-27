const { Todo } = require("../models");
const todo = require("../models/todo");

class TodoController {
	static async showTodo(req, res) {
		const userId = req.loggedInUser.id;
		try {
			const todos = await Todo.findAll({
				where: {
					userId,
				},
			});

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
		const UserId = req.loggedInUser.id;

		console.log(newTodo);
		console.log(UserId, "UserId nih");

		Todo.create({ ...newTodo, UserId })
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				const error = err.errors[0].messege || "Internal Server Error";
				res.status(500).json({ error });
			});
	}
	// static async addTodo(req, res) {
	// 	const { title, description, status, due_date } = req.body;
	// 	try {
	// 		const newTodo = await Todo.create({
	// 			title,
	// 			description,
	// 			status,
	// 			due_date,
	// 		});
	// 		res.status(201).json(newTodo);
	// 	} catch (error) {
	// 		res.status(500).json(error);
	// 	}
	// }

	static update(req, res) {
		let params = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date,
		};
		console.log(params);

		Todo.update(params, {
			where: { id: req.params.id },
			// returning: true,
		})
			.then((data) => {
				console.log("");
				res.status(200).json(data);
			})
			.catch((err) => {
				console.log("");
				res.status(500).json(err);
			});
	}

	static status(req, res) {
		let params = {
			status: req.body.status,
		};

		Todo.update(params, {
			where: {
				id: req.params.id,
			},
		})
			.then((data) => {
				console.log("");
				res.status(200).json(data);
			})
			.catch((err) => {
				console.log("");
				res.status(500).json(err);
			});
	}

	static delete(req, res) {
		Todo.destroy({
			where: { id: req.params.id },
		})
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}

module.exports = TodoController;
