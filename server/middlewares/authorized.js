const { Todo } = require("../models/index.js")

function authorization(req, res, next){
    const id  = +req.params.id
    console.log(id)
    Todo.findOne({
        where:  id
    })
    .then(data => {
        // console.log(req.loggedInUser.id)
        // console.log(data)
        if(!data){
            throw{ message : 'post not found', status: 404}
        } else if (data.UserId === req.loggedInUser.id){
            next()
        } else {
            throw { message: 'Not Authorized', status: 401}
        }
    })
    .catch( err => {
        // const status = err.status || 500
        // const msg = err.message || "internal server error"
        // res.status(status).json({error : msg})
        next(err)
    })
}

module.exports = authorization