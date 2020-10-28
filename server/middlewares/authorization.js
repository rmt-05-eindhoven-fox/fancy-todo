const { Todo } = require("../models/");

function authorization(req, res, next) {
	const { id } = req.params;
	Todo.findByPk(id)
		.then((data) => {
			if (!data) {
				throw {
					msg: " todo not found",
					status: 404,
				};
			} else if (data.UserId === req.loggedInUser.id) {
				next();
			} else {
				throw {
					msg: " not authorized",
					status: 401,
				};
			}
		})
		.catch((err) => {
            const status = err.status || 500;
            const msg = err.msg || "Internal Server Error";
			res.status(status).json({ error:msg });
		});
}
module.exports = authorization;
