const { Todo } = require('../models')

function authorization(req, res, next) {
    const { id } = req.params
    const userId = req.isSignedIn.userId
    console.log(id)

    Todo.findByPk(id)
    .then(result => {
        if(!result){
            console.log('sampai sini cuy')
            throw { msg: 'Todo not found', status: 404 }
        } else if(result.UserId == userId){
            console.log('sampai sini else if')
            next()
        } else {
            console.log('sampai sini else if cuy')
            throw { msg: 'Not authorized', status: 401 }
        }
    })
    .catch (err => {
        next(err)
    })
}

module.exports = authorization