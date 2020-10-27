const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const { id } = req.params;
    Todo.findByPk(id)
    .then(data => {
        if(!data) {
            throw {msg: 'Post not found', status: 404}
        } else if (data.userId === req.loggedInUser.id) {
            next()
        } else {
            throw {msg: 'Not authorized', status:401 }
        }
    })
    .catch(err => {
        const status = err.status || 500
        const msg = err.msg || 'Internal Server Error'
        res.status(status).json({error: msg})
    })
}

module.exports = authorization