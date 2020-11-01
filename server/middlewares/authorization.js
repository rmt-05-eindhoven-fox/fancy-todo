const { Todo } = require('../models/index')

async function authorization(req, res, next) {
    const id = +req.params.id
    // console.log(data.userId, req.loggedInUser.id)
    try {
        const dataTodo = await Todo.findByPk(id)
        if(!dataTodo) {
            throw { name: 'Post not found'}
        } else if(dataTodo.userId === req.loggedInUser.id ) {
            next()
        } else {
            throw { name: 'Not authorized' }
        }
    } catch (error) {
        next(error)
        // const status = error.status || 500
        // const msg = error.msg || 'Server is busy'
        // res.status(status).json(msg)
    }
}



module.exports = authorization