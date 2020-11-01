module.exports = function (err, req, res, next) {
	let status = err.status || 500
	let msg = err.msg || 'Internal Server Error'
	if (err.name === 'SequelizeValidationError') {
		msg = ''
		for (let i = 0; i < err.errors.length; i++) {
			msg += err.errors[i].message
			if (i !== err.errors.length - 1) {
				msg += ', '
			}
		}
	} else if (err.name === "SequelizeUniqueConstraintError") {
		msg = err.errors[0].message
	}
	res.status(status).json({ error: msg })
}