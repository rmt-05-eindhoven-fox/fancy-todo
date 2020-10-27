const {Todo} = require("../models");

class todoController{
    static async viewAll(request, response){
        const userId = request.loggedInUser.id
        try{
            const data = await Todo.findAll({
                where: {
                    id: userId
                }
            })   
            response.status(201).json(data)
        }catch (error){
            response.status(500).json(error);
        }
    }

    static async viewById(request, response){
        try {
			const id = +request.params.id;
			const todo = await Todo.findByPk(id)
			response.status(200).json(todo);
		} catch (err) {
			response.status(404).json(err);
		}
    }

    static async create(request, response){
        const newData = { 
            title: request.body.title,
            description: request.body.description, 
            status: request.body.status, 
            due_date: request.body.due_date
            UserId: request.loggedInUser.id 
        }
        try{
            const data = await Todo.create(newData)
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
            response.status(500).json(error);
        }
    }

    static async updateAll(request, response){
        try {
			const id = +request.params.id;
			const newData = { 
                title: request.body.title, 
                description: request.body.description, 
                status: request.body.status, 
                due_date: request.body.due_date 
            }
			const updateTodo = await Todo.update(newData, { where: { id }, returning: true })
			response.status(200).json(updateTodo[1][0])
		} catch (err) {
			response.status(404).json(err)
		}
    }

    static async updateStatus(request, response){
        try {
			const id = +request.params.id;
			const newData = { status: request.body.status }
			const updateTodo = await Todo.update(newData, { where: { id }, returning: true })
			response.status(200).json(updateTodo[1][0])
		} catch (err) {
			response.status(404).json(err)
		}
    }

    static async delete(request, response){
        try {
			const id = +request.params.id;
			const deleteTodo = await Todo.destroy({
				where: { id }, returning: true
			})
			response.status(200).json({msg: "todo deleted successfully"})
		} catch (err) {
			response.status(500).json(err)
		}
    }
}

module.exports = todoController;