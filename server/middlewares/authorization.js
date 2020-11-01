const { Todo } = require("../models")

async function authorization (req, res, next) {
	const { id } = req.params
	
	try {
		const todo = await Todo.findByPk( id )
		
		if (!todo) {
			throw { msg: 'Todo not found', status: 404}
		} else if (+todo.UserId === +req.loggedIn) {
			next()
		} else {
			throw { msg: 'Not authorized', status: 401}
		}
	} catch (err) {
		next(err)
	}
}

module.exports = authorization