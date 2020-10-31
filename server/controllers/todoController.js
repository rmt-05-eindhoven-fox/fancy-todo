const {Todo} = require("../models");

class todoController{
    static async viewAll(request, response) {
        try {
            const userId = request.loggedInUser.id;
            const data = await Todo.findAll({
                where: { UserId: userId },
                order: [["due_date", "DESC"]]
            });
            response.status(201).json(data)
        } catch(error) {
            next(error);
        }
    }

    static async viewById(request, response) {
        try {
            const userId = request.loggedInUser.id;
			const todoId = +request.params.id;
			const todo = await Todo.findByPk({
                where: { UserId: userId, id: todoId }
            });
			response.status(200).json(todo);
		} catch (error) {
			next(error);
		}
    }

    static async create(request, response) {
        const newData = { 
            title: request.body.title,
            description: request.body.description, 
            status: request.body.status, 
            due_date: request.body.due_date,
            UserId: request.loggedInUser.id 
        }
        try{
            const data = await Todo.create(newData);
            const result = {
                "id": data.id,
                "title": data.title,
                "description": data.description,
                "status": data.status,
                "due_date": data.due_date,
                "UserId": data.UserId
            }
            response.status(201).json(result);
        }catch(error){
            next(error);
        }
    }

    static async updateAll(request, response) {
        try {
            const userId = request.loggedInUser.id
			const todoId = +request.params.id;
			const newData = { 
                title: request.body.title, 
                description: request.body.description, 
                status: request.body.status, 
                due_date: request.body.due_date 
            }
			const updateTodo = await Todo.update(newData, { 
                where: { UserId: userId, id: todoId }, 
                returning: true 
            })
			response.status(200).json(updateTodo[1][0]);
		} catch (error) {
			next(error);
		}
    }

    static async updateStatus(request, response) {
        try {
            const userId = request.loggedInUser.id;
			const todoId = +request.params.id;
			const newData = { status: request.body.status }
			const updateTodo = await Todo.update(newData, { 
                where: { UserId: userId, id: todoId},
                returning: true 
            });
			response.status(200).json(updateTodo[1][0]);
		} catch (err) {
			next(error);
		}
    }

    static async delete(request, response) {
        try {
			const todoId = +request.params.id;
			const deleteTodo = await Todo.destroy({
                where: { id: todoId }, 
                returning: true
			})
			response.status(200).json({msg: "todo deleted successfully"})
		} catch(error) {
			next(err);
		}
    }
}

module.exports = todoController;